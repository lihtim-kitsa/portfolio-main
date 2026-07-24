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
    <div className="container" style={{ paddingTop: '120px', maxWidth: '800px' }}>
      <article>
        <Link href="/blog" style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12px', textTransform: 'uppercase', marginBottom: '32px', color: 'var(--text-secondary)' }}>
          <ArrowLeft size={12} />
          back to blog
        </Link>

        <header style={{ marginBottom: '48px' }}>
          <div className="mono" style={{ color: 'var(--text-secondary)', marginBottom: '16px' }}>
            <span>{formatDate(post.date)}</span>
            <span style={{ margin: '0 8px' }}>·</span>
            <span>{post.readingTime}</span>
          </div>
          <h1 style={{ fontSize: '32px', fontWeight: 500 }}>{post.title}</h1>
        </header>

        <div
          dangerouslySetInnerHTML={{ __html: htmlContent }}
        />
      </article>
    </div>
  );
}
