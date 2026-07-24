'use client';

export default function ProjectsListClient({ projects }) {
  return (
    <div className="mono">
      <div className="syn-comment" style={{ marginBottom: '24px' }}>
        {'// projects.js - A showcase of my work'}
      </div>

      <div style={{ color: 'var(--syn-keyword)' }}>export const <span className="syn-variable">projects</span> <span style={{ color: 'var(--vscode-text)' }}>= [</span></div>
      
      <div style={{ paddingLeft: '24px' }}>
        {projects.map((project, i) => (
          <div key={project.id} style={{ marginBottom: '16px' }}>
            <span style={{ color: 'var(--vscode-text)' }}>{'{'}</span>
            <div style={{ paddingLeft: '24px' }}>
              <div><span className="syn-property">id</span>: <span className="syn-string">"{project.id}"</span>,</div>
              <div><span className="syn-property">title</span>: <span className="syn-string">"{project.title}"</span>,</div>
              <div><span className="syn-property">category</span>: <span className="syn-string">"{project.category}"</span>,</div>
              <div><span className="syn-property">demoUrl</span>: <a href={project.demoUrl} target="_blank" rel="noreferrer" className="syn-string">"{project.demoUrl}"</a>,</div>
              <div><span className="syn-property">githubUrl</span>: <a href={project.githubUrl} target="_blank" rel="noreferrer" className="syn-string">"{project.githubUrl}"</a>,</div>
            </div>
            <span style={{ color: 'var(--vscode-text)' }}>{'}'}{i < projects.length - 1 ? ',' : ''}</span>
          </div>
        ))}
      </div>
      
      <div style={{ color: 'var(--vscode-text)' }}>];</div>
    </div>
  );
}
