import { createContext as reactCreateContext, useContext } from "react";

export function createContext<T>(name: string) {
  const Context = reactCreateContext<T | undefined>(undefined);
  Context.displayName = name;

  function useContextHook() {
    const context = useContext(Context);
    if (context === undefined) {
      throw new Error(
        `use${name} must be used within a ${name}Provider`
      );
    }
    return context;
  }

  return [Context.Provider, useContextHook, Context] as const;
}
