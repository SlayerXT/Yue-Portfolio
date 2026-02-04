import { useEffect, useRef, useState, useCallback } from 'react';
import { gsap } from 'gsap';

interface KnobProps {
  label: string;
  value: number;
  isLocked: boolean;
  onHoverStart: () => void;
  onHoverEnd: () => void;
  color?: string;
}

const RotaryKnob = ({ 
  label, 
  value, 
  isLocked, 
  onHoverStart, 
  onHoverEnd, 
  color = '#00FF41' 
}: KnobProps) => {
  const rotation = -135 + (value / 100) * 270;

  return (
    <div className="flex flex-col items-center gap-4">
      <div
        className={`knob-3d ${isLocked ? 'locked' : ''}`}
        onMouseEnter={onHoverStart}
        onMouseLeave={onHoverEnd}
      >
        <div className="knob-ring" />
        <div 
          className="w-full h-full rounded-full relative"
          style={{ transform: `rotate(${rotation}deg)` }}
        >
          <div 
            className="knob-indicator"
            style={{ 
              background: isLocked ? color : value > 0 ? color : '#3A3A3A',
              boxShadow: isLocked || value > 0 
                ? `0 0 10px ${color}80` 
                : 'none'
            }}
          />
        </div>
        
        {/* Center dot */}
        <div 
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 rounded-full"
          style={{ 
            background: isLocked ? color : '#2A2A2A',
            boxShadow: isLocked ? `0 0 10px ${color}` : 'none'
          }}
        />
      </div>
      
      <div className="text-center">
        <span className={`text-xs font-mono uppercase tracking-wider block mb-1 ${
          isLocked ? 'text-osc-green' : 'text-gray-500'
        }`}>
          {label}
        </span>
        <span className={`text-lg font-mono font-bold ${
          isLocked ? 'text-osc-green osc-glow' : 'text-gray-600'
        }`}>
          {Math.round(value)}%
        </span>
      </div>
      
      {/* Lock indicator */}
      {isLocked && (
        <div className="flex items-center gap-1 text-osc-green text-xs font-mono">
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
          </svg>
          LOCKED
        </div>
      )}
    </div>
  );
};

interface HeroProps {
  onUnlock: () => void;
  onSkip: () => void;  // 新增
}

