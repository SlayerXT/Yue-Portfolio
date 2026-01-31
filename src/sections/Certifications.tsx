import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Award, ExternalLink, CheckCircle } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface Certification {
  id: number;
  title: string;
  provider: string;
  verifyUrl: string;
  category: string;
}

const certifications: Certification[] = [
  {
    id: 1,
    title: 'Applied Text Mining in Python',
    provider: 'University of Michigan (Coursera)',
    verifyUrl: 'https://www.coursera.org/account/accomplishments/verify/7I11412JFIYD',
    category: 'Data Science'
  },
  {
    id: 2,
    title: 'Introduction to PySpark',
    provider: 'DataCamp',
    verifyUrl: 'https://www.coursera.org/account/accomplishments/verify/3JJ2R65G2FS0',
    category: 'Big Data'
  },
  {
    id: 3,
    title: 'Applied Machine Learning in Python',
    provider: 'University of Michigan (Coursera)',
    verifyUrl: 'https://www.coursera.org/account/accomplishments/verify/2056BGYZ4XCJ',
    category: 'Machine Learning'
  },
  {
    id: 4,
    title: 'Databases and SQL for Data Science with Python',
    provider: 'IBM (Coursera)',
    verifyUrl: 'https://www.coursera.org/account/accomplishments/verify/6WF32DV3ZI6W',
    category: 'Database'
  },
  {
    id: 5,
    title: 'Applied Plotting, Charting & Data Representation in Python',
    provider: 'University of Michigan (Coursera)',
    verifyUrl: 'https://www.coursera.org/account/accomplishments/verify/9PSUEEMKN4U0',
    category: 'Visualization'
  },
  {
    id: 6,
    title: 'Introduction to Data Science in Python',
    provider: 'University of Michigan (Coursera)',
    verifyUrl: 'https://www.coursera.org/account/accomplishments/verify/PT8P511JKJ4C',
    category: 'Data Science'
  },
  {
    id: 7,
    title: 'Junior Penetration Tester',
    provider: 'INE',
    verifyUrl: 'https://certs.ine.com/d89de521-fb17-413c-8d33-d6f405998391#acc.T9BkPQ4F',
    category: 'Security'
  }
];

const categoryColors: Record<string, string> = {
  'Data Science': 'text-blue-400 border-blue-400/30 bg-blue-400/10',
  'Big Data': 'text-purple-400 border-purple-400/30 bg-purple-400/10',
  'Machine Learning': 'text-green-400 border-green-400/30 bg-green-400/10',
  'Database': 'text-yellow-400 border-yellow-400/30 bg-yellow-400/10',
  'Visualization': 'text-pink-400 border-pink-400/30 bg-pink-400/10',
  'Security': 'text-red-400 border-red-400/30 bg-red-400/10'
};

const Certifications = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const title = titleRef.current;
    const cards = cardsRef.current;
    if (!title || !cards) return;

    // Title animation
    gsap.fromTo(title,
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: title,
          start: 'top 85%',
          toggleActions: 'play none none reverse'
        }
      }
    );

    // Cards stagger animation
    const cardElements = cards.querySelectorAll('.cert-card');
    gsap.fromTo(cardElements,
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: 'power3.out',
        stagger: 0.08,
        scrollTrigger: {
          trigger: cards,
          start: 'top 80%',
          toggleActions: 'play none none reverse'
        }
      }
    );
  }, []);

  return (
    <section 
      ref={sectionRef}
      id="certifications" 
      className="py-24 px-4 sm:px-6 lg:px-8 bg-[#0A0A0A]"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div ref={titleRef} className="mb-16">
          <span className="text-sm font-mono text-osc-green mb-4 block">{'//'} CREDENTIALS</span>
          <h2 className="text-5xl md:text-7xl font-bold tracking-wider text-white font-mono">
            CERTIFICATIONS
          </h2>
          <div className="mt-4 h-px bg-gradient-to-r from-osc-green/50 via-[#1A1A1A] to-transparent max-w-md" />
          <p className="mt-4 text-gray-400 max-w-2xl">
            Professional certifications demonstrating expertise across data science, 
            machine learning, and cybersecurity domains.
          </p>
        </div>

        {/* Certifications Grid */}
        <div ref={cardsRef} className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {certifications.map((cert) => (
            <a
              key={cert.id}
              href={cert.verifyUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="cert-card group"
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-lg bg-[#0A0A0A] flex items-center justify-center flex-shrink-0 border border-[#1A1A1A] group-hover:border-osc-green/30 transition-colors">
                  <Award className="w-6 h-6 text-osc-green" />
                </div>
                
                <div className="flex-1 min-w-0">
                  <span className={`inline-block px-2 py-0.5 text-xs font-mono rounded border mb-2 ${
                    categoryColors[cert.category] || 'text-gray-400 border-gray-700'
                  }`}>
                    {cert.category}
                  </span>
                  
                  <h3 className="text-white font-mono font-semibold text-sm leading-tight mb-1 group-hover:text-osc-green transition-colors">
                    {cert.title}
                  </h3>
                  
                  <p className="text-gray-500 text-xs font-mono mb-3">
                    {cert.provider}
                  </p>
                  
                  <div className="flex items-center gap-2 text-osc-green text-xs font-mono opacity-0 group-hover:opacity-100 transition-opacity">
                    <CheckCircle className="w-3 h-3" />
                    <span>Verify</span>
                    <ExternalLink className="w-3 h-3 ml-auto" />
                  </div>
                </div>
              </div>
            </a>
          ))}
        </div>

        {/* Stats */}
        <div className="mt-12 grid grid-cols-3 gap-6 max-w-lg mx-auto">
          <div className="text-center p-4 bg-[#0F0F0F] rounded-lg border border-[#1A1A1A]">
            <div className="text-3xl font-bold text-osc-green font-mono">{certifications.length}</div>
            <div className="text-xs text-gray-500 font-mono mt-1">Total Certs</div>
          </div>
          <div className="text-center p-4 bg-[#0F0F0F] rounded-lg border border-[#1A1A1A]">
            <div className="text-3xl font-bold text-osc-green font-mono">
              {new Set(certifications.map(c => c.category)).size}
            </div>
            <div className="text-xs text-gray-500 font-mono mt-1">Categories</div>
          </div>
          <div className="text-center p-4 bg-[#0F0F0F] rounded-lg border border-[#1A1A1A]">
            <div className="text-3xl font-bold text-osc-green font-mono">100%</div>
            <div className="text-xs text-gray-500 font-mono mt-1">Verified</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Certifications;
