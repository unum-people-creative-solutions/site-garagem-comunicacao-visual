import '@testing-library/jest-dom';
import { expect, afterEach, vi } from 'vitest';
import { cleanup } from '@testing-library/react';
import * as matchers from '@testing-library/jest-dom/matchers';

// Extende os matchers do Vitest com os do Testing Library
expect.extend(matchers);

// Limpa o DOM após cada teste
afterEach(() => {
  cleanup();
});

// Mock do Framer Motion
vi.mock('framer-motion', async (importOriginal) => {
  const actual = await importOriginal<typeof import('framer-motion')>();
  return {
    ...actual,
    motion: {
      ...actual.motion,
      div: (props: any) => <div {...props} />,
      header: (props: any) => <header {...props} />,
      footer: (props: any) => <footer {...props} />,
      section: (props: any) => <section {...props} />,
      h1: (props: any) => <h1 {...props} />,
      h2: (props: any) => <h2 {...props} />,
      p: (props: any) => <p {...props} />,
      a: (props: any) => <a {...props} />,
      button: (props: any) => <button {...props} />,
      span: (props: any) => <span {...props} />,
    },
    AnimatePresence: ({ children }: { children: React.ReactNode }) => <>{children}</>,
  };
});

// Mock do Next.js Navigation
vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push: vi.fn(),
    replace: vi.fn(),
    prefetch: vi.fn(),
  }),
  usePathname: () => '/',
  useSearchParams: () => new URLSearchParams(),
}));

// Mock global do fetch
global.fetch = vi.fn();
