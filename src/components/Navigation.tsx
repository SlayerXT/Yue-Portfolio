import { useEffect, useState } from 'react';
import { Menu, X, Linkedin, Mail, FileText } from 'lucide-react';

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMobileMenuOpen(false);
    }
  };

  const navLinks = [
    { label: 'WORK', id: 'projects' },
    { label: 'CERTS', id: 'certifications' },
    { label: 'ABOUT', id: 'about' },
    { label: 'CONTACT', id: 'contact' },
  ];

  return (
    <>
      <nav 
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
          isScrolled 
            ? 'bg-[#0A0A0A]/90 backdrop-blur-md border-b border-[#1A1A1A]' 
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <button 
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="text-xl font-bold tracking-wider text-white hover:text-osc-green transition-colors font-mono"
            >
              YH
            </button>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => scrollToSection(link.id)}
                  className="relative text-sm font-mono text-gray-400 hover:text-osc-green transition-colors group"
                >
                  {link.label}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-osc-green transition-all duration-300 group-hover:w-full" />
                </button>
              ))}
              
              {/* Social Links */}
              <div className="flex items-center gap-4 ml-4 pl-4 border-l border-[#1A1A1A]">
                <a 
                  href="https://www.linkedin.com/in/yue-hu-78b477242/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-osc-green transition-colors"
                >
                  <Linkedin className="w-5 h-5" />
                </a>
                <a 
                  href="mailto:yue.hu@gmx.de"
                  className="text-gray-400 hover:text-osc-green transition-colors"
                >
                  <Mail className="w-5 h-5" />
                </a>
                <a 
                  href="/assets/resume_Yue_Hu.pdf"
                  download
                  className="text-gray-400 hover:text-osc-green transition-colors"
                >
                  <FileText className="w-5 h-5" />
                </a>
              </div>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden text-white p-2"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div 
        className={`fixed inset-0 z-30 bg-[#0A0A0A]/98 backdrop-blur-lg transition-all duration-500 md:hidden ${
          isMobileMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
        }`}
      >
        <div className="flex flex-col items-center justify-center h-full gap-8">
          {navLinks.map((link, index) => (
            <button
              key={link.id}
              onClick={() => scrollToSection(link.id)}
              className="text-2xl font-bold tracking-wider text-white hover:text-osc-green transition-colors font-mono"
              style={{ 
                transitionDelay: isMobileMenuOpen ? `${index * 100}ms` : '0ms',
                opacity: isMobileMenuOpen ? 1 : 0,
                transform: isMobileMenuOpen ? 'translateY(0)' : 'translateY(20px)'
              }}
            >
              {link.label}
            </button>
          ))}
          
          <div className="flex items-center gap-6 mt-8">
            <a 
              href="https://www.linkedin.com/in/yue-hu-78b477242/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-osc-green transition-colors"
            >
              <Linkedin className="w-6 h-6" />
            </a>
            <a 
              href="mailto:yue.hu@gmx.de"
              className="text-gray-400 hover:text-osc-green transition-colors"
            >
              <Mail className="w-6 h-6" />
            </a>
            <a 
              href="/assets/resume_Yue_Hu.pdf"
              download
              className="text-gray-400 hover:text-osc-green transition-colors"
            >
              <FileText className="w-6 h-6" />
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navigation;
