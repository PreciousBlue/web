import React, { useEffect, useRef, useState } from 'react';

export const AboutSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const textBoxRef = useRef<HTMLDivElement>(null);
  const [isInView, setIsInView] = useState(false);
  const [isTextInView, setIsTextInView] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const sectionObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setIsInView(entry.isIntersecting);
        });
      },
      { threshold: 0.2 }
    );
    sectionObserver.observe(section);

    const textBox = textBoxRef.current;
    let textObserver: IntersectionObserver | null = null;
    if (textBox) {
      textObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            setIsTextInView(entry.isIntersecting);
          });
        },
        { threshold: 0.3, rootMargin: '0px 0px -80px 0px' }
      );
      textObserver.observe(textBox);
    }

    return () => {
      sectionObserver.disconnect();
      if (textObserver) {
        textObserver.disconnect();
      }
    };
  }, []);

  return (
    <section
      id="about"
      ref={sectionRef}
      style={{
        position: 'relative',
        minHeight: '100vh',
        width: '100%',
        backgroundColor: '#ffffff',
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
        padding: 'clamp(80px, 10vw, 140px) 0',
      }}
    >
      <div
        className="about-bg-window"
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          clipPath: isInView
            ? 'polygon(36% 0%, 100% 0%, 100% 100%, 22% 100%)'
            : 'polygon(100% 0%, 100% 0%, 100% 100%, 100% 100%)',
          zIndex: 1,
          overflow: 'hidden',
          transition: 'clip-path 1.1s cubic-bezier(0.16, 1, 0.3, 1)',
          pointerEvents: 'none',
        }}
      >
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage: 'url(/images/main-bg.png)',
            backgroundAttachment: 'fixed',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            filter: 'contrast(1.02) saturate(1.04)',
          }}
        />

        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(90deg, rgba(255, 255, 255, 0.3) 0%, rgba(255, 255, 255, 0) 35%, rgba(10, 10, 10, 0.15) 100%)',
          }}
        />
      </div>

      <div
        className="section-container"
        style={{
          position: 'relative',
          zIndex: 2,
          width: '100%',
        }}
      >
        <div
          ref={textBoxRef}
          style={{
            maxWidth: '720px',
            backgroundColor: 'rgba(255, 255, 255, 0.96)',
            backdropFilter: 'blur(12px)',
            padding: 'clamp(32px, 5vw, 52px)',
            border: '1px solid #e9ecef',
            boxShadow: '0 24px 50px rgba(0, 0, 0, 0.04)',
            opacity: isTextInView ? 1 : 0,
            transform: isTextInView ? 'translateY(0)' : 'translateY(28px)',
            transition: 'opacity 0.75s cubic-bezier(0.16, 1, 0.3, 1) 0.2s, transform 0.75s cubic-bezier(0.16, 1, 0.3, 1) 0.2s',
            position: 'relative',
          }}
        >
          <div
            style={{
              position: 'absolute',
              top: '-1px',
              left: '-1px',
              width: '14px',
              height: '14px',
              borderTop: '2px solid #3282FD',
              borderLeft: '2px solid #3282FD',
            }}
          />
          <div
            style={{
              position: 'absolute',
              bottom: '-1px',
              right: '-1px',
              width: '14px',
              height: '14px',
              borderBottom: '2px solid #3282FD',
              borderRight: '2px solid #3282FD',
            }}
          />

          <div style={{ marginBottom: '28px' }}>
            <span className="section-tag">INTRODUCTION</span>
            <h2 className="section-title" style={{ textAlign: 'left', marginTop: '4px' }}>
              ABOUT
            </h2>
            <div
              style={{
                width: isTextInView ? '44px' : '0px',
                height: '2px',
                backgroundColor: '#3282FD',
                marginTop: '12px',
                transition: 'width 0.6s cubic-bezier(0.16, 1, 0.3, 1) 0.35s',
              }}
            />
          </div>

          <div
            style={{
              fontSize: 'clamp(1.1rem, 2vw, 1.35rem)',
              fontWeight: 700,
              lineHeight: 1.6,
              color: '#0a0a0a',
              marginBottom: '28px',
              borderLeft: '3px solid #3282FD',
              paddingLeft: '16px',
            }}
          >
            「もしも、キヴォトスに『先生』がいなかったら――」
          </div>

          <div
            style={{
              fontSize: 'clamp(0.92rem, 1.5vw, 1rem)',
              lineHeight: 2,
              color: '#333333',
              display: 'flex',
              flexDirection: 'column',
              gap: '18px',
            }}
          >
            <p>
              本作は『ブルーアーカイブ』の世界観を舞台にした、美少女×ローグライトハクスラ協力型TPSです。
            </p>
            <p>
              デカグラマトンや色彩…キヴォトスに迫る数々の危機に、生徒たちが自らの力で立ち向かうIFの物語。
            </p>
            <p>
              生徒のスキルと多彩な銃器を組み合わせ、あなただけのオリジナルビルドを構築！遊ぶたびに変化する戦場を、仲間とともに爽快なアクションで撃ち抜け！
            </p>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .about-bg-window {
            clip-path: polygon(0% 0%, 100% 0%, 100% 48%, 0% 60%) !important;
          }

          #about {
            padding-top: 52% !important;
          }
        }
      `}</style>
    </section>
  );
};
