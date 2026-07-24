'use client';

export default function BlogListClient({ posts }) {
  return (
    <div className="mono">
      <div className="syn-comment" style={{ marginBottom: '24px' }}>
        {'<!-- blog.md - My thoughts and writings -->'}
      </div>

      <h1 style={{ color: 'var(--syn-keyword)', fontSize: '24px', marginBottom: '24px' }}>
        # Blog Posts
      </h1>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
        {posts.map((post) => (
          <div key={post.slug} style={{ cursor: 'pointer' }} onClick={() => window.location.href = `/blog/${post.slug}`}>
            <h2 style={{ color: 'var(--syn-function)', fontSize: '18px', marginBottom: '8px' }}>
              ## {post.title}
            </h2>
            <div style={{ color: 'var(--vscode-text-muted)', marginBottom: '8px', fontSize: '12px' }}>
              <span className="syn-property">date:</span> {post.date} | <span className="syn-property">read:</span> {post.readingTime}
            </div>
            <p style={{ color: 'var(--vscode-text)' }}>
              {post.excerpt}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
