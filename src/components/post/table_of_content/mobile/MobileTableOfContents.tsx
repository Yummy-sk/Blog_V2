import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  useColorMode,
  ColorMode,
} from '@chakra-ui/react';
import { TocItem } from '@/types/content';
import * as S from './MobileTableOfContents.style';

function MobildHeadings({
  headings,
  currentTheme,
}: {
  headings: Array<TocItem>;
  currentTheme: ColorMode;
}) {
  return (
    <S.HeadingContainer currentTheme={currentTheme}>
      {headings.map(heading => (
        <li key={heading.id}>
          <a href={`#${heading.id}`}>{heading.title}</a>
          {heading.children.length ? (
            <MobildHeadings
              headings={heading.children}
              currentTheme={currentTheme}
            />
          ) : null}
        </li>
      ))}
    </S.HeadingContainer>
  );
}

export function MobileTableOfContents({
  headings,
}: {
  headings: Array<TocItem>;
}) {
  const { colorMode } = useColorMode();

  return (
    <S.Container>
      <Accordion
        allowToggle
        background={colorMode === 'light' ? 'gray.200' : 'gray.600'}
        borderRadius='md'>
        <AccordionItem>
          <AccordionButton>
            <Box as='span' flex='1' textAlign='left'>
              Table of Contents
            </Box>
            <AccordionIcon />
          </AccordionButton>
          <AccordionPanel pb={4}>
            <MobildHeadings headings={headings} currentTheme={colorMode} />
          </AccordionPanel>
        </AccordionItem>
      </Accordion>
    </S.Container>
  );
}
