import { mockStations, RadioStation } from '@/constants/radioData';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Audio } from 'expo-av';
import React, { createContext, ReactNode, useCallback, useContext, useEffect, useRef, useState } from 'react';

interface PlayerContextType {
  currentStation: RadioStation | null;
  isPlaying: boolean;
  currentTrack: string;
  volume: number;
  bass: number;
  treble: number;
  balance: number;
  audioEffects: {
    reverb: boolean;
    echo: boolean;
    surround: boolean;
  };
  favorites: string[];
  sleepTimer: number | null;
  recentStations: string[];
  shuffleMode: boolean;
  isLoading: boolean;
  loadingProgress: number;
  error: string | null;
  setCurrentStation: (station: RadioStation | null) => void;
  setIsPlaying: (playing: boolean) => void;
  setCurrentTrack: (track: string) => void;
  setVolume: (volume: number) => void;
  setBass: (bass: number) => void;
  setTreble: (treble: number) => void;
  setBalance: (balance: number) => void;
  toggleAudioEffect: (effect: keyof PlayerContextType['audioEffects']) => void;
  playStation: (station: RadioStation) => Promise<void>;
  pauseStation: () => Promise<void>;
  resumeStation: () => Promise<void>;
  toggleFavorite: (stationId: string) => void;
  isFavorite: (stationId: string) => boolean;
  setSleepTimer: (minutes: number | null) => void;
  playPreviousStation: () => void;
  playNextStation: () => void;
  toggleShuffle: () => void;
  playRandomStation: () => void;
}

const PlayerContext = createContext<PlayerContextType | undefined>(undefined);

