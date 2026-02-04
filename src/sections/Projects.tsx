import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ExternalLink, Github, FileText, Download, ArrowUpRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface Project {
  id: number;
  title: string;
  category: string;
  description: string;
  image: string;
  techStack: string[];
  links: {
    dashboard?: string;
    github?: string;
    notebook?: string;
    download?: string;
  };
  isResearch?: boolean;
}

const projects: Project[] = [
  {
    id: 1,
    title: 'E-commerce User Behavior Insights',
    category: 'Data-Driven Business Growth',
    description: 'Built scalable Python & SQL pipelines to process 3M+ user behavior records, analyzing retention, traffic distribution, and funnel dynamics. Applied RFC-based segmentation across ~1M users and ~9K categories to support targeted remarketing.',
    image: '/assets/project-1.png',
    techStack: ['Python', 'SQL', 'Tableau', 'Pandas', 'RFM Analysis'],
    links: {
      dashboard: 'https://public.tableau.com/app/profile/yue.hu8512/viz/1_17559239243320/1_1',
      github: 'https://github.com/SlayerXT/E-commerce-User-Behavior-and-Category-Operation-Insights-'
    }
  },
  {
    id: 2,
    title: 'Netflix 2025 User Behavior Analysis',
    category: 'Data-Driven Business Growth',
    description: 'Diagnosed hidden churn risk by combining cohort retention, hazard rates, and zombie analysis. Revealed a large gap between high subscription retention (80%+) and low behavioral engagement (30-40%).',
    image: '/assets/project-2.png',
    techStack: ['Tableau', 'Cohort Analysis', 'RFM Segmentation', 'Python'],
    links: {
      dashboard: 'https://public.tableau.com/app/profile/yue.hu8512/viz/Book2_17575246511870/Dashboard1',
      github: 'https://github.com/SlayerXT/Analysis-of-the-Netflix-2025-User-Behavior-Dataset'
    }
  },
  {
    id: 3,
    title: 'Predicting Customer Churn (E-commerce)',
    category: 'Data-Driven Business Growth',
    description: 'Built an XGBoost churn prediction pipeline, engineering features across purchase, behavior, and service data to identify key drivers of attrition and convert model outputs into actionable risk tiers.',
    image: '/assets/project-3.png',
    techStack: ['XGBoost', 'Python', 'scikit-learn', 'Jupyter', 'Feature Engineering'],
    links: {
      notebook: 'https://github.com/SlayerXT/Predicting-Customer-Churn-for-an-Online-E-Commerce-Company/blob/main/churn_prediction.ipynb',
      github: 'https://github.com/SlayerXT/Predicting-Customer-Churn-for-an-Online-E-Commerce-Company'
    }
  },
  {
    id: 4,
    title: 'Advanced TMR Sensor Calibration',
    category: 'Academic Research & Engineering AI',
    description: 'Master thesis research on improving angle estimation accuracy for industrial/automotive TMR sensors. Compared analytical methods (linear, harmonic correction, ellipse fitting) with a CNN-based regression model to solve nonlinear distortion, phase imbalance, and noise sensitivity.',
    image: '/assets/project-4.png',
    techStack: ['CNN', 'Data Cleaning', 'Ellipse Fitting', 'Linear Calibration', 'Harmonic Calibration', 'Python', 'Jupyter'],
    links: {
      download: '/assets/Yue_Hu_Thesis_Presentation.pptx'
    },
    isResearch: true
  },
  {
    id: 5,
    title: 'Lithium-Ion Battery Furnace Temp Prediction',
    category: 'Academic Research & Engineering AI',
    description: 'Industrial internship project focusing on battery production parameter control and temperature prediction using machine learning models to optimize manufacturing processes.',
    image: '/assets/project-5.png',
    techStack: ['Python', 'Time Series', 'Regression', 'Industrial IoT', 'XGBoost'],
    links: {
      github: 'https://github.com/SlayerXT/Lithium-Ion-Battery-Furnace-Temperature-Prediction'
    }
  },
  {
    id: 6,
    title: 'CNN-Based Image Classification (Edge-AI)',
    category: 'Academic Research & Engineering AI',
    description: 'Designed and implemented convolutional neural networks for image classification with experimental analysis on edge AI platforms, optimizing for latency and accuracy trade-offs.',
    image: '/assets/project-6.png',
    techStack: ['CNN', 'TensorFlow', 'Edge AI', 'Computer Vision', 'Python'],
    links: {
      github: 'https://github.com/SlayerXT/CNN-Based-Image-Classification-and-Experimental-Analysis-on-Edge-AI-Platforms'
    }
  }
];

// Get primary link for image click (GitHub优先，其次是其他链接)
const getPrimaryLink = (project: Project): string | null => {
  return project.links.github 
    || project.links.download 
    || project.links.notebook 
    || project.links.dashboard 
    || null;
};

