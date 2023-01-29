import Link from 'next/link';
import { useRouter } from 'next/router';
import { nanoid } from 'nanoid';
import { useColorMode } from '@chakra-ui/react';
import { ThemeModeToggler } from '@/common/DarkMode';
import * as S from './styles';

interface LinkProps {
  href: string;
  name: string;
  isActive: boolean;
}

function NavLink({ href, name, isActive }: LinkProps) {
  const { colorMode } = useColorMode();

  return (
    <Link href={href} passHref>
      <S.Anchor isActive={isActive} currentTheme={colorMode}>
        {name}
      </S.Anchor>
    </Link>
  );
}

export function Header() {
  const router = useRouter();
  const links = [
    {
      key: nanoid(),
      name: 'Home',
      path: '/',
    },
    {
      key: nanoid(),
      name: 'Blog',
      path: '/blog/all',
    },
    {
      key: nanoid(),
      name: 'Contact',
      path: '/contact',
    },
  ];

  const onClick = () => {
    router.push(`/`);
  };

  return (
    <S.Container>
      <S.Header>
        <button type='button' onClick={onClick}>
          Yeummy-sk
        </button>
        <ThemeModeToggler />
      </S.Header>
      <S.Nav>
        <ul>
          {links.map(({ key, path, name }) => (
            <li key={key}>
              <NavLink
                href={path}
                name={name}
                isActive={
                  name === 'Blog'
                    ? ['/blog', '/post'].some((ph: string) =>
                        router.pathname.includes(ph),
                      )
                    : router.pathname === path
                }
              />
            </li>
          ))}
        </ul>
      </S.Nav>
    </S.Container>
  );
}
