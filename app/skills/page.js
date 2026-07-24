export const metadata = {
  title: 'Skills',
  description: 'Technical skills',
};

export default function SkillsPage() {
  const skills = {
    languages: ["Python", "Rust", "JavaScript", "TypeScript", "C++", "HTML/CSS", "C"],
    frameworks: ["React", "Next.js", "Node.js", "Express", "TailwindCSS", "Framer Motion"],
    databases: ["PostgreSQL", "MongoDB", "Redis", "SQLite", "Vector DBs"],
    tools: ["Git", "Docker", "Linux", "AWS", "Figma", "VS Code", "Adobe Photoshop", "Adobe Illustrator", "Adobe After Effects"],
    machineLearning: ["PyTorch", "TensorFlow", "Scikit-Learn", "Hugging Face", "Pandas", "XGBoost"]
  };

  return (
    <div className="mono">
      <div className="syn-comment" style={{ marginBottom: '24px' }}>
        {'// skills.json - My technical stack'}
      </div>

      <div style={{ color: 'var(--vscode-text)' }}>{'{'}</div>

      <div style={{ paddingLeft: '24px' }}>
        {Object.entries(skills).map(([category, items], i, arr) => (
          <div key={category}>
            <span className="syn-property">"{category}"</span>: <span style={{ color: 'var(--vscode-text)' }}>[</span>
            <div style={{ paddingLeft: '24px' }}>
              {items.map((item, j) => (
                <div key={item}>
                  <span className="syn-string">"{item}"</span>
                  <span style={{ color: 'var(--vscode-text)' }}>{j < items.length - 1 ? ',' : ''}</span>
                </div>
              ))}
            </div>
            <span style={{ color: 'var(--vscode-text)' }}>]{i < arr.length - 1 ? ',' : ''}</span>
          </div>
        ))}
      </div>

      <div style={{ color: 'var(--vscode-text)' }}>{'}'}</div>
    </div>
  );
}
