import { create } from "zustand/react";

export const useLoginStore = create<{
  userId?: string;
  setUserId: (userId?: string) => void;
}>((set) => ({
  userId: "",
  setUserId: (userId?: string) => set((state) => ({ ...state, userId })),
}));
