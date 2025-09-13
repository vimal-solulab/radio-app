export interface RadioStation {
  id: string;
  name: string;
  frequency: string;
  description: string;
  logo?: string;
  image?: string;
  category: 'recent' | 'recommended' | 'favorite' | 'top' | 'discover';
  country?: string;
}

export const mockStations: RadioStation[] = [
  // Recent stations
  {
    id: '1',
    name: 'KZOQ Z100.1 FM',
    frequency: '100.1 FM',
    description: "Missoula's Only Classic Rock Station",
    image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=400&fit=crop&crop=center',
    category: 'recent',
  },
  {
    id: '2',
    name: 'KIIS 102.7 FM',
    frequency: '102.7 FM',
    description: "LA's #1 Hit Music Station",
    image: 'https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=400&h=400&fit=crop&crop=center',
    category: 'recent',
  },
  
  // Favorite stations
  {
    id: '3',
    name: 'KIIS-FM 102.7 FM',
    frequency: '102.7 FM',
    description: "LA's #1 Hit Music Station",
    image: 'https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=400&h=400&fit=crop&crop=center',
    category: 'favorite',
  },
  {
    id: '4',
    name: 'Jazz 24 88.5 FM',
    frequency: '88.5 FM',
    description: 'Smooth Jazz & Contemporary',
    image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=400&fit=crop&crop=center',
    category: 'favorite',
  },
  
  // Top stations
  {
    id: '5',
    name: 'FM DERANA',
    frequency: '92.2 FM',
    description: 'Sri Lanka\'s Premier Radio Station',
    image: 'https://images.unsplash.com/photo-1571330735066-03aaa9429d4c?w=400&h=400&fit=crop&crop=center',
    category: 'top',
    country: 'Sri Lanka',
  },
  {
    id: '6',
    name: 'SUN FM',
    frequency: '98.9 FM',
    description: 'Sunshine Radio Network',
    image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=400&fit=crop&crop=center',
    category: 'top',
    country: 'Sri Lanka',
  },
  {
    id: '7',
    name: 'YES FM',
    frequency: '100.8 FM',
    description: 'Youth Entertainment Station',
    image: 'https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=400&h=400&fit=crop&crop=center',
    category: 'top',
    country: 'Sri Lanka',
  },
  {
    id: '8',
    name: 'YFM',
    frequency: '92.7 FM',
    description: 'Young & Fresh Music',
    image: 'https://images.unsplash.com/photo-1571330735066-03aaa9429d4c?w=400&h=400&fit=crop&crop=center',
    category: 'top',
    country: 'Sri Lanka',
  },
  
  // Discover stations
  {
    id: '9',
    name: 'BBC Radio 1',
    frequency: '98.8 FM',
    description: 'The UK\'s Number 1 Hit Music Station',
    image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=400&fit=crop&crop=center',
    category: 'discover',
    country: 'UK',
  },
  {
    id: '10',
    name: 'Radio France Inter',
    frequency: '105.1 FM',
    description: 'France\'s Public Radio',
    image: 'https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=400&h=400&fit=crop&crop=center',
    category: 'discover',
    country: 'France',
  },
  {
    id: '11',
    name: 'Radio Deutschlandfunk',
    frequency: '87.6 FM',
    description: 'Germany\'s National Radio',
    image: 'https://images.unsplash.com/photo-1571330735066-03aaa9429d4c?w=400&h=400&fit=crop&crop=center',
    category: 'discover',
    country: 'Germany',
  },
  {
    id: '12',
    name: 'Radio Nacional',
    frequency: '103.9 FM',
    description: 'Spain\'s Public Radio',
    image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=400&fit=crop&crop=center',
    category: 'discover',
    country: 'Spain',
  },
];

export const getStationsByCategory = (category: RadioStation['category']) => {
  return mockStations.filter(station => station.category === category);
};

export const getStationsByCountry = (country: string) => {
  return mockStations.filter(station => station.country === country);
};

export const searchStations = (query: string) => {
  const lowercaseQuery = query.toLowerCase();
  return mockStations.filter(station => 
    station.name.toLowerCase().includes(lowercaseQuery) ||
    station.description.toLowerCase().includes(lowercaseQuery) ||
    station.frequency.toLowerCase().includes(lowercaseQuery)
  );
};
