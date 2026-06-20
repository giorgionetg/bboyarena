import { create } from 'zustand';

interface GameState {
  selectedCharacter: string;
  score: number;
  bpm: number;
  isMuted: boolean;
  setSelectedCharacter: (character: string) => void;
  incrementScore: (amount: number) => void;
  setBpm: (bpm: number) => void;
  toggleMute: () => void;
  resetGame: () => void;
}

export const useGameStore = create<GameState>((set) => ({
  selectedCharacter: 'Dust Crew',
  score: 0,
  bpm: 120,
  isMuted: false,
  setSelectedCharacter: (selectedCharacter) => set({ selectedCharacter }),
  incrementScore: (amount) => set((state) => ({ score: state.score + amount })),
  setBpm: (bpm) => set({ bpm }),
  toggleMute: () => set((state) => ({ isMuted: !state.isMuted })),
  resetGame: () => set({ score: 0 }),
}));
