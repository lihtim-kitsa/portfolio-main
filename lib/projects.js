export const projects = [
  {
    id: 'apex-pinn',
    title: 'APEX-PINN',
    description: 'A unified framework for residual-adaptive, physics-exact neural PDE solvers with multi-architecture benchmarking (MLPs, KANs, Transformers) across coupled fluid-thermal-electromagnetic systems.',
    tech: ['Python', 'PyTorch', 'Scientific ML', 'PDEs'],
    category: 'Machine Learning',
    link: '#',
    github: 'https://github.com/lihtim-kitsa/apex-pinn',
    featured: true,
  },
  {
    id: 'jarvis-v3',
    title: 'J.A.R.V.I.S. v3.0',
    description: 'An advanced, agentic AI Assistant powered by Google Gemini, built with a scalable Cloud-Local architecture (Node.js, Electron, Python). Acts as a fully autonomous, state-aware pair programmer and system orchestrator.',
    tech: ['Electron', 'Node.js', 'Python', 'Gemini API', 'SQLite'],
    category: 'AI / Automation',
    link: '#',
    github: 'https://github.com/lihtim-kitsa/jarvis-maybe',
    featured: true,
  },
  {
    id: 'fraudguard',
    title: 'FraudGuard',
    description: 'Real-Time Fraud Detection System scoring financial transactions for risk. Features trained XGBoost/LightGBM models, SHAP explainability, cost-aware decisioning, and a live React monitoring dashboard.',
    tech: ['Python', 'FastAPI', 'React', 'XGBoost'],
    category: 'Machine Learning',
    link: '#',
    github: 'https://github.com/lihtim-kitsa/FraudGuard',
    featured: false,
  },
  {
    id: 'keplers-oracle',
    title: 'Kepler\'s Oracle',
    description: 'An advanced machine learning project and interactive dashboard that classifies potential exoplanets using real NASA datasets (Kepler Objects of Interest) using XGBoost and LightGBM.',
    tech: ['Python', 'Streamlit', 'XGBoost', 'SHAP'],
    category: 'Data Science',
    link: '#',
    github: 'https://github.com/lihtim-kitsa/keplers-oracle',
    featured: false,
  },
  {
    id: 'temporal-oracle',
    title: 'Temporal Oracle',
    description: 'A single-page web app that drops users into genuine historical "fog of war," asks them to forecast outcomes, then scores their calibration over time. Think of it as Wordle for epistemics.',
    tech: ['JavaScript', 'HTML/CSS', 'SPA'],
    category: 'Web',
    link: '#',
    github: 'https://github.com/lihtim-kitsa/temporal-oracle',
    featured: false,
  },
  {
    id: 'quantum-feynatics',
    title: 'Quantum Feynatics',
    description: 'An info website for the Quantum Computing Team of IEEE Student Branch, BPHC.',
    tech: ['Web', 'HTML/CSS'],
    category: 'Web',
    link: 'quantum-feynatics.vercel.app',
    github: '#',
    featured: true,
  },
  {
    id: 'beijan-website',
    title: 'Beijan Tech',
    description: 'A complete info website for a startup based in India named Beijan Tech.',
    tech: ['Web', 'HTML/CSS'],
    category: 'Web',
    link: 'beijan.com',
    github: '#',
    featured: true,
  },
  {
    id: 'mobile-store',
    title: 'Mobile Store Automator',
    description: 'A custom web app for insertion of mobile phone model orders and automation of a sorted excel sheet based on those orders immediately sent to required emails.',
    tech: ['Web', 'Automation', 'Excel'],
    category: 'Web',
    link: '#',
    github: '#',
    featured: false,
  },
];

export function getFeaturedProjects() {
  return projects.filter((p) => p.featured);
}

export function getAllProjects() {
  return projects;
}

export function getProjectCategories() {
  const categories = new Set(projects.map((p) => p.category));
  return Array.from(categories);
}
