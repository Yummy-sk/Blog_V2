import { IconProp } from '@fortawesome/fontawesome-svg-core';
import github from '@fortawesome/fontawesome-free-brands/faGithub';
import linkedin from '@fortawesome/fontawesome-free-brands/faLinkedin';
import twitter from '@fortawesome/fontawesome-free-brands/faTwitter';
import rss from '@fortawesome/fontawesome-free-solid/faRssSquare';
import * as S from './Logo.style';

interface LogoProps {
  type: 'github' | 'linkedin' | 'twitter' | 'rss';
  size: number;
  hover: string;
}

function getIcon(type: LogoProps['type']) {
  switch (type) {
    case 'github':
      return github;
    case 'linkedin':
      return linkedin;
    case 'twitter':
      return twitter;
    case 'rss':
      return rss;
    default:
      return rss;
  }
}

export function Logo({ type, size, hover }: LogoProps) {
  return (
    <S.LogoContainer
      icon={getIcon(type) as IconProp}
      width={size}
      height={size}
      hover={hover}
    />
  );
}
