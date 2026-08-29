import React from 'react';
import { SocialStyle, StyleScore } from '../types/personality';

interface RadarChartProps {
  scores: Record<SocialStyle, StyleScore>;
}

export const RadarChart: React.FC<RadarChartProps> = ({ scores }) => {
  const size = 320;
  const center = size / 2;
  const radius = size * 0.38;

  // 4 Axes: Top (Eagle), Right (Peacock), Bottom (Dove), Left (Owl)
  // Let's arrange nicely:
  // 0: Top (North) -> Eagle (Đại Bàng - Driver)
  // 1: Right (East) -> Peacock (Chim Công - Expressive)
  // 2: Bottom (South) -> Dove (Bồ Câu - Amiable)
  // 3: Left (West) -> Owl (Chim Cú - Analytical)

  const axes: { key: SocialStyle; label: string; icon: string; angle: number }[] = [
    { key: 'eagle', label: 'Đại Bàng', icon: '🦅', angle: -Math.PI / 2 },
    { key: 'peacock', label: 'Chim Công', icon: '🦚', angle: 0 },
    { key: 'dove', label: 'Bồ Câu', icon: '🕊️', angle: Math.PI / 2 },
    { key: 'owl', label: 'Chim Cú', icon: '🦉', angle: Math.PI }
  ];

  // Concentric polygon grids (25%, 50%, 75%, 100%)
  const gridLevels = [0.25, 0.5, 0.75, 1.0];

  const getCoordinates = (angle: number, valueRatio: number) => {
    const r = radius * valueRatio;
    return {
      x: center + r * Math.cos(angle),
      y: center + r * Math.sin(angle)
    };
  };

  // Build polygon points for user scores
  // Max possible score is 40 (or percentage ratio)
  const maxScore = Math.max(...Object.values(scores).map(s => s.total), 1);
  const dataPoints = axes.map(axis => {
    const scoreVal = scores[axis.key].total;
    const ratio = Math.max(scoreVal / 25, 0.1); // normalized visually
    return getCoordinates(axis.angle, Math.min(ratio, 1.0));
  });

  const polygonPointsString = dataPoints.map(p => `${p.x},${p.y}`).join(' ');

  return (
    <div className="flex flex-col items-center justify-center p-4 bg-slate-900/60 rounded-2xl border border-slate-800 shadow-inner">
      <svg width={size} height={size} className="overflow-visible">
        <defs>
          <radialGradient id="radarGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#818CF8" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#6366F1" stopOpacity="0.05" />
          </radialGradient>
          <linearGradient id="polyGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#F59E0B" stopOpacity="0.6" />
            <stop offset="50%" stopColor="#EF4444" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#6366F1" stopOpacity="0.6" />
          </linearGradient>
        </defs>

        {/* Concentric Grid Diamonds */}
        {gridLevels.map((level, i) => {
          const gridPoints = axes
            .map(axis => getCoordinates(axis.angle, level))
            .map(p => `${p.x},${p.y}`)
            .join(' ');
          return (
            <polygon
              key={`grid-${i}`}
              points={gridPoints}
              fill="none"
              stroke="#334155"
              strokeWidth="1"
              strokeDasharray={level === 1.0 ? 'none' : '2,2'}
            />
          );
        })}

        {/* Axis Cross Lines */}
        {axes.map((axis, i) => {
          const end = getCoordinates(axis.angle, 1.0);
          return (
            <line
              key={`axis-${i}`}
              x1={center}
              y1={center}
              x2={end.x}
              y2={end.y}
              stroke="#475569"
              strokeWidth="1.5"
            />
          );
        })}

        {/* User Data Polygon */}
        <polygon
          points={polygonPointsString}
          fill="url(#polyGrad)"
          stroke="#818CF8"
          strokeWidth="2.5"
          className="transition-all duration-700 ease-out drop-shadow-md"
        />

        {/* Data Point Markers */}
        {dataPoints.map((point, i) => {
          const axis = axes[i];
          const score = scores[axis.key];
          return (
            <g key={`marker-${i}`}>
              <circle
                cx={point.x}
                cy={point.y}
                r="5"
                fill="#FFFFFF"
                stroke="#6366F1"
                strokeWidth="2"
                className="drop-shadow"
              />
            </g>
          );
        })}

        {/* Outer Labels */}
        {axes.map((axis, i) => {
          const labelCoord = getCoordinates(axis.angle, 1.22);
          const score = scores[axis.key];

          return (
            <g key={`label-${i}`} transform={`translate(${labelCoord.x}, ${labelCoord.y})`}>
              <text
                textAnchor="middle"
                dominantBaseline="central"
                className="text-xs font-bold fill-slate-200"
              >
                {axis.icon} {axis.label}
              </text>
              <text
                y="14"
                textAnchor="middle"
                dominantBaseline="central"
                className="text-[11px] font-semibold fill-indigo-400"
              >
                {score.total}đ ({score.percentage}%)
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
};
