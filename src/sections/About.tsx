import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { 
  Code2, 
  Database, 
  BarChart3, 
  Brain, 
  Terminal,
  Cpu
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const skills = [
  {
    category: 'Programming',
    icon: Code2,
    items: ['Python', 'Pandas', 'NumPy', 'scikit-learn', 'Matplotlib', 'seaborn']
  },
  {
    category: 'Data & SQL',
    icon: Database,
    items: ['SQL', 'MySQL', 'PostgreSQL', 'Data Cleaning', 'Feature Engineering']
  },
  {
    category: 'Visualization',
    icon: BarChart3,
    items: ['Tableau', 'Dashboard Design', 'KPI Metrics', 'Cohort Analysis']
  },
  {
    category: 'Machine Learning',
    icon: Brain,
    items: ['XGBoost', 'CNN', 'Regression', 'Classification', 'Model Evaluation']
  },
  {
    category: 'Engineering',
    icon: Cpu,
    items: ['Signal Processing', 'Sensor Calibration', 'Time Series', 'MATLAB']
  },
  {
    category: 'Tools',
    icon: Terminal,
    items: ['Jupyter', 'Git', 'GitHub', 'A/B Testing', 'Hypothesis Testing']
  }
];

const experiences = [
  {
    title: 'Part-time Data Analyst',
    company: 'Social Media Growth (Douyin/Xiaohongshu)',
    period: 'July 2025 - Sept. 2025',
    description: 'Built competitor and content analytics framework analyzing 3,000+ videos. Increased topic hit rate by 42%, average views by 68%, and completion rate by 23% through data-informed optimization.',
    highlights: ['A/B Testing', 'Content Analytics', 'Growth Strategy']
  },
  {
    title: 'Electronic Engineer',
    company: 'Hangzhou Jingri Technology Co.,Ltd.',
    period: 'Apr. 2018 - Apr. 2019',
    description: 'Led end-to-end design of dual-output forward switching power supply (90% efficiency, ±4% output accuracy). Supported daily engineering tasks including circuit design, PCB layout, and system testing.',
    highlights: ['Power Electronics', 'PCB Design', 'System Testing']
  }
];

const education = [
  {
    degree: 'Master of Science in Electrical and Computer Engineering',
    school: 'Rheinland-Pfälzische Technische Universität Kaiserslautern-Landau',
    period: 'Apr. 2021 - Sept. 2024',
    courses: ['Control Systems', 'Optimization Techniques', 'Data Acquisition', 'Neurocomputing']
  },
  {
    degree: 'Audition Student in Master Program of Data Science',
    school: 'Universität des Saarlandes',
    period: 'Apr. 2023 - Apr. 2024',
    courses: ['Machine Learning', 'Database Systems', 'Big Data Engineering', 'Data Science']
  },
  {
    degree: 'Bachelor of Engineering in Electrical Engineering and Automation',
    school: 'Shanghai University of Electric Power',
    period: 'Sept. 2013 - July 2017',
    courses: ['Probability and Statistics', 'Advanced Mathematics', 'Microeconomics', 'C Language']
  }
];

const About = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const content = contentRef.current;
    if (!content) return;

    const elements = content.querySelectorAll('.reveal-item');
    
    elements.forEach((el, index) => {
      gsap.fromTo(el,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 85%',
            toggleActions: 'play none none reverse'
          },
          delay: index * 0.05
        }
      );
    });
  }, []);

  return (
    <section 
      ref={sectionRef}
      id="about" 
      className="py-24 px-4 sm:px-6 lg:px-8 bg-[#0A0A0A] relative overflow-hidden"
    >
      {/* Background Decoration */}
      <div className="absolute top-0 right-0 text-[20rem] font-bold text-white/[0.02] leading-none pointer-events-none select-none font-mono">
        ABOUT
      </div>

      <div ref={contentRef} className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="mb-16 reveal-item">
          <span className="text-sm font-mono text-osc-green mb-4 block">{'//'} PROFILE</span>
          <h2 className="text-5xl md:text-7xl font-bold tracking-wider text-white font-mono">
            ABOUT ME
          </h2>
          <div className="mt-4 h-px bg-gradient-to-r from-osc-green/50 via-[#1A1A1A] to-transparent max-w-md" />
        </div>

        {/* Bio */}
        <div className="mb-16 reveal-item">
          <p className="text-lg md:text-xl text-gray-300 max-w-3xl leading-relaxed">
            I bridge the gap between <span className="text-osc-green">raw engineering data</span> and 
            <span className="text-osc-green"> strategic business decisions</span>. With a background in 
            electrical engineering and advanced training in data science, I bring a unique perspective 
            that combines technical rigor with analytical insight.
          </p>
          <p className="text-lg text-gray-400 max-w-3xl leading-relaxed mt-4">
            My experience spans from designing precision sensor calibration systems to building 
            scalable data pipelines that process millions of records. I specialize in transforming 
            complex datasets into actionable insights that drive measurable business outcomes.
          </p>
        </div>

        {/* Skills Grid */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold tracking-wide text-white mb-8 reveal-item font-mono">
            TECHNICAL EXPERTISE
          </h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {skills.map((skill) => (
              <div 
                key={skill.category}
                className="reveal-item p-6 bg-[#0F0F0F] rounded-lg border border-[#1A1A1A] hover:border-osc-green/30 transition-colors group"
              >
                <div className="flex items-center gap-3 mb-4">
                  <skill.icon className="w-5 h-5 text-osc-green" />
                  <h4 className="font-mono text-white group-hover:text-osc-green transition-colors">
                    {skill.category}
                  </h4>
                </div>
                <div className="flex flex-wrap gap-2">
                  {skill.items.map((item) => (
                    <span key={item} className="tech-tag text-gray-400">
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Experience */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold tracking-wide text-white mb-8 reveal-item font-mono">
            EXPERIENCE
          </h3>
          <div className="space-y-8">
            {experiences.map((exp, index) => (
              <div 
                key={index}
                className="reveal-item p-6 bg-[#0F0F0F] rounded-lg border border-[#1A1A1A]"
              >
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-3">
                  <h4 className="text-xl font-bold text-white font-mono">{exp.title}</h4>
                  <span className="text-sm font-mono text-osc-green">{exp.period}</span>
                </div>
                <p className="text-gray-400 mb-3">{exp.company}</p>
                <p className="text-gray-300 mb-4">{exp.description}</p>
                <div className="flex flex-wrap gap-2">
                  {exp.highlights.map((highlight) => (
                    <span key={highlight} className="tech-tag text-osc-green border-osc-green/30">
                      {highlight}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Education */}
        <div>
          <h3 className="text-2xl font-bold tracking-wide text-white mb-8 reveal-item font-mono">
            EDUCATION
          </h3>
          <div className="space-y-6">
            {education.map((edu, index) => (
              <div 
                key={index}
                className="reveal-item p-6 bg-[#0F0F0F] rounded-lg border border-[#1A1A1A]"
              >
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-2">
                  <h4 className="text-lg font-bold text-white font-mono">{edu.degree}</h4>
                  <span className="text-sm font-mono text-gray-500">{edu.period}</span>
                </div>
                <p className="text-osc-green mb-3">{edu.school}</p>
                <div className="flex flex-wrap gap-2">
                  {edu.courses.map((course) => (
                    <span key={course} className="text-xs text-gray-500 font-mono">
                      {course}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
