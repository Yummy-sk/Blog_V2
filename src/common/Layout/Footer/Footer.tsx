import { nanoid } from 'nanoid';
import { Logo } from '@/common/Logo/Logo';
import { LogoItem } from '@/types/logo';
import * as S from './style';

export function Footer() {
  const year = new Date().getFullYear();
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
    {
      id: nanoid(),
      href: 'https://www.yeummy-blog.com/rss/feed.xml',
      type: 'rss',
      hover: '#EE802F',
    },
  ];

  return (
    <S.Container>
      <S.Wrapper>
        <S.List>
          {logos.map(({ id, href, type, hover }) => (
            <li key={id}>
              <a href={href}>
                <Logo type={type} size={24} hover={hover} />
              </a>
            </li>
          ))}
        </S.List>
        <p>Copyright © {year} SangKwonYeum</p>
      </S.Wrapper>
    </S.Container>
  );
}
