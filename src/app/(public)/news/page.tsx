import { NewsHero } from '@/components/pages/news/NewsHero';
import { NewsList } from '@/components/pages/news/NewsList';
import { Breadcrumb } from '@/components/ui/Breadcrumb';


export default function NewsPage() {
    return (
        <div >
            <Breadcrumb items={[{ label: 'Home', href: '/' }, { label: 'News & Events', href: '/news' }]} />
            <NewsHero />
            <NewsList />
        </div>
    );
}