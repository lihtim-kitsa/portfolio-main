export const metadata = {
  title: 'Experience',
  description: 'Work experience and history.',
};

export default function ExperiencePage() {
  const experiences = [
    {
      id: 1,
      role: 'Machine Learning Engineer',
      company: 'Tech Corp',
      period: '2023 - Present',
      description: 'Developing scalable LLM pipelines, architecting retrieval-augmented generation systems, and optimizing embedding search.',
      tech: ['Python', 'PyTorch', 'FastAPI', 'Pinecone', 'LangChain']
    },
    {
      id: 2,
      role: 'Full Stack Web Developer',
      company: 'Freelance',
      period: '2021 - 2023',
      description: 'Built complex, responsive web applications for various clients. Integrated custom CMS systems and managed cloud deployments.',
      tech: ['React', 'Next.js', 'Node.js', 'PostgreSQL', 'AWS']
    },
    {
      id: 3,
      role: 'Systems Engineering Intern',
      company: 'Open Source Security Foundation',
      period: '2021',
      description: 'Contributed to open-source security tools, automated vulnerability scanning pipelines, and improved CI/CD workflows.',
      tech: ['Bash', 'Docker', 'GitHub Actions', 'Python']
    }
  ];

  return (
    <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
      <div style={{ color: 'var(--accent)', marginBottom: '32px' }}>
        guest@mithil-os:~$ cat /sys/logs/experience.log<br/>
        <span style={{ color: 'var(--text-secondary)' }}>Reading historical records... [OK]</span>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '32px', position: 'relative' }}>
        {/* Timeline Line */}
        <div style={{ position: 'absolute', left: '16px', top: '0', bottom: '0', width: '2px', background: 'var(--border-subtle)', zIndex: 0 }}></div>

        {experiences.map((exp) => (
          <div key={exp.id} style={{ display: 'flex', gap: '24px', position: 'relative', zIndex: 1 }}>
            {/* Timeline dot */}
            <div style={{ 
              width: '12px', 
              height: '12px', 
              background: 'var(--accent)', 
              borderRadius: '50%', 
              marginTop: '12px',
              marginLeft: '11px',
              boxShadow: '0 0 10px var(--accent-glow)',
              flexShrink: 0
            }}></div>

            <div className="term-card" style={{ padding: '24px', flex: 1 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '16px', marginBottom: '16px' }}>
                <div>
                  <h3 style={{ fontSize: '18px', fontWeight: 'bold', color: 'var(--text-primary)', marginBottom: '4px' }}>
                    <span style={{ color: 'var(--accent)', marginRight: '8px' }}>&gt;</span>
                    {exp.role}
                  </h3>
                  <div style={{ color: 'var(--text-secondary)', fontSize: '14px', marginLeft: '16px' }}>
                    @ {exp.company}
                  </div>
                </div>
                <div style={{ 
                  color: 'var(--bg-base)', 
                  background: 'var(--accent)', 
                  padding: '4px 12px', 
                  borderRadius: '2px', 
                  fontSize: '12px',
                  fontWeight: 'bold',
                  letterSpacing: '1px'
                }}>
                  [{exp.period}]
                </div>
              </div>

              <p style={{ color: 'var(--text-secondary)', fontSize: '14px', marginBottom: '24px', marginLeft: '16px' }}>
                {exp.description}
              </p>

              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginLeft: '16px' }}>
                {exp.tech.map((t, idx) => (
                  <span key={idx} style={{ 
                    border: '1px solid var(--border-subtle)', 
                    padding: '2px 8px', 
                    fontSize: '11px', 
                    color: 'var(--text-secondary)'
                  }}>
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <div style={{ marginTop: '32px', display: 'flex', gap: '12px' }}>
        <span style={{ color: 'var(--accent)', fontWeight: 'bold' }}>guest@mithil-os:~$</span>
        <span className="cursor-blink"></span>
      </div>
    </div>
  );
}
