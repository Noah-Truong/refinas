import type { Gym } from '@/types/gym';

const SITE_URL = 'https://refinas-demo.example.com'; // demo placeholder — real domain at CMS-integration phase

/** JSON-LD @graph per spec §7: HealthClub (LocalBusiness subtype) + BreadcrumbList. */
export function gymJsonLd(gym: Gym) {
  const url = `${SITE_URL}/gym/${gym.slug}/`;
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'HealthClub',
        name: gym.name,
        image: [`${SITE_URL}${gym.heroImage.url}`],
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
          { '@type': 'ListItem', position: 2, name: '店舗一覧', item: `${SITE_URL}/gym/` },
          { '@type': 'ListItem', position: 3, name: gym.area, item: `${SITE_URL}/gym/` },
          { '@type': 'ListItem', position: 4, name: gym.name, item: url },
        ],
      },
    ],
  };
}
