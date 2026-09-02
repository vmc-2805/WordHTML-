import { useState, useRef, useCallback, useEffect } from 'react'
import { Upload, Download, Copy, Printer, FileText, Code2, Trash2, Check, Search } from 'lucide-react'
import WordEditor from './WordEditor'
import HtmlEditor from './HtmlEditor'
import MenuToolbar from './MenuToolbar'
import {
  sampleWordContent, sampleHtmlContent,
  handleDocxUpload, handleHtmlUpload,
  copyToClipboard, downloadFile, printDocument
} from '../utils/documentUtils'
import {
  removeInlineStyles, removeEmptyTags,
  removeUnnecessaryClasses, removeUnnecessaryIds,
  removeComments, removeExtraWhitespace,
  removeWordMarkup, removeUnnecessarySpans
} from '../utils/htmlCleaner'

const cleanFns = {
  inlineStyles: removeInlineStyles,
  emptyTags: removeEmptyTags,
  classes: removeUnnecessaryClasses,
  ids: removeUnnecessaryIds,
  comments: removeComments,
  whitespace: removeExtraWhitespace,
  wordMarkup: removeWordMarkup,
  spans: removeUnnecessarySpans,
  semantic: (html) => {
    let r = html
    r = r.replace(/<b>([\s\S]*?)<\/b>/gi, '<strong>$1</strong>')
    r = r.replace(/<i>([\s\S]*?)<\/i>/gi, '<em>$1</em>')
    return r
  }
}

