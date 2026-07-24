'use client';

import { usePathname, useRouter } from 'next/navigation';
import { useTabs } from './TabContext';
import { X } from 'lucide-react';

import React from 'react';

export default React.memo(function VSCodeTabs() {
  const pathname = usePathname();
  const router = useRouter();
  const { openTabs, closeTab } = useTabs();

  return (
    <div style={{ display: 'flex', background: 'var(--vscode-sidebar-bg)', borderBottom: '1px solid var(--vscode-border)', overflowX: 'auto' }}>
      {openTabs.map(file => {
        const isActive = pathname === file.path || (file.path !== '/' && pathname.startsWith(file.path));
        return (
          <div 
            key={file.path}
            style={{
              padding: '8px 12px',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              backgroundColor: isActive ? 'var(--vscode-bg)' : 'transparent',
              color: isActive ? 'var(--vscode-text)' : 'var(--vscode-text-muted)',
              borderTop: isActive ? '1px solid var(--vscode-accent)' : '1px solid transparent',
              borderRight: '1px solid var(--vscode-border)',
              cursor: 'pointer',
              minWidth: '140px',
              userSelect: 'none'
            }}
            onClick={() => router.push(file.path)}
          >
            {file.icon}
            <span style={{ flex: 1, fontSize: '13px' }}>{file.name}</span>
            <div 
              onClick={(e) => closeTab(e, file.path)}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '2px',
                borderRadius: '4px',
                cursor: 'pointer'
              }}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'var(--vscode-hover)'}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
            >
              <X size={14} />
            </div>
          </div>
        )
      })}
    </div>
  );
});
