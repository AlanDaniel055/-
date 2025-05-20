import { create } from "zustand";

type MobileSidebarStore = {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
};

/**
 * Custom hook for managing the state of a mobile sidebar.
 */
export const useMobileSidebar = create<MobileSidebarStore>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));
