"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type MouseEvent as ReactMouseEvent,
} from "react";

interface HSVA {
  h: number; // 0-360
  s: number; // 0-100
  v: number; // 0-100
  a: number; // 0-1
}

interface RGBA {
  r: number;
  g: number;
  b: number;
  a: number;
}

function hsvaToRgba({ h, s, v, a }: HSVA): RGBA {
  const _s = s / 100;
  const _v = v / 100;
  const c = _v * _s;
  const x = c * (1 - Math.abs(((h / 60) % 2) - 1));
  const m = _v - c;

  let r1 = 0,
    g1 = 0,
    b1 = 0;
  if (h < 60) [r1, g1, b1] = [c, x, 0];
  else if (h < 120) [r1, g1, b1] = [x, c, 0];
  else if (h < 180) [r1, g1, b1] = [0, c, x];
  else if (h < 240) [r1, g1, b1] = [0, x, c];
  else if (h < 300) [r1, g1, b1] = [x, 0, c];
  else [r1, g1, b1] = [c, 0, x];

  return {
    r: Math.round((r1 + m) * 255),
    g: Math.round((g1 + m) * 255),
    b: Math.round((b1 + m) * 255),
    a,
  };
}

function rgbaToHex({ r, g, b, a }: RGBA): string {
  const hex = [r, g, b].map((v) => v.toString(16).padStart(2, "0")).join("");
  if (a < 1) {
    const alphaHex = Math.round(a * 255)
      .toString(16)
      .padStart(2, "0");
    return `#${hex}${alphaHex}`;
  }
  return `#${hex}`;
}

function rgbaToHexNoAlpha({ r, g, b }: RGBA): string {
  return `#${[r, g, b].map((v) => v.toString(16).padStart(2, "0")).join("")}`;
}

function hexToRgba(hex: string): RGBA | null {
  const clean = hex.replace("#", "");
  if (![3, 4, 6, 8].includes(clean.length)) return null;

  let r: number, g: number, b: number, a = 255;
  if (clean.length === 3 || clean.length === 4) {
    r = parseInt(clean[0] + clean[0], 16);
    g = parseInt(clean[1] + clean[1], 16);
    b = parseInt(clean[2] + clean[2], 16);
    if (clean.length === 4) a = parseInt(clean[3] + clean[3], 16);
  } else {
    r = parseInt(clean.slice(0, 2), 16);
    g = parseInt(clean.slice(2, 4), 16);
    b = parseInt(clean.slice(4, 6), 16);
    if (clean.length === 8) a = parseInt(clean.slice(6, 8), 16);
  }

  if ([r, g, b, a].some(isNaN)) return null;
  return { r, g, b, a: a / 255 };
}

function rgbaToHsva({ r, g, b, a }: RGBA): HSVA {
  const _r = r / 255;
  const _g = g / 255;
  const _b = b / 255;
  const max = Math.max(_r, _g, _b);
  const min = Math.min(_r, _g, _b);
  const d = max - min;

  let h = 0;
  if (d !== 0) {
    if (max === _r) h = 60 * (((_g - _b) / d) % 6);
    else if (max === _g) h = 60 * ((_b - _r) / d + 2);
    else h = 60 * ((_r - _g) / d + 4);
  }
  if (h < 0) h += 360;

  const s = max === 0 ? 0 : (d / max) * 100;
  const v = max * 100;

  return { h, s, v, a };
}

function clamp(val: number, min: number, max: number) {
  return Math.min(max, Math.max(min, val));
}

function CopyIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="14" height="14" x="8" y="8" rx="2" ry="2" />
      <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
    </svg>
  );
}

function CheckIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <button
      onClick={handleCopy}
      className="p-1 rounded hover:bg-gray-200/60 transition-colors text-gray-400 hover:text-gray-600"
      title="Copy to clipboard"
    >
      {copied ? (
        <CheckIcon className="text-emerald-500" />
      ) : (
        <CopyIcon />
      )}
    </button>
  );
}

