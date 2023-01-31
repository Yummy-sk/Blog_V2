import { useEffect, useState } from 'react';

type ScreenType = 'mobile' | 'desktop';

export function useScreeType() {
  const [windowSize, setWindowSize] = useState<ScreenType>('mobile');

  useEffect(() => {
    function handleResize() {
      setWindowSize(() => (window.innerWidth < 1350 ? 'mobile' : 'desktop'));
    }

    window.addEventListener('resize', handleResize);

    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return windowSize;
}