const ProjectCard = ({ project, index }: { project: Project; index: number }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const primaryLink = getPrimaryLink(project);

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    gsap.fromTo(card,
      { 
        opacity: 0, 
        y: 50,
        rotateX: 10
      },
      {
        opacity: 1,
        y: 0,
        rotateX: 0,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: card,
          start: 'top 85%',
          end: 'top 50%',
          toggleActions: 'play none none reverse'
        },
        delay: index % 2 * 0.1
      }
    );
  }, [index]);

  return (
    <div 
      ref={cardRef}
      className="project-card group relative bg-[#0F0F0F] rounded-lg overflow-hidden border border-[#1A1A1A]"
      style={{ perspective: '1000px' }}
    >
      {/* Image - Clickable to open primary link */}
      <div className="relative aspect-video overflow-hidden">
        {primaryLink ? (
          <a 
            href={primaryLink}
            target="_blank"
            rel="noopener noreferrer"
            className="block w-full h-full"
          >
            <img 
              src={project.image}
              alt={project.title}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            {/* Click hint overlay */}
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
              <div className="flex items-center gap-2 px-4 py-2 bg-osc-green text-black font-mono text-sm rounded-full">
                <ArrowUpRight className="w-4 h-4" />
                {project.links.github ? 'View on GitHub' : project.links.download ? 'Download' : 'Open Link'}
              </div>
            </div>
          </a>
        ) : (
          <img 
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
        )}
        
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-transparent to-transparent opacity-60 pointer-events-none" />
        
        {/* Category Badge */}
        <div className="absolute top-4 left-4 pointer-events-none">
          <span className={`px-3 py-1 text-xs font-mono border rounded ${
            project.isResearch 
              ? 'bg-purple-500/20 border-purple-500/50 text-purple-400' 
              : 'bg-osc-green/20 border-osc-green/50 text-osc-green'
          }`}>
            {project.category}
          </span>
        </div>

        {/* Research Badge */}
        {project.isResearch && (
          <div className="absolute top-4 right-4 pointer-events-none">
            <span className="px-3 py-1 text-xs font-mono bg-blue-500/20 border border-blue-500/50 text-blue-400 rounded">
              ACADEMIC RESEARCH
            </span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-6">
        <h3 className="text-xl font-bold tracking-wide text-white mb-3 group-hover:text-osc-green transition-colors font-mono">
          {project.title}
        </h3>
        
        <p className="text-sm text-gray-400 mb-4 line-clamp-3">
          {project.description}
        </p>

        {/* Tech Stack */}
        <div className="flex flex-wrap gap-2 mb-4">
          {project.techStack.map((tech) => (
            <span key={tech} className="tech-tag text-gray-300">
              {tech}
            </span>
          ))}
        </div>

        {/* Links */}
        <div className="flex flex-wrap gap-3">
          {project.links.dashboard && (
            <a 
              href={project.links.dashboard}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm font-mono text-osc-green hover:text-white transition-colors"
            >
              <ExternalLink className="w-4 h-4" />
              Dashboard
            </a>
          )}
          {project.links.github && (
            <a 
              href={project.links.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm font-mono text-osc-green hover:text-white transition-colors"
            >
              <Github className="w-4 h-4" />
              GitHub
            </a>
          )}
          {project.links.notebook && (
            <a 
              href={project.links.notebook}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm font-mono text-osc-green hover:text-white transition-colors"
            >
              <FileText className="w-4 h-4" />
              Notebook
            </a>
          )}
          {project.links.download && (
            <a 
              href={project.links.download}
              download
              className="flex items-center gap-2 px-4 py-2 text-sm font-mono bg-osc-green/10 border border-osc-green/50 text-osc-green rounded hover:bg-osc-green/20 transition-colors"
            >
              <Download className="w-4 h-4" />
              Download Presentation (PPTX)
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

const Projects = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const title = titleRef.current;
    if (!title) return;

    gsap.fromTo(title,
      { opacity: 0, x: -50 },
      {
        opacity: 1,
        x: 0,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: title,
          start: 'top 80%',
          toggleActions: 'play none none reverse'
        }
      }
    );
  }, []);

  return (
    <section 
      ref={sectionRef}
      id="projects" 
      className="py-24 px-4 sm:px-6 lg:px-8 bg-[#0A0A0A]"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="mb-16">
          <span className="text-sm font-mono text-osc-green mb-4 block">{'//'} PORTFOLIO</span>
          <h2 
            ref={titleRef}
            className="text-5xl md:text-7xl font-bold tracking-wider text-white font-mono"
          >
            SELECTED WORKS
          </h2>
          <div className="mt-4 h-px bg-gradient-to-r from-osc-green/50 via-[#1A1A1A] to-transparent max-w-md" />
        </div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
