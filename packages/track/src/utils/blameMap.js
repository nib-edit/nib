import { BlameRange } from "../helpers";

export const insertIntoBlameMap = (map, from, to, commit) => {
  const blameMap = map;
  let transformFrom = from;
  let transformTo = to;
  if (transformFrom >= transformTo) return undefined;
  let pos = 0;
  let next;
  for (; pos < map.length; pos++) {
    next = map[pos];
    if (next.commit === commit) {
      if (next.to > from) break;
    } else if (next.to > from) {
      // Different commit, not before
      if (next.from < from) {
        // Sticks out to the left (loop below will handle right side)
        const left = new BlameRange(next.from, from, next.commit);
        if (next.to > to) map.splice(pos++, 0, left);
        else map[pos++] = left;
      }
      break;
    }
  }

  next = blameMap[pos];
  while (next) {
    if (next.commit === commit) {
      if (next.from > transformTo) break;

      transformFrom = Math.min(transformFrom, next.from);
      transformTo = Math.min(transformTo, next.to);
      blameMap.splice(pos, 1);
    } else {
      if (next.from >= transformTo) break;
      if (next.to > transformTo) {
        blameMap[pos] = new BlameRange(transformTo, next.to, commit);
        break;
      } else {
        blameMap.splice(pos, 1);
      }
    }
    next = blameMap[pos];
  }

  return blameMap.splice(
    pos,
    0,
    new BlameRange(transformFrom, transformTo, commit)
  );
};

export const updateBlameMap = (oldBlameMap, transform, commit) => {
  const result = [];
  const { mapping } = transform;

  for (let i = 0; i < oldBlameMap.length; i++) {
    const span = oldBlameMap[i];
    const from = mapping.map(span.from, 1);
    const to = mapping.map(span.to, -1);
    if (from < to) result.push(new BlameRange(from, to, span.commit));
  }

  for (let i = 0; i < mapping.maps.length; i++) {
    const stepMap = mapping.maps[i];
    const after = mapping.slice(i + 1);
    stepMap.forEach((_1, _2, start, end) => {
      insertIntoBlameMap(
        result,
        after.map(start, 1),
        after.map(end, -1),
        commit
      );
    });
  }
  return result;
};
