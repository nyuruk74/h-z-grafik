import React from 'react';
import { Gauge } from 'lucide-react';

interface SpeedInputProps {
  speed: number;
  onSpeedChange: (speed: number) => void;
  disabled: boolean;
}

const SPEED_PRESETS = [
  { value: 5, label: 'Yavaş' },
  { value: 10, label: 'Normal' },
  { value: 15, label: 'Hızlı' },
  { value: 20, label: 'Çok Hızlı' }
];

export function SpeedInput({ speed, onSpeedChange, disabled }: SpeedInputProps) {
  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <div className="flex items-center gap-2 mb-4">
        <Gauge className="w-5 h-5 text-blue-500" />
        <label htmlFor="speed" className="font-semibold">Hız Seçimi:</label>
      </div>
      
      <div className="grid grid-cols-4 gap-2 mb-4">
        {SPEED_PRESETS.map((preset) => (
          <button
            key={preset.value}
            onClick={() => onSpeedChange(preset.value)}
            className={`p-2 rounded-lg transition-colors ${
              speed === preset.value
                ? 'bg-blue-500 text-white'
                : 'bg-gray-100 hover:bg-gray-200'
            }`}
          >
            {preset.label}
            <div className="text-sm">{preset.value} m/s</div>
          </button>
        ))}
      </div>

      <div className="flex items-center gap-2">
        <input
          id="speed"
          type="range"
          min="1"
          max="25"
          value={speed}
          onChange={(e) => onSpeedChange(Number(e.target.value))}
          className="w-full"
        />
        <span className="w-16 text-center">{speed} m/s</span>
      </div>
    </div>
  );
}