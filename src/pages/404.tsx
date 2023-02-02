import daynamic from 'next/dynamic';

const NotFound = daynamic(() =>
  import('@/components/not_found').then(mod => mod.NotFound),
);

export default function Page() {
  return <NotFound />;
}
