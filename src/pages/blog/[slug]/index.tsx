import { useEffect, useState, useCallback } from 'react';
import { Transition, SEO } from '@/common';
import { NotionService } from '@/service';
import { BlogListProps, BlogState } from '@/types/data';
import { BlogList } from '@/components';

interface Props {
  posts: Array<BlogListProps>;
  tag: string;
}

export default function Page({ posts, tag }: Props) {
  const image = process.env.NEXT_PUBLIC_PROFILE_URL || '';
  const [blogState, setBlogState] = useState<BlogState>({
    keyword: '',
    submitedKeyword: '',
    posts,
  });

  const fetchPost = useCallback(
    async ({ keyword }: { keyword: string }) => {
      try {
        const response = await fetch('/api/post', {
          method: 'POST',
          body: JSON.stringify({ search: keyword, tag }),
        });

        const data = (await response.json()) as Array<BlogListProps>;

        setBlogState((prev: BlogState) => ({
          ...prev,
          posts: data,
          submitedKeyword: keyword,
        }));
      } catch (error) {
        console.error(error);
      }
    },
    [tag],
  );

  const onChangeKeyword = useCallback(({ keyword }: { keyword: string }) => {
    setBlogState((prev: BlogState) => ({
      ...prev,
      keyword,
    }));
  }, []);

  const onSubmitKeyword = useCallback(
    ({
      e,
      keyword,
    }: {
      e: React.FormEvent<HTMLFormElement>;
      keyword: string;
    }) => {
      e.preventDefault();
      fetchPost({ keyword });
    },
    [fetchPost],
  );

  useEffect(() => {
    setBlogState((prev: BlogState) => ({
      ...prev,
      posts,
    }));
  }, [posts]);

  return (
    <>
      <SEO
        title='Blog'
        description='안녕하세요 프론트앤드 개발자 염상권입니다. 경험과 공부한 내용을 기록하는 블로그입니다.'
        url={`https://www.yeummy-blog.com/blog/${tag}`}
        image={image}
      />
      <Transition>
        <BlogList
          blogState={blogState}
          onChangeKeyword={onChangeKeyword}
          onSubmitKeyword={onSubmitKeyword}
        />
      </Transition>
    </>
  );
}

export async function getStaticProps({
  params: { slug },
}: {
  params: { slug: string };
}) {
  const notionService = new NotionService();
  const posts = await notionService.getPosts({
    targetTag: slug === 'all' ? '' : slug,
  });

  if (!posts) {
    // Note: 에러가 발생했을 경우, 에러 페이지로 리다이렉트 합니다.
    return {
      redirect: {
        destination: '/error',
        permanent: false,
      },
    };
  }

  return {
    props: {
      posts,
      tag: slug === 'all' ? '' : slug,
    },
    // NOTE: Incremental Static Regeneration
    revalidate: 1000,
  };
}

export async function getStaticPaths() {
  const notionService = new NotionService();
  const tags = await notionService.getPostTags();

  if (!tags) {
    // Note: 에러가 발생했을 경우, 에러 페이지로 리다이렉트 합니다.
    return {
      redirect: {
        destination: '/error',
        permanent: false,
      },
    };
  }

  return {
    paths: ['all', ...tags].map(tag => ({
      params: {
        slug: tag,
      },
    })),
    fallback: false,
  };
}
