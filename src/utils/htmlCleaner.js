export function cleanHtml(html) {
  let cleaned = html;
  cleaned = cleaned.replace(/<!--[\s\S]*?-->/g, '');
  cleaned = cleaned.replace(/\s*style="[^"]*"/gi, '');
  cleaned = cleaned.replace(/\s*class="[^"]*"/gi, '');
  cleaned = cleaned.replace(/\s*id="[^"]*"/gi, '');
  cleaned = cleaned.replace(/<o:p[^>]*>[\s\S]*?<\/o:p>/gi, '');
  cleaned = cleaned.replace(/<\??:[^>]+>/gi, '');
  cleaned = cleaned.replace(/<m:[^>]+[^>]*\/>/gi, '');
  cleaned = cleaned.replace(/<w:[^>]+[^>]*\/>/gi, '');
  cleaned = cleaned.replace(/<v:[^>]+[^>]*\/>/gi, '');
  cleaned = cleaned.replace(/<span[^>]*>\s*<\/span>/gi, '');
  cleaned = cleaned.replace(/<div[^>]*>\s*<\/div>/gi, '');
  cleaned = cleaned.replace(/<p[^>]*>\s*(&nbsp;|\u00A0|\s)*\s*<\/p>/gi, '');
  cleaned = cleaned.replace(/<b\s+style="[^"]*">/gi, '<strong>');
  cleaned = cleaned.replace(/<\/b>/gi, '</strong>');
  cleaned = cleaned.replace(/<i\s+style="[^"]*">/gi, '<em>');
  cleaned = cleaned.replace(/<\/i>/gi, '</em>');
  cleaned = cleaned.replace(/<font[^>]*>([\s\S]*?)<\/font>/gi, '$1');
  cleaned = cleaned.replace(/mso-[^:]*:[^;"]*;?/gi, '');
  cleaned = cleaned.replace(/lang="[^"]*"/gi, '');
  cleaned = cleaned.replace(/\s{2,}/g, ' ');
  cleaned = cleaned.replace(/>\s+</g, '><');
  cleaned = cleaned.replace(/<([a-z][a-z0-9]*)\s*>\s*<\/\1>/gi, '');
  return cleaned.trim();
}
export function removeInlineStyles(html) { return html.replace(/\s*style="[^"]*"/gi, ''); }
export function removeEmptyTags(html) { return html.replace(/<([a-z][a-z0-9]*)\s*(?:[^>]*)?>\s*<\/\1>/gi, ''); }
export function removeUnnecessaryClasses(html) { return html.replace(/\s*class="[^"]*"/gi, ''); }
export function removeUnnecessaryIds(html) { return html.replace(/\s*id="[^"]*"/gi, ''); }
export function removeComments(html) { return html.replace(/<!--[\s\S]*?-->/g, ''); }
export function removeExtraWhitespace(html) { let r = html.replace(/\s{2,}/g, ' '); r = r.replace(/>\s+</g, '><'); return r.trim(); }
export function removeWordMarkup(html) {
  let r = html;
  r = r.replace(/<o:p[^>]*>[\s\S]*?<\/o:p>/gi, '');
  r = r.replace(/<\??:[^>]+>/gi, '');
  r = r.replace(/<m:[^>]+[^>]*\/>/gi, '');
  r = r.replace(/<w:[^>]+[^>]*\/>/gi, '');
  r = r.replace(/<v:[^>]+[^>]*\/>/gi, '');
  r = r.replace(/<font[^>]*>([\s\S]*?)<\/font>/gi, '$1');
  r = r.replace(/mso-[^:]*:[^;"]*;?/gi, '');
  r = r.replace(/class="MsoNormal"/gi, '');
  return r;
}
export function removeUnnecessarySpans(html) { return html.replace(/<span[^>]*>([\s\S]*?)<\/span>/gi, '$1'); }
export function toSemanticHtml(html) {
  let r = html;
  r = r.replace(/<b>([\s\S]*?)<\/b>/gi, '<strong>$1</strong>');
  r = r.replace(/<i>([\s\S]*?)<\/i>/gi, '<em>$1</em>');
  return r;
}
