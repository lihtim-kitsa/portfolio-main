export const metadata = {
  title: 'About',
  description: 'About Mithil Astik',
};

export default function AboutPage() {
  return (
    <div className="mono">
      <div className="syn-comment" style={{ marginBottom: '24px' }}>
        {'<!-- about.html - Mithil Astik -->'}
      </div>

      <h1 style={{ 
        fontFamily: 'var(--font-heading)', 
        fontSize: '48px', 
        fontWeight: 900,
        color: '#ffffff',
        textTransform: 'uppercase',
        marginBottom: '16px'
      }}>
        About Me
      </h1>

      <div className="syn-comment" style={{ marginBottom: '48px' }}>
        {'// who I am · what I do · where I build'}
      </div>

      <div style={{ border: '1px solid var(--vscode-border)', padding: '32px', borderRadius: '8px', marginBottom: '24px' }}>
        <p style={{ lineHeight: 1.8 }}>
          Hi! I'm <span className="syn-property">Mithil Astik</span>, a software developer living at the crossroads of <span className="syn-property">systems engineering</span>, <span className="syn-property">security</span>, and <span className="syn-property">open-source</span>. I love building systems that are not just functional but genuinely <span className="syn-function">resilient and efficient</span>. Currently, I'm exploring Rust and building developer tools.
        </p>
      </div>

      <div style={{ border: '1px solid var(--vscode-border)', padding: '32px', borderRadius: '8px' }}>
        <h2 style={{ fontSize: '16px', letterSpacing: '2px', color: 'var(--syn-property)', marginBottom: '24px', textTransform: 'uppercase' }}>
          Current Focus
        </h2>
        
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', color: 'var(--vscode-text-muted)' }}>
          <div style={{ display: 'flex', gap: '12px' }}>
            <span>🔭</span> Building performant CLI tools in Rust
          </div>
          <div style={{ display: 'flex', gap: '12px' }}>
            <span>🧠</span> Deep interest in security architectures
          </div>
          <div style={{ display: 'flex', gap: '12px' }}>
            <span>🌱</span> Exploring WebAssembly and systems programming
          </div>
          <div style={{ display: 'flex', gap: '12px' }}>
            <span>💬</span> Talk to me about Linux, APIs, and open-source
          </div>
          <div style={{ display: 'flex', gap: '12px' }}>
            <span>⚡</span> Making complex systems understandable
          </div>
          <div style={{ display: 'flex', gap: '12px' }}>
            <span>✨</span> Always learning, always shipping
          </div>
        </div>
      </div>
    </div>
  );
}
