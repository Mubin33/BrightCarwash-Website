import Image from 'next/image';

interface Company {
    name: string;
    logo: string;
    width: number;
    height: number;
}

interface Props {
    companies: Company[];
    isDark: boolean;
}

export function TrustedByLogos({ companies, isDark }: Props) {
    return (
        <div className="self-stretch grid grid-cols-2 md:grid-cols-4 gap-4 w-full max-w-[1280px] xl:max-w-[1320px]">
            {companies.map((company) => (
                <div
                    key={company.name}
                    className={`flex-1 p-4 rounded-lg flex flex-col justify-center items-center gap-6 outline outline-1 outline-offset-[-1px] ${isDark ? 'bg-white/[0.06] outline-white/20' : 'bg-gray-50 outline-zinc-200'}`}
                >
                    <div className="relative w-full max-w-[160px] h-12">
                        <Image
                            src={company.logo}
                            alt={company.name}
                            fill
                            className={`object-contain ${isDark ? 'brightness-0 invert' : ''}`}
                            unoptimized={company.logo.startsWith('http')}
                        />
                    </div>
                </div>
            ))}
        </div>
    );
}