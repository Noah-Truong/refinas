import { cookies, draftMode } from 'next/headers';
import { redirect } from 'next/navigation';
import { PREVIEW_COOKIE } from '@/lib/pageApi';

/** Leaves preview: Draft Mode off, preview cookie removed, back to the store list. */
export const dynamic = 'force-dynamic';

export async function GET() {
  (await draftMode()).disable();
  // path must match the one the cookie was set with, or the browser keeps it
  (await cookies()).delete({ name: PREVIEW_COOKIE, path: '/' });
  redirect('/gym');
}
