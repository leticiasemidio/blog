import { defineCollection, z } from 'astro:content';

// Schema for every article under src/content/resources/*.md
// Astro validates every file's frontmatter against this at build time,
// so a typo in a category name fails the build instead of silently
// breaking the site.
//
// Right now there is exactly one file per lifecycle stage (the MVP asks
// for only the first article of each phase to be live). Adding a second
// article to a stage later is just adding another .md file here — the
// resources hub page and the RSS feed both pick up new files automatically.
const resources = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.date(),
    category: z.enum([
      'Start here',
      'Organize',
      'Plan',
      'Audit',
      'Write',
      'Improve',
      'Scale',
    ]),
    type: z.enum(['guide', 'case', 'template', 'framework']),
    // Set draft: true on any article you are not ready to publish yet.
    // It stays out of both the resources hub and the RSS feed.
    draft: z.boolean().default(false),
  }),
});

export const collections = { resources };
