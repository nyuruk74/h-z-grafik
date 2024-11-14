import React, { useMemo } from 'react';
import { TrendingUp, Timer, Route } from 'lucide-react';

interface GraphsProps {
  data: {
    time: number[];
    distance: number[];
    speed: number[];
  };
}

const MAX_TIME = 50; // seconds

export function Graphs({ data }: GraphsProps) {
  const currentTime = data.time[data.time.length - 1] || 0;
  const currentDistance = data.distance[data.distance.length - 1] || 0;
  const currentSpeed = data.speed[data.speed.length - 1] || 0;

  // Dynamically calculate max values for better scaling
  const maxDistance = useMemo(() => {
    const calculatedMax = Math.max(...data.distance, 500);
    return Math.ceil(calculatedMax / 100) * 100; // Round up to nearest 100
  }, [data.distance]);

  const maxSpeed = useMemo(() => {
    const calculatedMax = Math.max(...data.speed, 25);
    return Math.ceil(calculatedMax / 5) * 5; // Round up to nearest 5
  }, [data.speed]);

  // Create SVG path for continuous lines
  const createPath = (points: [number, number][]): string => {
    if (points.length === 0) return '';
    return points.reduce((path, [x, y], i) => 
      i === 0 ? `M ${x} ${y}` : `${path} L ${x} ${y}`, 
    '');
  };

  // Generate points for distance-time graph
  const distancePoints: [number, number][] = data.time.map((t, i) => [
    (t / MAX_TIME) * 100,
    100 - (data.distance[i] / maxDistance) * 100
  ]);

  // Generate points for speed-time graph
  const speedPoints: [number, number][] = data.time.map((t, i) => [
    (t / MAX_TIME) * 100,
    100 - (data.speed[i] / maxSpeed) * 100
  ]);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-3 gap-4 mb-4">
        <div className="bg-blue-50 p-4 rounded-lg flex items-center gap-3">
          <Timer className="w-5 h-5 text-blue-500" />
          <div>
            <div className="text-sm text-gray-600">Zaman</div>
            <div className="font-semibold">{currentTime.toFixed(1)} s</div>
          </div>
        </div>
        <div className="bg-blue-50 p-4 rounded-lg flex items-center gap-3">
          <Route className="w-5 h-5 text-blue-500" />
          <div>
            <div className="text-sm text-gray-600">Mesafe</div>
            <div className="font-semibold">{currentDistance.toFixed(1)} m</div>
          </div>
        </div>
        <div className="bg-blue-50 p-4 rounded-lg flex items-center gap-3">
          <TrendingUp className="w-5 h-5 text-blue-500" />
          <div>
            <div className="text-sm text-gray-600">Hız</div>
            <div className="font-semibold">{currentSpeed.toFixed(1)} m/s</div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-sm font-semibold mb-2">Yol - Zaman Grafiği</h3>
          <div className="relative h-40">
            {/* Y-axis labels */}
            <div className="absolute -left-12 h-full flex flex-col justify-between text-xs text-gray-500">
              {Array.from({ length: 6 }).map((_, i) => (
                <span key={i}>{((5 - i) * maxDistance / 5).toFixed(0)}m</span>
              ))}
            </div>
            
            {/* X-axis labels */}
            <div className="absolute -bottom-6 w-full flex justify-between text-xs text-gray-500">
              {Array.from({ length: 6 }).map((_, i) => (
                <span key={i}>{(i * MAX_TIME / 5).toFixed(0)}s</span>
              ))}
            </div>

            {/* Grid */}
            <div className="absolute inset-0 border-l border-b border-gray-300">
              <div className="h-full w-full grid grid-rows-5 grid-cols-5">
                {Array.from({ length: 25 }).map((_, i) => (
                  <div key={i} className="border-t border-l border-gray-100" />
                ))}
              </div>
            </div>

            {/* SVG for continuous line */}
            <svg className="absolute inset-0 w-full h-full">
              <path
                d={createPath(distancePoints)}
                fill="none"
                stroke="#3B82F6"
                strokeWidth="2"
                className="transition-all duration-100"
              />
            </svg>
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-sm font-semibold mb-2">Hız - Zaman Grafiği</h3>
          <div className="relative h-40">
            {/* Y-axis labels */}
            <div className="absolute -left-12 h-full flex flex-col justify-between text-xs text-gray-500">
              {Array.from({ length: 6 }).map((_, i) => (
                <span key={i}>{((5 - i) * maxSpeed / 5).toFixed(0)}m/s</span>
              ))}
            </div>
            
            {/* X-axis labels */}
            <div className="absolute -bottom-6 w-full flex justify-between text-xs text-gray-500">
              {Array.from({ length: 6 }).map((_, i) => (
                <span key={i}>{(i * MAX_TIME / 5).toFixed(0)}s</span>
              ))}
            </div>

            {/* Grid */}
            <div className="absolute inset-0 border-l border-b border-gray-300">
              <div className="h-full w-full grid grid-rows-5 grid-cols-5">
                {Array.from({ length: 25 }).map((_, i) => (
                  <div key={i} className="border-t border-l border-gray-100" />
                ))}
              </div>
            </div>

            {/* SVG for continuous line */}
            <svg className="absolute inset-0 w-full h-full">
              <path
                d={createPath(speedPoints)}
                fill="none"
                stroke="#EF4444"
                strokeWidth="2"
                className="transition-all duration-100"
              />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}