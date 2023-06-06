import { create } from 'zustand';

export interface ModalStoreInterface {
  gameId?: string;
  isOpen: boolean;
  openModal: (gameId: string) => void;
  closeModal: () => void;
}

const useInfoModal = create<ModalStoreInterface>((set) => ({
  gameId: undefined,
  isOpen: false,
  openModal: (gameId: string) => set({ isOpen: true, gameId }),
  closeModal: () => set({ isOpen: false, gameId: undefined }),
}));

export default useInfoModal;