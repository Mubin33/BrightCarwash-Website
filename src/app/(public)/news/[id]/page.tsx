import { notFound } from 'next/navigation';
import { Breadcrumb } from '@/components/ui/Breadcrumb';
import { NewsDetailContent } from '@/components/pages/news/NewsDetailContent';
import { NewsDetailRelated } from '@/components/pages/news/NewsDetailRelated';
import { newsDetails } from '@/data/news-detail';
import { sideArticles } from '@/data/news';

interface Props {
    params: Promise<{ id: string }>;
}

export default async function NewsDetailPage({ params }: Props) {
    const { id } = await params;
    const article = newsDetails.find((a) => a.id === id);
    if (!article) notFound();

    const related = sideArticles.filter((a) => a.id !== id).slice(0, 3);

    return (
        <div className="pt-28">
            <Breadcrumb
                items={[
                    { label: 'Home', href: '/' },
                    { label: 'News & Events', href: '/news' },
                    { label: article.title, href: `/news/${article.id}` },
                ]}
            />
            <NewsDetailContent article={article} />
            <NewsDetailRelated articles={related} />
        </div>
    );
}