import { createContext, useContext, useState, useRef, ReactNode } from 'react';
import { sounds, initAudio } from '@/lib/sounds';

interface GameSoundContextType {
  isMuted: boolean;
  toggleMute: () => void;
  playSelect: () => void;
  playCorrect: () => void;
  playIncorrect: () => void;
  playAdvance: () => void;
  playVictory: () => void;
  playStart: () => void;
}

const GameSoundContext = createContext<GameSoundContextType | undefined>(undefined);

export function GameSoundProvider({ children }: { children: ReactNode }) {
  const [isMuted, setIsMuted] = useState(() => {
    const saved = localStorage.getItem('game-sound-muted');
    return saved === 'true';
  });
  const initializedRef = useRef(false);

  const ensureInitialized = () => {
    if (!initializedRef.current) {
      initAudio();
      initializedRef.current = true;
    }
  };

  const toggleMute = () => {
    setIsMuted(prev => {
      const newValue = !prev;
      localStorage.setItem('game-sound-muted', String(newValue));
      return newValue;
    });
  };

  const playSound = (soundFn: () => void) => {
    ensureInitialized();
    if (!isMuted) {
      soundFn();
    }
  };

  const contextValue: GameSoundContextType = {
    isMuted,
    toggleMute,
    playSelect: () => playSound(sounds.playSelect),
    playCorrect: () => playSound(sounds.playCorrect),
    playIncorrect: () => playSound(sounds.playIncorrect),
    playAdvance: () => playSound(sounds.playAdvance),
    playVictory: () => playSound(sounds.playVictory),
    playStart: () => playSound(sounds.playStart),
  };

  return (
    <GameSoundContext.Provider value={contextValue}>
      {children}
    </GameSoundContext.Provider>
  );
}

export function useGameSounds() {
  const context = useContext(GameSoundContext);
  if (!context) {
    throw new Error('useGameSounds must be used within GameSoundProvider');
  }
  return context;
}
