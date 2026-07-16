'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import type { Gym } from '@/types/gym';
import styles from './SiteHeader.module.css';

const storeNav = [
  { label: 'アクセス', href: '#access' },
  { label: '料金', href: '#price' },
  { label: '体験の流れ', href: '#flow' },
] as const;

const storeDetailNav = [
  { label: 'プログラム', href: '#program' },
  { label: 'トレーナー紹介', href: '#staff' },
  { label: 'スケジュール', href: '#schedule' },
  { label: 'トピックス', href: '#topics' },
  { label: 'よくあるご質問', href: '#faq' },
] as const;

/** Sticky site header: logo + store-scoped nav + trial CTA. Mirrors LAVA's 2-row header + SP drawer. */
export function SiteHeader({ gym }: { gym: Gym }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  return (
    <>
      <header className={styles.header} data-scrolled={scrolled || undefined}>
        <div className={styles.inner}>
          <Link href="/" className={styles.logo} aria-label="Refinas トップ">
            {/* brand logo (glove mark + logotype) — same artwork family as src/app/icon.png */}
            <Image
              src="/logo/refinas-logo.png"
              width={545}
              height={160}
              alt="Refinas fitness studio"
              priority
              className={styles.logoImage}
            />
          </Link>

          <div className={styles.navArea}>
            {/* 会員ログインは提供なし（情報収集チェックリスト：会員ログインURL＝なし） */}
            <nav aria-label="店舗内ナビゲーション">
              <ul className={styles.storeRow}>
                <li className={styles.storeName}>{gym.name}</li>
                {storeNav.map((item) => (
                  <li key={item.href}>
                    <Link href={item.href}>{item.label}</Link>
                  </li>
                ))}
                <li className={styles.dropdown}>
                  <button type="button" className={styles.dropdownButton}>
                    店舗の詳しい情報
                    <span className={styles.chevronDown} aria-hidden="true" />
                  </button>
                  <ul className={styles.dropdownList}>
                    {storeDetailNav.map((item) => (
                      <li key={item.href}>
                        <Link href={item.href}>{item.label}</Link>
                      </li>
                    ))}
                  </ul>
                </li>
                <li>
                  <Link href="/gym">他の店舗を探す</Link>
                </li>
              </ul>
            </nav>
          </div>

          <Link href={gym.primaryCtaUrl} className={styles.headerCta}>
            無料体験予約
          </Link>

          <button
            type="button"
            className={styles.hamburger}
            aria-expanded={menuOpen}
            aria-label="メニューを開く"
            onClick={() => setMenuOpen((open) => !open)}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </header>

      {/* SP drawer */}
      <nav className={styles.drawer} data-open={menuOpen || undefined} aria-label="メニュー" aria-hidden={!menuOpen}>
        <div className={styles.drawerCtas}>
          <Link href={gym.primaryCtaUrl} className={styles.drawerTrial} onClick={() => setMenuOpen(false)}>
            {gym.primaryCtaLabel}
          </Link>
        </div>
        <ul className={styles.drawerList}>
          <li className={styles.drawerStoreName}>{gym.name}</li>
          {[...storeNav, ...storeDetailNav].map((item) => (
            <li key={item.href}>
              <Link href={item.href} onClick={() => setMenuOpen(false)}>
                {item.label}
              </Link>
            </li>
          ))}
          <li>
            <Link href="/gym" onClick={() => setMenuOpen(false)}>
              {gym.area}の他の店舗を探す
            </Link>
          </li>
        </ul>
      </nav>
      {menuOpen && <button type="button" className={styles.backdrop} aria-label="メニューを閉じる" onClick={() => setMenuOpen(false)} />}

      {/* SP fixed bottom quick-nav (LAVA's bottom-menu) */}
      <nav className={styles.bottomBar} aria-label="クイックナビ">
        <Link href="#access">アクセス</Link>
        <Link href="#price">料金</Link>
        <Link href={gym.primaryCtaUrl} className={styles.bottomBarCta}>
          無料体験予約
        </Link>
      </nav>
    </>
  );
}
