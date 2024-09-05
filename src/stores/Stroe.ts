import { create } from 'zustand';

interface CodeFormatState {
  currentCode: string;
  codeType: string;
  setCurrentCode: (res: string) => void;
  setCodeType: (res: string) => void;
}

export const useCodeFormatState = create<CodeFormatState>(set => ({
  currentCode: '',
  codeType: '',
  setCurrentCode: (res: string) => set({ currentCode: res }),
  setCodeType: (res: string) => set({ codeType: res }),
}));
