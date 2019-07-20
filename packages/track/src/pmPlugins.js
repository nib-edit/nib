import { Plugin, PluginKey } from "prosemirror-state";
import { Decoration, DecorationSet } from "prosemirror-view";

import TrackState from "./TrackState";
import { BlameRange } from "./helpers";

export const trackPluginKey = new PluginKey("track");

const trackPlugin = new Plugin({
  key: trackPluginKey,
  state: {
    init: (_, instance) => {
      return new TrackState(
        [new BlameRange(0, instance.doc.content.size, null)],
        [],
        [],
        []
      );
    },
    apply: (tr, tracked) => {
      let newTracked = tracked;
      if (tr.docChanged) newTracked = newTracked.applyTransform(tr);
      const message = tr.getMeta("track");
      if (message)
        newTracked = newTracked.applyCommit(
          tracked.commits.length,
          message,
          new Date(tr.time)
        );
      return newTracked;
    }
  }
});

export const highlightPluginKey = new PluginKey("highlight");

const highlightPlugin = new Plugin({
  key: highlightPluginKey,
  state: {
    init: () => {
      return { deco: DecorationSet.empty, commit: null };
    },
    apply: (tr, prev, oldState, state) => {
      let commit = tr.getMeta("highlight");
      if (!commit) {
        const { selection } = state;
        if (selection) {
          const trackPluginState = trackPluginKey.getState(oldState);
          const map = trackPluginState.blameMap;
          if (map) {
            for (let i = 0; i < map.length; i++) {
              if (
                map[i].to >= selection.head &&
                map[i].from < selection.head &&
                map[i].commit !== undefined
              ) {
                commit = trackPluginState.commits[map[i].commit];
              }
            }
          }
        }
      }

      if (commit) {
        const trackState = trackPluginKey.getState(oldState);
        const { blameMap } = trackState;
        const decos = blameMap
          .filter(blame => blame.commit === commit.id)
          .map(blameRange =>
            Decoration.inline(blameRange.from, blameRange.to, {
              class: "blame-marker"
            })
          );

        if (decos)
          return {
            deco: DecorationSet.create(state.doc, decos),
            commit
          };
      } else return { deco: DecorationSet.empty, commit: null };
      return prev;
    }
  },
  props: {
    decorations(state) {
      return this.getState(state).deco;
    }
  }
});

export default [trackPlugin, highlightPlugin];
