import React from 'react';
import { ParallaxCityscape } from './ParallaxCityscape';

export const HeroSection: React.FC = () => {
  const scrollToAbout = () => {
    const el = document.getElementById('about');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="hero"
      style={{
        position: 'relative',
        width: '100%',
        height: '100vh',
        minHeight: '600px',
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <ParallaxCityscape />

      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundColor: 'rgba(255, 255, 255, 0.15)',
          backdropFilter: 'blur(3px)',
          pointerEvents: 'none',
          zIndex: 1,
        }}
      />

      <div
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          width: '100%',
          height: 'clamp(260px, 42vh, 480px)',
          background: 'linear-gradient(to bottom, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 0.02) 18%, rgba(255, 255, 255, 0.08) 36%, rgba(255, 255, 255, 0.22) 54%, rgba(255, 255, 255, 0.46) 70%, rgba(255, 255, 255, 0.74) 84%, rgba(255, 255, 255, 0.94) 94%, #ffffff 100%)',
          pointerEvents: 'none',
          zIndex: 1,
        }}
      />

      <div
        style={{
          position: 'relative',
          zIndex: 2,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '0 24px',
          maxWidth: '900px',
          width: '100%',
          animation: 'hero-fade-in 1s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        }}
      >
        <div
          style={{
            width: '100%',
            maxWidth: '560px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <img
            src="/images/logo.png"
            alt="Precious Blue"
            style={{
              width: '100%',
              height: 'auto',
              filter: 'drop-shadow(0 10px 25px rgba(0, 0, 0, 0.08))',
            }}
          />
        </div>
      </div>

      <div
        onClick={scrollToAbout}
        style={{
          position: 'absolute',
          bottom: '36px',
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 2,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '8px',
          cursor: 'pointer',
          opacity: 0.85,
          transition: 'opacity 0.2s',
        }}
        className="scroll-indicator"
      >
        <span
          style={{
            fontFamily: 'var(--font-en)',
            fontSize: '0.7rem',
            fontWeight: 600,
            letterSpacing: '0.2em',
            color: '#0a0a0a',
          }}
        >
          SCROLL
        </span>
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#0a0a0a"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M7 13l5 5 5-5M7 6l5 5 5-5" />
        </svg>
      </div>

      <style>{`
        @keyframes hero-fade-in {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .scroll-indicator:hover {
          opacity: 1 !important;
        }
      `}</style>
    </section>
  );
};
