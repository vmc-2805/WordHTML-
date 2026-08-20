import { useRef, useCallback } from 'react'
import { formatHtml } from '../utils/documentUtils'
import CleaningToolbar from './CleaningToolbar'

export default function HtmlEditor({ html, setHtml, onClean, onCleanAll }) {
  const textareaRef = useRef(null)
  const lineNumbersRef = useRef(null)

  const handleScroll = useCallback(() => {
    if (lineNumbersRef.current && textareaRef.current) {
      lineNumbersRef.current.scrollTop = textareaRef.current.scrollTop
    }
  }, [])

  const lineCount = html ? html.split('\n').length : 1
  const lines = Array.from({ length: lineCount }, (_, i) => i + 1)

  const handleFormat = useCallback(() => {
    setHtml(formatHtml(html))
  }, [html, setHtml])

  return (
    <div className="flex flex-col h-full">
      <CleaningToolbar onClean={onClean} onCleanAll={onCleanAll} onFormat={handleFormat} />
      <div className="flex-1 flex overflow-hidden">
        <div
          ref={lineNumbersRef}
          className="w-12 bg-slate-100 dark:bg-surface-900 text-slate-400 dark:text-surface-600 text-right py-4 pr-2 text-xs font-mono select-none overflow-hidden border-r border-slate-200 dark:border-surface-700"
        >
          {lines.map(n => (
            <div key={n} className="leading-6">{n}</div>
          ))}
        </div>
        <textarea
          ref={textareaRef}
          value={html}
          onChange={(e) => setHtml(e.target.value)}
          onScroll={handleScroll}
          className="flex-1 bg-transparent resize-none p-4 text-sm font-mono text-slate-800 dark:text-slate-200 outline-none leading-6"
          spellCheck={false}
          placeholder="HTML code will appear here..."
        />
      </div>
    </div>
  )
}
