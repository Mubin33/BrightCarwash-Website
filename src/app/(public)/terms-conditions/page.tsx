import type { Metadata } from 'next';
import { createPageMetadata } from '@/lib/site';
import { TermsConditionsContent } from "@/components/pages/legal/TermsConditionsContent";

export const metadata: Metadata = createPageMetadata(
    '/terms-conditions',
    'Terms & Conditions',
    'Read the terms and conditions for Brightside Car Wash services and memberships.',
);

export default function TermsConditionsPage() {
    return <TermsConditionsContent />;
}