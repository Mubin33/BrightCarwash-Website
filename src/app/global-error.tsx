'use client';

/* eslint-disable @next/next/no-html-link-for-pages -- Recovery from root-layout errors must work without the app router. */

import { ErrorRecovery, type ErrorPageProps } from '@/components/ui/ErrorRecovery';

export default function GlobalError({ retry }: ErrorPageProps) {
  return (
    <html lang="en">
      <body style={{ margin: 0, background: '#f8fafb' }}>
        <title>Something went wrong | Brightside Car Wash</title>
        <ErrorRecovery
          title="We're having trouble loading the site"
          retry={retry}
          navigation={<a href="/" style={{ color: '#071f4d', textDecoration: 'underline' }}>Back to home</a>}
        >
          <p>Please try again. If the problem continues, come back in a few minutes.</p>
          <p>If you already clicked Pay, please contact us to confirm your booking before paying again.</p>
        </ErrorRecovery>
      </body>
    </html>
  );
}
