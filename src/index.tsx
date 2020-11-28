import { applyPatches, Patch, enablePatches } from "immer";

import lget from "lodash.get";

enablePatches();
// dealing with tree shaking
console.log(enablePatches);
export type IPatch = Patch;
export type ICommit = IPatch[];

export interface IAtom<T = any> {
  state: T;
  handlers: Map<string, Function>;
}

const get = (state: any, path: string[]) =>
  path.length === 0 ? state : lget(state, path);

export function deref(store: IAtom, path: string[]) {
  return get(store.state, path);
}

export function defAtom<T = any>(state: T) {
  const atom = new Atom(state);
  return atom;
}
export function defCursorUnsafe(store: IAtom, path: string[]) {
  return path;
}

export function defUpdatableCursor(store: IAtom, path: string[]) {
  return {
    addWatch: function (
      wid: string,
      handler: (id: string, commit: ICommit) => void
    ) {
      store.handlers.set(wid, handler);
    },
    removeWatch: (wid: string) => {
      store.handlers.delete(wid);
    },
  };
}

export function commitPatch(store: IAtom, patch: ICommit) {
  const newState = applyPatches(store.state, patch);

  store.handlers.forEach((handler) => {
    handler(patch);
  });
  store.state = newState;
}

export class Atom<T> implements IAtom<T> {
  state: T;
  handlers: Map<string, Function>;
  constructor(state: T) {
    this.state = state;
    this.handlers = new Map();
  }
}
