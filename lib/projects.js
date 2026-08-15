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
    status: 'Mid-Dungeon',
    chapter: 1,
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
    status: 'Mid-Dungeon',
    chapter: 2,
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
    status: 'Completed',
    chapter: 3,
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
    status: 'Completed',
    chapter: 4,
  },
  {
    id: 'temporal-oracle',
    title: 'Temporal Oracle',
    description: 'A single-page web app that drops users into genuine historical "fog of war," asks them to forecast outcomes, then scores their calibration over time. Think of it as Wordle for epistemics.',
    tech: ['React', 'Tailwind CSS', 'SPA'],
    category: 'Web',
    link: 'temporal-oracle.vercel.app',
    github: 'https://github.com/lihtim-kitsa/temporal-oracle',
    featured: false,
    status: 'Mid-Dungeon',
    chapter: 5,
  },
  {
    id: 'quantum-feynatics',
    title: 'Quantum Feynatics',
    description: 'An info website for the Quantum Computing Team of IEEE Student Branch, BPHC.',
    tech: ['React', 'Tailwind CSS'],
    category: 'Web',
    link: 'quantum-feynatics.vercel.app',
    github: '#',
    featured: true,
    status: 'Completed',
    chapter: 6,
  },
  {
    id: 'beijan-website',
    title: 'Beijan Tech',
    description: 'A complete info website for a startup based in India named Beijan Tech.',
    tech: ['React', 'Tailwind CSS'],
    category: 'Web',
    link: 'beijan.com',
    github: '#',
    featured: true,
    status: 'Completed',
    chapter: 7,
  },
  {
    id: 'mobile-store',
    title: 'Mobile Store Inventory Portal',
    description: 'A Next.js web application built to manage phone model inventory and streamline the daily ordering process between Headquarters and branch stores. Features Role-Based Access Control, automated Excel PO exports via email, and real-time estimates.',
    tech: ['Next.js', 'React', 'Supabase', 'ExcelJS', 'Nodemailer'],
    category: 'Web',
    link: '#',
    github: '#',
    featured: false,
    status: 'Completed',
    chapter: 8,
  },
  {
    id: 'beijan-log-analyzer',
    title: 'Drift Log Analyzer (Beijan Tech)',
    description: 'A web-based VIO position vs GPS divergence analysis tool synced to flight footage. Supports ArduPilot DataFlash .bin and SQLite .db telemetry logs, featuring 3D trajectory plots and WebAssembly-powered video transcoding.',
    tech: ['React', 'Plotly', 'Chart.js', 'FFmpeg.wasm', 'SQL.js'],
    category: 'Web',
    link: 'log-analyzer-beijan.vercel.app',
    github: '#',
    featured: true,
    status: 'Completed',
    chapter: 9,
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
