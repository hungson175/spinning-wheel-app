import React, { useEffect, useRef } from 'react';
import './Confetti.css';

const Confetti = ({ active }) => {
  const containerRef = useRef(null);

  useEffect(() => {
    if (active && containerRef.current) {
      const colors = ['#ff6b9d', '#ff5757', '#ffd700', '#4ecdc4', '#45b7d1'];
      const confettiCount = 100;
      
      containerRef.current.innerHTML = '';
      
      for (let i = 0; i < confettiCount; i++) {
        const confetti = document.createElement('div');
        confetti.className = 'confetti-piece';
        confetti.style.background = colors[Math.floor(Math.random() * colors.length)];
        confetti.style.left = Math.random() * 100 + '%';
        confetti.style.animationDelay = Math.random() * 3 + 's';
        confetti.style.animationDuration = (Math.random() * 3 + 2) + 's';
        containerRef.current.appendChild(confetti);
      }

      setTimeout(() => {
        if (containerRef.current) {
          containerRef.current.innerHTML = '';
        }
      }, 5000);
    }
  }, [active]);

  if (!active) return null;

  return <div ref={containerRef} className="confetti-container" aria-hidden="true" />;
};

export default Confetti;