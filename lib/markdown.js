/**
 * Simple markdown to HTML renderer.
 * Handles: headings, paragraphs, code blocks, inline code,
 * bold, italic, links, lists, blockquotes, horizontal rules.
 */
export function renderMarkdown(markdown) {
  if (!markdown) return '';

  const lines = markdown.split('\n');
  let html = '';
  let inCodeBlock = false;
  let codeBlockContent = '';
  let codeBlockLang = '';
  let inList = false;
  let listType = '';

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    // Code blocks
    if (line.startsWith('```')) {
      if (inCodeBlock) {
        html += `<pre><code class="language-${codeBlockLang}">${escapeHtml(codeBlockContent.trimEnd())}</code></pre>`;
        codeBlockContent = '';
        codeBlockLang = '';
        inCodeBlock = false;
      } else {
        inCodeBlock = true;
        codeBlockLang = line.slice(3).trim() || 'text';
      }
      continue;
    }

    if (inCodeBlock) {
      codeBlockContent += line + '\n';
      continue;
    }

    // Close list if current line is not a list item
    if (inList && !line.match(/^(\d+\.\s|-\s|\*\s)/) && line.trim() !== '') {
      html += listType === 'ul' ? '</ul>' : '</ol>';
      inList = false;
    }

    // Empty line
    if (line.trim() === '') {
      if (inList) {
        html += listType === 'ul' ? '</ul>' : '</ol>';
        inList = false;
      }
      continue;
    }

    // Headings
    const headingMatch = line.match(/^(#{1,6})\s+(.+)/);
    if (headingMatch) {
      const level = headingMatch[1].length;
      const text = processInline(headingMatch[2]);
      const id = headingMatch[2].toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
      html += `<h${level} id="${id}">${text}</h${level}>`;
      continue;
    }

    // Blockquote
    if (line.startsWith('> ')) {
      const text = processInline(line.slice(2));
      html += `<blockquote><p>${text}</p></blockquote>`;
      continue;
    }

    // Horizontal rule
    if (line.match(/^(-{3,}|\*{3,}|_{3,})$/)) {
      html += '<hr>';
      continue;
    }

    // Unordered list
    if (line.match(/^[-*]\s+/)) {
      if (!inList || listType !== 'ul') {
        if (inList) html += listType === 'ul' ? '</ul>' : '</ol>';
        html += '<ul>';
        inList = true;
        listType = 'ul';
      }
      const text = processInline(line.replace(/^[-*]\s+/, ''));
      html += `<li>${text}</li>`;
      continue;
    }

    // Ordered list
    if (line.match(/^\d+\.\s+/)) {
      if (!inList || listType !== 'ol') {
        if (inList) html += listType === 'ul' ? '</ul>' : '</ol>';
        html += '<ol>';
        inList = true;
        listType = 'ol';
      }
      const text = processInline(line.replace(/^\d+\.\s+/, ''));
      html += `<li>${text}</li>`;
      continue;
    }

    // Paragraph
    html += `<p>${processInline(line)}</p>`;
  }

  // Close any open list
  if (inList) {
    html += listType === 'ul' ? '</ul>' : '</ol>';
  }

  return html;
}

function processInline(text) {
  // Inline code (must be before other processing)
  text = text.replace(/`([^`]+)`/g, '<code>$1</code>');

  // Bold + italic
  text = text.replace(/\*\*\*(.+?)\*\*\*/g, '<strong><em>$1</em></strong>');

  // Bold
  text = text.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');

  // Italic
  text = text.replace(/\*(.+?)\*/g, '<em>$1</em>');

  // Links
  text = text.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>');

  return text;
}

function escapeHtml(text) {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

/**
 * Extract headings for table of contents
 */
export function extractHeadings(markdown) {
  if (!markdown) return [];

  const headingRegex = /^(#{2,3})\s+(.+)/gm;
  const headings = [];
  let match;

  while ((match = headingRegex.exec(markdown)) !== null) {
    headings.push({
      level: match[1].length,
      text: match[2].replace(/\*\*(.+?)\*\*/g, '$1').replace(/\*(.+?)\*/g, '$1'),
      id: match[2].toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
    });
  }

  return headings;
}
