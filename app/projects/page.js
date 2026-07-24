import { getAllProjects, getProjectCategories } from '@/lib/projects';
import ProjectsListClient from './ProjectsListClient';

export const metadata = {
  title: 'Projects',
  description: 'A showcase of projects built by Mithil Astik — from web apps to systems programming and security tools.',
};

export default function ProjectsPage() {
  const projects = getAllProjects();
  const categories = getProjectCategories();

  return (
    <div className="container">
      <div style={{ padding: 'var(--space-16) 0 var(--space-8)' }}>
        <h1 style={{
          fontFamily: 'var(--font-heading)',
          fontSize: 'var(--text-4xl)',
          fontWeight: 700,
          letterSpacing: '-0.03em',
          marginBottom: 'var(--space-3)',
        }}>
          Projects
        </h1>
        <p style={{
          fontSize: 'var(--text-base)',
          color: 'var(--text-secondary)',
          maxWidth: '500px',
        }}>
          Things I&apos;ve built, hacked on, and shipped. From side projects to serious tools.
        </p>
      </div>

      <ProjectsListClient projects={projects} categories={categories} />
    </div>
  );
}
