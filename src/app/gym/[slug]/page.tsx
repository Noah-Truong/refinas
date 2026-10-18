import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getAllGyms, getGym } from '@/data/getGym';
import { studioPhotos } from '@/data/demoGym';
import { gymJsonLd } from '@/lib/jsonld';
import { isTrialFree } from '@/lib/trial';
import { Section } from '@/components/ui/Section';
import { SiteHeader } from '@/components/gym/SiteHeader';
import { JaWrap } from '@/components/ui/JaWrap';
import { GymHero } from '@/components/gym/GymHero';
import { TrialCta } from '@/components/gym/TrialCta';
import { CampaignBanner, hasCampaign } from '@/components/gym/CampaignBanner';
import { AccessNap } from '@/components/gym/AccessNap';
import { PriceTable, hasPlans } from '@/components/gym/PriceTable';
import { NearbyGyms, hasNearby } from '@/components/gym/NearbyGyms';
import { TrialFlow } from '@/components/gym/TrialFlow';
import { StaffSection, hasTrainers } from '@/components/gym/StaffSection';
import { VoiceSection, hasVoices } from '@/components/gym/VoiceSection';
import { ProgramSlider, hasPrograms } from '@/components/gym/ProgramSlider';
import { ScheduleLink } from '@/components/gym/ScheduleLink';
import { FaqAccordion, hasFaqs } from '@/components/gym/FaqAccordion';
import { TopicList, hasNews } from '@/components/gym/TopicList';
import { ColumnList, hasColumns } from '@/components/gym/ColumnList';
import { BrandConcept } from '@/components/gym/BrandConcept';
import { SiteFooter } from '@/components/gym/SiteFooter';

type Params = { slug: string };

// Every store known at build time is prerendered. dynamicParams stays on because store data now
// comes from the page API (updated through /api/revalidate):
// - a store published after the build renders on its first request (no redeploy needed);
// - with `false`, self-hosted Next 15.5 (`next start`) answers a store page whose tag was
//   revalidated with a 404 (NoFallbackError) instead of re-rendering it.
// An unknown slug costs one render (and one API 404) — its 404 is then cached like any page.
export const dynamicParams = true;

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
    openGraph: { title, description, type: 'article', images: [gym.seo?.ogImage?.url ?? gym.heroImage.url] },
    twitter: { card: 'summary_large_image' },
    alternates: { canonical: `/gym/${gym.slug}` },
    // <meta name="page-version"> — the LINE service reads it back to confirm a publish
    // (merged with the layout's `other`, so nq-sha stays).
    ...(gym.pageVersion ? { other: { 'page-version': gym.pageVersion } } : {}),
  };
}

export default async function GymPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const gym = await getGym(slug);
  if (!gym) notFound();

  // A block without data is left out entirely — its <Section> band too, not just the content.
  const show = {
    campaign: hasCampaign(gym),
    plans: hasPlans(gym),
    nearby: hasNearby(gym),
    trainers: hasTrainers(gym),
    voices: hasVoices(gym),
    programs: hasPrograms(gym),
    faqs: hasFaqs(gym),
    news: hasNews(gym),
    columns: hasColumns(gym),
  };
  // In-page anchors of left-out blocks — the header menu drops its links to them.
  const hiddenHrefs = [
    !show.plans && '#price',
    !show.trainers && '#staff',
    !show.programs && '#program',
    !show.faqs && '#faq',
    !show.news && '#topics',
  ].filter((href): href is string => Boolean(href));

  return (
    <>
      <script
        type="application/ld+json"
        // Escape "<" so CMS-sourced strings can never break out of the script tag (</script> injection).
        dangerouslySetInnerHTML={{ __html: JSON.stringify(gymJsonLd(gym)).replace(/</g, '\\u003c') }}
      />
      <SiteHeader
        gym={gym}
        ctaLabel={<JaWrap>{gym.primaryCtaLabel}</JaWrap>}
        ctaShortLabel={<JaWrap>{isTrialFree(gym) ? '無料体験予約' : '体験予約'}</JaWrap>}
        hiddenHrefs={hiddenHrefs}
      />
      <main id="main" tabIndex={-1}>
        {/* 16-block structure — order fixed per the reference IA (spec §5).
            Fix Point 7/22 Task 3-A + Task 4: every band is white with right-angle
            edges — the blue/panel/tint alternation and corner cuts are retired. */}
        <GymHero gym={gym} />
        {/* id="reserve" — landing target for every reserveUrl/primaryCtaUrl (#reserve) CTA */}
        <Section id="reserve">
          <TrialCta gym={gym} />
        </Section>
        {show.campaign && (
          <Section data-nq-fix="3">
            <CampaignBanner gym={gym} />
          </Section>
        )}
        <Section>
          <AccessNap gym={gym} photos={gym.studioPhotos?.length ? gym.studioPhotos : studioPhotos} />
        </Section>
        {show.plans && (
          <Section>
            <PriceTable gym={gym} />
          </Section>
        )}
        {show.nearby && (
          <Section>
            <NearbyGyms gym={gym} />
          </Section>
        )}
        <Section>
          <TrialFlow gym={gym} />
        </Section>
        {show.trainers && (
          <Section>
            <StaffSection gym={gym} />
          </Section>
        )}
        {show.voices && (
          <Section>
            <VoiceSection gym={gym} />
          </Section>
        )}
        {show.programs && (
          <Section>
            <ProgramSlider gym={gym} />
          </Section>
        )}
        <Section>
          <ScheduleLink gym={gym} />
        </Section>
        {show.faqs && (
          <Section>
            <FaqAccordion gym={gym} />
          </Section>
        )}
        {show.news && (
          <Section>
            <TopicList gym={gym} />
          </Section>
        )}
        {show.columns && (
          <Section>
            <ColumnList gym={gym} />
          </Section>
        )}
        <Section>
          <BrandConcept gym={gym} />
        </Section>
      </main>
      <SiteFooter gym={gym} />
    </>
  );
}
