import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Linkedin, Mail, FileText, Send, Check, Loader2 } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const Contact = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const elements = section.querySelectorAll('.reveal-item');
    
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
          delay: index * 0.1
        }
      );
    });
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsSubmitting(false);
    setIsSubmitted(true);
    
    // Reset after showing success
    setTimeout(() => {
      setIsSubmitted(false);
      setFormState({ name: '', email: '', message: '' });
    }, 3000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormState(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <section 
      ref={sectionRef}
      id="contact" 
      className="py-24 px-4 sm:px-6 lg:px-8 bg-[#0A0A0A] relative"
    >
      <div className="max-w-4xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16 reveal-item">
          <span className="text-sm font-mono text-osc-green mb-4 block">{'//'} COMMUNICATION</span>
          <h2 className="text-5xl md:text-7xl font-bold tracking-wider text-white mb-4 font-mono">
            INITIATE CONTACT
          </h2>
          <p className="text-gray-400 max-w-xl mx-auto">
            Have a project in mind or want to discuss data-driven solutions? 
            Let's connect and explore possibilities.
          </p>
        </div>

        {/* Terminal-style Contact Form */}
        <div className="reveal-item bg-[#0F0F0F] rounded-lg border border-[#1A1A1A] overflow-hidden">
          {/* Terminal Header */}
          <div className="bg-[#0A0A0A] px-4 py-3 border-b border-[#1A1A1A] flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500" />
            <div className="w-3 h-3 rounded-full bg-yellow-500" />
            <div className="w-3 h-3 rounded-full bg-green-500" />
            <span className="ml-4 text-xs font-mono text-gray-500">contact_terminal.exe</span>
          </div>

          {/* Terminal Body */}
          <div className="p-6 md:p-8">
            <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
              {/* Name Field */}
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm font-mono text-gray-400">
                  <span className="text-osc-green">$</span>
                  <span>NAME:</span>
                </label>
                <div className={`relative border rounded transition-all duration-300 ${
                  focusedField === 'name' 
                    ? 'border-osc-green shadow-glow' 
                    : 'border-[#1A1A1A]'
                }`}>
                  <input
                    type="text"
                    name="name"
                    value={formState.name}
                    onChange={handleChange}
                    onFocus={() => setFocusedField('name')}
                    onBlur={() => setFocusedField(null)}
                    required
                    className="w-full bg-[#0A0A0A] px-4 py-3 text-white font-mono focus:outline-none"
                    placeholder="Enter your name..."
                  />
                  {focusedField === 'name' && (
                    <span className="absolute right-4 top-1/2 -translate-y-1/2 w-2 h-4 bg-osc-green animate-pulse" />
                  )}
                </div>
              </div>

              {/* Email Field */}
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm font-mono text-gray-400">
                  <span className="text-osc-green">$</span>
                  <span>EMAIL:</span>
                </label>
                <div className={`relative border rounded transition-all duration-300 ${
                  focusedField === 'email' 
                    ? 'border-osc-green shadow-glow' 
                    : 'border-[#1A1A1A]'
                }`}>
                  <input
                    type="email"
                    name="email"
                    value={formState.email}
                    onChange={handleChange}
                    onFocus={() => setFocusedField('email')}
                    onBlur={() => setFocusedField(null)}
                    required
                    className="w-full bg-[#0A0A0A] px-4 py-3 text-white font-mono focus:outline-none"
                    placeholder="Enter your email..."
                  />
                  {focusedField === 'email' && (
                    <span className="absolute right-4 top-1/2 -translate-y-1/2 w-2 h-4 bg-osc-green animate-pulse" />
                  )}
                </div>
              </div>

              {/* Message Field */}
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm font-mono text-gray-400">
                  <span className="text-osc-green">$</span>
                  <span>MESSAGE:</span>
                </label>
                <div className={`relative border rounded transition-all duration-300 ${
                  focusedField === 'message' 
                    ? 'border-osc-green shadow-glow' 
                    : 'border-[#1A1A1A]'
                }`}>
                  <textarea
                    name="message"
                    value={formState.message}
                    onChange={handleChange}
                    onFocus={() => setFocusedField('message')}
                    onBlur={() => setFocusedField(null)}
                    required
                    rows={5}
                    className="w-full bg-[#0A0A0A] px-4 py-3 text-white font-mono focus:outline-none resize-none"
                    placeholder="Type your message..."
                  />
                  {focusedField === 'message' && (
                    <span className="absolute right-4 bottom-4 w-2 h-4 bg-osc-green animate-pulse" />
                  )}
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting || isSubmitted}
                className={`w-full py-4 rounded font-mono font-semibold flex items-center justify-center gap-2 transition-all duration-300 ${
                  isSubmitted
                    ? 'bg-green-500 text-black'
                    : 'bg-osc-green text-black hover:bg-osc-dark hover:shadow-glow'
                }`}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    TRANSMITTING...
                  </>
                ) : isSubmitted ? (
                  <>
                    <Check className="w-5 h-5" />
                    MESSAGE SENT SUCCESSFULLY
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5" />
                    TRANSMIT MESSAGE
                  </>
                )}
              </button>
            </form>
          </div>
        </div>

        {/* Direct Contact Links */}
        <div className="mt-12 grid sm:grid-cols-3 gap-4 reveal-item">
          <a
            href="https://www.linkedin.com/in/yue-hu-78b477242/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-4 p-4 bg-[#0F0F0F] rounded-lg border border-[#1A1A1A] hover:border-osc-green/50 transition-colors group"
          >
            <div className="w-12 h-12 rounded-lg bg-[#0A0A0A] flex items-center justify-center group-hover:bg-osc-green/10 transition-colors">
              <Linkedin className="w-6 h-6 text-osc-green" />
            </div>
            <div>
              <p className="text-sm text-gray-400">LinkedIn</p>
              <p className="text-white font-mono">Connect</p>
            </div>
          </a>

          <a
            href="mailto:yue.hu@gmx.de"
            className="flex items-center gap-4 p-4 bg-[#0F0F0F] rounded-lg border border-[#1A1A1A] hover:border-osc-green/50 transition-colors group"
          >
            <div className="w-12 h-12 rounded-lg bg-[#0A0A0A] flex items-center justify-center group-hover:bg-osc-green/10 transition-colors">
              <Mail className="w-6 h-6 text-osc-green" />
            </div>
            <div>
              <p className="text-sm text-gray-400">Email</p>
              <p className="text-white font-mono">yue.hu@gmx.de</p>
            </div>
          </a>

          <a
            href="/assets/resume_Yue_Hu.pdf"
            download
            className="flex items-center gap-4 p-4 bg-[#0F0F0F] rounded-lg border border-[#1A1A1A] hover:border-osc-green/50 transition-colors group"
          >
            <div className="w-12 h-12 rounded-lg bg-[#0A0A0A] flex items-center justify-center group-hover:bg-osc-green/10 transition-colors">
              <FileText className="w-6 h-6 text-osc-green" />
            </div>
            <div>
              <p className="text-sm text-gray-400">Resume</p>
              <p className="text-white font-mono">Download CV</p>
            </div>
          </a>
        </div>

        {/* Footer */}
        <div className="mt-16 pt-8 border-t border-[#1A1A1A] text-center reveal-item">
          <p className="text-sm text-gray-500 font-mono">
            {'//'} &copy; {new Date().getFullYear()} Yue Hu. All rights reserved.
          </p>
          <p className="text-xs text-gray-600 font-mono mt-2">
            Designed & Built with React + TypeScript + Tailwind CSS
          </p>
        </div>
      </div>
    </section>
  );
};

export default Contact;
