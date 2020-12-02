
# @gratico/atom

@gratico/atom
=====

Simple atom structure inspired by om. Mutations are JSON RFC 6902 patches.

Install and use
---------------

To use run `npm install -g @gratico/atom`



```
import { applyPatch } from "fast-json-patch";

export interface IPatch {
  path: string[];
  value: any;
  op: any;
}
export type ICommit = IPatch[];

export interface IAtom<T = any> {
  state: T;
  handlers: Map<string, Function>;
  watchPaths: Map<string, string[]>;
}

export const get = (state: any, path: string[]) =>
  path.reduce((res, prop) => res[prop], state);

export function deref(store: IAtom, path: string[]) {
  return get(store.state, path);
}

export function defAtom<T = any>(state: T) {
  const atom = new Atom(state);
  return atom;
}

export function defCursor(store: IAtom, path: string[]) {
  return path;
}
export function defWatchableCursor(store: IAtom, path: string[]) {
  return {
    addWatch: function (wid: string, handler: (commit: ICommit) => void) {
      store.handlers.set(wid, handler);
      store.watchPaths.set(wid, path);
    },
    removeWatch: (wid: string) => {
      store.handlers.delete(wid);
      store.watchPaths.delete(wid);
    },
  };
}

export function commitPatch(store: IAtom, patch: ICommit) {
  applyPatch(
    store.state,
    patch.map((el) => ({ ...el, path: "/" + el.path.join("/") }))
  );

  store.handlers.forEach((handler) => {
    handler(patch);
  });
}

export class Atom<T> implements IAtom<T> {
  state: T;
  handlers: Map<string, Function>;
  watchPaths: Map<string, string[]>;
  constructor(state: T) {
    this.state = state;
    this.handlers = new Map();
    this.watchPaths = new Map();
  }
}

```


