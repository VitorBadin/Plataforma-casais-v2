'use client';

import React from 'react';
import { COUPLE_HEALTH_PILLARS } from '@/lib/coupleHealthData';
import { CoupleHealthPillarKey } from '@/types/coupleHealthTypes';

interface CoupleHealthRadarChartProps {
  userScores: Record<CoupleHealthPillarKey, number>;
  spouseScores?: Record<CoupleHealthPillarKey, number> | null;
  userName?: string;
  spouseName?: string;
  showLegend?: boolean;
  className?: string;
}

export default function CoupleHealthRadarChart({
  userScores,
  spouseScores = null,
  userName = 'Você',
  spouseName = 'Cônjuge',
  showLegend = true,
  className = '',
}: CoupleHealthRadarChartProps) {
  const cx = 270;
  const cy = 250;
  const maxRadius = 150;
  const totalAxes = COUPLE_HEALTH_PILLARS.length; // 8
  const angleStep = (2 * Math.PI) / totalAxes;
  const startAngle = -Math.PI / 2; // Inicia no topo (12 horas)

  // Níveis da teia (escala de 1 a 10)
  const levels = [2, 4, 6, 8, 10];

  // Helper para converter polar para cartesiano
  const getCoordinates = (index: number, value: number, radius = maxRadius) => {
    const angle = startAngle + index * angleStep;
    const r = (Math.max(1, Math.min(10, value)) / 10) * radius;
    return {
      x: cx + r * Math.cos(angle),
      y: cy + r * Math.sin(angle),
    };
  };

  // Helper para pontos de polígono da teia de fundo
  const getLevelPolygonPoints = (level: number) => {
    return COUPLE_HEALTH_PILLARS.map((_, i) => {
      const { x, y } = getCoordinates(i, level);
      return `${x.toFixed(1)},${y.toFixed(1)}`;
    }).join(' ');
  };

  // Pontos do polígono do usuário
  const userPolygonPoints = COUPLE_HEALTH_PILLARS.map((p, i) => {
    const val = userScores[p.key] ?? 1;
    const { x, y } = getCoordinates(i, val);
    return `${x.toFixed(1)},${y.toFixed(1)}`;
  }).join(' ');

  // Pontos do polígono do cônjuge (se houver)
  const spousePolygonPoints = spouseScores
    ? COUPLE_HEALTH_PILLARS.map((p, i) => {
        const val = spouseScores[p.key] ?? 1;
        const { x, y } = getCoordinates(i, val);
        return `${x.toFixed(1)},${y.toFixed(1)}`;
      }).join(' ')
    : null;

  return (
    <div className={`flex flex-col items-center select-none ${className}`}>
      {showLegend && (
        <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 mb-3 text-xs">
          <div className="flex items-center gap-2 font-medium text-warm-800">
            <span className="w-4 h-1 rounded-full bg-[#e41e94]" />
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-[#e41e94] ring-2 ring-white" />
              <strong className="text-brand-700">{userName}</strong>
              <span className="text-[11px] text-warm-500 font-normal">(linha contínua)</span>
            </span>
          </div>

          {spouseScores && (
            <div className="flex items-center gap-2 font-medium text-warm-800">
              <span className="w-4 h-1 border-b-2 border-dashed border-[#6366f1]" />
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-[#6366f1] ring-2 ring-white" />
                <strong className="text-indigo-700">{spouseName}</strong>
                <span className="text-[11px] text-warm-500 font-normal">(linha tracejada)</span>
              </span>
            </div>
          )}
        </div>
      )}

      <div className="w-full max-w-[540px] aspect-square relative">
        <svg
          viewBox="0 0 540 500"
          className="w-full h-full overflow-visible drop-shadow-sm"
        >
          <defs>
            {/* Gradiente do usuário */}
            <radialGradient id="userGrad" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#e41e94" stopOpacity="0.38" />
              <stop offset="100%" stopColor="#e41e94" stopOpacity="0.12" />
            </radialGradient>

            {/* Gradiente do cônjuge */}
            <radialGradient id="spouseGrad" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#6366f1" stopOpacity="0.30" />
              <stop offset="100%" stopColor="#6366f1" stopOpacity="0.08" />
            </radialGradient>
          </defs>

          {/* Teia de fundo - polígonos concêntricos */}
          {levels.map((lvl) => (
            <polygon
              key={`web-${lvl}`}
              points={getLevelPolygonPoints(lvl)}
              fill={lvl % 4 === 0 ? '#fdf2f8' : 'none'}
              fillOpacity={lvl % 4 === 0 ? 0.35 : 0}
              stroke="#e2e8f0"
              strokeWidth={lvl === 10 ? '1.5' : '1'}
              strokeDasharray={lvl === 10 ? 'none' : '2 3'}
            />
          ))}

          {/* Eixos radiais (linhas do centro às extremidades) */}
          {COUPLE_HEALTH_PILLARS.map((_, i) => {
            const { x, y } = getCoordinates(i, 10);
            return (
              <line
                key={`axis-${i}`}
                x1={cx}
                y1={cy}
                x2={x}
                y2={y}
                stroke="#e2e8f0"
                strokeWidth="1"
              />
            );
          })}

          {/* Números dos níveis no eixo superior */}
          {levels.map((lvl) => {
            const r = (lvl / 10) * maxRadius;
            return (
              <text
                key={`lvl-text-${lvl}`}
                x={cx + 6}
                y={cy - r + 3}
                fill="#94a3b8"
                fontSize="9"
                fontWeight="600"
              >
                {lvl}
              </text>
            );
          })}

          {/* SÉRIE 2: CÔNJUGE (desenhado antes para ficar abaixo da linha principal se sobreposto) */}
          {spousePolygonPoints && (
            <g className="transition-all duration-300">
              <polygon
                points={spousePolygonPoints}
                fill="url(#spouseGrad)"
                stroke="#6366f1"
                strokeWidth="2.5"
                strokeDasharray="5 4"
                strokeLinejoin="round"
              />
              {COUPLE_HEALTH_PILLARS.map((p, i) => {
                const val = spouseScores?.[p.key] ?? 1;
                const { x, y } = getCoordinates(i, val);
                return (
                  <circle
                    key={`spouse-dot-${p.key}`}
                    cx={x}
                    cy={y}
                    r="4"
                    fill="#6366f1"
                    stroke="#ffffff"
                    strokeWidth="2"
                  />
                );
              })}
            </g>
          )}

          {/* SÉRIE 1: USUÁRIO */}
          <g className="transition-all duration-300">
            <polygon
              points={userPolygonPoints}
              fill="url(#userGrad)"
              stroke="#e41e94"
              strokeWidth="2.5"
              strokeLinejoin="round"
            />
            {COUPLE_HEALTH_PILLARS.map((p, i) => {
              const val = userScores[p.key] ?? 1;
              const { x, y } = getCoordinates(i, val);
              return (
                <circle
                  key={`user-dot-${p.key}`}
                  cx={x}
                  cy={y}
                  r="4.5"
                  fill="#e41e94"
                  stroke="#ffffff"
                  strokeWidth="2"
                />
              );
            })}
          </g>

          {/* Rótulos dos Pilares ao redor do gráfico */}
          {COUPLE_HEALTH_PILLARS.map((pillar, i) => {
            const angle = startAngle + i * angleStep;
            const labelRadius = maxRadius + 32;
            const lx = cx + labelRadius * Math.cos(angle);
            const ly = cy + labelRadius * Math.sin(angle);

            const cos = Math.cos(angle);
            const textAnchor = cos > 0.3 ? 'start' : cos < -0.3 ? 'end' : 'middle';

            const userVal = userScores[pillar.key];
            const spouseVal = spouseScores ? spouseScores[pillar.key] : null;

            return (
              <g key={`label-${pillar.key}`}>
                <text
                  x={lx}
                  y={ly - (spouseVal !== null ? 6 : 2)}
                  textAnchor={textAnchor}
                  fill="#1f2937"
                  fontSize="11"
                  fontWeight="700"
                  fontFamily="var(--font-heebo), sans-serif"
                >
                  {pillar.title}
                </text>

                {/* Badges de notas */}
                <text
                  x={lx}
                  y={ly + (spouseVal !== null ? 10 : 12)}
                  textAnchor={textAnchor}
                  fontSize="10"
                  fontWeight="600"
                >
                  <tspan fill="#e41e94">
                    {userName}: {userVal ?? '-'}
                  </tspan>
                  {spouseVal !== null && (
                    <tspan fill="#6366f1" dx="6">
                      | {spouseName}: {spouseVal}
                    </tspan>
                  )}
                </text>
              </g>
            );
          })}
        </svg>
      </div>
    </div>
  );
}
