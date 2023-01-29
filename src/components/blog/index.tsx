import { BlogOption } from '@/components/blog/blog_option/BlogOption';
import { BlogSection } from '@/components/blog/blog_section/BlogSection';
import { BlogNotFound } from '@/components/blog/blog_not_found/BlogNotFound';
import { BlogListProps } from '@/types/data';
import * as S from './style';

interface Props {
  posts: Array<BlogListProps>;
  keyword: string;
  onChangeKeyword: ({ keyword }: { keyword: string }) => void;
}

export function BlogList({ posts, keyword, onChangeKeyword }: Props) {
  return (
    <S.Container>
      <BlogOption keyword={keyword} onChangeKeyword={onChangeKeyword} />
      {posts.length ? (
        posts.map(post => <BlogSection key={post.id} post={post} />)
      ) : (
        <BlogNotFound keyword={keyword} />
      )}
    </S.Container>
  );
}
