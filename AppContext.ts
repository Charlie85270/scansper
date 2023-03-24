import React from "react";

export interface AppState {
  space?: "CORE" | "EVM";
  hideZeroAllowance: boolean;
  setHideZeroAllowance: (hide: boolean) => void;
  setSpace: (space?: "CORE" | "EVM") => void;
}

export default React.createContext<AppState>({
  space: undefined,
  hideZeroAllowance: true,
  setHideZeroAllowance: (hide: boolean) => {},
  setSpace: (space?: "CORE" | "EVM") => {},
});
