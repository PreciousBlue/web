import React, { useState, useEffect, useCallback, useRef } from 'react';
import { NewsArticle } from '../types/news';

const rawNewsModules = import.meta.glob('/src/content/news/*.md', {
  query: '?raw',
  eager: true,
}) as Record<string, { default: string } | string>;

const parseMarkdownArticle = (id: string, rawContent: string): NewsArticle => {
  const frontmatterMatch = rawContent.match(/^---\s*([\s\S]*?)\s*---\s*([\s\S]*)$/);

  let title = '無題';
  let date = '';
  let category = 'NEWS';
  let body = rawContent;

  if (frontmatterMatch) {
    const frontmatter = frontmatterMatch[1];
    body = frontmatterMatch[2].trim();

    const titleMatch = frontmatter.match(/title:\s*(.*)/);
    const dateMatch = frontmatter.match(/date:\s*(.*)/);
    const categoryMatch = frontmatter.match(/category:\s*(.*)/);

    if (titleMatch) title = titleMatch[1].trim().replace(/^['"]|['"]$/g, '');
    if (dateMatch) date = dateMatch[1].trim().replace(/^['"]|['"]$/g, '');
    if (categoryMatch) category = categoryMatch[1].trim().replace(/^['"]|['"]$/g, '');
  }

  return {
    id,
    title,
    date,
    category,
    content: body,
  };
};

const articles: NewsArticle[] = Object.entries(rawNewsModules)
  .map(([path, contentObj]) => {
    const raw = typeof contentObj === 'string' ? contentObj : contentObj.default;
    const filename = path.split('/').pop()?.replace('.md', '') || path;
    return parseMarkdownArticle(filename, raw);
  })
  .sort((a, b) => b.date.localeCompare(a.date));

export const NewsSection: React.FC = () => {
  const [activeArticle, setActiveArticle] = useState<NewsArticle | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
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

  const openModal = (article: NewsArticle) => {
    setActiveArticle(article);
    setIsModalOpen(true);
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        setIsModalVisible(true);
      });
    });
  };

  const closeModal = useCallback(() => {
    setIsModalVisible(false);
    setTimeout(() => {
      setIsModalOpen(false);
      setActiveArticle(null);
    }, 280);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isModalOpen) {
        closeModal();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isModalOpen, closeModal]);

  return (
    <section
      id="news"
      ref={sectionRef}
      style={{
        padding: 'clamp(80px, 10vw, 130px) 0',
        backgroundColor: '#ffffff',
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
          <span className="section-tag">INFORMATION</span>
          <h2 className="section-title">NEWS</h2>
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
            borderTop: '1px solid #e9ecef',
          }}
        >
          {articles.map((article, index) => (
            <div
              key={article.id}
              onClick={() => openModal(article)}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '24px 16px',
                borderBottom: '1px solid #e9ecef',
                cursor: 'pointer',
                opacity: isInView ? 1 : 0,
                transform: isInView ? 'translateY(0)' : 'translateY(20px)',
                transition: `opacity 0.5s cubic-bezier(0.16, 1, 0.3, 1) ${0.1 + index * 0.08}s, transform 0.5s cubic-bezier(0.16, 1, 0.3, 1) ${0.1 + index * 0.08}s, background-color 0.25s, padding-left 0.25s`,
              }}
              className="news-item-row"
            >
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '20px',
                  flexWrap: 'wrap',
                }}
              >
                <span
                  style={{
                    fontFamily: 'var(--font-en)',
                    fontSize: '0.85rem',
                    color: '#888888',
                    letterSpacing: '0.05em',
                    minWidth: '90px',
                  }}
                >
                  {article.date}
                </span>

                <span
                  style={{
                    fontFamily: 'var(--font-en)',
                    fontSize: '0.7rem',
                    fontWeight: 700,
                    letterSpacing: '0.08em',
                    padding: '2px 8px',
                    backgroundColor: '#f1f3f5',
                    color: '#495057',
                    border: '1px solid #dee2e6',
                  }}
                >
                  {article.category}
                </span>

                <h3
                  style={{
                    fontSize: '1rem',
                    fontWeight: 500,
                    color: '#0a0a0a',
                    lineHeight: 1.5,
                  }}
                  className="news-item-title"
                >
                  {article.title}
                </h3>
              </div>

              <div
                style={{
                  color: '#888888',
                  display: 'flex',
                  alignItems: 'center',
                  marginLeft: '16px',
                }}
                className="news-arrow"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="9 18 15 12 9 6" />
                </svg>
              </div>
            </div>
          ))}
        </div>
      </div>

      {isModalOpen && activeArticle && (
        <div
          onClick={closeModal}
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(10, 10, 10, 0.6)',
            zIndex: 99999,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '20px',
            backdropFilter: 'blur(6px)',
            opacity: isModalVisible ? 1 : 0,
            transition: 'opacity 0.28s cubic-bezier(0.16, 1, 0.3, 1)',
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              backgroundColor: '#ffffff',
              maxWidth: '800px',
              width: '100%',
              maxHeight: '85vh',
              overflowY: 'auto',
              padding: 'clamp(28px, 5vw, 44px)',
              boxShadow: '0 24px 60px rgba(0, 0, 0, 0.18)',
              position: 'relative',
              border: '1px solid #dee2e6',
              opacity: isModalVisible ? 1 : 0,
              transform: isModalVisible ? 'translateY(0) scale(1)' : 'translateY(18px) scale(0.97)',
              transition: 'opacity 0.28s cubic-bezier(0.16, 1, 0.3, 1), transform 0.28s cubic-bezier(0.16, 1, 0.3, 1)',
            }}
            className="custom-scrollbar"
          >
            <button
              type="button"
              onClick={closeModal}
              aria-label="Close"
              style={{
                position: 'absolute',
                top: '24px',
                right: '24px',
                width: '36px',
                height: '36px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                color: '#888888',
                transition: 'color 0.2s, transform 0.2s',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = '#0a0a0a';
                e.currentTarget.style.transform = 'scale(1.1)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = '#888888';
                e.currentTarget.style.transform = 'scale(1)';
              }}
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>

            <div style={{ marginBottom: '20px', display: 'flex', gap: '12px', alignItems: 'center' }}>
              <span
                style={{
                  fontFamily: 'var(--font-en)',
                  fontSize: '0.85rem',
                  color: '#888888',
                  letterSpacing: '0.05em',
                }}
              >
                {activeArticle.date}
              </span>
              <span
                style={{
                  fontFamily: 'var(--font-en)',
                  fontSize: '0.7rem',
                  fontWeight: 700,
                  letterSpacing: '0.08em',
                  padding: '2px 8px',
                  backgroundColor: '#f1f3f5',
                  color: '#495057',
                  border: '1px solid #dee2e6',
                }}
              >
                {activeArticle.category}
              </span>
            </div>

            <h2
              style={{
                fontSize: 'clamp(1.2rem, 2.5vw, 1.5rem)',
                fontWeight: 700,
                color: '#0a0a0a',
                lineHeight: 1.4,
                marginBottom: '28px',
                paddingBottom: '20px',
                borderBottom: '1px solid #e9ecef',
              }}
            >
              {activeArticle.title}
            </h2>

            <div
              style={{
                fontSize: '0.96rem',
                lineHeight: 2,
                color: '#333333',
                whiteSpace: 'pre-line',
              }}
            >
              {activeArticle.content}
            </div>
          </div>
        </div>
      )}

      <style>{`
        .news-item-row:hover {
          background-color: #f8f9fa;
          padding-left: 24px !important;
        }
        .news-item-row:hover .news-item-title {
          color: #3282FD !important;
        }
        .news-item-row:hover .news-arrow {
          color: #3282FD !important;
          transform: translateX(4px);
          transition: transform 0.2s, color 0.2s;
        }
      `}</style>
    </section>
  );
};
