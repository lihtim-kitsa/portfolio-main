import { getAllProjects, getProjectCategories } from '@/lib/projects';
import ProjectsListClient from './ProjectsListClient';
import DialogueBox from '@/components/DialogueBox';

export const metadata = {
  title: 'Projects',
  description: 'A showcase of projects built by Mithil Astik — from web apps to systems programming and security tools.',
};

export default function ProjectsPage() {
  const projects = getAllProjects();
  const categories = getProjectCategories();

  return (
    <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
      <div style={{ marginBottom: '32px' }}>
        <DialogueBox 
          text="* Here are my key items (projects)." 
          speed={40} 
        />
      </div>

      <ProjectsListClient projects={projects} categories={categories} />
    </div>
  );
}

