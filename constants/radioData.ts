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
  // Hindi Stations
  {
    id: '1',
    name: 'All India Radio - Vividh Bharati',
    frequency: 'AM 1188',
    description: 'India\'s Premier Hindi Entertainment Station',
    image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=400&fit=crop&crop=center',
    category: 'top',
    country: 'India',
  },
  {
    id: '2',
    name: 'Non Stop Hindi',
    frequency: 'Web',
    description: '24/7 Hindi Music & Entertainment',
    image: 'https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=400&h=400&fit=crop&crop=center',
    category: 'top',
    country: 'India',
  },
  {
    id: '3',
    name: 'Radio Mirchi',
    frequency: 'FM 98.3',
    description: 'Mirchi Suno, Dil Khush Karo',
    image: 'https://images.unsplash.com/photo-1571330735066-03aaa9429d4c?w=400&h=400&fit=crop&crop=center',
    category: 'top',
    country: 'India',
  },
  {
    id: '4',
    name: 'Red FM',
    frequency: 'FM 93.5',
    description: 'Bajaate Raho!',
    image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=400&fit=crop&crop=center',
    category: 'top',
    country: 'India',
  },
  {
    id: '5',
    name: 'Big FM',
    frequency: 'FM 92.7',
    description: 'Suno Sunao, Life Banao',
    image: 'https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=400&h=400&fit=crop&crop=center',
    category: 'top',
    country: 'India',
  },
  {
    id: '6',
    name: 'AIR FM Rainbow',
    frequency: 'FM 101.3',
    description: 'All India Radio Rainbow',
    image: 'https://images.unsplash.com/photo-1571330735066-03aaa9429d4c?w=400&h=400&fit=crop&crop=center',
    category: 'top',
    country: 'India',
  },
  {
    id: '7',
    name: 'AIR Gold',
    frequency: 'FM 106.4',
    description: 'Classic Hindi Hits & Golden Memories',
    image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=400&fit=crop&crop=center',
    category: 'top',
    country: 'India',
  },
  {
    id: '8',
    name: 'Radio City',
    frequency: 'FM 91.1',
    description: 'City Mein Hai Dum',
    image: 'https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=400&h=400&fit=crop&crop=center',
    category: 'top',
    country: 'India',
  },
  
  // English Stations
  {
    id: '9',
    name: 'BBC Radio 1',
    frequency: 'FM 98.8',
    description: 'The UK\'s Number 1 Hit Music Station',
    image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=400&fit=crop&crop=center',
    category: 'discover',
    country: 'UK',
  },
  {
    id: '10',
    name: 'KIIS 102.7 FM',
    frequency: 'FM 102.7',
    description: 'LA\'s #1 Hit Music Station',
    image: 'https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=400&h=400&fit=crop&crop=center',
    category: 'discover',
    country: 'USA',
  },
  {
    id: '11',
    name: 'Radio City English',
    frequency: 'FM 104.8',
    description: 'English Hits & International Music',
    image: 'https://images.unsplash.com/photo-1571330735066-03aaa9429d4c?w=400&h=400&fit=crop&crop=center',
    category: 'discover',
    country: 'India',
  },
  {
    id: '12',
    name: 'Hit FM',
    frequency: 'FM 95.0',
    description: 'International Hits & Pop Music',
    image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=400&fit=crop&crop=center',
    category: 'discover',
    country: 'India',
  },
  
  // Regional Indian Stations
  {
    id: '13',
    name: 'Sun TV Radio',
    frequency: 'FM 93.5',
    description: 'Tamil Entertainment & Music',
    image: 'https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=400&h=400&fit=crop&crop=center',
    category: 'discover',
    country: 'India',
  },
  {
    id: '14',
    name: 'Asianet Radio',
    frequency: 'FM 101.9',
    description: 'Malayalam Music & Programs',
    image: 'https://images.unsplash.com/photo-1571330735066-03aaa9429d4c?w=400&h=400&fit=crop&crop=center',
    category: 'discover',
    country: 'India',
  },
  {
    id: '15',
    name: 'Radio Mirchi Telugu',
    frequency: 'FM 95.0',
    description: 'Telugu Music & Entertainment',
    image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=400&fit=crop&crop=center',
    category: 'discover',
    country: 'India',
  },
  {
    id: '16',
    name: 'Big FM Bengali',
    frequency: 'FM 92.7',
    description: 'Bengali Music & Culture',
    image: 'https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=400&h=400&fit=crop&crop=center',
    category: 'discover',
    country: 'India',
  },
  {
    id: '17',
    name: 'Radio City Punjabi',
    frequency: 'FM 91.1',
    description: 'Punjabi Hits & Bhangra Music',
    image: 'https://images.unsplash.com/photo-1571330735066-03aaa9429d4c?w=400&h=400&fit=crop&crop=center',
    category: 'discover',
    country: 'India',
  },
  {
    id: '18',
    name: 'Red FM Marathi',
    frequency: 'FM 93.5',
    description: 'Marathi Music & Programs',
    image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=400&fit=crop&crop=center',
    category: 'discover',
    country: 'India',
  },
  
  // International Stations
  {
    id: '19',
    name: 'FM DERANA',
    frequency: 'FM 92.2',
    description: 'Sri Lanka\'s Premier Radio Station',
    image: 'https://images.unsplash.com/photo-1571330735066-03aaa9429d4c?w=400&h=400&fit=crop&crop=center',
    category: 'discover',
    country: 'Sri Lanka',
  },
  {
    id: '20',
    name: 'SUN FM',
    frequency: 'FM 98.9',
    description: 'Sunshine Radio Network',
    image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=400&fit=crop&crop=center',
    category: 'discover',
    country: 'Sri Lanka',
  },
  {
    id: '21',
    name: 'YES FM',
    frequency: 'FM 100.8',
    description: 'Youth Entertainment Station',
    image: 'https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=400&h=400&fit=crop&crop=center',
    category: 'discover',
    country: 'Sri Lanka',
  },
  {
    id: '22',
    name: 'Radio France Inter',
    frequency: 'FM 105.1',
    description: 'France\'s Public Radio',
    image: 'https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=400&h=400&fit=crop&crop=center',
    category: 'discover',
    country: 'France',
  },
  {
    id: '23',
    name: 'Radio Deutschlandfunk',
    frequency: 'FM 87.6',
    description: 'Germany\'s National Radio',
    image: 'https://images.unsplash.com/photo-1571330735066-03aaa9429d4c?w=400&h=400&fit=crop&crop=center',
    category: 'discover',
    country: 'Germany',
  },
  {
    id: '24',
    name: 'Radio Nacional',
    frequency: 'FM 103.9',
    description: 'Spain\'s Public Radio',
    image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=400&fit=crop&crop=center',
    category: 'discover',
    country: 'Spain',
  },
  
  // AM Stations
  {
    id: '25',
    name: 'AIR News',
    frequency: 'AM 1188',
    description: 'All India Radio News Service',
    image: 'https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=400&h=400&fit=crop&crop=center',
    category: 'top',
    country: 'India',
  },
  {
    id: '26',
    name: 'AIR Urdu',
    frequency: 'AM 1368',
    description: 'Urdu News & Programs',
    image: 'https://images.unsplash.com/photo-1571330735066-03aaa9429d4c?w=400&h=400&fit=crop&crop=center',
    category: 'top',
    country: 'India',
  },
  {
    id: '27',
    name: 'BBC World Service',
    frequency: 'AM 1323',
    description: 'Global News & Current Affairs',
    image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=400&fit=crop&crop=center',
    category: 'discover',
    country: 'UK',
  },
  
  // Web Stations
  {
    id: '28',
    name: 'Spotify Radio',
    frequency: 'Web',
    description: 'Streaming Music & Podcasts',
    image: 'https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=400&h=400&fit=crop&crop=center',
    category: 'discover',
    country: 'Global',
  },
  {
    id: '29',
    name: 'Gaana Radio',
    frequency: 'Web',
    description: 'Indian Music Streaming',
    image: 'https://images.unsplash.com/photo-1571330735066-03aaa9429d4c?w=400&h=400&fit=crop&crop=center',
    category: 'discover',
    country: 'India',
  },
  {
    id: '30',
    name: 'JioSaavn Radio',
    frequency: 'Web',
    description: 'Digital Music Streaming',
    image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=400&fit=crop&crop=center',
    category: 'discover',
    country: 'India',
  },
  {
    id: '31',
    name: 'Wynk Music Radio',
    frequency: 'Web',
    description: 'Airtel Music Streaming',
    image: 'https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=400&h=400&fit=crop&crop=center',
    category: 'discover',
    country: 'India',
  },
  {
    id: '32',
    name: 'Hungama Radio',
    frequency: 'Web',
    description: 'Bollywood Music Streaming',
    image: 'https://images.unsplash.com/photo-1571330735066-03aaa9429d4c?w=400&h=400&fit=crop&crop=center',
    category: 'discover',
    country: 'India',
  },
  {
    id: '33',
    name: 'Apple Music Radio',
    frequency: 'Web',
    description: 'Apple\'s Music Streaming Service',
    image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=400&fit=crop&crop=center',
    category: 'discover',
    country: 'Global',
  },
  {
    id: '34',
    name: 'Amazon Music Radio',
    frequency: 'Web',
    description: 'Amazon\'s Music Streaming',
    image: 'https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=400&h=400&fit=crop&crop=center',
    category: 'discover',
    country: 'Global',
  },
  {
    id: '35',
    name: 'YouTube Music Radio',
    frequency: 'Web',
    description: 'YouTube\'s Music Streaming',
    image: 'https://images.unsplash.com/photo-1571330735066-03aaa9429d4c?w=400&h=400&fit=crop&crop=center',
    category: 'discover',
    country: 'Global',
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
