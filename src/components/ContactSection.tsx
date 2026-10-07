import React, { useState, useEffect, useRef } from 'react';

export const ContactSection: React.FC = () => {
  const [isInView, setIsInView] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setIsInView(entry.isIntersecting);
        });
      },
      { threshold: 0.3, rootMargin: '0px 0px -100px 0px' }
    );
    observer.observe(section);

    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="contact"
      ref={sectionRef}
      style={{
        padding: 'clamp(80px, 10vw, 130px) 0',
        backgroundColor: '#f8f9fa',
        borderTop: '1px solid #e9ecef',
      }}
    >
      <div className="section-container">
        <div
          className="section-header"
          style={{
            opacity: isInView ? 1 : 0,
            transform: isInView ? 'translateY(0)' : 'translateY(24px)',
            transition: 'opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1), transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
          }}
        >
          <span className="section-tag">COMMUNITY</span>
          <h2 className="section-title">CONTACT</h2>
          <div
            className="section-divider"
            style={{
              width: isInView ? '40px' : '0px',
              transition: 'width 0.6s cubic-bezier(0.16, 1, 0.3, 1) 0.15s',
            }}
          />
        </div>

        <div
          style={{
            maxWidth: '820px',
            margin: '0 auto',
            backgroundColor: '#ffffff',
            border: '1px solid #dee2e6',
            padding: 'clamp(32px, 6vw, 52px)',
            textAlign: 'center',
            boxShadow: '0 12px 36px rgba(0, 0, 0, 0.03)',
            opacity: isInView ? 1 : 0,
            transform: isInView ? 'translateY(0) scale(1)' : 'translateY(24px) scale(0.98)',
            transition: 'opacity 0.7s cubic-bezier(0.16, 1, 0.3, 1) 0.15s, transform 0.7s cubic-bezier(0.16, 1, 0.3, 1) 0.15s',
          }}
        >
          <p
            style={{
              fontSize: '1.05rem',
              color: '#333333',
              lineHeight: 1.8,
              marginBottom: '32px',
            }}
          >
            制作に関する最新情報、開発進捗、お問い合わせは公式Xアカウントにて発信しております。
          </p>

          <a
            href="https://x.com/PreciousBlueJP"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '12px',
              padding: '16px 36px',
              backgroundColor: '#0a0a0a',
              color: '#ffffff',
              fontSize: '0.95rem',
              fontFamily: 'var(--font-en)',
              fontWeight: 600,
              letterSpacing: '0.08em',
              transition: 'background-color 0.25s, transform 0.25s',
            }}
            className="x-contact-button"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
            </svg>
            <span>@PreciousBlueJP</span>
          </a>
        </div>
      </div>

      <style>{`
        .x-contact-button:hover {
          background-color: #3282FD !important;
          transform: translateY(-2px);
        }
      `}</style>
    </section>
  );
};
