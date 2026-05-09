'use client'

import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Placeholder from '@tiptap/extension-placeholder'
import { useEffect, useRef } from 'react'

type Props = {
  content: string
  onChange: (content: string) => void
}

// Convert markdown to HTML basique pour TipTap
function markdownToHtml(md: string): string {
  // Tables
  let html = md.replace(/(\|.+\|\n)+/g, (match) => {
    const lines = match.trim().split('\n').filter(l => l.trim())
    if (lines.length < 2) return match
    
    const headers = lines[0].split('|').map(c => c.trim()).filter(c => c)
    // Skip separator line (lines[1])
    const rows = lines.slice(2).map(line => 
      line.split('|').map(c => c.trim()).filter(c => c)
    )
    
    let table = '<table><thead><tr>'
    headers.forEach(h => table += `<th>${h}</th>`)
    table += '</tr></thead><tbody>'
    rows.forEach(row => {
      table += '<tr>'
      row.forEach(c => table += `<td>${c}</td>`)
      table += '</tr>'
    })
    table += '</tbody></table>'
    return table
  })

  // Headers
  html = html.replace(/^### (.+)$/gm, '<h3>$1</h3>')
  html = html.replace(/^## (.+)$/gm, '<h2>$1</h2>')
  html = html.replace(/^# (.+)$/gm, '<h1>$1</h1>')
  
  // Bold
  html = html.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
  // Italic
  html = html.replace(/\*(.+?)\*/g, '<em>$1</em>')
  
  // Lists
  html = html.replace(/^- (.+)$/gm, '<li>$1</li>')
  html = html.replace(/(<li>.+<\/li>\n?)+/g, '<ul>$&</ul>')
  
  // Paragraphs
  html = html.split('\n\n').map(block => {
    if (block.startsWith('<') || !block.trim()) return block
    return `<p>${block.replace(/\n/g, '<br>')}</p>`
  }).join('\n')
  
  return html
}

// Convert HTML back to markdown
function htmlToMarkdown(html: string): string {
  let md = html
  
  // Tables
  md = md.replace(/<table>([\s\S]*?)<\/table>/g, (match, content) => {
    const headerMatch = content.match(/<thead>[\s\S]*?<tr>([\s\S]*?)<\/tr>[\s\S]*?<\/thead>/)
    const bodyMatch = content.match(/<tbody>([\s\S]*?)<\/tbody>/)
    
    if (!headerMatch) return match
    
    const headers = Array.from(headerMatch[1].matchAll(/<th>(.*?)<\/th>/g)).map((m: any) => m[1])
    let result = '\n| ' + headers.join(' | ') + ' |\n'
    result += '|' + headers.map(() => '---').join('|') + '|\n'
    
    if (bodyMatch) {
      const rows = Array.from(bodyMatch[1].matchAll(/<tr>([\s\S]*?)<\/tr>/g))
      rows.forEach((row: any) => {
        const cells = Array.from(row[1].matchAll(/<td>(.*?)<\/td>/g)).map((m: any) => m[1])
        result += '| ' + cells.join(' | ') + ' |\n'
      })
    }
    return result + '\n'
  })
  
  md = md.replace(/<h1>(.*?)<\/h1>/g, '# $1\n\n')
  md = md.replace(/<h2>(.*?)<\/h2>/g, '## $1\n\n')
  md = md.replace(/<h3>(.*?)<\/h3>/g, '### $1\n\n')
  md = md.replace(/<strong>(.*?)<\/strong>/g, '**$1**')
  md = md.replace(/<em>(.*?)<\/em>/g, '*$1*')
  md = md.replace(/<li>(.*?)<\/li>/g, '- $1\n')
  md = md.replace(/<\/?ul>/g, '')
  md = md.replace(/<p>(.*?)<\/p>/g, '$1\n\n')
  md = md.replace(/<br\s*\/?>/g, '\n')
  md = md.replace(/<\/?[^>]+(>|$)/g, '')
  
  return md.trim()
}

export default function MarkdownEditor({ content, onChange }: Props) {
  const lastContentRef = useRef(content)
  
  const editor = useEditor({
    extensions: [
      StarterKit,
      Placeholder.configure({
        placeholder: 'Cette section est vide...',
      }),
    ],
    content: markdownToHtml(content),
    immediatelyRender: false,
    editorProps: {
      attributes: {
        class: 'document-content tiptap-editor',
      },
    },
    onUpdate: ({ editor }) => {
      const html = editor.getHTML()
      const md = htmlToMarkdown(html)
      lastContentRef.current = md
      onChange(md)
    },
  })

  // Update editor when content prop changes (e.g., after regenerate)
  useEffect(() => {
    if (editor && content !== lastContentRef.current) {
      lastContentRef.current = content
      editor.commands.setContent(markdownToHtml(content))
    }
  }, [content, editor])

  if (!editor) return null

  return <EditorContent editor={editor} />
}