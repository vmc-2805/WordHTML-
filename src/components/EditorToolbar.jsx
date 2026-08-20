import {
  Bold, Italic, Underline, Strikethrough,
  AlignLeft, AlignCenter, AlignRight, AlignJustify,
  List, ListOrdered, Link2, Image, Code, Quote,
  Heading1, Heading2, Heading3, Minus,
  Undo2, Redo2
} from 'lucide-react'

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
  const exec = (cmd, val = null) => {
    document.execCommand(cmd, false, val)
    editorRef?.current?.focus()
  }

  const formatBlock = (tag) => {
    document.execCommand('formatBlock', false, tag)
    editorRef?.current?.focus()
  }

  const createLink = () => {
    const url = prompt('Enter URL:')
    if (url) {
      document.execCommand('createLink', false, url)
      editorRef?.current?.focus()
    }
  }

  const insertImage = () => {
    const url = prompt('Enter image URL:')
    if (url) {
      document.execCommand('insertImage', false, url)
      editorRef?.current?.focus()
    }
  }

  const setColor = (color) => {
    document.execCommand('foreColor', false, color)
    editorRef?.current?.focus()
  }

  const setHighlight = (color) => {
    document.execCommand('hiliteColor', false, color)
    editorRef?.current?.focus()
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

      <div className="tooltip-wrapper">
        <label className="toolbar-btn" title="Text Color">
          <span className="text-xs font-bold">A</span>
          <input
            type="color"
            className="absolute w-0 h-0 opacity-0"
            onChange={(e) => setColor(e.target.value)}
          />
        </label>
      </div>
      <div className="tooltip-wrapper">
        <label className="toolbar-btn" title="Highlight">
          <span className="w-4 h-3 bg-yellow-300 rounded-sm inline-block" />
          <input
            type="color"
            className="absolute w-0 h-0 opacity-0"
            onChange={(e) => setHighlight(e.target.value)}
          />
        </label>
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
      <ToolButton onClick={() => formatBlock('pre')} title="Code Block">
        <Code className="w-4 h-4" />
      </ToolButton>
      <ToolButton onClick={() => formatBlock('blockquote')} title="Blockquote">
        <Quote className="w-4 h-4" />
      </ToolButton>
      <ToolButton onClick={() => exec('insertHorizontalRule')} title="Horizontal Line">
        <Minus className="w-4 h-4" />
      </ToolButton>
    </div>
  )
}
