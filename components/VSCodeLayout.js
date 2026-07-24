'use client';

import VSCodeSidebar from './VSCodeSidebar';
import VSCodeTabs from './VSCodeTabs';
import { Search, Files, GitBranch, Settings, LayoutDashboard } from 'lucide-react';

export default function VSCodeLayout({ children }) {
  return (
    <div className="vscode-app">
      {/* Title Bar */}
      <div style={{ height: '30px', background: 'var(--vscode-titlebar-bg)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px', color: 'var(--vscode-text-muted)', position: 'relative' }}>
        <div style={{ position: 'absolute', left: '16px', display: 'flex', gap: '8px' }}>
          <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#ff5f56' }} />
          <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#ffbd2e' }} />
          <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#27c93f' }} />
        </div>
        <div style={{ background: '#2d2d2d', padding: '2px 120px', borderRadius: '4px', border: '1px solid #3c3c3c' }}>
          mithil-astik-portfolio
        </div>
      </div>

      <div className="vscode-main">
        {/* Activity Bar */}
        <div style={{ width: '48px', background: 'var(--vscode-activitybar-bg)', display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '16px 0', gap: '24px', color: 'var(--vscode-text-muted)' }}>
          <Files size={24} color="var(--vscode-text)" />
          <Search size={24} />
          <GitBranch size={24} />
          <LayoutDashboard size={24} />
          <div style={{ flex: 1 }} />
          <Settings size={24} />
        </div>

        {/* Sidebar */}
        <VSCodeSidebar />

        {/* Editor Area */}
        <div className="vscode-editor-pane">
          <VSCodeTabs />
          <div className="vscode-editor-content">
            {children}
          </div>
        </div>
      </div>

      {/* Status Bar */}
      <div style={{ height: '22px', background: 'var(--vscode-statusbar-bg)', color: 'white', fontSize: '11px', display: 'flex', alignItems: 'center', padding: '0 16px', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
          <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><GitBranch size={12} /> main</span>
          <span>ⓧ 0 ⚠ 0</span>
        </div>
        <div style={{ display: 'flex', gap: '16px' }}>
          <span>UTF-8</span>
          <span>Prettier</span>
          <span>Aahana Dark</span>
        </div>
      </div>
    </div>
  );
}
