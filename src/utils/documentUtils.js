export function countWords(text) {
  if (!text) return 0;
  const plain = text.replace(/<[^>]*>/g, '').replace(/&nbsp;/g, ' ').trim();
  if (!plain) return 0;
  return plain.split(/\s+/).filter(w => w.length > 0).length;
}
export function countChars(text) {
  if (!text) return 0;
  return text.replace(/<[^>]*>/g, '').replace(/&nbsp;/g, ' ').replace(/\s/g, '').length;
}
export function copyToClipboard(text) {
  if (navigator.clipboard && navigator.clipboard.writeText) {
    return navigator.clipboard.writeText(text);
  }
  const ta = document.createElement('textarea');
  ta.value = text;
  ta.style.position = 'fixed';
  ta.style.left = '-9999px';
  document.body.appendChild(ta);
  ta.select();
  document.execCommand('copy');
  document.body.removeChild(ta);
  return Promise.resolve();
}
export function downloadFile(content, filename, mimeType) {
  if (!mimeType) mimeType = 'text/html';
  const blob = new Blob([content], { type: mimeType });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
export function formatHtml(html) {
  if (!html) return '';
  let formatted = '';
  let indent = 0;
  const lines = html.replace(/>\s*</g, '>\n<').split('\n');
  const selfClosing = /^<(area|base|br|col|embed|hr|img|input|link|meta|param|source|track|wbr)/i;
  const closing = /^<\//;
  const opening = /^<[a-zA-Z]/;
  lines.forEach(function(line) {
    const trimmed = line.trim();
    if (!trimmed) return;
    if (closing.test(trimmed)) indent = Math.max(0, indent - 1);
    formatted += '  '.repeat(indent) + trimmed + '\n';
    if (opening.test(trimmed) && !selfClosing.test(trimmed) && !closing.test(trimmed) && !trimmed.endsWith('/>')) {
      if (!/<[^>]*>.*<\/[^>]*>/.test(trimmed)) indent++;
    }
  });
  return formatted.trim();
}
export function handleDocxUpload(file) {
  return new Promise(function(resolve, reject) {
    if (!file) return reject(new Error('No file selected'));
    if (!file.name.endsWith('.docx')) return reject(new Error('Please upload a .docx file'));
    var reader = new FileReader();
    reader.onload = function() { resolve('<p>DOCX content loaded. For best results, copy and paste content directly from Word.</p>'); };
    reader.onerror = function() { reject(new Error('Failed to read file')); };
    reader.readAsArrayBuffer(file);
  });
}
export function handleHtmlUpload(file) {
  return new Promise(function(resolve, reject) {
    if (!file) return reject(new Error('No file selected'));
    var reader = new FileReader();
    reader.onload = function(e) { resolve(e.target.result); };
    reader.onerror = function() { reject(new Error('Failed to read file')); };
    reader.readAsText(file);
  });
}
export function printDocument(htmlContent) {
  var w = window.open('', '_blank');
  w.document.write('<!DOCTYPE html><html><head><title>Print</title><style>body{font-family:Times New Roman,serif;font-size:12pt;line-height:1.5;padding:1in;}table{border-collapse:collapse;}td,th{border:1px solid #000;padding:4pt 8pt;}img{max-width:100%;}</style></head><body>' + htmlContent + '</body></html>');
  w.document.close();
  w.focus();
  setTimeout(function() { w.print(); w.close(); }, 250);
}
export var sampleWordContent = '<h1>Welcome to Word HTML Editor</h1><p>This is a <strong>powerful</strong> online editor that lets you convert Word documents to clean HTML and vice versa.</p><h2>Features</h2><ul><li>Rich text editing with full formatting support</li><li>Real-time HTML conversion</li><li>HTML cleaning and optimization</li><li>Export to multiple formats</li></ul><h2>How to Use</h2><p>Simply type or paste your Word content in the left panel, and the HTML will be generated automatically in the right panel.</p><blockquote>Pro tip: You can paste content directly from Microsoft Word and the editor will handle the formatting.</blockquote><h3>Supported Formatting</h3><table><thead><tr><th>Format</th><th>Shortcut</th><th>Description</th></tr></thead><tbody><tr><td><strong>Bold</strong></td><td>Ctrl+B</td><td>Makes text bold</td></tr><tr><td><em>Italic</em></td><td>Ctrl+I</td><td>Makes text italic</td></tr><tr><td><u>Underline</u></td><td>Ctrl+U</td><td>Underlines text</td></tr></tbody></table><p>Start editing now and experience the power of real-time Word to HTML conversion!</p>';
export var sampleHtmlContent = '<h1>Welcome to Word HTML Editor</h1><p>This is a <strong>powerful</strong> online editor that lets you convert Word documents to clean HTML and vice versa.</p><h2>Features</h2><ul><li>Rich text editing with full formatting support</li><li>Real-time HTML conversion</li><li>HTML cleaning and optimization</li><li>Export to multiple formats</li></ul><h2>How to Use</h2><p>Simply type or paste your Word content in the left panel, and the HTML will be generated automatically in the right panel.</p><blockquote>Pro tip: You can paste content directly from Microsoft Word and the editor will handle the formatting.</blockquote><h3>Supported Formatting</h3><table><thead><tr><th>Format</th><th>Shortcut</th><th>Description</th></tr></thead><tbody><tr><td><strong>Bold</strong></td><td>Ctrl+B</td><td>Makes text bold</td></tr><tr><td><em>Italic</em></td><td>Ctrl+I</td><td>Makes text italic</td></tr><tr><td><u>Underline</u></td><td>Ctrl+U</td><td>Underlines text</td></tr></tbody></table><p>Start editing now and experience the power of real-time Word to HTML conversion!</p>';
