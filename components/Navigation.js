'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navItems = [
  { path: '/', label: 'home' },
  { path: '/projects', label: 'projects' },
  { path: '/skills', label: 'skills' },
  { path: '/experience', label: 'experience' },
  { path: '/blog', label: 'blog' },
  { path: '/contact', label: 'contact' },
  { path: '/terminal', label: 'terminal' }
];

export default function Navigation() {
  const pathname = usePathname();

  return (
    <nav aria-label="Main" className="mono" style={{
      padding: '24px 32px',
      borderBottom: '1px solid var(--border-subtle)',
      background: 'var(--bg-base)',
      display: 'flex',
      flexDirection: 'column',
      gap: '12px'
    }}>
      <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
        <span style={{ color: 'var(--accent)', fontWeight: 'bold' }}>guest@mithil-os:~$</span>
        <span style={{ color: 'var(--text-primary)' }}>ls ./pages</span>
      </div>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px' }}>
        {navItems.map((item) => {
          const isActive = pathname === item.path;
          return (
            <Link 
              key={item.path} 
              href={item.path}
              aria-current={isActive ? 'page' : undefined}
              style={{
                color: isActive ? 'var(--bg-base)' : 'var(--accent)',
                backgroundColor: isActive ? 'var(--accent)' : 'transparent',
                padding: '2px 8px',
                fontWeight: isActive ? 'bold' : 'normal',
                textDecoration: 'none'
              }}
              onMouseEnter={(e) => {
                if (!isActive) {
                  e.currentTarget.style.backgroundColor = 'var(--bg-surface)';
                  e.currentTarget.style.textDecoration = 'underline';
                }
              }}
              onMouseLeave={(e) => {
                if (!isActive) {
                  e.currentTarget.style.backgroundColor = 'transparent';
                  e.currentTarget.style.textDecoration = 'none';
                }
              }}
            >
              [{item.label}]
            </Link>
          );
        })}
        <a
          href="/resume.pdf"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            color: 'var(--accent)',
            backgroundColor: 'transparent',
            padding: '2px 8px',
            textDecoration: 'none'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = 'var(--bg-surface)';
            e.currentTarget.style.textDecoration = 'underline';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = 'transparent';
            e.currentTarget.style.textDecoration = 'none';
          }}
        >
          [resume]
        </a>
        <button
          aria-label="Open command search"
          onClick={() => window.dispatchEvent(new CustomEvent('open-cmd-palette'))}
          style={{
            color: 'var(--text-primary)',
            backgroundColor: 'var(--border-subtle)',
            border: 'none',
            padding: '2px 8px',
            cursor: 'pointer',
            fontFamily: 'inherit',
            fontSize: 'inherit'
          }}
          onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'var(--bg-panel)'}
          onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'var(--border-subtle)'}
        >
          [search / ⌘K]
        </button>
      </div>
    </nav>
  );
}
