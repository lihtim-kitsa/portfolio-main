'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ChevronDown, FileJson, FileType2, FileCode2, FileText, FolderOpen, Hash } from 'lucide-react';

export const FILES = [
  { name: 'home.tsx', path: '/', icon: <FileType2 size={16} color="#519aba" /> },
  { name: 'about.html', path: '/about', icon: <FileCode2 size={16} color="#e34c26" /> },
  { name: 'skills.json', path: '/skills', icon: <FileJson size={16} color="#cbcb41" /> },
  { name: 'projects.js', path: '/projects', icon: <FileJson size={16} color="#cbcb41" /> },
  { name: 'blog.md', path: '/blog', icon: <FileText size={16} color="#519aba" /> },
  { name: 'contact.css', path: '/contact', icon: <Hash size={16} color="#42b883" /> }
];

import React from 'react';

export default React.memo(function VSCodeSidebar() {
  const pathname = usePathname();

  return (
    <div className="vscode-sidebar" style={{ width: '250px', background: 'var(--vscode-sidebar-bg)', borderRight: '1px solid var(--vscode-border)', display: 'flex', flexDirection: 'column' }}>
      <div className="vscode-sidebar-header" style={{ padding: '12px 20px', fontSize: '11px', fontWeight: 600, letterSpacing: '0.5px' }}>
        EXPLORER
      </div>
      
      <div className="vscode-sidebar-section">
        <div className="vscode-sidebar-header" style={{ padding: '4px 8px', display: 'flex', alignItems: 'center', gap: '4px', cursor: 'pointer', fontWeight: 'bold' }}>
          <ChevronDown size={16} />
          PORTFOLIO
        </div>
        
        <div className="vscode-sidebar-files" style={{ paddingLeft: '12px' }}>
          {FILES.map((file) => {
            const isActive = pathname === file.path || (file.path !== '/' && pathname.startsWith(file.path));
            return (
              <Link 
                key={file.path} 
                href={file.path}
                className={`vscode-sidebar-link ${isActive ? 'active' : ''}`}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '4px 16px',
                  backgroundColor: isActive ? 'var(--vscode-hover)' : 'transparent',
                  color: isActive ? 'var(--vscode-text)' : 'var(--vscode-text-muted)',
                  borderLeft: isActive ? '2px solid var(--vscode-accent)' : '2px solid transparent'
                }}
              >
                {file.icon}
                <span className="vscode-sidebar-link-text">{file.name}</span>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
});
