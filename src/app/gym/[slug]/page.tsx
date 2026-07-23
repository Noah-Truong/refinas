import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getAllGyms, getGym } from '@/data/getGym';
import { studioPhotos } from '@/data/demoGym';
import { gymJsonLd } from '@/lib/jsonld';
import { Section } from '@/components/ui/Section';
import { SiteHeader } from '@/components/gym/SiteHeader';
import { GymHero } from '@/components/gym/GymHero';
import { TrialCta } from '@/components/gym/TrialCta';
import { CampaignBanner } from '@/components/gym/CampaignBanner';
import { AccessNap } from '@/components/gym/AccessNap';
import { PriceTable } from '@/components/gym/PriceTable';
import { NearbyGyms } from '@/components/gym/NearbyGyms';
import { TrialFlow } from '@/components/gym/TrialFlow';
import { StaffSection } from '@/components/gym/StaffSection';
import { VoiceSection } from '@/components/gym/VoiceSection';
import { ProgramSlider } from '@/components/gym/ProgramSlider';
import { ScheduleLink } from '@/components/gym/ScheduleLink';
import { FaqAccordion } from '@/components/gym/FaqAccordion';
import { TopicList } from '@/components/gym/TopicList';
import { ColumnList } from '@/components/gym/ColumnList';
import { BrandConcept } from '@/components/gym/BrandConcept';
import { SiteFooter } from '@/components/gym/SiteFooter';

type Params = { slug: string };

export async function generateStaticParams(): Promise<Params[]> {
  const gyms = await getAllGyms();
  return gyms.map((gym) => ({ slug: gym.slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params;
  const gym = await getGym(slug);
  if (!gym) return {};
  // Authored SEO titles are complete — bypass the layout's title template ({ absolute })
  // so the brand suffix isn't appended twice.
  const title = gym.seo?.title ?? gym.name;
  const metaTitle: Metadata['title'] = gym.seo?.title ? { absolute: gym.seo.title } : gym.name;
  const description =
    gym.seo?.description ??
    `${gym.name}（${gym.area}）の料金・アクセス・トレーナー情報。${gym.catchCopy}`;
  return {
    title: metaTitle,
    description,
    openGraph: { title, description, type: 'article', images: [gym.heroImage.url] },
    twitter: { card: 'summary_large_image' },
    alternates: { canonical: `/gym/${gym.slug}` },
  };
}

export default async function GymPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const gym = await getGym(slug);
  if (!gym) notFound();

  return (
    <>
      <script
        type="application/ld+json"
        // Escape "<" so CMS-sourced strings can never break out of the script tag (</script> injection).
        dangerouslySetInnerHTML={{ __html: JSON.stringify(gymJsonLd(gym)).replace(/</g, '\\u003c') }}
      />
      <SiteHeader gym={gym} />
      <main>
        {/* 16-block structure — order fixed per the reference IA (spec §5).
            Fix Point 7/22 Task 3-A + Task 4: every band is white with right-angle
            edges — the blue/panel/tint alternation and corner cuts are retired. */}
        <GymHero gym={gym} />
        {/* id="reserve" — landing target for every reserveUrl/primaryCtaUrl (#reserve) CTA */}
        <Section id="reserve">
          <TrialCta gym={gym} />
        </Section>
        <Section>
          <CampaignBanner gym={gym} />
        </Section>
        <Section>
          <AccessNap gym={gym} photos={studioPhotos} />
        </Section>
        <Section>
          <PriceTable gym={gym} />
        </Section>
        <Section>
          <NearbyGyms gym={gym} />
        </Section>
        <Section>
          <TrialFlow gym={gym} />
        </Section>
        <Section>
          <StaffSection gym={gym} />
        </Section>
        <Section>
          <VoiceSection gym={gym} />
        </Section>
        <Section>
          <ProgramSlider gym={gym} />
        </Section>
        <Section>
          <ScheduleLink gym={gym} />
        </Section>
        <Section>
          <FaqAccordion gym={gym} />
        </Section>
        <Section>
          <TopicList gym={gym} />
        </Section>
        <Section>
          <ColumnList gym={gym} />
        </Section>
        <Section>
          <BrandConcept gym={gym} />
        </Section>
      </main>
      <SiteFooter gym={gym} />
    </>
  );
}
