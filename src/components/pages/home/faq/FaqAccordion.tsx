'use client';

import { Accordion } from '@/components/ui/Accordion';
import type { FaqItem } from '@/data/faq';

interface Props {
    item: FaqItem;
}

export function FaqAccordion({ item }: Props) {
    return <Accordion question={item.question} answer={item.answer} />;
}