import { BlogOption } from '@/components/blog/blog_option/BlogOption';
import { BlogSection } from '@/components/blog/blog_section/BlogSection';
import { BlogNotFound } from '@/components/blog/blog_not_found/BlogNotFound';
import { BlogState } from '@/types/data';
import * as S from './style';

interface Props {
  blogState: BlogState;
  onChangeKeyword: ({ keyword }: { keyword: string }) => void;
  onSubmitKeyword: ({
    e,
    keyword,
  }: {
    e: React.FormEvent<HTMLFormElement>;
    keyword: string;
  }) => void;
}

export function BlogList({
  blogState,
  onChangeKeyword,
  onSubmitKeyword,
}: Props) {
  const { keyword, submitedKeyword, posts } = blogState;

  return (
    <S.Container>
      <BlogOption
        keyword={keyword}
        onChangeKeyword={onChangeKeyword}
        onSubmitKeyword={onSubmitKeyword}
      />
      {posts.length ? (
        posts.map(post => <BlogSection key={post.id} post={post} />)
      ) : (
        <BlogNotFound keyword={submitedKeyword} />
      )}
    </S.Container>
  );
}
