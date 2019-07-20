import { updateBlameMap } from "./utils/blameMap";
import { Commit } from "./helpers";

export default class TrackState {
  constructor(blameMap, commits, uncommittedSteps, uncommittedMaps) {
    this.blameMap = blameMap;
    this.commits = commits;
    this.uncommittedSteps = uncommittedSteps;
    this.uncommittedMaps = uncommittedMaps;
  }

  applyTransform = transform => {
    const inverted = transform.steps.map((step, i) =>
      step.invert(transform.docs[i])
    );
    const newBlame = updateBlameMap(
      this.blameMap,
      transform,
      this.commits.length
    );

    return new TrackState(
      newBlame,
      this.commits,
      this.uncommittedSteps.concat(inverted),
      this.uncommittedMaps.concat(transform.mapping.maps)
    );
  };

  applyCommit = (id, message, time) => {
    if (this.uncommittedSteps.length === 0) return undefined;
    const commit = new Commit(
      id,
      message,
      time,
      this.uncommittedSteps,
      this.uncommittedMaps
    );
    this.commits.push(commit);
    return new TrackState(this.blameMap, this.commits, [], []);
  };
}