const Hero = ({ onUnlock, onSkip }: HeroProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  
  const [precision, setPrecision] = useState(0);
  const [logic, setLogic] = useState(0);
  const [isPrecisionLocked, setIsPrecisionLocked] = useState(false);
  const [isLogicLocked, setIsLogicLocked] = useState(false);
  const [isUnlocked, setIsUnlocked] = useState(false);
  
  const precisionInterval = useRef<ReturnType<typeof setInterval> | null>(null);
  const logicInterval = useRef<ReturnType<typeof setInterval> | null>(null);

  // Oscilloscope wave animation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    let time = 0;
    let animationId: number;

    const draw = () => {
      if (!ctx || !canvas) return;
      
      // Clear with fade effect for trail
      ctx.fillStyle = 'rgba(10, 10, 10, 0.15)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const clarity = (precision + logic) / 200; // 0 to 1
      const noiseLevel = 1 - clarity;
      
      // Draw grid
      ctx.strokeStyle = 'rgba(0, 255, 65, 0.05)';
      ctx.lineWidth = 1;
      const gridSize = 50;
      
      for (let x = 0; x < canvas.width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
      }
      
      for (let y = 0; y < canvas.height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
      }

      // Draw wave
      ctx.strokeStyle = '#00FF41';
      ctx.lineWidth = 2;
      ctx.shadowBlur = 10;
      ctx.shadowColor = '#00FF41';

      ctx.beginPath();
      
      const centerY = canvas.height / 2;
      const amplitude = 80 * (1 - clarity * 0.5);
      const frequency = 0.01 + clarity * 0.02;
      const speed = 0.02 + clarity * 0.03;
      
      for (let x = 0; x < canvas.width; x += 2) {
        // Base wave
        let y = centerY + Math.sin(x * frequency + time) * amplitude;
        
        // Add upward trend when unlocked
        if (clarity > 0.8) {
          y -= (x / canvas.width) * 100 * (clarity - 0.8) * 5;
        }
        
        // Add noise
        if (noiseLevel > 0) {
          y += (Math.random() - 0.5) * 60 * noiseLevel;
        }
        
        // Add harmonics based on precision
        if (precision > 30) {
          y += Math.sin(x * frequency * 2 + time * 1.5) * amplitude * 0.3 * (precision / 100);
        }
        
        // Add logic wave pattern
        if (logic > 30) {
          const logicWave = Math.sin(x * frequency * 0.5 + time * 0.5) * amplitude * 0.2 * (logic / 100);
          y += logicWave;
        }
        
        if (x === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
      }
      
      ctx.stroke();
      ctx.shadowBlur = 0;

      // Draw center line when nearly unlocked
      if (clarity > 0.7) {
        ctx.strokeStyle = `rgba(0, 255, 65, ${(clarity - 0.7) * 3})`;
        ctx.lineWidth = 1;
        ctx.setLineDash([5, 5]);
        ctx.beginPath();
        ctx.moveTo(0, centerY);
        ctx.lineTo(canvas.width, centerY);
        ctx.stroke();
        ctx.setLineDash([]);
      }

      time += speed;
      animationId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationId);
    };
  }, [precision, logic]);

  // Text decode animation
  useEffect(() => {
    if (!titleRef.current) return;
    
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&*';
    const originalText = 'YUE HU';
    const title = titleRef.current;
    
    let iteration = 0;
    const interval = setInterval(() => {
      title.innerText = originalText
        .split('')
        .map((_, index) => {
          if (index < iteration) return originalText[index];
          return chars[Math.floor(Math.random() * chars.length)];
        })
        .join('');
      
      if (iteration >= originalText.length) {
        clearInterval(interval);
      }
      
      iteration += 1 / 3;
    }, 50);

    return () => clearInterval(interval);
  }, []);

  // Handle precision knob hover
  const handlePrecisionHoverStart = useCallback(() => {
    if (isPrecisionLocked) return;
    
    precisionInterval.current = setInterval(() => {
      setPrecision(prev => {
        if (prev >= 100) {
          setIsPrecisionLocked(true);
          if (precisionInterval.current) clearInterval(precisionInterval.current);
          return 100;
        }
        return prev + 2; // 2% per 40ms = 100% in 2 seconds
      });
    }, 40);
  }, [isPrecisionLocked]);

  const handlePrecisionHoverEnd = useCallback(() => {
    if (precisionInterval.current) {
      clearInterval(precisionInterval.current);
      precisionInterval.current = null;
    }
    if (!isPrecisionLocked) {
      setPrecision(0);
    }
  }, [isPrecisionLocked]);

  // Handle logic knob hover
  const handleLogicHoverStart = useCallback(() => {
    if (isLogicLocked) return;
    
    logicInterval.current = setInterval(() => {
      setLogic(prev => {
        if (prev >= 100) {
          setIsLogicLocked(true);
          if (logicInterval.current) clearInterval(logicInterval.current);
          return 100;
        }
        return prev + 2;
      });
    }, 40);
  }, [isLogicLocked]);

  const handleLogicHoverEnd = useCallback(() => {
    if (logicInterval.current) {
      clearInterval(logicInterval.current);
      logicInterval.current = null;
    }
    if (!isLogicLocked) {
      setLogic(0);
    }
  }, [isLogicLocked]);

  // Check unlock condition
  useEffect(() => {
    if (isPrecisionLocked && isLogicLocked && !isUnlocked) {
      setIsUnlocked(true);
      
      // Trigger unlock animation
      gsap.to(containerRef.current, {
        opacity: 0,
        scale: 1.05,
        duration: 1.2,
        ease: 'power2.inOut',
        onComplete: onUnlock
      });
    }
  }, [isPrecisionLocked, isLogicLocked, isUnlocked, onUnlock]);

  // Cleanup intervals on unmount
  useEffect(() => {
    return () => {
      if (precisionInterval.current) clearInterval(precisionInterval.current);
      if (logicInterval.current) clearInterval(logicInterval.current);
    };
  }, []);

  const bothLocked = isPrecisionLocked && isLogicLocked;

  return (
    <div 
      ref={containerRef}
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#0A0A0A]"
    >
      {/* Canvas Background */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0"
      />
      
      {/* Scanline Overlay */}
      <div className="scanlines" />
      
      {/* Content */}
      <div className="relative z-10 flex flex-col items-center text-center px-4">
        {/* Title */}
        <h1 
          ref={titleRef}
          className="text-7xl md:text-9xl font-bold tracking-wider text-white osc-glow mb-4"
          style={{ fontFamily: 'JetBrains Mono, monospace' }}
        >
          YUE HU
        </h1>
        
        {/* Subtitle */}
        <p 
          className="text-lg md:text-xl font-mono text-osc-green tracking-[0.3em] uppercase mb-12"
        >
          DATA ANALYST & ENGINEER
        </p>
        
        {/* Status Indicator */}
        <div className="mb-10">
          <div className={`flex items-center gap-3 px-6 py-3 rounded-full border ${
            bothLocked 
              ? 'border-osc-green bg-osc-green/10' 
              : 'border-gray-700 bg-[#111111]'
          }`}>
            <div className={`w-3 h-3 rounded-full ${
              bothLocked 
                ? 'bg-osc-green shadow-glow' 
                : 'bg-yellow-500 status-pending'
            }`} />
            <span className={`text-sm font-mono ${
              bothLocked ? 'text-osc-green' : 'text-gray-400'
            }`}>
              {bothLocked 
                ? 'SYSTEM CALIBRATED - UNLOCKING...' 
                : 'SYSTEM STATUS: PENDING. HOVER TO CALIBRATE SENSORS TO 100% TO UNLOCK.'
              }
            </span>
          </div>
        </div>
        
        {/* Knobs */}
        <div className="flex gap-16 md:gap-24 mb-8">
          <RotaryKnob
            label="Engineering Precision"
            value={precision}
            isLocked={isPrecisionLocked}
            onHoverStart={handlePrecisionHoverStart}
            onHoverEnd={handlePrecisionHoverEnd}
          />
          <RotaryKnob
            label="Data Logic"
            value={logic}
            isLocked={isLogicLocked}
            onHoverStart={handleLogicHoverStart}
            onHoverEnd={handleLogicHoverEnd}
            color="#00CCFF"
          />
        </div>
        
        {/* Progress Bars */}
        <div className="w-full max-w-md space-y-3">
          <div className="flex items-center gap-3">
            <span className="text-xs font-mono text-gray-500 w-24">PRECISION</span>
            <div className="flex-1 h-2 bg-[#1A1A1A] rounded-full overflow-hidden">
              <div 
                className="h-full bg-osc-green transition-all duration-100"
                style={{ 
                  width: `${precision}%`,
                  boxShadow: precision > 0 ? '0 0 10px rgba(0, 255, 65, 0.5)' : 'none'
                }}
              />
            </div>
            <span className="text-xs font-mono text-osc-green w-10">{Math.round(precision)}%</span>
          </div>
          
          <div className="flex items-center gap-3">
            <span className="text-xs font-mono text-gray-500 w-24">LOGIC</span>
            <div className="flex-1 h-2 bg-[#1A1A1A] rounded-full overflow-hidden">
              <div 
                className="h-full transition-all duration-100"
                style={{ 
                  width: `${logic}%`,
                  backgroundColor: '#00CCFF',
                  boxShadow: logic > 0 ? '0 0 10px rgba(0, 204, 255, 0.5)' : 'none'
                }}
              />
            </div>
            <span className="text-xs font-mono text-[#00CCFF] w-10">{Math.round(logic)}%</span>
          </div>
        </div>
        
        {/* Skip Button */}
        <button
          onClick={onSkip}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 px-4 py-2 text-xs font-mono text-gray-600 hover:text-osc-green transition-colors border border-transparent hover:border-osc-green/30 rounded"
        >
          [ SKIP ANIMATION → ]
        </button>
        
        {/* Corner Decorations */}
        <div className="absolute top-8 left-8 w-16 h-16 border-l-2 border-t-2 border-osc-green/30" />
        <div className="absolute top-8 right-8 w-16 h-16 border-r-2 border-t-2 border-osc-green/30" />
        <div className="absolute bottom-8 left-8 w-16 h-16 border-l-2 border-b-2 border-osc-green/30" />
        <div className="absolute bottom-8 right-8 w-16 h-16 border-r-2 border-b-2 border-osc-green/30" />
      </div>
    </div>
  );
};

export default Hero;
