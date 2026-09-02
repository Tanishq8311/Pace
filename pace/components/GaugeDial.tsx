"use client";

import { useMemo, useRef, useState } from "react";

const VIEW_W = 220;
const VIEW_H = 130;
const CX = 110;
const CY = 112;
const R = 92; // tick rim radius
const NEEDLE_LEN = 70;

interface GaugeDialProps {
  label: string;
  value: number;
  onChange: (value: number) => void;
  min: number;
  max: number;
  step: number;
  tickInterval: number; // spacing between minor ticks
  majorEvery: number; // how many minor ticks between labeled major ticks
  unit: string;
  decimals?: number;
}

function round(n: number) {
  return Math.round(n * 100) / 100;
}

function pointAt(cx: number, cy: number, r: number, angleDeg: number) {
  const rad = (angleDeg * Math.PI) / 180;
  return { x: round(cx + r * Math.cos(rad)), y: round(cy - r * Math.sin(rad)) };
}

function angleForValue(value: number, min: number, max: number) {
  const t = (value - min) / (max - min);
  return 180 - t * 180;
}

export function GaugeDial({
  label,
  value,
  onChange,
  min,
  max,
  step,
  tickInterval,
  majorEvery,
  unit,
  decimals = 0,
}: GaugeDialProps) {
  const svgRef = useRef<SVGSVGElement>(null);
  const [dragging, setDragging] = useState(false);

  const ticks = useMemo(() => {
    const list: { v: number; major: boolean }[] = [];
    let i = 0;
    for (let v = min; v <= max + 1e-6; v += tickInterval, i++) {
      list.push({ v, major: i % majorEvery === 0 });
    }
    return list;
  }, [min, max, tickInterval, majorEvery]);

  function valueFromPointer(clientX: number, clientY: number) {
    const svg = svgRef.current;
    if (!svg) return value;
    const rect = svg.getBoundingClientRect();
    const x = ((clientX - rect.left) / rect.width) * VIEW_W;
    const y = ((clientY - rect.top) / rect.height) * VIEW_H;
    const dx = x - CX;
    const dy = y - CY;
    let angleDeg = (Math.atan2(-dy, dx) * 180) / Math.PI;
    if (angleDeg < 0) angleDeg = dx >= 0 ? 0 : 180;
    const t = (180 - angleDeg) / 180;
    const raw = min + t * (max - min);
    const stepped = Math.round(raw / step) * step;
    return Math.min(max, Math.max(min, Number(stepped.toFixed(4))));
  }

  function handlePointerDown(e: React.PointerEvent) {
    (e.target as Element).setPointerCapture(e.pointerId);
    setDragging(true);
    onChange(valueFromPointer(e.clientX, e.clientY));
  }

  function handlePointerMove(e: React.PointerEvent) {
    if (!dragging) return;
    onChange(valueFromPointer(e.clientX, e.clientY));
  }

  function handlePointerUp() {
    setDragging(false);
  }

  const needleAngle = angleForValue(value, min, max);
  const needleTip = pointAt(CX, CY, NEEDLE_LEN, needleAngle);

  return (
    <div className="flex flex-col items-center gap-1">
      <span className="field-label">{label}</span>
      <svg
        ref={svgRef}
        viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
        className="w-full max-w-[240px] touch-none select-none"
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
      >
        <path
          d={`M ${CX - R} ${CY} A ${R} ${R} 0 1 0 ${CX + R} ${CY}`}
          fill="none"
          stroke="var(--border)"
          strokeWidth={2}
        />
        {ticks.map(({ v, major }) => {
          const a = angleForValue(v, min, max);
          const outer = pointAt(CX, CY, R, a);
          const inner = pointAt(CX, CY, major ? R - 12 : R - 6, a);
          const labelPt = pointAt(CX, CY, R + 12, a);
          return (
            <g key={v}>
              <line
                x1={inner.x}
                y1={inner.y}
                x2={outer.x}
                y2={outer.y}
                stroke="var(--foreground)"
                strokeOpacity={major ? 1 : 0.35}
                strokeWidth={major ? 2 : 1}
              />
              {major && (
                <text
                  x={labelPt.x}
                  y={labelPt.y}
                  textAnchor="middle"
                  dominantBaseline="middle"
                  className="fill-muted text-[9px] font-semibold"
                >
                  {Math.round(v)}
                </text>
              )}
            </g>
          );
        })}
        <line
          x1={CX}
          y1={CY}
          x2={needleTip.x}
          y2={needleTip.y}
          stroke="var(--danger)"
          strokeWidth={3}
          strokeLinecap="round"
        />
        <circle cx={CX} cy={CY} r={7} fill="var(--yellow)" stroke="var(--border)" strokeWidth={2} />
      </svg>
      <div className="flex items-baseline gap-1.5">
        <span className="font-display text-3xl font-extrabold tracking-tight text-foreground tabular-nums">
          {value.toFixed(decimals)}
        </span>
        <span className="text-sm font-bold text-muted">{unit}</span>
      </div>
      <p className="text-center text-[11px] font-bold uppercase tracking-wide text-muted">
        Drag the needle to adjust
      </p>
    </div>
  );
}
