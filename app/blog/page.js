import { getAllPosts, getAllCategories } from '@/lib/posts';
import BlogListClient from './BlogListClient';
import styles from './blog.module.css';

export const metadata = {
  title: 'Blog',
  description: 'Technical writing, project case studies, and thoughts on software development by Mithil Astik.',
};

export default function BlogPage() {
  const posts = getAllPosts();
  const categories = getAllCategories();

  return (
    <div className="container">
      <div className={styles.pageHeader}>
        <h1 className={styles.pageTitle}>Blog</h1>
        <p className={styles.pageDescription}>
          Writing about code, projects, and the things I learn along the way.
        </p>
      </div>

      <BlogListClient posts={posts} categories={categories} />
    </div>
  );
}
