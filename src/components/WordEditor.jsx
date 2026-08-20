import { forwardRef, useCallback, useEffect } from 'react'
import EditorToolbar from './EditorToolbar'

const WordEditor = forwardRef(function WordEditor({ onInput, onKeyUp, onClick, initialContent }, ref) {
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
      cleaned = cleaned.replace(/\s*style="[^"]*"/gi, '')
      cleaned = cleaned.replace(/<span[^>]*>\s*<\/span>/gi, '')
      document.execCommand('insertHTML', false, cleaned)
    } else {
      document.execCommand('insertText', false, text)
    }
    handleInput()
  }, [handleInput])

  return (
    <div className="flex flex-col h-full">
      <EditorToolbar editorRef={ref} />
      <div className="flex-1 overflow-auto p-4">
        <div
          ref={ref}
          className="word-editor-content text-slate-800 dark:text-slate-200"
          contentEditable
          suppressContentEditableWarning
          onInput={handleInput}
          onKeyUp={onKeyUp}
          onClick={onClick}
          onPaste={handlePaste}
        />
      </div>
    </div>
  )
})

export default WordEditor
