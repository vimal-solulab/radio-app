import { RadioStation } from '@/constants/radioData';
import React, { createContext, ReactNode, useContext, useState } from 'react';

interface PlayerContextType {
  currentStation: RadioStation | null;
  isPlaying: boolean;
  currentTrack: string;
  setCurrentStation: (station: RadioStation | null) => void;
  setIsPlaying: (playing: boolean) => void;
  setCurrentTrack: (track: string) => void;
  playStation: (station: RadioStation) => void;
  pauseStation: () => void;
  resumeStation: () => void;
}

const PlayerContext = createContext<PlayerContextType | undefined>(undefined);

export function PlayerProvider({ children }: { children: ReactNode }) {
  const [currentStation, setCurrentStation] = useState<RadioStation | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrack, setCurrentTrack] = useState('Now Playing');

  const playStation = (station: RadioStation) => {
    setCurrentStation(station);
    setIsPlaying(true);
    setCurrentTrack('Now Playing');
  };

  const pauseStation = () => {
    setIsPlaying(false);
  };

  const resumeStation = () => {
    setIsPlaying(true);
  };

  return (
    <PlayerContext.Provider
      value={{
        currentStation,
        isPlaying,
        currentTrack,
        setCurrentStation,
        setIsPlaying,
        setCurrentTrack,
        playStation,
        pauseStation,
        resumeStation,
      }}
    >
      {children}
    </PlayerContext.Provider>
  );
}

export function usePlayer() {
  const context = useContext(PlayerContext);
  if (context === undefined) {
    throw new Error('usePlayer must be used within a PlayerProvider');
  }
  return context;
}
