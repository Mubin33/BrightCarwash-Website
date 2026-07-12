interface Props {
    isLoading: boolean;
    isDark: boolean;
}

export function CheckoutProcessingOverlay({ isLoading, isDark }: Props) {
    if (!isLoading) return null;

    return (
        <div className="absolute inset-0 bg-white/60 dark:bg-[#1A1A1A]/60 z-10 flex flex-col items-center justify-center gap-4 rounded-lg">
            <div className="w-8 h-8 border-2 border-[#0098E8] border-t-transparent rounded-full animate-spin" />
            <p className={`font-inter text-sm font-medium ${isDark ? 'text-white' : 'text-[#1D1F2C]'}`}>
                Processing your booking, please wait...
            </p>
        </div>
    );
}