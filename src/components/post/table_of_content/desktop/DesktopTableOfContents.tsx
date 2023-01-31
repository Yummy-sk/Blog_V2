import { useState } from 'react';
import { useColorMode } from '@chakra-ui/react';
import { useIntersectionObserver } from '@/hooks';
import { TocItem } from '@/types/content';
import * as S from './DesktopTableOfContents.style';

function DesktopHeadings({
  headings,
  activeId,
}: {
  headings: Array<TocItem>;
  activeId: string;
}) {
  const { colorMode } = useColorMode();

  return (
    <S.HeadingContainer currentTheme={colorMode}>
      {headings.map(heading => (
        <li
          key={heading.id}
          className={heading.id === activeId ? 'active' : ''}>
          <a href={`#${heading.id}`}>{heading.title}</a>
          {heading.children.length ? (
            <DesktopHeadings headings={heading.children} activeId={activeId} />
          ) : null}
        </li>
      ))}
    </S.HeadingContainer>
  );
}

export function DesktopTableOfContents({
  headings,
}: {
  headings: Array<TocItem>;
}) {
  const [activeId, setActiveId] = useState<string>('');

  useIntersectionObserver({
    setActiveId,
  });

  return (
    <S.Container>
      <S.Wrapper>
        <DesktopHeadings headings={headings} activeId={activeId} />
      </S.Wrapper>
    </S.Container>
  );
}
