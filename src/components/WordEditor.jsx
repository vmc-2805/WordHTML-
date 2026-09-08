import { forwardRef, useCallback, useEffect, useRef, useState } from 'react'
import { RefreshCw, Trash2 } from 'lucide-react'
import EditorToolbar from './EditorToolbar'

const WordEditor = forwardRef(function WordEditor({ onInput, onKeyUp, onClick, initialContent }, ref) {
  const [imgTool, setImgTool] = useState(null)
  const imgInputRef = useRef(null)

  useEffect(() => {
    if (ref.current && initialContent !== undefined) {
      ref.current.innerHTML = initialContent
    }
  }, [])

  const handleInput = useCallback(() => {
    if (ref.current && onInput) {
      onInput(ref.current.innerHTML)
    }
  }, [onInput, ref])

  const handleEditorClick = useCallback((e) => {
    const t = e.target
    if (t && t.tagName === 'IMG') {
      const rect = t.getBoundingClientRect()
      setImgTool({ x: rect.left, y: rect.top, el: t })
    } else {
      setImgTool(null)
    }
    onClick?.(e)
  }, [onClick])

  const handleImgReplace = useCallback((e) => {
    const file = e.target.files?.[0]
    if (!file) {
      setImgTool(null)
      return
    }
    const reader = new FileReader()
    reader.onload = () => {
      if (imgTool?.el) {
        imgTool.el.setAttribute('src', reader.result)
        handleInput()
      }
      setImgTool(null)
    }
    reader.readAsDataURL(file)
    e.target.value = ''
  }, [handleInput, imgTool])

  const handleImgDelete = useCallback(() => {
    if (imgTool?.el) {
      imgTool.el.remove()
      handleInput()
    }
    setImgTool(null)
  }, [handleInput, imgTool])

  const handlePaste = useCallback((e) => {
    e.preventDefault()
    const html = e.clipboardData.getData('text/html')
    const text = e.clipboardData.getData('text/plain')
    if (html) {
      let cleaned = html
      cleaned = cleaned.replace(/<o:p[^>]*>[\s\S]*?<\/o:p>/gi, '')
      cleaned = cleaned.replace(/<\??:[^>]+>/gi, '')
      cleaned = cleaned.replace(/<m:[^>]+[^>]*\/>/gi, '')
      cleaned = cleaned.replace(/<w:[^>]+[^>]*\/>/gi, '')
      cleaned = cleaned.replace(/<v:[^>]+[^>]*\/>/gi, '')
      cleaned = cleaned.replace(/<font[^>]*>([\s\S]*?)<\/font>/gi, '$1')
      cleaned = cleaned.replace(/mso-[^:]*:[^;"]*;?/gi, '')
      cleaned = cleaned.replace(/class="MsoNormal"/gi, '')
      cleaned = cleaned.replace(/\s*style="([^"]*)"/gi, (m, styleText) => {
        const kept = styleText.split(';').map((s) => s.trim()).filter(Boolean).filter((s) => {
          const prop = s.split(':')[0].trim().toLowerCase()
          if (/^mso-/.test(prop)) return false
          return ['color', 'background-color', 'background'].includes(prop)
        })
        return kept.length ? ` style="${kept.join('; ')}"` : ''
      })
      cleaned = cleaned.replace(/<span[^>]*>\s*<\/span>/gi, '')
      document.execCommand('insertHTML', false, cleaned)
    } else {
      document.execCommand('insertText', false, text)
    }
    handleInput()
  }, [handleInput])

  return (
    <div className="flex flex-col h-full overflow-hidden">
      <EditorToolbar editorRef={ref} />
      <div className="flex-1 min-h-0 overflow-auto p-3 sm:p-4 md:p-6">
        <div
          ref={ref}
          className="word-editor-content text-slate-800 dark:text-slate-200"
          contentEditable
          suppressContentEditableWarning
          onInput={handleInput}
          onKeyUp={onKeyUp}
          onClick={handleEditorClick}
          onPaste={handlePaste}
        />
      </div>

      {imgTool && (
        <div
          className="fixed z-[100] flex items-center gap-1 bg-white dark:bg-surface-800 rounded-lg border border-slate-200 dark:border-surface-700 shadow-xl px-1.5 py-1"
          style={{ left: imgTool.x, top: Math.max(imgTool.y - 42, 10) }}
        >
          <label className="toolbar-btn cursor-pointer" title="Replace Image">
            <RefreshCw className="w-4 h-4" />
            <input ref={imgInputRef} type="file" accept="image/*" className="hidden" onChange={handleImgReplace} />
          </label>
          <div className="toolbar-divider" />
          <button type="button" className="toolbar-btn" title="Delete Image" onClick={handleImgDelete}>
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  )
})

export default WordEditor
