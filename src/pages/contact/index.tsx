import dynamic from 'next/dynamic';

const Contact = dynamic(() =>
  import('@/components/contact').then(mod => mod.Contact),
);

const Transition = dynamic(() =>
  import('@/common/Transition').then(mod => mod.Transition),
);

const SEO = dynamic(() => import('@/common/SEO').then(mod => mod.SEO));

export default function Page() {
  const imageSrc = process.env.NEXT_PUBLIC_PROFILE_URL || '';

  return (
    <>
      <SEO
        title='Contact'
        description='안녕하세요 프론트앤드 개발자 염상권입니다. 언제든 편하게 메일 주세요!'
        url='https://www.yeummy-blog.com/contact'
        image={imageSrc}
      />
      <Transition>
        <Contact />
      </Transition>
    </>
  );
}
