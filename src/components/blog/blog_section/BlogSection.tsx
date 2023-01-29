import Link from 'next/link';
import { useRouter } from 'next/router';
import { useColorMode, ColorMode } from '@chakra-ui/react';
import { BlogListProps } from '@/types/data';
import { parseDateString, parseTagString } from '@/util';
import * as S from './BlogSection.style';

interface TagProps {
  tag: string;
  currentTheme: ColorMode;
}

function Tag({ tag, currentTheme }: TagProps) {
  const router = useRouter();

  const onClick = () => {
    router.push(`/blog/${tag}`);
  };

  return (
    <S.Tag currentTheme={currentTheme} onClick={onClick}>
      <p>#{parseTagString({ tag })}</p>
    </S.Tag>
  );
}

export function BlogSection({ post }: { post: BlogListProps }) {
  const { id, title, description, tags, createdTime } = post;
  const { colorMode } = useColorMode();
  const href = `/post/${id}`;

  return (
    <S.Container>
      <S.Head currentTheme={colorMode}>
        <Link href={href}>
          <h2>{title}</h2>
        </Link>
        <ul>
          {tags.map(tag => (
            <li key={tag}>
              <Tag tag={tag} currentTheme={colorMode} />
            </li>
          ))}
        </ul>
      </S.Head>
      <S.Middle currentTheme={colorMode}>
        <summary>{description}</summary>
        <Link href={`/post/${id}`}>
          <p>Read More →</p>
        </Link>
      </S.Middle>
      <S.Bottom currentTheme={colorMode}>
        <time>
          {parseDateString({
            dateString: createdTime,
          })}
        </time>
      </S.Bottom>
    </S.Container>
  );
}
