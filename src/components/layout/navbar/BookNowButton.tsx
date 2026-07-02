import Link from 'next/link';
import { MoveUpRight } from 'lucide-react';

export function BookNowButton() {
    return (
        <Link
            href="/booking"
            className="flex py-[14px] px-5 justify-center items-center gap-2 rounded-lg bg-[#0098E8] text-white font-inter text-sm font-medium hover:bg-[#0088D8] transition-colors"
        >
            Book Now
            <MoveUpRight size={16} />
        </Link>
    );
}