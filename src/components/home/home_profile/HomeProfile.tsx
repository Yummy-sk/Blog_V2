import { nanoid } from 'nanoid';
import { Logo } from '@/common/Logo/Logo';
import { getCdnSrc } from '@/util';
import { LogoItem } from '@/types/logo';
import * as S from './HomeProfile.style';

interface Props {
  src: string;
}

export function HomeProfile({ src }: Props) {
  const logos: Array<LogoItem> = [
    {
      id: nanoid(),
      href: 'https://www.linkedin.com/in/sang-kwon-yeum/',
      type: 'linkedin',
      hover: '#0072B1',
    },
    {
      id: nanoid(),
      href: 'https://github.com/Yummy-sk',
      type: 'github',
      hover: '#000000',
    },
    {
      id: nanoid(),
      href: 'https://twitter.com/NateYeum',
      type: 'twitter',
      hover: '#1D9BF0',
    },
  ];

  return (
    <S.Container>
      <S.NextImage
        src={getCdnSrc({
          src,
          width: 300,
          height: 300,
        })}
        width={180}
        height={180}
        priority
        quality={100}
        alt='profile image'
      />
      <S.Title>Sang Kwon Yeum</S.Title>
      <S.Paragraph>Graduate student at Jeju National University.</S.Paragraph>
      <S.Paragraph>Currently looking for any opportunity.</S.Paragraph>
      <ul>
        {logos.map(({ id, href, type, hover }) => (
          <li key={id}>
            <a target='_blank' href={href} rel='noreferrer'>
              <Logo type={type} size={30} hover={hover} />
            </a>
          </li>
        ))}
      </ul>
    </S.Container>
  );
}
