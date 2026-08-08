import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';

// NOTE ON MVP SCOPE: this endpoint is real and live at /feed.xml, but every
// place it used to be linked from (footer icon, Resources page, newsletter
// box) is commented out for now — see Header.astro, Footer.astro and
// resources/index.astro. Uncomment those links whenever RSS should be
// surfaced to visitors again; this file needs no changes either way.
export async function GET(context) {
  const resources = await getCollection('resources', ({ data }) => !data.draft);

  const sorted = resources.sort(
    (a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf()
  );

  return rss({
    title: 'Leticia S. Emidio — Resources',
    description:
      'UX writing frameworks, playbooks, templates and case studies from Leticia S. Emidio, UX Writer & AI Content Strategist.',
    site: context.site,
    items: sorted.map((post) => ({
      title: post.data.title,
      description: post.data.description,
      pubDate: post.data.pubDate,
      categories: [post.data.category],
      link: `/en/resources/${post.slug}/`,
    })),
    customData: '<language>en-us</language>',
  });
}
