import { redirect } from 'next/navigation';
import { INITIAL_TRACKING_LINKS, INITIAL_CAMPAIGNS } from '@/lib/store/marketplace-store';

export default async function TrackingPage(props: {
  params: Promise<{ code: string }>;
}) {
  const { code } = await props.params;

  let targetUrl = 'https://syntaxflow.ai/pro?ref=nolio_alex';

  const link = INITIAL_TRACKING_LINKS.find((l) => l.code === code);
  if (link?.destination_url) {
    targetUrl = link.destination_url;
  } else {
    const defaultCamp = INITIAL_CAMPAIGNS[0];
    if (defaultCamp?.product?.website_url) {
      targetUrl = defaultCamp.product.website_url;
    }
  }

  // Redirect visitor to product destination
  redirect(targetUrl);
}
