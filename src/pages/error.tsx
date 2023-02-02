import dynamic from 'next/dynamic';

const Error = dynamic(() =>
  import('@/components/error').then(mod => mod.Error),
);

export default function Page() {
  return <Error />;
}
