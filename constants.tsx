import { SafetyData, HarassmentData, SolutionData, MapPoint, ZoneType } from './types';

// Palette mapping
const COLOR_MINT = '#6bd69e'; // Mission Mint
const COLOR_TEAL = '#14b8a6'; // Transition shade
const COLOR_DANGER = '#ff3366'; // Neon Red
const COLOR_PINK = '#f7b8d6';   // Mission Pink
const COLOR_WARNING = '#ff8533'; // Mission Orange

export const PERCEPTION_DATA: SafetyData[] = [
  { category: 'Very Safe', value: 5, fill: COLOR_MINT },
  { category: 'Smwht Safe', value: 15, fill: '#34d399' }, // Slightly darker mint
  { category: 'Smwht Unsafe', value: 45, fill: '#fb7185' }, // Soft Red/Pink
  { category: 'Very Unsafe', value: 35, fill: COLOR_DANGER },
];

export const HARASSMENT_DATA: HarassmentData[] = [
  { frequency: 'Never', value: 5 },
  { frequency: 'Rarely', value: 10 },
  { frequency: 'Sometimes', value: 30 },
  { frequency: 'Often', value: 35 },
  { frequency: 'Always', value: 20 },
];

export const SOLUTIONS_DATA: SolutionData[] = [
  { solution: 'Visible Security', votes: 85 },
  { solution: 'Street Lighting', votes: 45 },
  { solution: 'Sight Lines', votes: 20 },
  { solution: 'More Activity', votes: 10 },
];

// Cape Town CBD Coordinates
export const MAP_POINTS: MapPoint[] = [
  { 
      id: 'station', 
      lat: -33.9220, 
      lng: 18.4260, 
      label: 'Train Station / Golden Acre', 
      type: ZoneType.DANGER, 
      radius: 140,
      description: 'The epicenter of anxiety. 90% of respondents circled this transport hub as a "No-Go" zone due to overcrowding and lack of oversight.'
  },
  // Updated Long Street Coordinates (Moved West to correct street alignment)
  { 
      id: 'long-st', 
      lat: -33.9235, 
      lng: 18.4175, 
      label: 'Long Street', 
      type: ZoneType.DANGER, 
      radius: 100,
      description: 'Once a nightlife hub, now specifically associated with aggressive drug peddling and persistent harassment after dark.'
  },
  { 
      id: 'bridges', 
      lat: -33.9205, 
      lng: 18.4225, 
      label: 'Strand St Bridges', 
      type: ZoneType.DANGER, 
      radius: 80,
      description: 'High traffic pinch-points with limited escape routes. Pedestrians feel trapped and vulnerable on these overhead walkways.'
  },
  { 
      id: 'mall', 
      lat: -33.9230, 
      lng: 18.4210, 
      label: 'St Georges Mall', 
      type: ZoneType.SAFE, 
      radius: 90,
      description: 'Perceived as the safest corridor in the city center. Its pedestrian-only design and business activity create a "Safety in Numbers" effect.'
  },
  { 
      id: 'bree', 
      lat: -33.9215, 
      lng: 18.4185, 
      label: 'Bree Street', 
      type: ZoneType.SAFE, 
      radius: 80,
      description: 'A secondary safe zone acting as a vital artery. The active restaurant culture provides informal surveillance ("Eyes on the Street").'
  },
];

export const WORD_CLOUD_WORDS = [
  { text: 'Police', size: 60, type: 'primary' },
  { text: 'Security', size: 55, type: 'primary' },
  { text: 'Lighting', size: 50, type: 'primary' },
  { text: 'Cameras', size: 45, type: 'primary' },
  { text: 'Harassment', size: 30, type: 'negative' },
  { text: 'Scared', size: 28, type: 'negative' },
  { text: 'Dark', size: 25, type: 'negative' },
  { text: 'Homeless', size: 35, type: 'secondary' },
  { text: 'Vagrants', size: 35, type: 'secondary' },
  { text: 'Catcalling', size: 24, type: 'negative' },
  { text: 'Men', size: 40, type: 'primary' },
  { text: 'Jobs', size: 20, type: 'secondary' },
  { text: 'Drugs', size: 22, type: 'negative' },
];