import { create } from "zustand";

type CardModalStore = {
  id?: string;
  isOpen: boolean;
  onOpen: (id: string) => void;
  onClose: () => void;
};

/**
 * Custom hook for managing the card modal state.
 * @returns An object containing the card modal state and methods to manipulate it.
 */
export const useCardModal = create<CardModalStore>((set) => ({
  id: undefined,
  isOpen: false,
  onOpen: (id: string) => set({ isOpen: true, id }),
  onClose: () => set({ isOpen: false, id: undefined }),
}));
