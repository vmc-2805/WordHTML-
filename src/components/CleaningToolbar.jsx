import {
  Eraser, Paintbrush, Trash2, Tag, Hash,
  MessageSquare, Minimize2, FileText, Code2, Sparkles
} from 'lucide-react'

const CleanButton = ({ onClick, title, icon: Icon, color }) => (
  <div className="tooltip-wrapper">
    <button
      type="button"
      onClick={onClick}
      className={`toolbar-btn ${color}`}
      title={title}
    >
      <Icon className="w-4 h-4" />
    </button>
    <span className="tooltip-text">{title}</span>
  </div>
)

export default function CleaningToolbar({ onClean, onCleanAll, onFormat }) {
  return (
    <div className="flex items-center gap-0.5 px-3 py-2 border-b border-slate-200 dark:border-surface-700 bg-slate-50 dark:bg-surface-900/50">
      <CleanButton onClick={() => onClean('inlineStyles')} title="Remove Inline Styles" icon={Paintbrush} color="text-amber-500" />
      <CleanButton onClick={() => onClean('emptyTags')} title="Remove Empty Tags" icon={Trash2} color="text-rose-500" />
      <CleanButton onClick={() => onClean('classes')} title="Remove Classes" icon={Tag} color="text-violet-500" />
      <CleanButton onClick={() => onClean('ids')} title="Remove IDs" icon={Hash} color="text-blue-500" />
      <CleanButton onClick={() => onClean('comments')} title="Remove Comments" icon={MessageSquare} color="text-slate-500" />
      <CleanButton onClick={() => onClean('whitespace')} title="Remove Extra Whitespace" icon={Minimize2} color="text-cyan-500" />
      <CleanButton onClick={() => onClean('wordMarkup')} title="Remove Word Markup" icon={FileText} color="text-orange-500" />
      <CleanButton onClick={() => onClean('spans')} title="Remove Spans" icon={Code2} color="text-pink-500" />
      <CleanButton onClick={() => onClean('semantic')} title="Semantic HTML" icon={Sparkles} color="text-emerald-500" />

      <div className="toolbar-divider" />

      <CleanButton onClick={onFormat} title="Format HTML" icon={Eraser} color="text-primary-500" />

      <div className="toolbar-divider" />

      <div className="tooltip-wrapper">
        <button
          type="button"
          onClick={onCleanAll}
          className="px-3 h-8 rounded-lg bg-gradient-to-r from-rose-500 to-orange-500 text-white text-xs font-semibold hover:from-rose-600 hover:to-orange-600 transition-all"
        >
          Clean All
        </button>
        <span className="tooltip-text">Remove All Unwanted Markup</span>
      </div>
    </div>
  )
}
