import type { AppProps } from 'next/app';
import dynamic from 'next/dynamic';
import { Analytics } from '@vercel/analytics/react';

const Layout = dynamic(() => import('@/common/Layout').then(mod => mod.Layout));

const Provider = dynamic(() => import('@/provider'));

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Provider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </Provider>
      <Analytics />
    </>
  );
}
