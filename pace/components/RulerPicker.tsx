"use client";

import { useMemo, useRef, useState } from "react";

const PX_PER_UNIT = 14; // px per `tickInterval` on the ruler

interface RulerPickerProps {
  label: string;
  value: number;
  onChange: (value: number) => void;
  min: number;
  max: number;
  dragStep: number; // granularity the value changes by while dragging
  tickInterval: number; // spacing between visible minor ticks
  majorEvery: number; // how many minor ticks between labeled major ticks
  unit: string;
  decimals?: number;
  orientation?: "horizontal" | "vertical"; // vertical = read top-to-bottom like a height chart
}

export function RulerPicker({
  label,
  value,
  onChange,
  min,
  max,
  dragStep,
  tickInterval,
  majorEvery,
  unit,
  decimals = 0,
  orientation = "horizontal",
}: RulerPickerProps) {
  const [dragging, setDragging] = useState(false);
  const dragStart = useRef<{ pos: number; value: number } | null>(null);
  const vertical = orientation === "vertical";

  const ticks = useMemo(() => {
    const list: { v: number; major: boolean }[] = [];
    let i = 0;
    for (let v = min; v <= max + 1e-6; v += tickInterval, i++) {
      list.push({ v, major: i % majorEvery === 0 });
    }
    return list;
  }, [min, max, tickInterval, majorEvery]);

  const pxPerValueUnit = PX_PER_UNIT / tickInterval;
  const stripOffsetPx = (value - min) * pxPerValueUnit;

  function clamp(v: number) {
    return Math.min(max, Math.max(min, v));
  }

  function handlePointerDown(e: React.PointerEvent) {
    (e.target as Element).setPointerCapture(e.pointerId);
    dragStart.current = { pos: vertical ? e.clientY : e.clientX, value };
    setDragging(true);
  }

  function handlePointerMove(e: React.PointerEvent) {
    if (!dragStart.current) return;
    const pos = vertical ? e.clientY : e.clientX;
    const deltaPx = dragStart.current.pos - pos;
    const deltaValue = deltaPx / pxPerValueUnit;
    const next = clamp(
      Math.round((dragStart.current.value + deltaValue) / dragStep) * dragStep
    );
    if (next !== value) onChange(Number(next.toFixed(4)));
  }

  function handlePointerUp() {
    dragStart.current = null;
    setDragging(false);
  }

  return (
    <div className="flex flex-col items-center gap-3">
      <span className="field-label">{label}</span>
      <div className="flex items-baseline gap-1.5">
        <span
          className={
            vertical
              ? "font-display text-3xl font-extrabold tracking-tight text-foreground tabular-nums"
              : "font-display text-5xl font-extrabold tracking-tight text-foreground tabular-nums"
          }
        >
          {value.toFixed(decimals)}
        </span>
        <span className={vertical ? "text-sm font-bold text-muted" : "text-lg font-bold text-muted"}>
          {unit}
        </span>
      </div>

      <div
        className={
          vertical
            ? "relative h-56 w-full touch-none select-none overflow-hidden rounded-xl border-2 border-border bg-surface-2"
            : "relative h-16 w-full touch-none select-none overflow-hidden rounded-xl border-2 border-border bg-surface-2"
        }
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
      >
        <div
          className={vertical ? "absolute inset-x-0 flex flex-col" : "absolute inset-y-0 flex"}
          style={{
            transform: vertical
              ? `translateY(${-stripOffsetPx}px)`
              : `translateX(${-stripOffsetPx}px)`,
            top: vertical ? "50%" : undefined,
            left: vertical ? undefined : "50%",
            transition: dragging
              ? "none"
              : `transform 0.15s ease-out`,
          }}
        >
          {ticks.map(({ v, major }) => (
            <div
              key={v}
              className="relative shrink-0"
              style={vertical ? { height: PX_PER_UNIT } : { width: PX_PER_UNIT }}
            >
              <div
                className={
                  vertical
                    ? major
                      ? "absolute right-2 top-1/2 h-[2.5px] w-6 -translate-y-1/2 bg-foreground"
                      : "absolute right-2 top-1/2 h-[1.5px] w-3 -translate-y-1/2 bg-foreground/35"
                    : major
                      ? "absolute bottom-2 left-1/2 h-6 w-[2.5px] -translate-x-1/2 bg-foreground"
                      : "absolute bottom-2 left-1/2 h-3 w-[1.5px] -translate-x-1/2 bg-foreground/35"
                }
              />
              {major && (
                <span
                  className={
                    vertical
                      ? "absolute left-1.5 top-1/2 -translate-y-1/2 text-[10px] font-semibold text-muted"
                      : "absolute left-1/2 top-1.5 -translate-x-1/2 text-[10px] font-semibold text-muted"
                  }
                >
                  {Math.round(v)}
                </span>
              )}
            </div>
          ))}
        </div>

        {/* center pointer */}
        <div
          className={
            vertical
              ? "pointer-events-none absolute left-0 top-1/2 h-[3px] w-full -translate-y-1/2 bg-yellow"
              : "pointer-events-none absolute left-1/2 top-0 h-full w-[3px] -translate-x-1/2 bg-yellow"
          }
        />
        <div
          className={
            vertical
              ? "pointer-events-none absolute left-0 top-1/2 h-2.5 w-2.5 -translate-y-1/2 rounded-full border-2 border-border bg-yellow"
              : "pointer-events-none absolute left-1/2 top-0 h-2.5 w-2.5 -translate-x-1/2 rounded-full border-2 border-border bg-yellow"
          }
        />
      </div>

      <p className="text-center text-[11px] font-bold uppercase tracking-wide text-muted">
        Drag to adjust
      </p>
    </div>
  );
}
