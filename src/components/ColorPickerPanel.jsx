import { useState, useRef, useEffect } from 'react'
import { Pipette, RotateCcw } from 'lucide-react'
import { hexToRgb, rgbToHex, rgbToHsl, hslToRgb } from '../utils/colorUtils'

const PRESETS = [
  '#000000', '#434343', '#666666', '#999999', '#b7b7b7', '#cccccc', '#d9d9d9', '#efefef', '#f3f3f3', '#ffffff',
  '#980000', '#ff0000', '#ff9900', '#ffff00', '#00ff00', '#00ffff', '#4a86e8', '#0000ff', '#9900ff', '#ff00ff',
  '#e6b8af', '#f4cccc', '#fce5cd', '#fff2cc', '#d9ead3', '#d0e0e3', '#c9daf8', '#cfe2f3', '#d9d2e9', '#ead1dc',
  '#dd7e6b', '#ea9999', '#f9cb9c', '#ffe599', '#b6d7a8', '#a2c4c9', '#a4c2f4', '#9fc5e8', '#b4a7d6', '#d5a6bd',
  '#cc4125', '#e06666', '#f6b26b', '#ffd966', '#93c47d', '#76a5af', '#6d9eeb', '#6fa8dc', '#8e7cc3', '#c27ba0',
  '#a61c00', '#cc0000', '#e69138', '#f1c232', '#6aa84f', '#45818e', '#3c78d8', '#3d85c6', '#674ea7', '#a64d79',
  '#85200c', '#990000', '#b45f06', '#bf9000', '#38761d', '#134f5c', '#1155cc', '#0b5394', '#351c75', '#741b47',
  '#5b0f00', '#660000', '#783f04', '#7f6000', '#274e13', '#0c343d', '#1c4587', '#073763', '#20124d', '#4c1130',
]

