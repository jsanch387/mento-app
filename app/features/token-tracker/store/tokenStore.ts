import { create } from "zustand";

interface TokenState {
  tokens: number | null;
  setTokens: (tokens: number) => void;
}

const useTokenStore = create<TokenState>((set) => ({
  tokens: null,
  setTokens: (tokens) => set({ tokens }),
}));

export default useTokenStore;
