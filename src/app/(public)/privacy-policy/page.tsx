import type { Metadata } from 'next';
import { createPageMetadata } from '@/lib/site';
import { PrivacyPolicyContent } from "@/components/pages/legal/PrivacyPolicyContent";

export const metadata: Metadata = createPageMetadata(
    '/privacy-policy',
    'Privacy Policy',
    'Learn how Brightside Car Wash collects, uses, and protects your personal information.',
);

export default function PrivacyPolicyPage() {
    return <PrivacyPolicyContent />;
}