export default function ColorPickerPanel({ color, onChange, showOpacity = false, opacity = 100, onOpacityChange }) {
  const inputRef = useRef(null)
  const { r, g, b } = hexToRgb(color)
  const hsl = rgbToHsl(r, g, b)

  const [hexInput, setHexInput] = useState(color)
  const [rInput, setRInput] = useState(String(r))
  const [gInput, setGInput] = useState(String(g))
  const [bInput, setBInput] = useState(String(b))
  const [hInput, setHInput] = useState(String(hsl.h))
  const [sInput, setSInput] = useState(String(hsl.s))
  const [lInput, setLInput] = useState(String(hsl.l))
  const [activeTab, setActiveTab] = useState('hex')

  useEffect(() => {
    setHexInput(color)
    setRInput(String(r))
    setGInput(String(g))
    setBInput(String(b))
    setHInput(String(hsl.h))
    setSInput(String(hsl.s))
    setLInput(String(hsl.l))
  }, [color])

  const handleHexApply = () => {
    const match = hexInput.match(/^#?([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/)
    if (match) {
      let hex = match[1]
      if (hex.length === 3) hex = hex.split('').map(c => c + c).join('')
      onChange('#' + hex.toLowerCase())
    }
  }

  const handleRgbApply = () => {
    const rv = Math.min(255, Math.max(0, parseInt(rInput) || 0))
    const gv = Math.min(255, Math.max(0, parseInt(gInput) || 0))
    const bv = Math.min(255, Math.max(0, parseInt(bInput) || 0))
    onChange(rgbToHex(rv, gv, bv))
  }

  const handleHslApply = () => {
    const hv = Math.min(360, Math.max(0, parseInt(hInput) || 0))
    const sv = Math.min(100, Math.max(0, parseInt(sInput) || 0))
    const lv = Math.min(100, Math.max(0, parseInt(lInput) || 0))
    const rgb = hslToRgb(hv, sv, lv)
    onChange(rgbToHex(rgb.r, rgb.g, rgb.b))
  }

  const handleNativePicker = () => inputRef.current?.click()

  return (
    <div className="w-[240px] bg-white dark:bg-surface-800 border border-slate-200 dark:border-surface-700 rounded-xl shadow-2xl p-3 select-none">
      <div className="flex items-center gap-2 mb-3">
        <div
          className="w-10 h-10 rounded-lg border-2 border-slate-300 dark:border-surface-500 shadow-inner flex-shrink-0"
          style={{ backgroundColor: color, opacity: showOpacity ? opacity / 100 : 1 }}
        />
        <div className="flex-1 min-w-0">
          <div className="text-[11px] font-semibold text-slate-700 dark:text-slate-200 truncate">{color.toUpperCase()}</div>
          <div className="text-[10px] text-slate-400 dark:text-surface-500">
            RGB({r}, {g}, {b})
          </div>
        </div>
        <button
          type="button"
          onClick={handleNativePicker}
          className="p-1.5 rounded-lg border border-slate-200 dark:border-surface-600 hover:bg-slate-100 dark:hover:bg-surface-700 transition-colors"
          title="System Color Picker"
        >
          <Pipette className="w-3.5 h-3.5 text-slate-500 dark:text-surface-400" />
        </button>
        <input
          ref={inputRef}
          type="color"
          value={color}
          className="absolute w-0 h-0 opacity-0 pointer-events-none"
          onChange={(e) => onChange(e.target.value)}
        />
      </div>

      <div className="grid grid-cols-10 gap-1 mb-3">
        {PRESETS.map(c => (
          <button
            key={c}
            type="button"
            className={`w-5 h-5 rounded border transition-transform hover:scale-125 ${
              color.toLowerCase() === c.toLowerCase()
                ? 'border-primary-500 ring-1 ring-primary-400 scale-110'
                : 'border-slate-200 dark:border-surface-600'
            }`}
            style={{ backgroundColor: c }}
            onClick={() => onChange(c)}
          />
        ))}
      </div>

      <div className="flex gap-0.5 mb-2 border-b border-slate-200 dark:border-surface-600">
        {['hex', 'rgb', 'hsl'].map(tab => (
          <button
            key={tab}
            type="button"
            onClick={() => setActiveTab(tab)}
            className={`flex-1 pb-1.5 text-[10px] font-semibold uppercase tracking-wider transition-colors ${
              activeTab === tab
                ? 'text-primary-600 dark:text-primary-400 border-b-2 border-primary-500'
                : 'text-slate-400 dark:text-surface-500 hover:text-slate-600 dark:hover:text-surface-300'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {activeTab === 'hex' && (
        <div className="flex gap-1.5">
          <input
            type="text"
            value={hexInput}
            onChange={(e) => setHexInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleHexApply()}
            onBlur={handleHexApply}
            className="flex-1 px-2 py-1.5 text-xs font-mono rounded-lg border border-slate-200 dark:border-surface-600 bg-slate-50 dark:bg-surface-900 text-slate-700 dark:text-slate-200 outline-none focus:border-primary-500"
            placeholder="#000000"
          />
          <button
            type="button"
            onClick={handleHexApply}
            className="px-2 py-1.5 text-[10px] font-semibold rounded-lg bg-primary-500 text-white hover:bg-primary-600 transition-colors"
          >
            Set
          </button>
        </div>
      )}

      {activeTab === 'rgb' && (
        <div className="flex gap-1">
          {[
            { label: 'R', val: rInput, set: setRInput, max: 255 },
            { label: 'G', val: gInput, set: setGInput, max: 255 },
            { label: 'B', val: bInput, set: setBInput, max: 255 },
          ].map(({ label, val, set, max }) => (
            <div key={label} className="flex-1">
              <div className="text-[9px] text-slate-400 dark:text-surface-500 mb-0.5 text-center">{label}</div>
              <input
                type="number"
                min="0"
                max={max}
                value={val}
                onChange={(e) => set(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleRgbApply()}
                onBlur={handleRgbApply}
                className="w-full px-1 py-1.5 text-xs font-mono text-center rounded-lg border border-slate-200 dark:border-surface-600 bg-slate-50 dark:bg-surface-900 text-slate-700 dark:text-slate-200 outline-none focus:border-primary-500 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
              />
            </div>
          ))}
          <button
            type="button"
            onClick={handleRgbApply}
            className="self-end px-2 py-1.5 text-[10px] font-semibold rounded-lg bg-primary-500 text-white hover:bg-primary-600 transition-colors"
          >
            Set
          </button>
        </div>
      )}

      {activeTab === 'hsl' && (
        <div className="flex gap-1">
          {[
            { label: 'H', val: hInput, set: setHInput, max: 360 },
            { label: 'S', val: sInput, set: setSInput, max: 100 },
            { label: 'L', val: lInput, set: setLInput, max: 100 },
          ].map(({ label, val, set, max }) => (
            <div key={label} className="flex-1">
              <div className="text-[9px] text-slate-400 dark:text-surface-500 mb-0.5 text-center">{label}</div>
              <input
                type="number"
                min="0"
                max={max}
                value={val}
                onChange={(e) => set(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleHslApply()}
                onBlur={handleHslApply}
                className="w-full px-1 py-1.5 text-xs font-mono text-center rounded-lg border border-slate-200 dark:border-surface-600 bg-slate-50 dark:bg-surface-900 text-slate-700 dark:text-slate-200 outline-none focus:border-primary-500 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
              />
            </div>
          ))}
          <button
            type="button"
            onClick={handleHslApply}
            className="self-end px-2 py-1.5 text-[10px] font-semibold rounded-lg bg-primary-500 text-white hover:bg-primary-600 transition-colors"
          >
            Set
          </button>
        </div>
      )}

      {showOpacity && (
        <div className="mt-3">
          <div className="flex items-center justify-between mb-1">
            <span className="text-[10px] text-slate-500 dark:text-surface-400 font-medium">Opacity</span>
            <span className="text-[10px] font-mono text-slate-600 dark:text-slate-300">{opacity}%</span>
          </div>
          <input
            type="range"
            min="0"
            max="100"
            value={opacity}
            onChange={(e) => onOpacityChange?.(Number(e.target.value))}
            className="w-full h-1.5 rounded-full appearance-none cursor-pointer bg-slate-200 dark:bg-surface-600 accent-primary-500"
          />
        </div>
      )}
    </div>
  )
}
