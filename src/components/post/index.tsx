import { PostContent } from '@/components/post/post_content/PostContent';
import { PostHeader } from '@/components/post/post_header/PostHeader';
import { PostComment } from '@/components/post/post_comment/PostComment';
import { BlogPageProps } from '@/types/data';
import * as S from './style';

export function Post({ detail, content }: BlogPageProps) {
  return (
    <S.Container>
      <PostHeader detail={detail} />
      <PostContent content={content} />
      <PostComment />
    </S.Container>
  );
}