// ---- Saturation/Brightness Panel ----
function SaturationPanel({
  hsva,
  onChange,
}: {
  hsva: HSVA;
  onChange: (s: number, v: number) => void;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);

  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const { width, height } = canvas;

    const hueColor = `hsl(${hsva.h}, 100%, 50%)`;
    ctx.fillStyle = hueColor;
    ctx.fillRect(0, 0, width, height);

    const whiteGrad = ctx.createLinearGradient(0, 0, width, 0);
    whiteGrad.addColorStop(0, "rgba(255,255,255,1)");
    whiteGrad.addColorStop(1, "rgba(255,255,255,0)");
    ctx.fillStyle = whiteGrad;
    ctx.fillRect(0, 0, width, height);

    const blackGrad = ctx.createLinearGradient(0, 0, 0, height);
    blackGrad.addColorStop(0, "rgba(0,0,0,0)");
    blackGrad.addColorStop(1, "rgba(0,0,0,1)");
    ctx.fillStyle = blackGrad;
    ctx.fillRect(0, 0, width, height);
  }, [hsva.h]);

  useEffect(() => {
    draw();
  }, [draw]);

  const updateFromPosition = useCallback(
    (clientX: number, clientY: number) => {
      const container = containerRef.current;
      if (!container) return;
      const rect = container.getBoundingClientRect();
      const x = clamp(clientX - rect.left, 0, rect.width);
      const y = clamp(clientY - rect.top, 0, rect.height);
      const s = (x / rect.width) * 100;
      const v = (1 - y / rect.height) * 100;
      onChange(s, v);
    },
    [onChange]
  );

  useEffect(() => {
    const handleMove = (e: globalThis.MouseEvent) => {
      if (!dragging.current) return;
      e.preventDefault();
      updateFromPosition(e.clientX, e.clientY);
    };
    const handleUp = () => {
      dragging.current = false;
    };
    window.addEventListener("mousemove", handleMove);
    window.addEventListener("mouseup", handleUp);
    return () => {
      window.removeEventListener("mousemove", handleMove);
      window.removeEventListener("mouseup", handleUp);
    };
  }, [updateFromPosition]);

  const handleMouseDown = (e: ReactMouseEvent) => {
    dragging.current = true;
    updateFromPosition(e.clientX, e.clientY);
  };

  const cursorX = `${hsva.s}%`;
  const cursorY = `${100 - hsva.v}%`;

  return (
    <div
      ref={containerRef}
      className="relative w-full aspect-[4/3] rounded-xl overflow-hidden cursor-crosshair shadow-inner"
      onMouseDown={handleMouseDown}
    >
      <canvas
        ref={canvasRef}
        width={400}
        height={300}
        className="w-full h-full block"
      />
      <div
        className="absolute w-5 h-5 rounded-full border-[2.5px] border-white shadow-[0_0_0_1px_rgba(0,0,0,0.15),0_2px_6px_rgba(0,0,0,0.2)] -translate-x-1/2 -translate-y-1/2 pointer-events-none"
        style={{ left: cursorX, top: cursorY }}
      />
    </div>
  );
}

// ---- Hue Slider ----
function HueSlider({
  hue,
  onChange,
}: {
  hue: number;
  onChange: (h: number) => void;
}) {
  const trackRef = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);

  const updateFromPosition = useCallback(
    (clientX: number) => {
      const track = trackRef.current;
      if (!track) return;
      const rect = track.getBoundingClientRect();
      const x = clamp(clientX - rect.left, 0, rect.width);
      onChange((x / rect.width) * 360);
    },
    [onChange]
  );

  useEffect(() => {
    const handleMove = (e: globalThis.MouseEvent) => {
      if (!dragging.current) return;
      e.preventDefault();
      updateFromPosition(e.clientX);
    };
    const handleUp = () => {
      dragging.current = false;
    };
    window.addEventListener("mousemove", handleMove);
    window.addEventListener("mouseup", handleUp);
    return () => {
      window.removeEventListener("mousemove", handleMove);
      window.removeEventListener("mouseup", handleUp);
    };
  }, [updateFromPosition]);

  const handleMouseDown = (e: ReactMouseEvent) => {
    dragging.current = true;
    updateFromPosition(e.clientX);
  };

  return (
    <div
      ref={trackRef}
      className="relative h-4 rounded-full cursor-pointer"
      style={{
        background:
          "linear-gradient(to right, #f00 0%, #ff0 17%, #0f0 33%, #0ff 50%, #00f 67%, #f0f 83%, #f00 100%)",
      }}
      onMouseDown={handleMouseDown}
    >
      <div
        className="absolute top-1/2 w-5 h-5 rounded-full border-[2.5px] border-white shadow-[0_0_0_1px_rgba(0,0,0,0.15),0_2px_4px_rgba(0,0,0,0.2)] -translate-x-1/2 -translate-y-1/2 pointer-events-none"
        style={{
          left: `${(hue / 360) * 100}%`,
          backgroundColor: `hsl(${hue}, 100%, 50%)`,
        }}
      />
    </div>
  );
}

