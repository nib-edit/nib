export class Commit {
  constructor(id, message, time, steps, maps, hidden) {
    this.id = id;
    this.message = message;
    this.time = time;
    this.steps = steps;
    this.maps = maps;
    this.hidden = hidden;
  }
}

export class BlameRange {
  constructor(from, to, commit) {
    this.from = from;
    this.to = to;
    this.commit = commit;
  }
}
