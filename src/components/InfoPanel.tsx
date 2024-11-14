import React from 'react';
import { Car, Clock, Route } from 'lucide-react';

interface InfoPanelProps {
  speed: number;
  distance: number;
  time: number;
}

export function InfoPanel({ speed, distance, time }: InfoPanelProps) {
  return (
    <div className="grid grid-cols-3 gap-4 text-center">
      <div className="bg-blue-50 p-4 rounded-lg">
        <div className="flex items-center justify-center gap-2">
          <Car className="w-5 h-5" />
          <span className="font-semibold">Hız:</span>
        </div>
        <p>{speed.toFixed(2)} m/s</p>
      </div>
      <div className="bg-blue-50 p-4 rounded-lg">
        <div className="flex items-center justify-center gap-2">
          <Route className="w-5 h-5" />
          <span className="font-semibold">Mesafe:</span>
        </div>
        <p>{distance.toFixed(1)} m</p>
      </div>
      <div className="bg-blue-50 p-4 rounded-lg">
        <div className="flex items-center justify-center gap-2">
          <Clock className="w-5 h-5" />
          <span className="font-semibold">Zaman:</span>
        </div>
        <p>{time.toFixed(1)} s</p>
      </div>
    </div>
  );
}