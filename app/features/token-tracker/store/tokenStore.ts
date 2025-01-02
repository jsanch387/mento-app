import { create } from "zustand";

interface TokenState {
  tokens: number | null | undefined;
  setTokens: (tokens: number | null | undefined) => void;
}

const useTokenStore = create<TokenState>((set) => ({
  tokens: undefined,
  setTokens: (tokens) => set({ tokens }),
}));

export default useTokenStore;
