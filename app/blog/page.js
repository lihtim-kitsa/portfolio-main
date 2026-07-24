import { getAllPosts, getAllCategories } from '@/lib/posts';
import BlogListClient from './BlogListClient';
import DialogueBox from '@/components/DialogueBox';

export const metadata = {
  title: 'Blog',
  description: 'Technical writing, project case studies, and thoughts on software development by Mithil Astik.',
};

export default function BlogPage() {
  const posts = getAllPosts();
  const categories = getAllCategories();

  return (
    <div style={{ maxWidth: '1000px', margin: '0 auto', paddingBottom: '32px' }}>
      <div style={{ marginBottom: '32px' }}>
        <DialogueBox 
          text="* You spot some ancient texts. Read them?" 
          speed={40} 
        />
      </div>

      <BlogListClient posts={posts} categories={categories} />
    </div>
  );
}
