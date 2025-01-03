import { create } from "zustand";

interface AuthState {
  authenticated: boolean;
  setAuthenticated: (authenticated: boolean) => void;
}

const useAuthStore = create<AuthState>((set) => ({
  authenticated: false, // Default to not authenticated
  setAuthenticated: (authenticated) => set({ authenticated }),
}));

export default useAuthStore;
