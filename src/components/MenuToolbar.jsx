import { useState, useRef, useEffect } from 'react'
import {
  FileText, Download, Upload, Copy, Printer, Trash2, Eye, EyeOff,
  Type, Undo2, Redo2, Scissors, Clipboard, Search, Replace,
  Bold, Italic, Underline, Strikethrough,
  List, ListOrdered, AlignLeft, AlignCenter, AlignRight,
  Heading1, Heading2, Heading3
} from 'lucide-react'

function MenuItem({ icon: Icon, label, shortcut, onClick, danger }) {
  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center gap-2 px-3 py-2 text-xs text-left transition-colors ${
        danger
          ? 'text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20'
          : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-surface-700'
      }`}
    >
      {Icon && <Icon className="w-3.5 h-3.5 shrink-0" />}
      <span className="flex-1">{label}</span>
      {shortcut && <span className="text-slate-400 dark:text-surface-500 text-[10px] ml-4">{shortcut}</span>}
    </button>
  )
}

function MenuDivider() {
  return <div className="my-1 border-t border-slate-200 dark:border-surface-700" />
}

function MenuDropdown({ items, onClose }) {
  const ref = useRef(null)
  useEffect(() => {
    const handler = (e) => { if (ref.current && !ref.current.contains(e.target)) onClose() }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [onClose])

  return (
    <div ref={ref} className="absolute top-full left-0 mt-1 w-56 py-1 bg-white dark:bg-surface-800 border border-slate-200 dark:border-surface-700 rounded-lg shadow-xl z-50">
      {items.map((item, i) =>
        item.divider ? <MenuDivider key={i} /> : <MenuItem key={i} {...item} onClick={() => { item.onClick(); onClose() }} />
      )}
    </div>
  )
}

export default function MenuToolbar({ activeTab, setActiveTab, onNewFile, onOpenFile, onSaveHtml, onCopyHtml, onPrint, onClearAll, onUndo, onRedo, onFindReplace, wordEditorRef }) {
  const [openMenu, setOpenMenu] = useState(null)

  const menus = {
    File: [
      { icon: FileText, label: 'New Document', shortcut: 'Ctrl+N', onClick: onClearAll },
      { icon: Upload, label: 'Open HTML File...', shortcut: 'Ctrl+O', onClick: onOpenFile },
      { divider: true },
      { icon: Download, label: 'Save as HTML', shortcut: 'Ctrl+S', onClick: onSaveHtml },
      { icon: Download, label: 'Save as Text', onClick: () => { const el = wordEditorRef?.current; if (el) { const text = el.innerText; const blob = new Blob([text], { type: 'text/plain' }); const url = URL.createObjectURL(blob); const a = document.createElement('a'); a.href = url; a.download = 'document.txt'; a.click(); URL.revokeObjectURL(url) } } },
      { divider: true },
      { icon: Copy, label: 'Copy HTML', shortcut: 'Ctrl+Shift+C', onClick: onCopyHtml },
      { divider: true },
      { icon: Printer, label: 'Print...', shortcut: 'Ctrl+P', onClick: onPrint },
    ],
    Edit: [
      { icon: Undo2, label: 'Undo', shortcut: 'Ctrl+Z', onClick: onUndo },
      { icon: Redo2, label: 'Redo', shortcut: 'Ctrl+Y', onClick: onRedo },
      { divider: true },
      { icon: Scissors, label: 'Cut', shortcut: 'Ctrl+X', onClick: () => document.execCommand('cut') },
      { icon: Clipboard, label: 'Copy', shortcut: 'Ctrl+C', onClick: () => document.execCommand('copy') },
      { icon: Clipboard, label: 'Paste', shortcut: 'Ctrl+V', onClick: () => document.execCommand('paste') },
      { divider: true },
      { icon: Search, label: 'Find & Replace...', shortcut: 'Ctrl+H', onClick: onFindReplace },
      { divider: true },
      { icon: Type, label: 'Select All', shortcut: 'Ctrl+A', onClick: () => document.execCommand('selectAll') },
    ],
    View: [
      { icon: Type, label: 'Word Editor', onClick: () => setActiveTab('editor') },
      { icon: FileText, label: 'HTML Code', onClick: () => setActiveTab('html') },
    ],
    Tools: [
      { icon: List, label: 'Insert Bullet List', shortcut: 'Ctrl+Shift+L', onClick: () => document.execCommand('insertUnorderedList') },
      { icon: ListOrdered, label: 'Insert Numbered List', shortcut: 'Ctrl+Shift+O', onClick: () => document.execCommand('insertOrderedList') },
      { divider: true },
      { icon: Heading1, label: 'Heading 1', onClick: () => document.execCommand('formatBlock', false, 'h1') },
      { icon: Heading2, label: 'Heading 2', onClick: () => document.execCommand('formatBlock', false, 'h2') },
      { icon: Heading3, label: 'Heading 3', onClick: () => document.execCommand('formatBlock', false, 'h3') },
      { divider: true },
      { icon: Bold, label: 'Bold', shortcut: 'Ctrl+B', onClick: () => document.execCommand('bold') },
      { icon: Italic, label: 'Italic', shortcut: 'Ctrl+I', onClick: () => document.execCommand('italic') },
      { icon: Underline, label: 'Underline', shortcut: 'Ctrl+U', onClick: () => document.execCommand('underline') },
      { icon: Strikethrough, label: 'Strikethrough', onClick: () => document.execCommand('strikeThrough') },
      { divider: true },
      { icon: AlignLeft, label: 'Align Left', onClick: () => document.execCommand('justifyLeft') },
      { icon: AlignCenter, label: 'Align Center', onClick: () => document.execCommand('justifyCenter') },
      { icon: AlignRight, label: 'Align Right', onClick: () => document.execCommand('justifyRight') },
    ]
  }

  return (
    <div className="flex items-center gap-0 px-2 py-0.5 bg-slate-100 dark:bg-surface-800 border-b border-slate-200 dark:border-surface-700 select-none relative">
      {Object.entries(menus).map(([name, items]) => (
        <div key={name} className="relative">
          <button
            onClick={() => setOpenMenu(openMenu === name ? null : name)}
            onMouseEnter={() => openMenu && setOpenMenu(name)}
            className={`px-3 py-1.5 text-xs font-medium rounded transition-colors ${
              openMenu === name
                ? 'bg-slate-200 dark:bg-surface-700 text-slate-900 dark:text-white'
                : 'text-slate-600 dark:text-surface-400 hover:bg-slate-200 dark:hover:bg-surface-700 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            {name}
          </button>
          {openMenu === name && <MenuDropdown items={items} onClose={() => setOpenMenu(null)} />}
        </div>
      ))}
    </div>
  )
}
