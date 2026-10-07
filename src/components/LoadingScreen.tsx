import React, { useState, useEffect, useRef } from 'react';

interface LoadingScreenProps {
  onLoaded?: () => void;
}

export const LoadingScreen: React.FC<LoadingScreenProps> = ({ onLoaded }) => {
  const [progress, setProgress] = useState(0);
  const [isFadingOut, setIsFadingOut] = useState(false);
  const [isDone, setIsDone] = useState(false);
  const animFrameRef = useRef<number>();

  useEffect(() => {
    const startTime = performance.now();
    const minDuration = 2000;
    let isWindowLoaded = document.readyState === 'complete';
    let currentProgress = 0;

    const handleWindowLoad = () => {
      isWindowLoaded = true;
    };

    if (!isWindowLoaded) {
      window.addEventListener('load', handleWindowLoad);
    }

    const preloadImages = ['/images/logo.png', '/images/main-bg.png'];
    let loadedImagesCount = 0;
    preloadImages.forEach((src) => {
      const img = new Image();
      img.onload = img.onerror = () => {
        loadedImagesCount++;
      };
      img.src = src;
    });

    const updateLoop = (now: number) => {
      const elapsed = now - startTime;
      const allAssetsLoaded = isWindowLoaded && loadedImagesCount >= preloadImages.length;

      let target = 0;
      if (!allAssetsLoaded) {
        const timeFactor = Math.min(0.88, elapsed / (minDuration * 1.5));
        const assetFactor = (loadedImagesCount / preloadImages.length) * 0.12;
        target = (timeFactor + assetFactor) * 100;
      } else {
        if (elapsed < minDuration) {
          target = (elapsed / minDuration) * 98;
        } else {
          target = 100;
        }
      }

      currentProgress += (target - currentProgress) * 0.08;

      if (currentProgress > 99.5 && elapsed >= minDuration && allAssetsLoaded) {
        currentProgress = 100;
        setProgress(100);
        setIsFadingOut(true);
        setTimeout(() => {
          setIsDone(true);
          if (onLoaded) {
            onLoaded();
          }
        }, 650);
        return;
      }

      setProgress(Math.floor(currentProgress));
      animFrameRef.current = requestAnimationFrame(updateLoop);
    };

    animFrameRef.current = requestAnimationFrame(updateLoop);

    return () => {
      window.removeEventListener('load', handleWindowLoad);
      if (animFrameRef.current) {
        cancelAnimationFrame(animFrameRef.current);
      }
    };
  }, [onLoaded]);

  if (isDone) return null;

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: '#ffffff',
        zIndex: 99999,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '24px',
        opacity: isFadingOut ? 0 : 1,
        transition: 'opacity 0.65s cubic-bezier(0.16, 1, 0.3, 1)',
        pointerEvents: isFadingOut ? 'none' : 'auto',
      }}
    >
      <div
        style={{
          maxWidth: '800px',
          width: '100%',
          textAlign: 'center',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '24px',
        }}
      >
        <div
          style={{
            display: 'inline-block',
            padding: '4px 16px',
            border: '1px solid #0a0a0a',
            fontSize: '0.85rem',
            fontWeight: 700,
            letterSpacing: '0.15em',
            color: '#0a0a0a',
          }}
        >
          ！注意！
        </div>

        <div
          style={{
            fontSize: 'clamp(0.9rem, 1.8vw, 1.05rem)',
            lineHeight: 1.9,
            color: '#333333',
            textAlign: 'center',
            wordBreak: 'break-word',
          }}
        >
          <p style={{ marginBottom: '12px', fontWeight: 500 }}>
            本ゲームはブルーアーカイブ (NEXON Games, Yostar) の二次創作ゲームです。
          </p>
          <p style={{ marginBottom: '12px' }}>
            本作は非営利かつ趣味の範囲で制作したものであり、公式とは一切関係がありません。
          </p>
          <p style={{ color: '#666666', fontSize: '0.9em' }}>
            万が一、公式のガイドライン変更や公式からの削除要請があった場合は、予告なく本作の公開を停止いたします。
          </p>
        </div>

        <div
          style={{
            width: '100%',
            maxWidth: '360px',
            marginTop: '32px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '10px',
          }}
        >
          <div
            style={{
              width: '100%',
              height: '3px',
              backgroundColor: '#f1f3f5',
              overflow: 'hidden',
              position: 'relative',
            }}
          >
            <div
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                backgroundColor: '#3282FD',
                transform: `scaleX(${progress / 100})`,
                transformOrigin: 'left',
                transition: 'transform 0.08s linear',
              }}
            />
          </div>
          <div
            style={{
              fontSize: '0.75rem',
              fontFamily: 'var(--font-en)',
              color: '#868e96',
              letterSpacing: '0.08em',
              fontWeight: 600,
            }}
          >
            {progress}%
          </div>
        </div>
      </div>
    </div>
  );
};
