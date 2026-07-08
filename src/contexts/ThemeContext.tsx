'use client';

import { createContext, useContext, useEffect, useState, useCallback } from 'react';
import Script from 'next/script';

type Theme = 'light' | 'dark';

interface ThemeContextType {
    theme: Theme;
    toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | null>(null);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
    // matches SSR exactly — no mismatch, no reset of children
    const [theme, setThemeState] = useState<Theme>('light');
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        // sync React state with whatever the blocking script already painted
        const current = document.documentElement.getAttribute('data-theme') as Theme | null;
        if (current === 'dark' || current === 'light') {
            setThemeState(current);
        }
        setMounted(true);
    }, []);

    useEffect(() => {
        if (!mounted) return; // skip the very first run, avoid overwriting pre-set attribute
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
    }, [theme, mounted]);

    const toggleTheme = useCallback(() => {
        setThemeState((prev) => (prev === 'light' ? 'dark' : 'light'));
    }, []);

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            <Script
                id="theme-init"
                strategy="beforeInteractive"
                dangerouslySetInnerHTML={{
                    __html: `
                        (function() {
                          try {
                            var theme = localStorage.getItem('theme');
                            if (theme !== 'light' && theme !== 'dark') theme = 'light';
                            document.documentElement.setAttribute('data-theme', theme);
                          } catch (e) {}
                        })();
                    `,
                }}
            />
            {children}
        </ThemeContext.Provider>
    );
}

export function useTheme(): ThemeContextType {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error('useTheme must be used within a ThemeProvider');
    }
    return context;
}