// ---- Alpha Slider ----
function AlphaSlider({
  rgba,
  alpha,
  onChange,
}: {
  rgba: RGBA;
  alpha: number;
  onChange: (a: number) => void;
}) {
  const trackRef = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);

  const updateFromPosition = useCallback(
    (clientX: number) => {
      const track = trackRef.current;
      if (!track) return;
      const rect = track.getBoundingClientRect();
      const x = clamp(clientX - rect.left, 0, rect.width);
      onChange(x / rect.width);
    },
    [onChange]
  );

  useEffect(() => {
    const handleMove = (e: globalThis.MouseEvent) => {
      if (!dragging.current) return;
      e.preventDefault();
      updateFromPosition(e.clientX);
    };
    const handleUp = () => {
      dragging.current = false;
    };
    window.addEventListener("mousemove", handleMove);
    window.addEventListener("mouseup", handleUp);
    return () => {
      window.removeEventListener("mousemove", handleMove);
      window.removeEventListener("mouseup", handleUp);
    };
  }, [updateFromPosition]);

  const handleMouseDown = (e: ReactMouseEvent) => {
    dragging.current = true;
    updateFromPosition(e.clientX);
  };

  const { r, g, b } = rgba;

  return (
    <div
      ref={trackRef}
      className="relative h-4 rounded-full cursor-pointer checker-bg"
      onMouseDown={handleMouseDown}
    >
      <div
        className="absolute inset-0 rounded-full"
        style={{
          background: `linear-gradient(to right, rgba(${r},${g},${b},0), rgba(${r},${g},${b},1))`,
        }}
      />
      <div
        className="absolute top-1/2 w-5 h-5 rounded-full border-[2.5px] border-white shadow-[0_0_0_1px_rgba(0,0,0,0.15),0_2px_4px_rgba(0,0,0,0.2)] -translate-x-1/2 -translate-y-1/2 pointer-events-none"
        style={{
          left: `${alpha * 100}%`,
          backgroundColor: `rgba(${r},${g},${b},${alpha})`,
        }}
      />
    </div>
  );
}

// ---- Value Row ----
function ValueRow({
  label,
  value,
  className,
}: {
  label: string;
  value: string;
  className?: string;
}) {
  return (
    <div
      className={`flex items-center justify-between gap-3 px-3.5 py-2.5 rounded-lg bg-gray-50 border border-gray-100 ${className ?? ""}`}
    >
      <span className="text-[11px] font-semibold uppercase tracking-wider text-gray-400 shrink-0">
        {label}
      </span>
      <div className="flex items-center gap-1.5">
        <code className="text-sm font-mono text-gray-700 select-all">
          {value}
        </code>
        <CopyButton text={value} />
      </div>
    </div>
  );
}

// ---- Preset Colors ----
const PRESET_COLORS = [
  "#ef4444", "#f97316", "#f59e0b", "#eab308", "#84cc16",
  "#22c55e", "#14b8a6", "#06b6d4", "#3b82f6", "#6366f1",
  "#8b5cf6", "#a855f7", "#d946ef", "#ec4899", "#f43f5e",
  "#0a0a0a", "#404040", "#737373", "#a3a3a3", "#ffffff",
];

