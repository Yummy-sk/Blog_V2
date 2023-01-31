import { PostContent } from '@/components/post/post_content/PostContent';
import { PostHeader } from '@/components/post/post_header/PostHeader';
import { PostComment } from '@/components/post/post_comment/PostComment';
import { TableOfContents } from '@/components/post/table_of_content/TableOfContents';
import { BlogPageProps } from '@/types/data';
import * as S from './style';

export function Post({ detail, content }: BlogPageProps) {
  return (
    <S.Container>
      <PostHeader detail={detail} />
      <TableOfContents />
      <PostContent content={content} />
      <PostComment />
    </S.Container>
  );
}
