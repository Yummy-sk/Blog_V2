import Lottie from 'react-lottie';
import notFound from '@/components/blog/lib/not_found_emoji.json';
import * as S from './BlogNotFound.style';

export function BlogNotFound({ keyword }: { keyword: string }) {
  const defaultOptions = {
    loop: false,
    autoplay: true,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  };

  return (
    <S.Container>
      <Lottie
        options={{ ...defaultOptions, animationData: notFound }}
        width={150}
        height={150}
      />
      <p>Results not found for the keyword &apos;{keyword}&apos;</p>
    </S.Container>
  );
}
