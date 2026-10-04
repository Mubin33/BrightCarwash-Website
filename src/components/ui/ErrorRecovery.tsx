'use client';

import { useEffect, useRef, useTransition, type ReactNode } from 'react';

export interface ErrorPageProps {
  error: Error & { digest?: string };
  retry: () => void;
}

interface Props {
  title: string;
  children: ReactNode;
  retry: () => void;
  navigation: ReactNode;
}

/** Self-contained styles and no providers: also usable when the root layout fails. */
export function ErrorRecovery({ title, children, retry, navigation }: Props) {
  const heading = useRef<HTMLHeadingElement>(null);
  const [pending, startTransition] = useTransition();

  useEffect(() => {
    heading.current?.focus();
  }, []);

  return (
    <main
      aria-labelledby="error-heading"
      style={{ minHeight: '60vh', display: 'grid', placeItems: 'center', padding: '8rem 1.5rem 4rem', background: '#f8fafb', color: '#171717', fontFamily: 'Arial, sans-serif' }}
    >
      <section style={{ maxWidth: '36rem', textAlign: 'center', lineHeight: 1.6 }}>
        <h1 id="error-heading" ref={heading} tabIndex={-1} style={{ fontSize: '2rem', lineHeight: 1.2 }}>
          {title}
        </h1>
        <div>{children}</div>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexWrap: 'wrap', gap: '1.5rem', marginTop: '1.5rem' }}>
          <button
            type="button"
            disabled={pending}
            onClick={() => startTransition(() => retry())}
            style={{ border: 0, borderRadius: '0.5rem', padding: '0.8rem 1.5rem', background: '#fec300', color: '#171717', font: 'inherit', fontWeight: 700, cursor: pending ? 'wait' : 'pointer', opacity: pending ? 0.7 : 1 }}
          >
            {pending ? 'Trying again…' : 'Try again'}
          </button>
          {navigation}
        </div>
      </section>
    </main>
  );
}
