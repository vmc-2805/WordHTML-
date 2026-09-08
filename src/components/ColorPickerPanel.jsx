import { useState, useRef, useEffect } from 'react'
import { Pipette } from 'lucide-react'
import { hexToRgb, rgbToHex, rgbToHsl, hslToRgb, parseColorInput } from '../utils/colorUtils'

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
  const [activeTab, setActiveTab] = useState('hex')
  const [preview, setPreview] = useState(color)
  const [msg, setMsg] = useState('')
  const msgTimer = useRef(null)

  const [hexInput, setHexInput] = useState(color)
  const [rInput, setRInput] = useState('')
  const [gInput, setGInput] = useState('')
  const [bInput, setBInput] = useState('')
  const [hInput, setHInput] = useState('')
  const [sInput, setSInput] = useState('')
  const [lInput, setLInput] = useState('')

  const syncFromHex = (hex) => {
    const { r, g, b } = hexToRgb(hex)
    setRInput(String(r))
    setGInput(String(g))
    setBInput(String(b))
    const hsl = rgbToHsl(r, g, b)
    setHInput(String(hsl.h))
    setSInput(String(hsl.s))
    setLInput(String(hsl.l))
  }

  useEffect(() => {
    setPreview(color)
    setHexInput(color)
    syncFromHex(color)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const flash = (text) => {
    setMsg(text)
    clearTimeout(msgTimer.current)
    msgTimer.current = setTimeout(() => setMsg(''), 1200)
  }

  const applyHex = () => {
    const h = parseColorInput(hexInput)
    if (!h) {
      setHexInput(color)
      flash('Invalid HEX')
      return
    }
    setHexInput(h)
    syncFromHex(h)
    setPreview(h)
    onChange(h)
    flash('Applied')
  }

  const applyRgb = (fromLive = false, current = null) => {
    const r = current?.r ?? rInput
    const g = current?.g ?? gInput
    const b = current?.b ?? bInput
    const rv = Math.min(255, Math.max(0, parseInt(r) || 0))
    const gv = Math.min(255, Math.max(0, parseInt(g) || 0))
    const bv = Math.min(255, Math.max(0, parseInt(b) || 0))
    const h = rgbToHex(rv, gv, bv)
    if (fromLive) {
      updateLive(h)
      return
    }
    setRInput(String(rv))
    setGInput(String(gv))
    setBInput(String(bv))
    setHexInput(h)
    syncFromHex(h)
    setPreview(h)
    onChange(h)
    flash('Applied')
  }

  const applyHsl = (fromLive = false, current = null) => {
    const hh = current?.h ?? hInput
    const ss = current?.s ?? sInput
    const ll = current?.l ?? lInput
    const hv = Math.min(360, Math.max(0, parseInt(hh) || 0))
    const sv = Math.min(100, Math.max(0, parseInt(ss) || 0))
    const lv = Math.min(100, Math.max(0, parseInt(ll) || 0))
    const rgb = hslToRgb(hv, sv, lv)
    const h = rgbToHex(rgb.r, rgb.g, rgb.b)
    if (fromLive) {
      updateLive(h)
      return
    }
    setHInput(String(hv))
    setSInput(String(sv))
    setLInput(String(lv))
    setHexInput(h)
    syncFromHex(h)
    setPreview(h)
    onChange(h)
    flash('Applied')
  }

  const updateLive = (h) => {
    setPreview(h)
    setHexInput(h)
  }

  const applyPreset = (c) => {
    setPreview(c)
    setHexInput(c)
    syncFromHex(c)
    onChange(c)
  }

  const handleNativePicker = (e) => {
    if (inputRef.current) {
      inputRef.current.value = color
      inputRef.current.click()
    }
  }

  const { r, g, b } = hexToRgb(preview)

  return (
    <div className="w-[240px] bg-white dark:bg-surface-800 border border-slate-200 dark:border-surface-700 rounded-xl shadow-2xl p-3 select-none">
      <div className="flex items-center gap-2 mb-3">
        <div
          className="w-10 h-10 rounded-lg border-2 border-slate-300 dark:border-surface-500 shadow-inner flex-shrink-0"
          style={{ backgroundColor: preview, opacity: showOpacity ? opacity / 100 : 1 }}
        />
        <div className="flex-1 min-w-0">
          <div className="text-[11px] font-semibold text-slate-700 dark:text-slate-200 truncate">{preview.toUpperCase()}</div>
          <div className="text-[10px] text-slate-400 dark:text-surface-500">RGB({r}, {g}, {b})</div>
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
          value={preview}
          className="absolute w-0 h-0 opacity-0 pointer-events-none"
          onChange={(e) => applyPreset(e.target.value)}
        />
      </div>

      <div className="grid grid-cols-10 gap-1 mb-3">
        {PRESETS.map(c => (
          <button
            key={c}
            type="button"
            className={`w-5 h-5 rounded border transition-transform hover:scale-125 ${
              preview.toLowerCase() === c.toLowerCase()
                ? 'border-primary-500 ring-1 ring-primary-400 scale-110'
                : 'border-slate-200 dark:border-surface-600'
            }`}
            style={{ backgroundColor: c }}
            onClick={() => applyPreset(c)}
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
            onChange={(e) => {
              const v = e.target.value
              setHexInput(v)
              const parsed = parseColorInput(v)
              if (parsed) updateLive(parsed)
            }}
            onKeyDown={(e) => e.key === 'Enter' && applyHex()}
            className="flex-1 px-2 py-1.5 text-xs font-mono rounded-lg border border-slate-200 dark:border-surface-600 bg-slate-50 dark:bg-surface-900 text-slate-700 dark:text-slate-200 outline-none focus:border-primary-500"
            placeholder="#000000"
          />
          <button
            type="button"
            onClick={applyHex}
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
                type="text"
                inputMode="numeric"
                pattern="[0-9]*"
                value={val}
                onChange={(e) => {
                  const v = e.target.value
                  set(v)
                  applyRgb(true, { ...(label === 'R' ? { r: v } : {}), ...(label === 'G' ? { g: v } : {}), ...(label === 'B' ? { b: v } : {}) })
                }}
                onKeyDown={(e) => e.key === 'Enter' && applyRgb()}
                className="w-full px-1 py-1.5 text-xs font-mono text-center rounded-lg border border-slate-200 dark:border-surface-600 bg-slate-50 dark:bg-surface-900 text-slate-700 dark:text-slate-200 outline-none focus:border-primary-500"
              />
            </div>
          ))}
          <button
            type="button"
            onClick={applyRgb}
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
                type="text"
                inputMode="numeric"
                pattern="[0-9]*"
                value={val}
                onChange={(e) => {
                  const v = e.target.value
                  set(v)
                  applyHsl(true, { ...(label === 'H' ? { h: v } : {}), ...(label === 'S' ? { s: v } : {}), ...(label === 'L' ? { l: v } : {}) })
                }}
                onKeyDown={(e) => e.key === 'Enter' && applyHsl()}
                className="w-full px-1 py-1.5 text-xs font-mono text-center rounded-lg border border-slate-200 dark:border-surface-600 bg-slate-50 dark:bg-surface-900 text-slate-700 dark:text-slate-200 outline-none focus:border-primary-500"
              />
            </div>
          ))}
          <button
            type="button"
            onClick={applyHsl}
            className="self-end px-2 py-1.5 text-[10px] font-semibold rounded-lg bg-primary-500 text-white hover:bg-primary-600 transition-colors"
          >
            Set
          </button>
        </div>
      )}

      <div className="mt-2 h-3 flex items-center">
        {msg && (
          <span className="text-[10px] font-medium text-primary-600 dark:text-primary-400">{msg}</span>
        )}
      </div>

      {showOpacity && (
        <div className="mt-1">
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
