import { defineConfig } from 'astro/config';

export default defineConfig({
  // Production domain. Used to build absolute URLs (sitemap, RSS, canonical links).
  site: 'https://www.leticiasemidio.com',

  // i18n routing: every page lives under /en/ for now. When Portuguese and
  // Spanish are ready, add 'pt' and 'es' to the locales array below and
  // create the matching src/pages/pt/ and src/pages/es/ folders — nothing
  // else about this config needs to change.
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
    routing: {
      prefixDefaultLocale: true, // forces /en/... instead of / for the default locale
    },
  },
});
