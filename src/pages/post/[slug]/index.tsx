import { bundleMDX } from 'mdx-bundler';
import dynamic from 'next/dynamic';
import { NotionService } from '@/service';
import { BlogPageProps } from '@/types/data';

const Post = dynamic(() => import('@/components/post').then(mod => mod.Post));

const SEO = dynamic(() => import('@/common/SEO').then(mod => mod.SEO));

export default function Page({ detail, content }: BlogPageProps) {
  const { title, description, cover, id } = detail;
  return (
    <>
      <SEO
        title={title}
        description={description}
        url={`https://www.yeummy-blog.com/post/${id}`}
        image={cover}
      />
      <Post detail={detail} content={content} />
    </>
  );
}
export async function getStaticProps({
  params: { slug },
}: {
  params: { slug: string };
}) {
  const notionService = new NotionService();
  // Note: 포스트 정보와 포스트 내용을 가져옵니다.
  const [detail, contents] = await Promise.all([
    notionService.getPostDetail(slug),
    notionService.getPostContent(slug),
  ]);

  if (!detail || !contents) {
    // Note: 에러가 발생했을 경우, 에러 페이지로 리다이렉트 합니다.
    return {
      redirect: {
        destination: '/error',
        permanent: false,
      },
    };
  }

  const { code } = await bundleMDX({
    source: contents,
  });

  return {
    props: {
      detail,
      content: code,
    },
  };
}

export async function getStaticPaths() {
  const notionService = new NotionService();

  const paths = await notionService.getPostIds();

  return {
    paths: paths?.map(id => ({
      params: {
        slug: id,
      },
    })),
    fallback: false,
  };
}
