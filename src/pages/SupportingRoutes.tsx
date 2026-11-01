import { CoreHeader } from '@/components/core/CoreHeader';
import { CoreFooter } from '@/components/core/CoreFooter';
import { BlogApp } from '@/blog/BlogApp';
import type { Route } from '@/blog/router';
import { BookACall, BookACallSuccess, FooterPage, NotFound, Privacy, Security, SocialCommerceSummitBookACall, Terms } from '@/pages';

/** Keep the journal and historical pages off the minimal homepage's loading path. */
export default function SupportingRoutes({ route }: { route: Route }) {
  return <div className="core-support">
    <CoreHeader />
    {(route.kind === 'blog-index' || route.kind === 'blog-post') && <BlogApp />}
    {route.kind === 'book-a-call' && <BookACall />}
    {route.kind === 'book-a-call-success' && <BookACallSuccess />}
    {route.kind === 'social-commerce-summit' && <SocialCommerceSummitBookACall />}
    {route.kind === 'simple-page' && route.slug === 'privacy' && <Privacy />}
    {route.kind === 'simple-page' && route.slug === 'terms' && <Terms />}
    {route.kind === 'simple-page' && route.slug === 'security' && <Security />}
    {route.kind === 'simple-page' && route.slug !== 'privacy' && route.slug !== 'terms' && route.slug !== 'security' && <FooterPage slug={route.slug} />}
    {route.kind === 'not-found' && <NotFound pathname={route.pathname} />}
    <CoreFooter />
  </div>;
}