// ---- Main Component ----
export default function ColorPicker() {
  const [hsva, setHsva] = useState<HSVA>({ h: 250, s: 65, v: 90, a: 1 });
  const [hexInput, setHexInput] = useState("");
  const [hexInputFocused, setHexInputFocused] = useState(false);

  const rgba = hsvaToRgba(hsva);
  const hex = rgbaToHex(rgba);
  const hexNoAlpha = rgbaToHexNoAlpha(rgba);

  const handleSaturationChange = useCallback((s: number, v: number) => {
    setHsva((prev) => ({ ...prev, s, v }));
  }, []);

  const handleHueChange = useCallback((h: number) => {
    setHsva((prev) => ({ ...prev, h }));
  }, []);

  const handleAlphaChange = useCallback((a: number) => {
    setHsva((prev) => ({ ...prev, a: Math.round(a * 100) / 100 }));
  }, []);

  const handleHexSubmit = () => {
    const parsed = hexToRgba(hexInput);
    if (parsed) {
      setHsva(rgbaToHsva(parsed));
    }
    setHexInputFocused(false);
  };

  const handlePresetClick = (color: string) => {
    const parsed = hexToRgba(color);
    if (parsed) {
      setHsva(rgbaToHsva(parsed));
    }
  };

  const handleRgbChange = (channel: "r" | "g" | "b", value: string) => {
    const num = parseInt(value, 10);
    if (isNaN(num)) return;
    const clamped = clamp(num, 0, 255);
    const newRgba = { ...rgba, [channel]: clamped };
    setHsva(rgbaToHsva(newRgba));
  };

  const handleAlphaInputChange = (value: string) => {
    const num = parseFloat(value);
    if (isNaN(num)) return;
    setHsva((prev) => ({ ...prev, a: clamp(num, 0, 1) }));
  };

  const displayHex = hexInputFocused ? hexInput : hex;

  return (
    <div className="w-[380px] bg-white rounded-2xl shadow-[0_8px_40px_rgba(0,0,0,0.08),0_1px_3px_rgba(0,0,0,0.06)] p-5 space-y-5">
      {/* Saturation/Brightness Panel */}
      <SaturationPanel hsva={hsva} onChange={handleSaturationChange} />

      {/* Sliders */}
      <div className="space-y-3 px-0.5">
        <div className="space-y-1.5">
          <label className="text-[11px] font-semibold uppercase tracking-wider text-gray-400">
            Hue
          </label>
          <HueSlider hue={hsva.h} onChange={handleHueChange} />
        </div>
        <div className="space-y-1.5">
          <label className="text-[11px] font-semibold uppercase tracking-wider text-gray-400">
            Alpha
          </label>
          <AlphaSlider
            rgba={rgba}
            alpha={hsva.a}
            onChange={handleAlphaChange}
          />
        </div>
      </div>

      {/* Color Preview + Hex Input */}
      <div className="flex items-stretch gap-3">
        <div className="relative w-14 h-14 rounded-xl overflow-hidden checker-bg shrink-0 shadow-inner border border-gray-100">
          <div
            className="absolute inset-0"
            style={{
              backgroundColor: `rgba(${rgba.r},${rgba.g},${rgba.b},${rgba.a})`,
            }}
          />
        </div>
        <div className="flex-1 space-y-1.5">
          <label className="text-[11px] font-semibold uppercase tracking-wider text-gray-400">
            Hex
          </label>
          <div className="flex items-center gap-1.5">
            <input
              type="text"
              value={displayHex}
              onFocus={() => {
                setHexInput(hex);
                setHexInputFocused(true);
              }}
              onChange={(e) => setHexInput(e.target.value)}
              onBlur={handleHexSubmit}
              onKeyDown={(e) => e.key === "Enter" && handleHexSubmit()}
              className="flex-1 px-3 py-1.5 text-sm font-mono bg-gray-50 border border-gray-200 rounded-lg outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-400 transition-all"
              spellCheck={false}
            />
            <CopyButton text={hex} />
          </div>
        </div>
      </div>

      {/* RGBA Inputs */}
      <div className="space-y-1.5">
        <label className="text-[11px] font-semibold uppercase tracking-wider text-gray-400">
          RGBA
        </label>
        <div className="grid grid-cols-4 gap-2">
          {(["r", "g", "b"] as const).map((ch) => (
            <div key={ch} className="relative">
              <input
                type="number"
                min={0}
                max={255}
                value={rgba[ch]}
                onChange={(e) => handleRgbChange(ch, e.target.value)}
                className="w-full px-2.5 py-2 text-sm font-mono text-center bg-gray-50 border border-gray-200 rounded-lg outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-400 transition-all [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
              />
              <span className="absolute -top-1.5 left-2 text-[9px] font-bold uppercase bg-gray-50 px-1 text-gray-400">
                {ch}
              </span>
            </div>
          ))}
          <div className="relative">
            <input
              type="number"
              min={0}
              max={1}
              step={0.01}
              value={Math.round(hsva.a * 100) / 100}
              onChange={(e) => handleAlphaInputChange(e.target.value)}
              className="w-full px-2.5 py-2 text-sm font-mono text-center bg-gray-50 border border-gray-200 rounded-lg outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-400 transition-all [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
            />
            <span className="absolute -top-1.5 left-2 text-[9px] font-bold uppercase bg-gray-50 px-1 text-gray-400">
              A
            </span>
          </div>
        </div>
      </div>

      {/* Output Values */}
      <div className="space-y-2">
        <ValueRow label="Hex" value={hexNoAlpha} />
        <ValueRow
          label="Hex + A"
          value={hex}
        />
        <ValueRow
          label="RGB"
          value={`rgb(${rgba.r}, ${rgba.g}, ${rgba.b})`}
        />
        <ValueRow
          label="RGBA"
          value={`rgba(${rgba.r}, ${rgba.g}, ${rgba.b}, ${Math.round(hsva.a * 100) / 100})`}
        />
      </div>

      {/* Preset Colors */}
      <div className="space-y-2">
        <label className="text-[11px] font-semibold uppercase tracking-wider text-gray-400">
          Presets
        </label>
        <div className="flex flex-wrap gap-1.5">
          {PRESET_COLORS.map((color) => (
            <button
              key={color}
              onClick={() => handlePresetClick(color)}
              className="w-7 h-7 rounded-lg border border-gray-200 hover:scale-110 transition-transform shadow-sm hover:shadow-md"
              style={{ backgroundColor: color }}
              title={color}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
