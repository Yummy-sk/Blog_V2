/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { useId, useMemo } from 'react';
import Image from 'next/image';
import { getMDXComponent } from 'mdx-bundler/client';
import dracula from 'react-syntax-highlighter/dist/cjs/styles/prism/dracula';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { useColorMode } from '@chakra-ui/react';
import {
  AnchorProps,
  BlockQuoteProps,
  BoldProps,
  CodeProps,
  HeadingProps,
  ImageProps,
  OrderedListProps,
  ParagraphProps,
  PreProps,
  PrePropsExtended,
  UnorderedListProps,
} from '@/types/content';
import * as S from './PostContent.style';

function Heading(props: HeadingProps) {
  const { children, 'aria-level': ariaLevel } = props;

  const id = useId();

  switch (ariaLevel) {
    case 1:
      return <S.HeadingH1 id={id}>{children}</S.HeadingH1>;
    case 2:
      return <S.HeadingH2 id={id}>{children}</S.HeadingH2>;
    case 3:
      return <S.HeadingH3 id={id}>{children}</S.HeadingH3>;
    default:
      return <S.HeadingH3 id={id}>{children}</S.HeadingH3>;
  }
}

function CustomImage(props: ImageProps) {
  const { src, alt } = props;
  return (
    <S.CustomImageWrapper>
      <Image
        className='autoImage'
        fill
        sizes='100%'
        src={src || ''}
        alt={alt || ''}
        priority
      />
    </S.CustomImageWrapper>
  );
}

function Bold(props: BoldProps) {
  const { children } = props;
  return <S.Bold>{children}</S.Bold>;
}

function BlockQuote(props: BlockQuoteProps) {
  // @ts-ignore
  return <S.BlockQuote {...props} />;
}

function Code(props: CodeProps) {
  const { children, className } = props;

  if (className) {
    return <code {...props} />;
  }

  return <S.CodeInline>{children}</S.CodeInline>;
}

function Paragraph(props: ParagraphProps) {
  const { children } = props;
  return <S.Paragraph>{children}</S.Paragraph>;
}

function Pre(props: PreProps) {
  // TODO: className으로 어떤 언어인지 확장하기
  const {
    children: {
      props: { children: code, className },
    },
  } = props as PrePropsExtended;

  const getLanguage = () => {
    const parsedLanguage = className?.replace(/language-/, '') || '';

    switch (parsedLanguage) {
      case 'js':
      case 'javascript':
        return 'jsx';

      case 'ts':
      case 'typescript':
        return 'tsx';

      default:
        return parsedLanguage;
    }
  };

  return (
    <SyntaxHighlighter
      language={getLanguage()}
      style={dracula}
      codeTagProps={{
        style: {
          fontSize: '0.8rem',
          fontWeight: 600,
        },
      }}>
      {code}
    </SyntaxHighlighter>
  );
}

function UnorderedList(props: UnorderedListProps) {
  // @ts-ignore
  return <S.UnorderedList {...props} />;
}

function OrderedList(props: OrderedListProps) {
  // @ts-ignore
  return <S.OrderedList {...props} />;
}

function Anchor(props: AnchorProps) {
  // TODO: hover 했을 때, tooltip으로 링크 주소 보여주기
  // TODO: children이 "bookmark"일 때, 노션처럼 마크업으로 보여주기
  const { colorMode } = useColorMode();
  return <S.Anchor currentTheme={colorMode} {...props} />;
}

const components = {
  h1: (props: HeadingProps) => <Heading {...{ ...props, 'aria-level': 1 }} />,
  h2: (props: HeadingProps) => <Heading {...{ ...props, 'aria-level': 2 }} />,
  h3: (props: HeadingProps) => <Heading {...{ ...props, 'aria-level': 3 }} />,
  img: (props: ImageProps) => <CustomImage {...props} />,
  strong: (props: BoldProps) => <Bold {...props} />,
  blockquote: (props: BlockQuoteProps) => <BlockQuote {...props} />,
  code: (props: CodeProps) => <Code {...props} />,
  p: (props: ParagraphProps) => <Paragraph {...props} />,
  pre: (props: PreProps) => <Pre {...props} />,
  ul: (props: UnorderedListProps) => <UnorderedList {...props} />,
  ol: (props: OrderedListProps) => <OrderedList {...props} />,
  a: (props: AnchorProps) => <Anchor {...props} />,
};

export function PostContent({ content }: { content: string }) {
  const Component = useMemo(() => getMDXComponent(content), [content]);
  return (
    <S.Container>
      <Component components={components} />
    </S.Container>
  );
}
