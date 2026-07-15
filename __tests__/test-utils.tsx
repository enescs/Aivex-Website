import type { ReactElement, ReactNode } from 'react';
import { render, type RenderOptions, type RenderResult } from '@testing-library/react';
import { LanguageProvider, type Lang } from '@/contexts/LanguageContext';

// All components in the app are rendered under <LanguageProvider> in the real
// layout, so a bare render() throws "useLanguage must be used inside
// LanguageProvider" before the test even gets to its assertions. Tests should
// use renderWithProviders instead of @testing-library/react's render().

interface RenderWithProvidersOptions extends Omit<RenderOptions, 'wrapper'> {
  /** Locale to seed before render. Defaults to 'en' to match the assertion
   *  copy in the existing test suite. */
  lang?: Lang;
}

export function renderWithProviders(
  ui: ReactElement,
  { lang = 'en', ...options }: RenderWithProvidersOptions = {},
): RenderResult {
  // LanguageProvider resolves the language from its initialLang prop (set
  // server-side from the cookie in the real layout), so pass it explicitly.
  function AllProviders({ children }: { children: ReactNode }) {
    return <LanguageProvider initialLang={lang}>{children}</LanguageProvider>;
  }
  return render(ui, { wrapper: AllProviders, ...options });
}

// Re-export the rest of @testing-library/react so test files only need one
// import path.
export * from '@testing-library/react';