export default function EditorSection() {
  const editorRef = useRef(null)
  const [wordContent, setWordContent] = useState(sampleWordContent)
  const [htmlContent, setHtmlContent] = useState(sampleHtmlContent)
  const [activeTab, setActiveTab] = useState('editor')
  const [copied, setCopied] = useState(false)
  const [showFindReplace, setShowFindReplace] = useState(false)
  const [findText, setFindText] = useState('')
  const [replaceText, setReplaceText] = useState('')
  const docxInputRef = useRef(null)
  const htmlInputRef = useRef(null)

  useEffect(() => {
    const handler = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'h') {
        e.preventDefault()
        setShowFindReplace(prev => !prev)
      }
      if ((e.ctrlKey || e.metaKey) && e.key === 'n') {
        e.preventDefault()
        handleClearAll()
      }
      if ((e.ctrlKey || e.metaKey) && e.key === 's') {
        e.preventDefault()
        handleDownload()
      }
    }
    document.addEventListener('keydown', handler)
    return () => document.removeEventListener('keydown', handler)
  }, [])

  const handleWordInput = useCallback((html) => {
    setWordContent(html)
    setHtmlContent(html)
  }, [])

  const handleHtmlChange = useCallback((newHtml) => {
    setHtmlContent(newHtml)
    if (editorRef.current) {
      editorRef.current.innerHTML = newHtml
    }
    setWordContent(newHtml)
  }, [])

  const handleClean = useCallback((type) => {
    const fn = cleanFns[type]
    if (!fn) return
    setHtmlContent(prev => {
      const cleaned = fn(prev)
      if (editorRef.current) editorRef.current.innerHTML = cleaned
      setWordContent(cleaned)
      return cleaned
    })
  }, [])

  const handleCleanAll = useCallback(() => {
    setHtmlContent(prev => {
      let cleaned = prev
      cleaned = removeComments(cleaned)
      cleaned = removeInlineStyles(cleaned)
      cleaned = removeWordMarkup(cleaned)
      cleaned = removeUnnecessaryClasses(cleaned)
      cleaned = removeUnnecessaryIds(cleaned)
      cleaned = removeUnnecessarySpans(cleaned)
      cleaned = removeEmptyTags(cleaned)
      cleaned = removeExtraWhitespace(cleaned)
      if (editorRef.current) editorRef.current.innerHTML = cleaned
      setWordContent(cleaned)
      return cleaned
    })
  }, [])

  const handleLoadSampleWord = () => {
    setWordContent(sampleWordContent)
    setHtmlContent(sampleWordContent)
    if (editorRef.current) editorRef.current.innerHTML = sampleWordContent
  }

  const handleLoadSampleHtml = () => {
    setHtmlContent(sampleHtmlContent)
    setWordContent(sampleHtmlContent)
    if (editorRef.current) editorRef.current.innerHTML = sampleHtmlContent
  }

  const handleClearAll = () => {
    setWordContent('')
    setHtmlContent('')
    if (editorRef.current) editorRef.current.innerHTML = ''
  }

  const handleCopyHtml = async () => {
    await copyToClipboard(htmlContent)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleDownload = () => downloadFile(htmlContent, 'document.html')

  const handleDownloadDocx = () => {
    const htmlWithStyles = `<html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'><head><meta charset='utf-8'><title>Document</title><style>body{font-family:Calibri,sans-serif;font-size:11pt;line-height:1.5;padding:1in;}table{border-collapse:collapse;}td,th{border:1px solid #000;padding:4pt 8pt;}img{max-width:100%;}ul,ol{margin-left:1.5em;}</style></head><body>${htmlContent}</body></html>`
    const blob = new Blob(['\ufeff', htmlWithStyles], { type: 'application/msword' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'document.doc'
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  const handlePrint = () => printDocument(htmlContent)

  const handleNewFile = () => { handleClearAll() }
  const handleOpenFile = () => { htmlInputRef.current?.click() }

  const handleDocxUploadWrapper = async (e) => {
    const file = e.target.files?.[0]
    if (!file) return
    try {
      const html = await handleDocxUpload(file)
      setWordContent(html)
      setHtmlContent(html)
      if (editorRef.current) editorRef.current.innerHTML = html
    } catch (err) { console.error(err) }
    e.target.value = ''
  }

  const handleHtmlUploadWrapper = async (e) => {
    const file = e.target.files?.[0]
    if (!file) return
    try {
      const html = await handleHtmlUpload(file)
      setHtmlContent(html)
      setWordContent(html)
      if (editorRef.current) editorRef.current.innerHTML = html
    } catch (err) { console.error(err) }
    e.target.value = ''
  }

  const handleFindReplace = () => {
    if (!findText) return
    const el = editorRef.current
    if (!el) return
    const html = el.innerHTML
    const regex = new RegExp(findText.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'gi')
    const newHtml = html.replace(regex, replaceText)
    el.innerHTML = newHtml
    setWordContent(newHtml)
    setHtmlContent(newHtml)
  }

  const countWords = (text) => {
    if (!text) return 0
    const plain = text.replace(/<[^>]*>/g, '').replace(/&nbsp;/g, ' ').trim()
    if (!plain) return 0
    return plain.split(/\s+/).filter(w => w.length > 0).length
  }

  const countChars = (text) => {
    if (!text) return 0
    return text.replace(/<[^>]*>/g, '').replace(/&nbsp;/g, ' ').replace(/\s/g, '').length
  }

  return (
    <section id="editor">
      <div className="rounded-2xl border border-slate-200 dark:border-surface-700/50 bg-white dark:bg-surface-900/50 shadow-xl shadow-slate-200/50 dark:shadow-black/20 overflow-hidden backdrop-blur-sm">

          <MenuToolbar
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            onNewFile={handleNewFile}
            onOpenFile={handleOpenFile}
            onSaveHtml={handleDownload}
            onCopyHtml={handleCopyHtml}
            onPrint={handlePrint}
            onClearAll={handleClearAll}
            onUndo={() => document.execCommand('undo')}
            onRedo={() => document.execCommand('redo')}
            onFindReplace={() => setShowFindReplace(prev => !prev)}
            wordEditorRef={editorRef}
          />

          {showFindReplace && (
            <div className="flex items-center gap-2 px-4 py-2 bg-yellow-50 dark:bg-yellow-900/20 border-b border-yellow-200 dark:border-yellow-800">
              <Search className="w-4 h-4 text-yellow-600 dark:text-yellow-400 shrink-0" />
              <input
                type="text"
                placeholder="Find..."
                value={findText}
                onChange={(e) => setFindText(e.target.value)}
                className="flex-1 min-w-0 px-2 py-1 text-xs rounded border border-yellow-300 dark:border-yellow-700 bg-white dark:bg-surface-800 text-slate-800 dark:text-slate-200 outline-none focus:border-yellow-500"
                onKeyDown={(e) => e.key === 'Enter' && handleFindReplace()}
              />
              <input
                type="text"
                placeholder="Replace with..."
                value={replaceText}
                onChange={(e) => setReplaceText(e.target.value)}
                className="flex-1 min-w-0 px-2 py-1 text-xs rounded border border-yellow-300 dark:border-yellow-700 bg-white dark:bg-surface-800 text-slate-800 dark:text-slate-200 outline-none focus:border-yellow-500"
                onKeyDown={(e) => e.key === 'Enter' && handleFindReplace()}
              />
              <button onClick={handleFindReplace} className="px-3 py-1 text-xs font-medium bg-yellow-500 text-white rounded hover:bg-yellow-600 transition-colors">
                Replace All
              </button>
              <button onClick={() => setShowFindReplace(false)} className="px-2 py-1 text-xs text-slate-500 hover:text-slate-700 dark:hover:text-slate-300">
                Close
              </button>
            </div>
          )}

          <div className="flex flex-wrap items-center justify-between gap-2 px-3 sm:px-4 py-2 border-b border-slate-200 dark:border-surface-700 bg-slate-50 dark:bg-surface-900/80">
            <div className="flex items-center gap-1 p-1 bg-slate-100 dark:bg-surface-800 rounded-lg">
              <button
                onClick={() => setActiveTab('editor')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-all ${
                  activeTab === 'editor'
                    ? 'bg-white dark:bg-surface-700 text-primary-600 dark:text-primary-400 shadow-sm'
                    : 'text-slate-500 dark:text-surface-400 hover:text-slate-700 dark:hover:text-surface-200'
                }`}
              >
                <FileText className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Word Editor</span>
                <span className="sm:hidden">Word</span>
              </button>
              <button
                onClick={() => setActiveTab('html')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-all ${
                  activeTab === 'html'
                    ? 'bg-white dark:bg-surface-700 text-primary-600 dark:text-primary-400 shadow-sm'
                    : 'text-slate-500 dark:text-surface-400 hover:text-slate-700 dark:hover:text-surface-200'
                }`}
              >
                <Code2 className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">HTML Code</span>
                <span className="sm:hidden">HTML</span>
              </button>
            </div>

            <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
              <ToolBtn onClick={handleLoadSampleWord} icon={FileText} label="Sample" />
              <ToolBtn onClick={handleLoadSampleHtml} icon={Code2} label="Sample HTML" />
              <ToolBtn onClick={handleClearAll} icon={Trash2} label="Clear" />
            </div>
          </div>

          <div className="h-[500px] relative">
            <div className={activeTab === 'editor' ? 'h-full' : 'h-full hidden'}>
              <WordEditor
                ref={editorRef}
                onInput={handleWordInput}
                onKeyUp={() => {}}
                onClick={() => {}}
                initialContent={wordContent}
              />
            </div>
            <div className={activeTab === 'html' ? 'h-full' : 'h-full hidden'}>
              <HtmlEditor
                html={htmlContent}
                setHtml={handleHtmlChange}
                onClean={handleClean}
                onCleanAll={handleCleanAll}
              />
            </div>
          </div>

          <div className="border-t border-slate-200 dark:border-surface-700 bg-slate-50 dark:bg-surface-900/80 text-xs text-slate-500 dark:text-surface-500">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1.5 sm:gap-0 px-3 sm:px-4 py-2">
              <div className="flex items-center gap-3 sm:gap-4">
                <span>{countWords(wordContent)} words</span>
                <span>{countChars(wordContent)} chars</span>
                <div className="hidden sm:flex items-center gap-1 ml-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span>Live sync</span>
                </div>
              </div>

              <div className="flex items-center gap-0.5 sm:gap-1 overflow-x-auto">
                <input ref={docxInputRef} type="file" accept=".docx" className="hidden" onChange={handleDocxUploadWrapper} />
                <input ref={htmlInputRef} type="file" accept=".html,.htm" className="hidden" onChange={handleHtmlUploadWrapper} />
                <button onClick={() => docxInputRef.current?.click()} className="shrink-0 inline-flex items-center gap-1 px-1.5 sm:px-2 py-1 rounded text-[11px] font-medium text-slate-500 dark:text-surface-400 hover:bg-slate-200 dark:hover:bg-surface-700 hover:text-slate-700 dark:hover:text-surface-200 transition-colors" title="Upload DOCX">
                  <Upload className="w-3 h-3" />
                  <span className="hidden md:inline">Upload DOCX</span>
                  <span className="hidden sm:inline md:hidden">DOCX</span>
                </button>
                <button onClick={() => htmlInputRef.current?.click()} className="shrink-0 inline-flex items-center gap-1 px-1.5 sm:px-2 py-1 rounded text-[11px] font-medium text-slate-500 dark:text-surface-400 hover:bg-slate-200 dark:hover:bg-surface-700 hover:text-slate-700 dark:hover:text-surface-200 transition-colors" title="Upload HTML">
                  <Upload className="w-3 h-3" />
                  <span className="hidden md:inline">Upload HTML</span>
                  <span className="hidden sm:inline md:hidden">HTML</span>
                </button>
                <div className="w-px h-4 bg-slate-300 dark:bg-surface-600 mx-0.5 shrink-0" />
                <button onClick={handleDownloadDocx} className="shrink-0 inline-flex items-center gap-1 px-1.5 sm:px-2 py-1 rounded text-[11px] font-medium text-slate-500 dark:text-surface-400 hover:bg-slate-200 dark:hover:bg-surface-700 hover:text-slate-700 dark:hover:text-surface-200 transition-colors" title="Download as DOCX">
                  <Download className="w-3 h-3" />
                  <span className="hidden md:inline">Download .doc</span>
                  <span className="hidden sm:inline md:hidden">.doc</span>
                </button>
                <button onClick={handleDownload} className="shrink-0 inline-flex items-center gap-1 px-1.5 sm:px-2 py-1 rounded text-[11px] font-medium text-slate-500 dark:text-surface-400 hover:bg-slate-200 dark:hover:bg-surface-700 hover:text-slate-700 dark:hover:text-surface-200 transition-colors" title="Download as HTML">
                  <Download className="w-3 h-3" />
                  <span className="hidden md:inline">Download .html</span>
                  <span className="hidden sm:inline md:hidden">.html</span>
                </button>
                <div className="w-px h-4 bg-slate-300 dark:bg-surface-600 mx-0.5 shrink-0" />
                <button onClick={handleCopyHtml} className={`shrink-0 inline-flex items-center gap-1 px-1.5 sm:px-2 py-1 rounded text-[11px] font-medium transition-colors ${
                  copied ? 'text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-900/20' : 'text-slate-500 dark:text-surface-400 hover:bg-slate-200 dark:hover:bg-surface-700 hover:text-slate-700 dark:hover:text-surface-200'
                }`} title="Copy HTML to clipboard">
                  {copied ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                  <span className="hidden sm:inline">{copied ? 'Copied!' : 'Copy'}</span>
                </button>
                <button onClick={handlePrint} className="shrink-0 inline-flex items-center gap-1 px-1.5 sm:px-2 py-1 rounded text-[11px] font-medium text-slate-500 dark:text-surface-400 hover:bg-slate-200 dark:hover:bg-surface-700 hover:text-slate-700 dark:hover:text-surface-200 transition-colors" title="Print">
                  <Printer className="w-3 h-3" />
                  <span className="hidden sm:inline">Print</span>
                </button>
              </div>
            </div>
          </div>
        </div>
    </section>
  )
}

function ToolBtn({ onClick, icon: Icon, label, accent }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
        accent
          ? 'bg-gradient-to-r from-primary-500 to-primary-600 text-white hover:from-primary-600 hover:to-primary-700 shadow-sm shadow-primary-500/25'
          : 'bg-slate-100 dark:bg-surface-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-surface-700 border border-slate-200 dark:border-surface-600'
      }`}
    >
      <Icon className="w-3.5 h-3.5" />
      {label}
    </button>
  )
}
