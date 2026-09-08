import {
  Bold, Italic, Underline, Strikethrough,
  AlignLeft, AlignCenter, AlignRight, AlignJustify,
  List, ListOrdered, Link2, Image, Table, Code, Quote,
  Heading1, Heading2, Heading3, Minus, Upload,
  Undo2, Redo2
} from 'lucide-react'
import { useRef, useEffect, useState } from 'react'
import ColorPickerPanel from './ColorPickerPanel'

const ToolButton = ({ onClick, title, children, active }) => (
  <div className="tooltip-wrapper">
    <button
      type="button"
      onClick={onClick}
      className={`toolbar-btn ${active ? 'active' : ''}`}
    >
      {children}
    </button>
    <span className="tooltip-text">{title}</span>
  </div>
)

const Divider = () => <div className="toolbar-divider" />

export default function EditorToolbar({ editorRef }) {
  const savedRangeRef = useRef(null)
  const imageInputRef = useRef(null)
  const [selColor, setSelColor] = useState('#0f172a')
  const [selBg, setSelBg] = useState('#ffff00')
  const [bgOpacity, setBgOpacity] = useState(100)

  const rgbToHex = (rgb) => {
    if (!rgb || typeof rgb !== 'string') return null
    if (rgb.startsWith('#')) return rgb.length === 4 ? '#' + rgb.slice(1).split('').map((c) => c + c).join('') : rgb
    const m = rgb.match(/rgba?\(\s*(\d+)[,\s]+(\d+)[,\s]+(\d+)/i)
    if (m) return '#' + [m[1], m[2], m[3]].map((n) => (+n).toString(16).padStart(2, '0')).join('')
    return null
  }

  useEffect(() => {
    const save = () => {
      const el = editorRef?.current
      if (!el) return
      const sel = window.getSelection()
      if (sel && sel.rangeCount > 0) {
        const range = sel.getRangeAt(0)
        if (el.contains(range.commonAncestorContainer) && !sel.isCollapsed) {
          savedRangeRef.current = range.cloneRange()
          try {
            const fg = document.queryCommandValue('foreColor')
            const fgHex = rgbToHex(fg)
            if (fgHex) setSelColor(fgHex)
          } catch (e) {}
          try {
            const bg = document.queryCommandValue('hiliteColor')
            const bgHex = rgbToHex(bg)
            if (bgHex) setSelBg(bgHex)
          } catch (e) {}
        }
      }
    }
    document.addEventListener('selectionchange', save)
    return () => document.removeEventListener('selectionchange', save)
  }, [editorRef])

  const exec = (cmd, val = null) => {
    document.execCommand(cmd, false, val)
    editorRef?.current?.focus()
  }

  const formatBlock = (tag) => {
    document.execCommand('formatBlock', false, tag)
    editorRef?.current?.focus()
  }

  const [modal, setModal] = useState(null)
  const [modalValues, setModalValues] = useState({})
  const [colorPanel, setColorPanel] = useState(null)
  const colorPanelRef = useRef(null)

  useEffect(() => {
    if (!colorPanel) return
    const handleClickOutside = (e) => {
      if (colorPanelRef.current && !colorPanelRef.current.contains(e.target)) {
        setColorPanel(null)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [colorPanel])

  const openModal = (type, initial = {}) => {
    setModalValues(initial)
    setModal(type)
  }

  const closeModal = () => setModal(null)

  const createLink = () => openModal('link', { url: '' })

  const insertImage = () => openModal('image', { url: '', size: 'm' })

  const insertTable = () => openModal('table', { rows: '3', cols: '3', size: 'n' })

  const buildTableHtml = (rows, cols, size) => {
    const sizes = {
      s: { width: '60px', height: '20px', padding: '2px 4px', fontSize: '12px' },
      n: { width: '120px', height: '28px', padding: '6px 8px', fontSize: '14px' },
      l: { width: '180px', height: '40px', padding: '10px 12px', fontSize: '16px' }
    }
    const cfg = sizes[size] || sizes.n
    const cellStyle = `width:${cfg.width};height:${cfg.height};padding:${cfg.padding};font-size:${cfg.fontSize};`
    let table = '<table border="1" cellspacing="0" cellpadding="0" style="border-collapse:collapse;">'
    for (let r = 0; r < rows; r++) {
      table += '<tr>'
      for (let c = 0; c < cols; c++) {
        table += r === 0 ? `<th style="${cellStyle}">&nbsp;</th>` : `<td style="${cellStyle}">&nbsp;</td>`
      }
      table += '</tr>'
    }
    table += '</tbody></table><p><br></p>'
    return table
  }

  const buildImageHtml = (src, size) => {
    const sizes = { s: '120', m: '300', l: '600' }
    const w = sizes[size]
    return w
      ? `<img src="${src}" width="${w}" style="max-width:100%;height:auto;">`
      : `<img src="${src}" style="max-width:100%;height:auto;">`
  }

  const submitModal = () => {
    const type = modal
    restoreSelection()
    if (type === 'link') {
      const url = (modalValues.url || '').trim()
      if (url) document.execCommand('createLink', false, url)
    } else if (type === 'image') {
      const url = (modalValues.url || '').trim()
      if (url) document.execCommand('insertHTML', false, buildImageHtml(url, modalValues.size))
    } else if (type === 'table') {
      const rows = Math.min(Math.max(parseInt(modalValues.rows, 10) || 3, 1), 10)
      const cols = Math.min(Math.max(parseInt(modalValues.cols, 10) || 3, 1), 10)
      const size = (modalValues.size || 'n').charAt(0).toLowerCase()
      document.execCommand('insertHTML', false, buildTableHtml(rows, cols, size))
    }
    editorRef?.current?.focus()
    closeModal()
  }

  const restoreSelection = () => {
    const el = editorRef?.current
    if (el) el.focus()
    if (savedRangeRef.current) {
      const sel = window.getSelection()
      if (sel) {
        sel.removeAllRanges()
        sel.addRange(savedRangeRef.current)
      }
    }
  }

  const handleImageUpload = (e) => {
    const file = e.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = () => {
      restoreSelection()
      document.execCommand('insertHTML', false, buildImageHtml(reader.result, modalValues.size))
      editorRef?.current?.focus()
      closeModal()
    }
    reader.readAsDataURL(file)
    e.target.value = ''
  }

  const applyColorCommand = (cmd, color) => {
    restoreSelection()
    document.execCommand('styleWithCSS', false, true)
    document.execCommand(cmd, false, color)
    document.execCommand('styleWithCSS', false, false)
    editorRef?.current?.focus()
  }

  const hexToRgba = (hex, opacity) => {
    const h = hex.replace('#', '')
    const r = parseInt(h.substring(0, 2), 16)
    const g = parseInt(h.substring(2, 4), 16)
    const b = parseInt(h.substring(4, 6), 16)
    return `rgba(${r},${g},${b},${opacity / 100})`
  }

  const setColor = (color) => applyColorCommand('foreColor', color)

  const setHighlight = (color, opacity) => {
    if (opacity !== undefined && opacity < 100) {
      applyColorCommand('hiliteColor', hexToRgba(color, opacity))
    } else {
      applyColorCommand('hiliteColor', color)
    }
  }

  const saveSelectionNow = () => {
    const el = editorRef?.current
    if (!el) return
    const sel = window.getSelection()
    if (sel && sel.rangeCount > 0) {
      const range = sel.getRangeAt(0)
      if (el.contains(range.commonAncestorContainer) && !sel.isCollapsed) {
        savedRangeRef.current = range.cloneRange()
      }
    }
  }

  const openColorPanel = (type) => {
    saveSelectionNow()
    setColorPanel(prev => prev === type ? null : type)
  }

  const handleFontFamily = (e) => {
    document.execCommand('fontName', false, e.target.value)
    editorRef?.current?.focus()
  }

  const handleFontSize = (e) => {
    document.execCommand('fontSize', false, e.target.value)
    editorRef?.current?.focus()
  }

  return (
    <div className="flex flex-wrap items-center gap-0.5 px-3 py-2 border-b border-slate-200 dark:border-surface-700 bg-slate-50 dark:bg-surface-900/50">
      <ToolButton onClick={() => exec('undo')} title="Undo">
        <Undo2 className="w-4 h-4" />
      </ToolButton>
      <ToolButton onClick={() => exec('redo')} title="Redo">
        <Redo2 className="w-4 h-4" />
      </ToolButton>

      <Divider />

      <ToolButton onClick={() => exec('bold')} title="Bold">
        <Bold className="w-4 h-4" />
      </ToolButton>
      <ToolButton onClick={() => exec('italic')} title="Italic">
        <Italic className="w-4 h-4" />
      </ToolButton>
      <ToolButton onClick={() => exec('underline')} title="Underline">
        <Underline className="w-4 h-4" />
      </ToolButton>
      <ToolButton onClick={() => exec('strikeThrough')} title="Strikethrough">
        <Strikethrough className="w-4 h-4" />
      </ToolButton>

      <Divider />

      <div className="tooltip-wrapper">
        <select
          onChange={handleFontFamily}
          className="h-8 px-1 text-xs rounded border border-slate-200 dark:border-surface-600 bg-white dark:bg-surface-800 text-slate-700 dark:text-slate-300 outline-none cursor-pointer"
          defaultValue=""
        >
          <option value="" disabled>Font</option>
          <option value="Arial">Arial</option>
          <option value="Helvetica">Helvetica</option>
          <option value="Times New Roman">Times New Roman</option>
          <option value="Georgia">Georgia</option>
          <option value="Verdana">Verdana</option>
          <option value="Courier New">Courier New</option>
          <option value="Trebuchet MS">Trebuchet MS</option>
        </select>
      </div>

      <div className="tooltip-wrapper">
        <select
          onChange={handleFontSize}
          className="h-8 px-1 text-xs rounded border border-slate-200 dark:border-surface-600 bg-white dark:bg-surface-800 text-slate-700 dark:text-slate-300 outline-none cursor-pointer"
          defaultValue=""
        >
          <option value="" disabled>Size</option>
          <option value="1">Small</option>
          <option value="3">Normal</option>
          <option value="5">Large</option>
          <option value="7">Huge</option>
        </select>
      </div>

      <Divider />

      <ToolButton onClick={() => formatBlock('h1')} title="Heading 1">
        <Heading1 className="w-4 h-4" />
      </ToolButton>
      <ToolButton onClick={() => formatBlock('h2')} title="Heading 2">
        <Heading2 className="w-4 h-4" />
      </ToolButton>
      <ToolButton onClick={() => formatBlock('h3')} title="Heading 3">
        <Heading3 className="w-4 h-4" />
      </ToolButton>
      <ToolButton onClick={() => formatBlock('p')} title="Paragraph">
        <span className="text-xs font-semibold">P</span>
      </ToolButton>

      <Divider />

<div className="flex items-center gap-0.5">
        <div className="relative">
          <div className="tooltip-wrapper">
            <button
              type="button"
              className={`toolbar-btn ${colorPanel === 'text' ? 'active' : ''}`}
              title="Text Color"
              onMouseDown={(e) => e.preventDefault()}
              onClick={() => openColorPanel('text')}
            >
              <span className="text-xs font-bold text-slate-700 dark:text-slate-300">A</span>
              <span className="w-3 h-1.5 rounded-sm border border-slate-300 dark:border-surface-600" style={{ backgroundColor: selColor }} />
            </button>
            <span className="tooltip-text">Text Color</span>
          </div>

          {colorPanel === 'text' && (
            <div ref={colorPanelRef} className="absolute top-full left-0 mt-1 z-[60]"
              onMouseDown={(e) => { e.preventDefault(); e.stopPropagation() }}>
              <ColorPickerPanel
                color={selColor}
                onChange={(c) => { setSelColor(c); setColor(c) }}
              />
            </div>
          )}
        </div>

        <div className="relative">
          <div className="tooltip-wrapper">
            <button
              type="button"
              className={`toolbar-btn ${colorPanel === 'bg' ? 'active' : ''}`}
              title="Highlight / Background"
              onMouseDown={(e) => e.preventDefault()}
              onClick={() => openColorPanel('bg')}
            >
              <span className="w-4 h-3 rounded-sm inline-block border border-slate-300 dark:border-surface-600" style={{ backgroundColor: selBg }} />
            </button>
            <span className="tooltip-text">Highlight / Background</span>
          </div>

          {colorPanel === 'bg' && (
            <div ref={colorPanelRef} className="absolute top-full left-0 mt-1 z-[60]"
              onMouseDown={(e) => { e.preventDefault(); e.stopPropagation() }}>
              <ColorPickerPanel
                color={selBg}
                onChange={(c) => { setSelBg(c); setHighlight(c, bgOpacity) }}
                showOpacity
                opacity={bgOpacity}
                onOpacityChange={setBgOpacity}
              />
            </div>
          )}
        </div>
      </div>

      <Divider />

      <ToolButton onClick={() => exec('justifyLeft')} title="Align Left">
        <AlignLeft className="w-4 h-4" />
      </ToolButton>
      <ToolButton onClick={() => exec('justifyCenter')} title="Align Center">
        <AlignCenter className="w-4 h-4" />
      </ToolButton>
      <ToolButton onClick={() => exec('justifyRight')} title="Align Right">
        <AlignRight className="w-4 h-4" />
      </ToolButton>
      <ToolButton onClick={() => exec('justifyFull')} title="Justify">
        <AlignJustify className="w-4 h-4" />
      </ToolButton>

      <Divider />

      <ToolButton onClick={() => exec('insertUnorderedList')} title="Bullet List">
        <List className="w-4 h-4" />
      </ToolButton>
      <ToolButton onClick={() => exec('insertOrderedList')} title="Numbered List">
        <ListOrdered className="w-4 h-4" />
      </ToolButton>

      <Divider />

      <ToolButton onClick={createLink} title="Insert Link">
        <Link2 className="w-4 h-4" />
</ToolButton>
      <ToolButton onClick={insertImage} title="Insert Image">
        <Image className="w-4 h-4" />
      </ToolButton>
      <ToolButton onClick={insertTable} title="Insert Table">
        <Table className="w-4 h-4" />
      </ToolButton>
      <ToolButton onClick={() => formatBlock('pre')} title="Code Block">
        <Code className="w-4 h-4" />
      </ToolButton>
      <ToolButton onClick={() => formatBlock('blockquote')} title="Blockquote">
        <Quote className="w-4 h-4" />
      </ToolButton>
<ToolButton onClick={() => exec('insertHorizontalRule')} title="Horizontal Line">
        <Minus className="w-4 h-4" />
      </ToolButton>

      {/* Link Modal */}
      {modal === 'link' && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm" onMouseDown={(e) => { if (e.target === e.currentTarget) closeModal() }}>
          <div className="w-full max-w-sm bg-white dark:bg-surface-800 rounded-2xl border border-slate-200 dark:border-surface-700 shadow-2xl p-5">
            <h3 className="text-base font-semibold text-slate-900 dark:text-white mb-4">Insert Link</h3>
            <input
              type="url"
              autoFocus
              placeholder="https://example.com"
              value={modalValues.url || ''}
              onChange={(e) => setModalValues({ ...modalValues, url: e.target.value })}
              onKeyDown={(e) => e.key === 'Enter' && submitModal()}
              className="w-full px-3 py-2 text-sm rounded-lg border border-slate-200 dark:border-surface-600 bg-white dark:bg-surface-800 text-slate-700 dark:text-slate-200 outline-none focus:border-primary-500"
            />
            <div className="flex justify-end gap-2 mt-5">
              <button type="button" onClick={closeModal} className="px-3 py-1.5 text-xs font-medium rounded-lg border border-slate-200 dark:border-surface-600 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-surface-700 transition-colors">Cancel</button>
              <button type="button" onClick={submitModal} className="px-3 py-1.5 text-xs font-medium rounded-lg bg-primary-500 text-white hover:bg-primary-600 transition-colors">Insert</button>
            </div>
          </div>
        </div>
      )}

      {/* Image Modal */}
      {modal === 'image' && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm" onMouseDown={(e) => { if (e.target === e.currentTarget) closeModal() }}>
          <div className="w-full max-w-sm bg-white dark:bg-surface-800 rounded-2xl border border-slate-200 dark:border-surface-700 shadow-2xl p-5">
            <h3 className="text-base font-semibold text-slate-900 dark:text-white mb-4">Insert Image</h3>
            <label className="block text-xs text-slate-500 dark:text-surface-400 mb-1.5">Image URL</label>
            <input
              type="url"
              autoFocus
              placeholder="https://example.com/image.png"
              value={modalValues.url || ''}
              onChange={(e) => setModalValues({ ...modalValues, url: e.target.value })}
              onKeyDown={(e) => e.key === 'Enter' && submitModal()}
              className="w-full px-3 py-2 text-sm rounded-lg border border-slate-200 dark:border-surface-600 bg-white dark:bg-surface-800 text-slate-700 dark:text-slate-200 outline-none focus:border-primary-500"
            />
            <div className="flex items-center gap-2 mt-4">
              <div className="flex-1 border-t border-slate-200 dark:border-surface-600" />
              <span className="text-[11px] text-slate-400 dark:text-surface-500">or</span>
              <div className="flex-1 border-t border-slate-200 dark:border-surface-600" />
            </div>
            <button
              type="button"
              onClick={() => imageInputRef.current?.click()}
              className="mt-2 w-full inline-flex items-center justify-center gap-2 px-3 py-2 text-xs font-medium rounded-lg border border-dashed border-slate-300 dark:border-surface-600 text-slate-600 dark:text-slate-300 hover:border-primary-500 hover:text-primary-600 hover:bg-primary-50 dark:hover:bg-primary-900/20 transition-colors"
            >
              <Upload className="w-4 h-4" />
              Upload Image From Device
            </button>
            <input ref={imageInputRef} type="file" accept="image/*" className="hidden" onChange={handleImageUpload} />
            <label className="block text-xs text-slate-500 dark:text-surface-400 mt-4 mb-1.5">Size</label>
            <select
              value={modalValues.size || 'm'}
              onChange={(e) => setModalValues({ ...modalValues, size: e.target.value })}
              className="w-full px-3 py-2 text-sm rounded-lg border border-slate-200 dark:border-surface-600 bg-white dark:bg-surface-800 text-slate-700 dark:text-slate-200 outline-none cursor-pointer focus:border-primary-500"
            >
              <option value="s">Small (120px)</option>
              <option value="m">Medium (300px)</option>
              <option value="l">Large (600px)</option>
              <option value="o">Original</option>
            </select>
            <div className="flex justify-end gap-2 mt-5">
              <button type="button" onClick={closeModal} className="px-3 py-1.5 text-xs font-medium rounded-lg border border-slate-200 dark:border-surface-600 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-surface-700 transition-colors">Cancel</button>
              <button type="button" onClick={submitModal} className="px-3 py-1.5 text-xs font-medium rounded-lg bg-primary-500 text-white hover:bg-primary-600 transition-colors">Insert</button>
            </div>
          </div>
        </div>
      )}

      {/* Table Modal */}
      {modal === 'table' && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm" onMouseDown={(e) => { if (e.target === e.currentTarget) closeModal() }}>
          <div className="w-full max-w-sm bg-white dark:bg-surface-800 rounded-2xl border border-slate-200 dark:border-surface-700 shadow-2xl p-5">
            <h3 className="text-base font-semibold text-slate-900 dark:text-white mb-4">Insert Table</h3>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs text-slate-500 dark:text-surface-400 mb-1.5">Rows</label>
                <input
                  type="number"
                  min="1"
                  max="10"
                  autoFocus
                  value={modalValues.rows || ''}
                  onChange={(e) => setModalValues({ ...modalValues, rows: e.target.value })}
                  className="w-full px-3 py-2 text-sm rounded-lg border border-slate-200 dark:border-surface-600 bg-white dark:bg-surface-800 text-slate-700 dark:text-slate-200 outline-none focus:border-primary-500"
                />
              </div>
              <div>
                <label className="block text-xs text-slate-500 dark:text-surface-400 mb-1.5">Columns</label>
                <input
                  type="number"
                  min="1"
                  max="10"
                  value={modalValues.cols || ''}
                  onChange={(e) => setModalValues({ ...modalValues, cols: e.target.value })}
                  className="w-full px-3 py-2 text-sm rounded-lg border border-slate-200 dark:border-surface-600 bg-white dark:bg-surface-800 text-slate-700 dark:text-slate-200 outline-none focus:border-primary-500"
                />
              </div>
            </div>
            <label className="block text-xs text-slate-500 dark:text-surface-400 mt-4 mb-1.5">Cell Size</label>
            <select
              value={modalValues.size || 'n'}
              onChange={(e) => setModalValues({ ...modalValues, size: e.target.value })}
              className="w-full px-3 py-2 text-sm rounded-lg border border-slate-200 dark:border-surface-600 bg-white dark:bg-surface-800 text-slate-700 dark:text-slate-200 outline-none cursor-pointer focus:border-primary-500"
            >
              <option value="s">Small</option>
              <option value="n">Normal</option>
              <option value="l">Large</option>
            </select>
            <div className="flex justify-end gap-2 mt-5">
              <button type="button" onClick={closeModal} className="px-3 py-1.5 text-xs font-medium rounded-lg border border-slate-200 dark:border-surface-600 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-surface-700 transition-colors">Cancel</button>
              <button type="button" onClick={submitModal} className="px-3 py-1.5 text-xs font-medium rounded-lg bg-primary-500 text-white hover:bg-primary-600 transition-colors">Insert</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
