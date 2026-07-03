import { redirect } from 'next/navigation';

/**
 * Demo phase: the home page is out of scope — forward to the store list.
 * (Not a store page: logo/breadcrumb links to `/` must never resolve to the
 * page the user is already on, per the no-self-pointing-nav requirement.)
 */
export default function Home() {
  redirect('/gym');
}
