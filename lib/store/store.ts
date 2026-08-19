import { create } from "zustand";
import { persist } from "zustand/middleware";

type LoginState = {
  rememberedUserId: string | null;
  setRememberedUserId: (userId: string | null) => void;
};

export const useLoginStore = create<LoginState>()(
  persist(
    (set) => ({
      rememberedUserId: null,
      setRememberedUserId: (userId) => set({ rememberedUserId: userId }),
    }),
    { name: "login-store" }
  )
);
