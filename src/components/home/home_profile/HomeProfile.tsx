import { nanoid } from 'nanoid';
import { useColorMode } from '@chakra-ui/react';
import { AiFillLinkedin, AiFillGithub, AiOutlineTwitter } from 'react-icons/ai';
import { getCdnSrc } from '@/util';
import * as S from './HomeProfile.style';

interface Props {
  src: string;
}

type LogoItem = {
  id: string;
  href: string;
  name: 'LinkedIn' | 'Github' | 'Twitter';
  color: string;
};

type NameType = Pick<LogoItem, 'name'>;

const getIcon = ({ name }: NameType) => {
  switch (name) {
    case 'LinkedIn':
      return <AiFillLinkedin size={30} />;
    case 'Github':
      return <AiFillGithub size={30} />;
    case 'Twitter':
      return <AiOutlineTwitter size={30} />;
    default:
      return <AiFillGithub size={30} />;
  }
};

export function HomeProfile({ src }: Props) {
  const { colorMode } = useColorMode();
  const logos: Array<LogoItem> = [
    {
      id: nanoid(),
      href: 'https://www.linkedin.com/in/sang-kwon-yeum/',
      name: 'LinkedIn',
      color: '#0072B1',
    },
    {
      id: nanoid(),
      href: 'https://github.com/Yummy-sk',
      name: 'Github',
      color: '#000000',
    },
    {
      id: nanoid(),
      href: 'https://twitter.com/NateYeum',
      name: 'Twitter',
      color: '#1D9BF0',
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
        {logos.map(({ id, href, name, color }) => (
          <li key={id}>
            <S.IconLink
              href={href}
              currentTheme={colorMode}
              hoverColor={color}
              target='_blank'>
              {getIcon({
                name,
              })}
            </S.IconLink>
          </li>
        ))}
      </ul>
    </S.Container>
  );
}
