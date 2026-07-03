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
import { Breadcrumb } from '@/components/gym/Breadcrumb';
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
        {/* 16-block structure — order fixed per the reference IA (spec §5) */}
        <GymHero gym={gym} />
        {/* id="reserve" — landing target for every reserveUrl/primaryCtaUrl (#reserve) CTA */}
        <Section bg="dark" cut="none" id="reserve">
          <TrialCta gym={gym} />
        </Section>
        <Section bg="white" cut="right">
          <CampaignBanner gym={gym} />
        </Section>
        <Section bg="white" cut="none">
          <AccessNap gym={gym} photos={studioPhotos} />
        </Section>
        <Section bg="panel" cut="left">
          <PriceTable gym={gym} />
        </Section>
        <Section bg="white" cut="right">
          <NearbyGyms gym={gym} />
        </Section>
        <Section bg="tint" cut="left">
          <TrialFlow gym={gym} />
        </Section>
        <Section bg="panel" cut="right">
          <StaffSection gym={gym} />
        </Section>
        <Section bg="white" cut="left">
          <VoiceSection gym={gym} />
        </Section>
        <Section bg="tint" cut="right">
          <ProgramSlider gym={gym} />
        </Section>
        <Section bg="panel" cut="left">
          <ScheduleLink gym={gym} />
        </Section>
        <Section bg="white" cut="right">
          <FaqAccordion gym={gym} />
        </Section>
        <Section bg="panel" cut="left">
          <TopicList gym={gym} />
        </Section>
        <Breadcrumb gym={gym} />
      </main>
      <SiteFooter gym={gym} />
    </>
  );
}
