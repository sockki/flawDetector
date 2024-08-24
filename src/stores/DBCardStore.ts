import { create } from 'zustand';

type DBCardStore = {
  isHoverFirstCard: boolean;
  setIsHoverFirstCard: (isHoverFirstCard: boolean) => void;
};

export const useDBCardStore = create<DBCardStore>(set => ({
  isHoverFirstCard: true,
  setIsHoverFirstCard: isHoverFirstCard => {
    set({ isHoverFirstCard });
  },
}));
