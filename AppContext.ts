import React from "react";

export interface AppState {
  validators: {
    publicKey?: string;
    name?: string;
    img?: string;
    fee?: number;
  }[];
  isOpenMenu: boolean;
  setIsOpenMenu: (open: boolean) => void;
}

export default React.createContext<AppState>({
  validators: [],
  isOpenMenu: false,
  setIsOpenMenu: () => null,
});
