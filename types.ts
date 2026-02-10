
export interface Airfield {
  id: string;
  name: string;
  location: string;
  coordinates: string;
  description: string;
  isActive: boolean;
}

export type Theme = 'light' | 'dark';

export type BallisticDirection = 'North' | 'South' | 'East' | 'West' | 'None';