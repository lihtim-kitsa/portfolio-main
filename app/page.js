'use client';

import { useState, useEffect, useRef } from 'react';
import DialogueBox from '@/components/DialogueBox';
import DamagePop from '@/components/DamagePop';

export default function Home() {
  const [introPhase, setIntroPhase] = useState(0);
  const [showStats, setShowStats] = useState(false);
  const [animatedStats, setAnimatedStats] = useState({ atk: 0, def: 0, spd: 0, hp: 0 });
  const [damagePops, setDamagePops] = useState([]);
  const [isGlitching, setIsGlitching] = useState(false);
  const [isIdle, setIsIdle] = useState(false);
  const [introMessages, setIntroMessages] = useState([]);
  const glitchTimer = useRef(null);
  const idleTimer = useRef(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const hasSeen = sessionStorage.getItem('hasSeenIntro');
      if (hasSeen) {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setShowStats(true);
      } else {
        // Reactive Intro Logic
        let visits = parseInt(localStorage.getItem('visitCount') || '0', 10);
        visits += 1;
        localStorage.setItem('visitCount', visits.toString());

        const hour = new Date().getHours();
        let firstLine = "ARE YOU THERE?";
        let secondLine = "ARE WE CONNECTED?";

        if (visits > 2) {
          firstLine = "YOU HAVE RETURNED.";
          secondLine = "INTERESTING.";
        } else if (hour < 5 || hour > 23) {
          firstLine = "IT IS VERY LATE.";
          secondLine = "YET SOMEONE IS BROWSING.";
        }

        setIntroMessages([
          firstLine,
          secondLine,
          "EXCELLENT.",
          "TRULY EXCELLENT.",
          "WELCOME TO MY PORTFOLIO."
        ]);

        const t1 = setTimeout(() => setIntroPhase(1), 250); 
        const t2 = setTimeout(() => setIntroPhase(2), 1500); 
        const t3 = setTimeout(() => setIntroPhase(3), 2750); 
        const t4 = setTimeout(() => setIntroPhase(4), 3750); 
        const t5 = setTimeout(() => setIntroPhase(5), 4750); 
        const t6 = setTimeout(() => {
          setShowStats(true);
          sessionStorage.setItem('hasSeenIntro', 'true');
        }, 6250); 

        return () => {
          clearTimeout(t1);
          clearTimeout(t2);
          clearTimeout(t3);
          clearTimeout(t4);
          clearTimeout(t5);
          clearTimeout(t6);
        };
      }
    }
  }, []);

  // Idle Timer Logic
  useEffect(() => {
    const resetIdleTimer = () => {
      setIsIdle(false);
      if (idleTimer.current) clearTimeout(idleTimer.current);
      idleTimer.current = setTimeout(() => {
        setIsIdle(true);
      }, 30000); // 30 seconds idle
    };

    if (showStats) {
      window.addEventListener('mousemove', resetIdleTimer);
      window.addEventListener('keydown', resetIdleTimer);
      window.addEventListener('touchstart', resetIdleTimer);
      resetIdleTimer();

      return () => {
        window.removeEventListener('mousemove', resetIdleTimer);
        window.removeEventListener('keydown', resetIdleTimer);
        window.removeEventListener('touchstart', resetIdleTimer);
        if (idleTimer.current) clearTimeout(idleTimer.current);
      };
    }
  }, [showStats]);

  useEffect(() => {
    if (showStats) {
      const duration = 1000;
      const steps = 30;
      const intervalTime = duration / steps;
      let currentStep = 0;

      const timer = setInterval(() => {
        currentStep++;
        const progress = currentStep / steps;
        
        setAnimatedStats({
          atk: Math.floor(255 * progress),
          def: Math.floor(255 * progress),
          spd: Math.floor(999 * progress),
          hp: Math.floor(999 * progress)
        });

        if (currentStep >= steps) {
          clearInterval(timer);
        }
      }, intervalTime);

      return () => clearInterval(timer);
    }
  }, [showStats]);

  // Glitch Effect Handlers
  const startGlitchTimer = () => {
    glitchTimer.current = setTimeout(() => {
      setIsGlitching(true);
      document.body.classList.add('glitch-mode');
    }, 1500); // 1.5 seconds hold
  };

  const stopGlitchTimer = () => {
    if (glitchTimer.current) {
      clearTimeout(glitchTimer.current);
    }
    if (isGlitching) {
      setIsGlitching(false);
      document.body.classList.remove('glitch-mode');
    }
  };

  const handleStatClick = (e, value) => {
    const newPop = {
      id: Date.now(),
      x: e.clientX,
      y: e.clientY,
      value
    };
    setDamagePops(prev => [...prev, newPop]);
  };

  const removeDamagePop = (id) => {
    setDamagePops(prev => prev.filter(pop => pop.id !== id));
  };

  if (!showStats) {
    if (introMessages.length === 0) return null;
    return (
      <div 
        className="fade-in"
        style={{ 
          display: 'flex', 
          justifyContent: 'center', 
          alignItems: 'center', 
          height: '100%', 
          width: '100%',
          background: 'black',
          position: 'fixed',
          top: 0,
          left: 0,
          zIndex: 9999
        }}
      >
        <button
          onClick={() => {
            setShowStats(true);
            sessionStorage.setItem('hasSeenIntro', 'true');
          }}
          style={{
            position: 'absolute',
            top: '24px',
            right: '32px',
            color: 'var(--text-secondary)',
            backgroundColor: 'transparent',
            border: 'none',
            cursor: 'pointer',
            fontFamily: 'inherit',
            fontSize: '24px'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.color = 'var(--text-primary)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.color = 'var(--text-secondary)';
          }}
        >
          [SKIP]
        </button>
        <div style={{ textAlign: 'center', fontSize: '32px' }}>
          {introPhase === 1 && <DialogueBox text={introMessages[0]} speed={60} />}
          {introPhase === 2 && <DialogueBox text={introMessages[1]} speed={60} />}
          {introPhase === 3 && <DialogueBox text={introMessages[2]} speed={60} />}
          {introPhase === 4 && <DialogueBox text={introMessages[3]} speed={60} />}
          {introPhase === 5 && <DialogueBox text={introMessages[4]} speed={60} />}
        </div>
      </div>
    );
  }

  return (
    <div className="fade-in" style={{ animation: 'fadeIn 2s' }}>
      
      {/* Render Damage Pops */}
      {damagePops.map(pop => (
        <DamagePop 
          key={pop.id} 
          x={pop.x} 
          y={pop.y} 
          value={pop.value} 
          onComplete={() => removeDamagePop(pop.id)} 
        />
      ))}

      <div className="status-bar">
        <span 
          className="status-name text-yellow" 
          style={{ cursor: 'pointer', userSelect: 'none' }}
          onMouseDown={startGlitchTimer}
          onMouseUp={stopGlitchTimer}
          onMouseLeave={stopGlitchTimer}
          onTouchStart={startGlitchTimer}
          onTouchEnd={stopGlitchTimer}
        >
          {isGlitching ? 'MITHIL.EXE' : 'MITHIL'}
        </span>
        <div className="tooltip">
          <span className="status-lv">LV 99</span>
          <span className="tooltiptext">Level of Violence: 99. You&apos;ve killed many bugs.</span>
        </div>
        <div className="hp-bar-container">
          <span className="hp-label">HP</span>
          <div className="hp-bar-bg">
            <div className="hp-bar-fill fill-bar-anim" style={{ '--target-width': `${(animatedStats.hp / 999) * 100}%` }}></div>
          </div>
          <span>{animatedStats.hp}/999</span>
        </div>
      </div>

      <div className="main-grid">
        
        {/* Stats Column */}
        <div className="dialogue-box" style={{ flexDirection: 'column', gap: '16px' }}>
          <h2 className="text-blue" style={{ borderBottom: '2px solid white', paddingBottom: '8px' }}>STATS</h2>
          <div 
            style={{ cursor: 'pointer', userSelect: 'none' }} 
            onClick={(e) => handleStatClick(e, animatedStats.atk)}
          >
            <span style={{color: '#999'}}>ATTACK:</span> {animatedStats.atk} (Full Stack)
          </div>
          <div 
            style={{ cursor: 'pointer', userSelect: 'none' }} 
            onClick={(e) => handleStatClick(e, animatedStats.def)}
          >
            <span style={{color: '#999'}}>DEFENSE:</span> {animatedStats.def} (Systems Security)
          </div>
          <div 
            style={{ cursor: 'pointer', userSelect: 'none' }} 
            onClick={(e) => handleStatClick(e, animatedStats.spd)}
          >
            <span style={{color: '#999'}}>SPEED:</span> {animatedStats.spd} (Rapid Prototyping)
          </div>
          <div style={{marginTop: '16px'}}>
            <span style={{color: '#999'}}>EXP:</span> 2+ YEARS<br/>
            <div className="tooltip" onClick={(e) => handleStatClick(e, 8)}>
              <span style={{color: '#999'}}>GOLD:</span> 8+ PROJECTS
              <span className="tooltiptext">Affords precisely one cup of artisan coffee.</span>
            </div>
          </div>
        </div>

        {/* Roles/Skills Column */}
        <div className="dialogue-box" style={{ flexDirection: 'column', gap: '16px', position: 'relative' }}>
          {/* The Unexplained Detail */}
          <div className="anomalous-pixel"></div>

          <h2 className="text-green" style={{ borderBottom: '2px solid white', paddingBottom: '8px' }}>CLASS</h2>
          <div>* ML Engineer</div>
          <div>* Web Developer</div>
          <div>* Designer</div>
          
          <div style={{ marginTop: 'auto', minHeight: '80px' }}>
             <DialogueBox 
               key={isIdle ? 'idle' : 'active'}
               text={isIdle ? `* ... Are you still there?` : `* "Lives at the crossroads of systems engineering, open-source, and security."`} 
               speed={40} 
             />
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .main-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 32px;
        }
        @media (max-width: 768px) {
          .main-grid {
            grid-template-columns: 1fr;
            gap: 16px;
          }
        }
      `}</style>
    </div>
  );
}

