import SkillsClient from './SkillsClient';

export const metadata = {
  title: 'Skills',
  description: 'Technical skills',
};

export default function SkillsPage() {
  const categories = [
    {
      title: "LANGUAGES",
      skills: [
        { name: "Python", percentage: 92, color: "#d946ef" },
        { name: "Java", percentage: 72, color: "#f97316" },
        { name: "JavaScript", percentage: 78, color: "#eab308" },
        { name: "TypeScript", percentage: 74, color: "#0ea5e9" },
        { name: "SQL", percentage: 88, color: "#a855f7" },
      ]
    },
    {
      title: "GENERATIVE AI",
      skills: [
        { name: "LangChain", percentage: 82, color: "#10b981" },
        { name: "LangGraph", percentage: 78, color: "#10b981" },
        { name: "RAG Pipelines", percentage: 85, color: "#0ea5e9" },
        { name: "Prompt Eng", percentage: 90, color: "#eab308" },
        { name: "Agentic AI", percentage: 80, color: "#a855f7" },
      ]
    },
    {
      title: "AI & ML",
      skills: [
        { name: "PyTorch", percentage: 85, color: "#ef4444" },
        { name: "TensorFlow", percentage: 80, color: "#f97316" },
        { name: "scikit-learn", percentage: 90, color: "#eab308" },
        { name: "Pandas", percentage: 88, color: "#6366f1" },
      ]
    },
    {
      title: "BACKEND",
      skills: [
        { name: "FastAPI", percentage: 90, color: "#10b981" },
        { name: "Flask", percentage: 82, color: "#6366f1" },
        { name: "Django", percentage: 76, color: "#10b981" },
      ]
    },
    {
      title: "DATABASES",
      skills: [
        { name: "PostgreSQL", percentage: 88, color: "#0ea5e9" },
        { name: "MongoDB", percentage: 85, color: "#10b981" },
        { name: "Redis", percentage: 82, color: "#ef4444" },
        { name: "Pinecone", percentage: 85, color: "#10b981" },
      ]
    }
  ];

  return <SkillsClient categories={categories} />;
}