export function PlayerProvider({ children }: { children: ReactNode }) {
  const [currentStation, setCurrentStation] = useState<RadioStation | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrack, setCurrentTrack] = useState('Now Playing');
  const [volume, setVolume] = useState(0.7);
  const [bass, setBass] = useState(0.5);
  const [treble, setTreble] = useState(0.5);
  const [balance, setBalance] = useState(0.5);
  const [audioEffects, setAudioEffects] = useState({
    reverb: false,
    echo: false,
    surround: false,
  });
  const [favorites, setFavorites] = useState<string[]>([]);
  const [sleepTimer, setSleepTimer] = useState<number | null>(null);
  const [recentStations, setRecentStations] = useState<string[]>([]);
  const [shuffleMode, setShuffleMode] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);
  
  const soundRef = useRef<Audio.Sound | null>(null);

  const stopAllAudio = useCallback(async (clearStation = false) => {
    try {
      if (soundRef.current) {
        await soundRef.current.stopAsync();
        await soundRef.current.unloadAsync();
        soundRef.current = null;
      }
      setIsPlaying(false);
      if (clearStation) {
        setCurrentStation(null);
      }
      await hideMediaNotification();
    } catch (error) {
      console.error('Error stopping all audio:', error);
    }
  }, []);

  // Initialize audio and load data on mount
  useEffect(() => {
    initializeAudio();
    loadFavorites();
    loadRecentStations();
    
    return () => {
      // Cleanup audio on unmount
      stopAllAudio(true);
    };
  }, [stopAllAudio]);

  // Update volume when it changes
  useEffect(() => {
    if (soundRef.current) {
      soundRef.current.setVolumeAsync(volume);
    }
  }, [volume]);

  const loadFavorites = async () => {
    try {
      const storedFavorites = await AsyncStorage.getItem('favorites');
      if (storedFavorites) {
        setFavorites(JSON.parse(storedFavorites));
      }
    } catch (error) {
      console.error('Error loading favorites:', error);
    }
  };

  const saveFavorites = async (newFavorites: string[]) => {
    try {
      await AsyncStorage.setItem('favorites', JSON.stringify(newFavorites));
    } catch (error) {
      console.error('Error saving favorites:', error);
    }
  };

  const loadRecentStations = async () => {
    try {
      const storedRecent = await AsyncStorage.getItem('recentStations');
      if (storedRecent) {
        setRecentStations(JSON.parse(storedRecent));
      }
    } catch (error) {
      console.error('Error loading recent stations:', error);
    }
  };

  const saveRecentStations = async (newRecent: string[]) => {
    try {
      await AsyncStorage.setItem('recentStations', JSON.stringify(newRecent));
    } catch (error) {
      console.error('Error saving recent stations:', error);
    }
  };

  const addToRecentStations = (stationId: string) => {
    const newRecent = [stationId, ...recentStations.filter(id => id !== stationId)].slice(0, 10);
    setRecentStations(newRecent);
    saveRecentStations(newRecent);
  };

  const initializeAudio = async () => {
    try {
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: false,
        staysActiveInBackground: true,
        playsInSilentModeIOS: true,
        shouldDuckAndroid: true,
        playThroughEarpieceAndroid: false,
      });
      console.log('Audio initialized successfully');
    } catch (error) {
      console.error('Error initializing audio:', error);
      // Continue without throwing - audio might still work
    }
  };

  const setupMediaNotifications = async () => {
    // Notifications disabled for Expo Go compatibility
    // This function is kept for future development builds
    try {
      console.log('Media notifications setup skipped for Expo Go compatibility');
    } catch (error) {
      console.error('Error setting up notifications:', error);
    }
  };

  const showMediaNotification = async (station: RadioStation) => {
    // Notifications disabled for Expo Go compatibility
    // This function is kept for future development builds
    try {
      console.log(`Media notification for ${station.name} skipped for Expo Go compatibility`);
    } catch (error) {
      console.error('Error showing media notification:', error);
    }
  };

  const hideMediaNotification = async () => {
    // Notifications disabled for Expo Go compatibility
    // This function is kept for future development builds
    try {
      console.log('Media notification hide skipped for Expo Go compatibility');
    } catch (error) {
      console.error('Error hiding media notification:', error);
    }
  };

  const playStation = async (station: RadioStation) => {
    try {
      setIsLoading(true);
      setLoadingProgress(0);
      setError(null);
      
      // Set current station immediately to show mini player
      setCurrentStation(station);
      setCurrentTrack('Now Playing');
      addToRecentStations(station.id);
      
      // Stop current audio if playing
      if (soundRef.current) {
        try {
          await soundRef.current.stopAsync();
          await soundRef.current.unloadAsync();
        } catch (stopError) {
          console.log('Error stopping previous audio:', stopError);
        }
        soundRef.current = null;
      }
      
      // Reset playing state immediately to prevent UI confusion
      setIsPlaying(false);

      // Check if station has URL
      if (!station.url) {
        setError('No streaming URL available for this station');
        setIsLoading(false);
        setLoadingProgress(0);
        setCurrentStation(null); // Clear station if no URL
        return;
      }

      // Simulate loading progress
      const progressInterval = setInterval(() => {
        setLoadingProgress(prev => {
          if (prev >= 0.9) {
            clearInterval(progressInterval);
            return 0.9;
          }
          return prev + 0.1;
        });
      }, 200);

      // Create new sound object
      const { sound } = await Audio.Sound.createAsync(
        { uri: station.url },
        { 
          shouldPlay: true,
          volume: volume,
          isLooping: false,
          progressUpdateIntervalMillis: 1000,
        },
        (status) => {
          if (status.isLoaded) {
            console.log('Audio loaded successfully');
          } else if (status.error) {
            console.error('Audio loading error:', status.error);
            setError('Failed to load audio stream');
            setIsLoading(false);
            setIsPlaying(false);
          }
        }
      );

      clearInterval(progressInterval);
      setLoadingProgress(1);

      soundRef.current = sound;
      setIsPlaying(true);
      
      // Setup media notifications
      await setupMediaNotifications();
      await showMediaNotification(station);
      
      setIsLoading(false);
      setLoadingProgress(0);
    } catch (error) {
      console.error('Error playing station:', error);
      setError('Failed to play station. Please check your internet connection.');
      setIsLoading(false);
      setLoadingProgress(0);
      setIsPlaying(false);
      setCurrentStation(null); // Clear station on error
    }
  };

  const pauseStation = useCallback(async () => {
    try {
      if (soundRef.current) {
        await soundRef.current.pauseAsync();
        setIsPlaying(false);
        await hideMediaNotification();
      }
    } catch (error) {
      console.error('Error pausing station:', error);
      // If pause fails, try to stop completely
      if (soundRef.current) {
        try {
          await soundRef.current.stopAsync();
          setIsPlaying(false);
        } catch (stopError) {
          console.error('Error stopping station:', stopError);
        }
      }
    }
  }, []);

  // Sleep timer effect
  useEffect(() => {
    if (sleepTimer && sleepTimer > 0) {
      const timer = setTimeout(() => {
        pauseStation();
        setSleepTimer(null);
      }, sleepTimer * 60 * 1000);
      
      return () => clearTimeout(timer);
    }
  }, [sleepTimer, pauseStation]);

  const resumeStation = async () => {
    try {
      if (soundRef.current) {
        await soundRef.current.playAsync();
        setIsPlaying(true);
        if (currentStation) {
          await showMediaNotification(currentStation);
        }
      }
    } catch (error) {
      console.error('Error resuming station:', error);
    }
  };

  const toggleFavorite = (stationId: string) => {
    const newFavorites = favorites.includes(stationId)
      ? favorites.filter(id => id !== stationId)
      : [...favorites, stationId];
    
    setFavorites(newFavorites);
    saveFavorites(newFavorites);
  };

  const isFavorite = (stationId: string) => {
    return favorites.includes(stationId);
  };

  const playPreviousStation = async () => {
    if (!currentStation) return;

    // Always use all stations for navigation to ensure all stations are accessible
    const allStationIds = mockStations.map(s => s.id);
    const currentIndex = allStationIds.findIndex(id => id === currentStation.id);
    
    if (currentIndex > 0) {
      const previousStationId = allStationIds[currentIndex - 1];
      const previousStation = mockStations.find(s => s.id === previousStationId);
      if (previousStation) {
        await playStation(previousStation);
      }
    } else {
      // If at the beginning, go to the last station
      const lastStationId = allStationIds[allStationIds.length - 1];
      const lastStation = mockStations.find(s => s.id === lastStationId);
      if (lastStation) {
        await playStation(lastStation);
      }
    }
  };

  const playNextStation = async () => {
    if (!currentStation) return;

    if (shuffleMode) {
      await playRandomStation();
      return;
    }

    // Always use all stations for navigation to ensure all stations are accessible
    const allStationIds = mockStations.map(s => s.id);
    const currentIndex = allStationIds.findIndex(id => id === currentStation.id);
    
    if (currentIndex < allStationIds.length - 1) {
      const nextStationId = allStationIds[currentIndex + 1];
      const nextStation = mockStations.find(s => s.id === nextStationId);
      if (nextStation) {
        await playStation(nextStation);
      }
    } else {
      // If at the end, go to the first station
      const firstStationId = allStationIds[0];
      const firstStation = mockStations.find(s => s.id === firstStationId);
      if (firstStation) {
        await playStation(firstStation);
      }
    }
  };

  const toggleShuffle = () => {
    setShuffleMode(!shuffleMode);
  };

  const playRandomStation = async () => {
    const availableStations = mockStations.filter(station => station.id !== currentStation?.id);
    if (availableStations.length > 0) {
      const randomIndex = Math.floor(Math.random() * availableStations.length);
      const randomStation = availableStations[randomIndex];
      await playStation(randomStation);
    }
  };

  const toggleAudioEffect = (effect: keyof typeof audioEffects) => {
    setAudioEffects(prev => ({
      ...prev,
      [effect]: !prev[effect]
    }));
  };

  return (
    <PlayerContext.Provider
      value={{
        currentStation,
        isPlaying,
        currentTrack,
        volume,
        bass,
        treble,
        balance,
        audioEffects,
        favorites,
        sleepTimer,
        recentStations,
        shuffleMode,
        isLoading,
        loadingProgress,
        error,
        setCurrentStation,
        setIsPlaying,
        setCurrentTrack,
        setVolume,
        setBass,
        setTreble,
        setBalance,
        toggleAudioEffect,
        playStation,
        pauseStation,
        resumeStation,
        toggleFavorite,
        isFavorite,
        setSleepTimer,
        playPreviousStation,
        playNextStation,
        toggleShuffle,
        playRandomStation,
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
