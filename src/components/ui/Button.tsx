interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary' | 'outline' | 'icon';
    isLoading?: boolean;
    loadingText?: string;
}

export function Button({
    variant = 'primary',
    isLoading,
    loadingText,
    children,
    className = '',
    disabled,
    ...props
}: ButtonProps) {
    const baseClass = ' cursor-pointer inline-flex items-center justify-center gap-2 font-inter text-sm font-medium transition-colors';

    const variantClass = {
        primary: 'bg-[#0098E8] text-white hover:bg-[#0088D8] rounded-lg py-[14px] px-5',
        secondary: 'bg-[#F8FAFB] text-[#1B1B1B] hover:bg-[#F1F1F1] rounded-lg py-2.5 px-4',
        outline: 'border border-[#DFE1E7] text-[#1B1B1B] rounded-lg py-2.5 px-4',
        icon: 'text-[#777980] hover:text-[#1B1B1B]',
    }[variant];

    return (
        <button
            className={`${baseClass} ${variantClass} ${className} ${disabled || isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
            disabled={disabled || isLoading}
            {...props}
        >
            {isLoading ? (loadingText || 'Loading...') : children}
        </button>
    );
}