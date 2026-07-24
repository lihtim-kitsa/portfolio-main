export const metadata = {
  title: 'Contact',
  description: 'Contact Mithil Astik',
};

export default function ContactPage() {
  return (
    <div className="mono">
      <div className="syn-comment" style={{ marginBottom: '24px' }}>
        {'/* contact.css - Get in touch */'}
      </div>

      <div style={{ color: 'var(--vscode-text)' }}>
        <span className="syn-tag">.contact-info</span> {'{'}
      </div>

      <div style={{ paddingLeft: '24px' }}>
        <div><span className="syn-property">email</span>: <a href="mailto:astik.mithil@gmail.com" target="_blank" rel="noreferrer" className="syn-string">"astik.mithil@gmail.com"</a>;</div>
        <div><span className="syn-property">Instagram</span>: <a href="https://instagram.com/lihtimkitsa" target="_blank" rel="noreferrer" className="syn-string">"@lihtimkitsa"</a>;</div>
        <div><span className="syn-property">github</span>: <a href="https://github.com/lihtim-kitsa" target="_blank" rel="noreferrer" className="syn-string">"github.com/lihtim-kitsa"</a>;</div>
        <div><span className="syn-property">linkedin</span>: <a href="https://linkedin.com/in/mithil-astik" target="_blank" rel="noreferrer" className="syn-string">"linkedin.com/in/mithil-astik"</a>;</div>
      </div>

      <div style={{ color: 'var(--vscode-text)' }}>{'}'}</div>

      <br />

      <div style={{ color: 'var(--vscode-text)' }}>
        <span className="syn-tag">.availability</span> {'{'}
      </div>

      <div style={{ paddingLeft: '24px' }}>
        <div><span className="syn-property">status</span>: <span className="syn-string">"Open to opportunities"</span>;</div>
        <div><span className="syn-property">response-time</span>: <span className="syn-number">24h</span>;</div>
      </div>

      <div style={{ color: 'var(--vscode-text)' }}>{'}'}</div>
    </div>
  );
}
