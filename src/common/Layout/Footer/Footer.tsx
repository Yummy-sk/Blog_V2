import { cloneElement } from 'react';
import { useTheme } from 'styled-components';
import { HiRss } from 'react-icons/hi';
import { AiFillLinkedin, AiFillGithub, AiOutlineTwitter } from 'react-icons/ai';
import { nanoid } from 'nanoid';
import * as S from './style';

type LogoItem = {
  id: string;
  href: string;
  name: 'LinkedIn' | 'Github' | 'Twitter' | 'RSS';
};
type NameType = Pick<LogoItem, 'name'>;

const getIcon = ({ name }: NameType) => {
  switch (name) {
    case 'LinkedIn':
      return <AiFillLinkedin />;
    case 'Github':
      return <AiFillGithub />;
    case 'Twitter':
      return <AiOutlineTwitter />;
    case 'RSS':
      return <HiRss />;
    default:
      return <AiFillGithub />;
  }
};

function Logo({ name }: NameType) {
  const theme = useTheme();

  return cloneElement(
    getIcon({
      name,
    }),
    {
      size: 25,
      color: theme.colors.gray,
    },
  );
}

export function Footer() {
  const year = new Date().getFullYear();
  const logos: Array<LogoItem> = [
    {
      id: nanoid(),
      href: 'https://www.linkedin.com/in/sang-kwon-yeum/',
      name: 'LinkedIn',
    },
    {
      id: nanoid(),
      href: 'https://github.com/Yummy-sk',
      name: 'Github',
    },
    {
      id: nanoid(),
      href: 'https://twitter.com/NateYeum',
      name: 'Twitter',
    },
    {
      id: nanoid(),
      href: 'https://www.yeummy-blog.com/rss/feed.xml',
      name: 'RSS',
    },
  ];

  return (
    <S.Container>
      <S.Wrapper>
        <S.List>
          {logos.map(({ id, href, name }) => (
            <li key={id}>
              <a href={href}>
                <Logo name={name} />
              </a>
            </li>
          ))}
        </S.List>
        <p>Copyright © {year} SangKwonYeum</p>
      </S.Wrapper>
    </S.Container>
  );
}
