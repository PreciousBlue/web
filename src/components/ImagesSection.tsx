import React, { useState, useEffect, useRef } from 'react';

interface Slide {
  id: string;
  type: 'video' | 'image';
  url: string;
  thumbnailUrl: string;
  label: string;
}

export const ImagesSection: React.FC = () => {
  const [activeSlideIndex, setActiveSlideIndex] = useState(0);
  const [lightboxImageUrl, setLightboxImageUrl] = useState<string | null>(null);
  const [isInView, setIsInView] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  const slides: Slide[] = [
    {
      id: 'pv-trailer',
      type: 'video',
      url: 'https://www.youtube.com/embed/DG19mQ0SPIo?si=Rhqf3SHYCpb8Rhtz',
      thumbnailUrl: 'https://img.youtube.com/vi/DG19mQ0SPIo/mqdefault.jpg',
      label: 'Teaser PV',
    },
    {
      id: 'screen-1',
      type: 'image',
      url: '/images/gallery/screenshot-1.png',
      thumbnailUrl: '/images/gallery/screenshot-1.png',
      label: 'Gameplay Screenshot 1',
    },
    {
      id: 'screen-2',
      type: 'image',
      url: '/images/gallery/screenshot-2.png',
      thumbnailUrl: '/images/gallery/screenshot-2.png',
      label: 'Gameplay Screenshot 2',
    },
    {
      id: 'screen-3',
      type: 'image',
      url: '/images/gallery/screenshot-3.png',
      thumbnailUrl: '/images/gallery/screenshot-3.png',
      label: 'Gameplay Screenshot 3',
    },
  ];

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

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (lightboxImageUrl) {
        if (e.key === 'Escape') {
          setLightboxImageUrl(null);
        }
        return;
      }
      if (e.key === 'ArrowLeft') {
        setActiveSlideIndex((prev) => (prev > 0 ? prev - 1 : slides.length - 1));
      } else if (e.key === 'ArrowRight') {
        setActiveSlideIndex((prev) => (prev < slides.length - 1 ? prev + 1 : 0));
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxImageUrl, slides.length]);

  const currentSlide = slides[activeSlideIndex];

  return (
    <section
      id="images"
      ref={sectionRef}
      style={{
        padding: 'clamp(80px, 10vw, 130px) 0',
        backgroundColor: '#f8f9fa',
        borderTop: '1px solid #e9ecef',
        borderBottom: '1px solid #e9ecef',
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
          <span className="section-tag">GALLERY</span>
          <h2 className="section-title">IMAGES</h2>
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
            maxWidth: '920px',
            margin: '0 auto',
            opacity: isInView ? 1 : 0,
            transform: isInView ? 'translateY(0) scale(1)' : 'translateY(30px) scale(0.98)',
            transition: 'opacity 0.7s cubic-bezier(0.16, 1, 0.3, 1) 0.15s, transform 0.7s cubic-bezier(0.16, 1, 0.3, 1) 0.15s',
          }}
        >
          <div
            style={{
              position: 'relative',
              aspectRatio: '16/9',
              backgroundColor: '#0a0a0a',
              border: '1px solid #dee2e6',
              overflow: 'hidden',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 16px 36px rgba(0, 0, 0, 0.06)',
            }}
          >
            {currentSlide.type === 'video' ? (
              <iframe
                key={currentSlide.url}
                src={currentSlide.url}
                title={currentSlide.label}
                style={{
                  width: '100%',
                  height: '100%',
                  border: 'none',
                  display: 'block',
                }}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            ) : (
              <div
                onClick={() => setLightboxImageUrl(currentSlide.url)}
                style={{
                  width: '100%',
                  height: '100%',
                  cursor: 'zoom-in',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: '#ffffff',
                }}
              >
                <img
                  src={currentSlide.url}
                  alt={currentSlide.label}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'contain',
                    transition: 'transform 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                  }}
                />
              </div>
            )}

            <button
              type="button"
              onClick={() => setActiveSlideIndex((prev) => (prev > 0 ? prev - 1 : slides.length - 1))}
              aria-label="Previous"
              style={{
                position: 'absolute',
                left: '12px',
                top: '50%',
                transform: 'translateY(-50%)',
                width: '40px',
                height: '40px',
                backgroundColor: 'rgba(0, 0, 0, 0.65)',
                color: '#ffffff',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                backdropFilter: 'blur(4px)',
                transition: 'background-color 0.2s, transform 0.2s',
                zIndex: 10,
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = 'rgba(0, 0, 0, 0.9)';
                e.currentTarget.style.transform = 'translateY(-50%) scale(1.05)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'rgba(0, 0, 0, 0.65)';
                e.currentTarget.style.transform = 'translateY(-50%) scale(1)';
              }}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                <polyline points="15 18 9 12 15 6" />
              </svg>
            </button>

            <button
              type="button"
              onClick={() => setActiveSlideIndex((prev) => (prev < slides.length - 1 ? prev + 1 : 0))}
              aria-label="Next"
              style={{
                position: 'absolute',
                right: '12px',
                top: '50%',
                transform: 'translateY(-50%)',
                width: '40px',
                height: '40px',
                backgroundColor: 'rgba(0, 0, 0, 0.65)',
                color: '#ffffff',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                backdropFilter: 'blur(4px)',
                transition: 'background-color 0.2s, transform 0.2s',
                zIndex: 10,
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = 'rgba(0, 0, 0, 0.9)';
                e.currentTarget.style.transform = 'translateY(-50%) scale(1.05)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'rgba(0, 0, 0, 0.65)';
                e.currentTarget.style.transform = 'translateY(-50%) scale(1)';
              }}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </button>

            <div
              style={{
                position: 'absolute',
                bottom: '12px',
                right: '12px',
                padding: '4px 10px',
                backgroundColor: 'rgba(0, 0, 0, 0.75)',
                color: '#ffffff',
                fontSize: '11px',
                fontFamily: 'var(--font-en)',
                fontWeight: 600,
                letterSpacing: '0.08em',
                backdropFilter: 'blur(4px)',
                zIndex: 10,
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
              }}
            >
              {currentSlide.type === 'video' && (
                <span style={{ fontSize: '10px', color: '#3282FD' }}>▶</span>
              )}
              <span>{activeSlideIndex + 1} / {slides.length}</span>
            </div>
          </div>

          <div
            className="custom-scrollbar"
            style={{
              display: 'flex',
              gap: '10px',
              marginTop: '12px',
              overflowX: 'auto',
              paddingBottom: '8px',
            }}
          >
            {slides.map((slide, idx) => (
              <button
                key={slide.id}
                type="button"
                onClick={() => setActiveSlideIndex(idx)}
                style={{
                  width: '100px',
                  height: '58px',
                  padding: 0,
                  border: idx === activeSlideIndex ? '2px solid #3282FD' : '1px solid #dee2e6',
                  backgroundColor: '#ffffff',
                  overflow: 'hidden',
                  cursor: 'pointer',
                  flexShrink: 0,
                  opacity: idx === activeSlideIndex ? 1 : 0.6,
                  position: 'relative',
                  transition: 'opacity 0.25s, border-color 0.25s, transform 0.25s',
                  transform: idx === activeSlideIndex ? 'scale(1.02)' : 'scale(1)',
                }}
              >
                <img
                  src={slide.thumbnailUrl}
                  alt={slide.label}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                  }}
                />
                {slide.type === 'video' && (
                  <div
                    style={{
                      position: 'absolute',
                      inset: 0,
                      backgroundColor: 'rgba(0, 0, 0, 0.35)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="#ffffff">
                      <polygon points="5 3 19 12 5 21 5 3" />
                    </svg>
                  </div>
                )}
              </button>
            ))}
          </div>
        </div>
      </div>

      {lightboxImageUrl && (
        <div
          onClick={() => setLightboxImageUrl(null)}
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.88)',
            zIndex: 99999,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '24px',
            cursor: 'zoom-out',
            backdropFilter: 'blur(6px)',
            animation: 'lightbox-fade 0.25s cubic-bezier(0.16, 1, 0.3, 1) forwards',
          }}
        >
          <img
            src={lightboxImageUrl}
            alt="Enlarged preview"
            style={{
              maxWidth: '90%',
              maxHeight: '90%',
              objectFit: 'contain',
              boxShadow: '0 20px 50px rgba(0, 0, 0, 0.5)',
            }}
          />
        </div>
      )}

      <style>{`
        @keyframes lightbox-fade {
          from {
            opacity: 0;
            transform: scale(0.96);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
      `}</style>
    </section>
  );
};
