import React from 'react';
import { Car } from 'lucide-react';

interface SimulationTrackProps {
  distance: number;
}

export function SimulationTrack({ distance }: SimulationTrackProps) {
  return (
    <div className="relative h-48 bg-gradient-to-b from-sky-200 to-sky-100 rounded-lg overflow-hidden">
      {/* Sky and clouds */}
      <div className="absolute top-0 w-full h-24">
        <div className="absolute w-12 h-6 bg-white rounded-full left-1/4 top-8" />
        <div className="absolute w-16 h-8 bg-white rounded-full left-2/3 top-4" />
      </div>
      
      {/* Road */}
      <div className="absolute bottom-0 w-full h-20 bg-gray-700">
        {/* Road markings */}
        <div className="absolute bottom-9 w-full h-2 bg-white dash-line"></div>
        
        {/* Distance markers */}
        <div className="absolute bottom-0 w-full flex justify-between px-4 text-xs text-white">
          <span>0m</span>
          <span>50m</span>
          <span>100m</span>
          <span>150m</span>
          <span>200m</span>
        </div>
      </div>
      
      {/* Car */}
      <div 
        className="absolute bottom-12 transition-all duration-100"
        style={{ 
          left: `${(distance / 2) % 100}%`,
          transform: 'translateX(-50%)'
        }}
      >
        <div className="relative">
          <Car className="w-16 h-16 text-red-500" />
          {/* Car shadow */}
          <div className="absolute -bottom-1 left-1/2 w-12 h-3 bg-black/20 rounded-full transform -translate-x-1/2 blur-sm" />
        </div>
      </div>
    </div>
  );
}