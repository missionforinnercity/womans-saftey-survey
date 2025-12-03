import React from 'react';

export interface SafetyData {
  category: string;
  value: number;
  fill?: string;
}

export interface HarassmentData {
  frequency: string;
  value: number;
  fill?: string;
}

export interface SolutionData {
  solution: string;
  votes: number;
}

export interface StoryBlock {
  id: string;
  title: string;
  content: React.ReactNode;
  visualType: 'HERO' | 'PERCEPTION' | 'HARASSMENT' | 'MAP' | 'SOLUTIONS' | 'WORDCLOUD' | 'INFRASTRUCTURE';
  align?: 'left' | 'center' | 'right';
}

export enum ZoneType {
  DANGER = 'DANGER',
  SAFE = 'SAFE',
  NEUTRAL = 'NEUTRAL'
}

export interface MapPoint {
  id: string;
  lat: number;
  lng: number;
  label: string;
  type: ZoneType;
  radius: number;
  description?: string;
}