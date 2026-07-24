import Link from 'next/link';
import Typewriter from '@/components/Typewriter';

export default function Home() {
  return (
    <div className="mono">
      <div className="syn-comment" style={{ marginBottom: '32px' }}>
        {'// hello world !! Welcome to my portfolio'}
      </div>

      <h1 style={{
        fontFamily: 'var(--font-heading)',
        fontSize: '8vw',
        lineHeight: 1,
        fontWeight: 900,
        color: '#ffffff',
        textTransform: 'uppercase',
        marginBottom: '32px'
      }}>
        Mithil<br />Astik
      </h1>

      <div style={{ display: 'flex', gap: '16px', marginBottom: '32px', flexWrap: 'wrap' }}>
        <span style={{ padding: '4px 12px', border: '1px solid var(--vscode-border)', borderRadius: '4px', fontSize: '12px' }}>
          <span style={{ color: '#ffbd2e', marginRight: '6px' }}>●</span> ML Engineer
        </span>
        <span style={{ padding: '4px 12px', border: '1px solid var(--vscode-border)', borderRadius: '4px', fontSize: '12px' }}>
          <span style={{ color: '#ff5f56', marginRight: '6px' }}>●</span> Web Developer
        </span>
        <span style={{ padding: '4px 12px', border: '1px solid var(--vscode-border)', borderRadius: '4px', fontSize: '12px' }}>
          <span style={{ color: '#27c93f', marginRight: '6px' }}>●</span> Designer
        </span>
      </div>

      <div className="syn-comment" style={{ marginBottom: '32px' }}>
        <Typewriter />
      </div>

      <p style={{ maxWidth: '600px', marginBottom: '48px', fontSize: '16px' }}>
        I live at the crossroads of <span className="syn-property">systems engineering</span>, <span className="syn-property">open-source</span>, and <span className="syn-property">security</span>. I build tools that are genuinely <span className="syn-function">reliable and scalable</span>.
      </p>

      <div style={{ display: 'flex', gap: '16px' }}>
        <Link href="/projects" style={{ padding: '8px 24px', background: 'var(--vscode-accent)', color: '#fff', borderRadius: '4px', fontWeight: 'bold' }}>
          📂 Projects
        </Link>
        <Link href="/about" style={{ padding: '8px 24px', border: '1px solid var(--vscode-border)', borderRadius: '4px' }}>
          👤 About Me
        </Link>
        <a href="mailto:hello@example.com" style={{ padding: '8px 24px', border: '1px solid var(--vscode-border)', borderRadius: '4px' }}>
          ✉ Contact
        </a>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '24px', marginTop: '64px', borderTop: '1px solid var(--vscode-border)', paddingTop: '32px' }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#fff' }}>2+</div>
          <div className="syn-comment" style={{ fontSize: '12px', marginTop: '8px' }}>YEARS</div>
        </div>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#fff' }}>8+</div>
          <div className="syn-comment" style={{ fontSize: '12px', marginTop: '8px' }}>PROJECTS</div>
        </div>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#fff' }}>∞</div>
          <div className="syn-comment" style={{ fontSize: '12px', marginTop: '8px' }}>CURIOSITY</div>
        </div>
      </div>
    </div>
  );
}
