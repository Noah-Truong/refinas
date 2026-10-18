import type { Gym } from '@/types/gym';

/** Site origin for absolute URLs. Set SITE_URL in the deploy env; the fallback is the demo placeholder. */
const SITE_URL = (process.env.SITE_URL?.trim() || 'https://refinas-demo.example.com').replace(/\/+$/, '');

/** Paths become absolute on SITE_URL; URLs that already are absolute (remote images) are kept as-is. */
const absoluteUrl = (url: string) =>
  /^https?:\/\//i.test(url) ? url : `${SITE_URL}${url.startsWith('/') ? '' : '/'}${url}`;

/** JSON-LD @graph per spec §7: HealthClub (LocalBusiness subtype) + BreadcrumbList. */
export function gymJsonLd(gym: Gym) {
  // No trailing slash — matches the canonical (/gym/{slug}) and the routes (trailingSlash is off).
  const url = `${SITE_URL}/gym/${gym.slug}`;
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'HealthClub',
        name: gym.name,
        image: [absoluteUrl(gym.heroImage.url)],
        address: {
          '@type': 'PostalAddress',
          postalCode: gym.postalCode,
          addressRegion: gym.area,
          streetAddress: gym.address,
        },
        telephone: gym.tel,
        geo: {
          '@type': 'GeoCoordinates',
          latitude: gym.geo.lat,
          longitude: gym.geo.lng,
        },
        url,
        openingHoursSpecification: gym.hours.map((h) => ({
          '@type': 'OpeningHoursSpecification',
          description: `${h.label} ${h.time}`,
        })),
        priceRange: '¥¥',
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Refinas', item: `${SITE_URL}/` },
          { '@type': 'ListItem', position: 2, name: '店舗一覧', item: `${SITE_URL}/gym` },
          { '@type': 'ListItem', position: 3, name: gym.area, item: `${SITE_URL}/gym` },
          { '@type': 'ListItem', position: 4, name: gym.name, item: url },
        ],
      },
    ],
  };
}
