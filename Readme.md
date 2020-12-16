
# @gratico/atom

@gratico/atom
=====

Simple atom structure inspired by om. Mutations are JSON RFC 6902 patches.

Install and use
---------------

To use run `npm install -g @gratico/atom`

    import {defAtom, commitPatch, defCursor, deref, defWatchableCursor} from "@gratico/atom"

    const atom = defAtom({user: {profile: {name: "John"}}})

    React.useLayoutEffect(() => {
      const cursor = defWatchableCursor(atom, ["user", "profile"]);
      cursor.addWatch(id, handler);
      return () => {
        cursor.removeWatch(id);
      };
    }, []);



```
export * from "./atom";

```


