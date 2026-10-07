import React from 'react';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer
      style={{
        backgroundColor: '#ffffff',
        color: '#0a0a0a',
        padding: '60px 24px 45px',
        borderTop: '1px solid #e9ecef',
      }}
    >
      <div
        style={{
          maxWidth: '1200px',
          margin: '0 auto',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '24px',
          textAlign: 'center',
        }}
      >
        <button
          type="button"
          onClick={scrollToTop}
          aria-label="Scroll to top"
          style={{
            width: '42px',
            height: '42px',
            border: '1px solid #dee2e6',
            backgroundColor: '#ffffff',
            color: '#0a0a0a',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            transition: 'border-color 0.25s cubic-bezier(0.16, 1, 0.3, 1), color 0.25s cubic-bezier(0.16, 1, 0.3, 1), background-color 0.25s cubic-bezier(0.16, 1, 0.3, 1), transform 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
          }}
          className="back-to-top"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polyline points="18 15 12 9 6 15" />
          </svg>
        </button>

        <div
          style={{
            fontSize: '0.82rem',
            color: '#868e96',
            letterSpacing: '0.04em',
            maxWidth: '800px',
            lineHeight: 1.8,
          }}
        >
          本ゲームはブルーアーカイブ (NEXON Games, Yostar) の二次創作ゲームであり、公式とは一切関係がありません。
        </div>

        <div
          style={{
            fontSize: '0.88rem',
            fontWeight: 500,
            color: '#495057',
            letterSpacing: '0.06em',
            borderTop: '1px solid #f1f3f5',
            paddingTop: '24px',
            width: '100%',
          }}
        >
          © 2025-2026  先生、またバグりました！
        </div>
      </div>

      <style>{`
        .back-to-top:hover {
          border-color: #3282FD !important;
          color: #3282FD !important;
          background-color: rgba(50, 130, 253, 0.05) !important;
          transform: translateY(-2px);
        }
      `}</style>
    </footer>
  );
};
