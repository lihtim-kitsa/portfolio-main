import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { notFound } from 'next/navigation';
import { getAllPosts, getPostBySlug } from '@/lib/posts';
import { renderMarkdown } from '@/lib/markdown';
import { formatDate } from '@/lib/utils';
import styles from './post.module.css';

export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};

  return {
    title: post.title,
    description: post.excerpt,
  };
}

export default async function BlogPostPage({ params }) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const htmlContent = renderMarkdown(post.content);

  return (
    <div style={{ maxWidth: '900px', margin: '0 auto', paddingBottom: '64px' }}>
      
      <div style={{ marginBottom: '32px' }}>
        <Link href="/blog" className="battle-action text-blue" style={{ textDecoration: 'none', display: 'inline-block', fontSize: '20px' }}>
          ♥ [RETURN]
        </Link>
      </div>

      <div className="dialogue-box" style={{ flexDirection: 'column', padding: '32px' }}>
        <header style={{ marginBottom: '32px', borderBottom: '2px solid white', paddingBottom: '16px' }}>
          <h1 className="text-yellow" style={{ fontSize: '32px', fontWeight: 'bold', marginBottom: '8px' }}>
            * {post.title}
          </h1>
          <div style={{ color: '#999', fontSize: '16px' }}>
            {formatDate(post.date)} | {post.readingTime}
          </div>
        </header>

        <article 
          className="blog-content"
          style={{ fontSize: '20px', lineHeight: '1.6' }}
          dangerouslySetInnerHTML={{ __html: htmlContent }}
        />
      </div>

      <style>{`
        .blog-content h2 {
          color: var(--accent-blue);
          font-size: 28px;
          margin-top: 32px;
          margin-bottom: 16px;
        }
        .blog-content h3 {
          color: var(--accent-green);
          font-size: 24px;
          margin-top: 24px;
          margin-bottom: 12px;
        }
        .blog-content p {
          margin-bottom: 24px;
          color: var(--text-primary);
        }
        .blog-content ul, .blog-content ol {
          margin-bottom: 24px;
          padding-left: 32px;
        }
        .blog-content li {
          margin-bottom: 8px;
        }
        .blog-content code {
          background: #222;
          padding: 2px 6px;
          color: var(--accent-yellow);
        }
        .blog-content pre {
          background: #111;
          padding: 16px;
          overflow-x: auto;
          border: 1px solid #444;
          margin-bottom: 24px;
        }
        .blog-content pre code {
          background: transparent;
          color: inherit;
        }
        .blog-content blockquote {
          border-left: 4px solid var(--accent-yellow);
          padding-left: 16px;
          color: #888;
          margin-bottom: 24px;
        }
        .blog-content a {
          color: var(--accent-blue);
        }
      `}</style>
    </div>
  );
}
