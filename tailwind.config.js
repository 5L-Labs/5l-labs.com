/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./src/**/*.{js,jsx,ts,tsx,md,mdx}", "./blog/**/*.{md,mdx}", "./docs/**/*.{md,mdx}"],
    theme: {
        extend: {
            colors: {
                background: 'var(--bg-page)',
                surface: 'var(--bg-card)',
                border: 'var(--border-color)',
                primary: {
                    DEFAULT: 'var(--brand-primary)',
                    light: 'var(--brand-light)',
                },
                text: {
                    main: 'var(--text-main)',
                    muted: 'var(--text-muted)',
                }
            },
            fontFamily: {
                sans: ['Inter', 'sans-serif'],
                heading: ['Plus Jakarta Sans', 'sans-serif'],
                mono: ['JetBrains Mono', 'monospace'],
            },
            borderRadius: {
                DEFAULT: 'var(--radius)',
            },
            boxShadow: {
                card: 'var(--shadow)',
            }
        },
    },
    plugins: [],
    darkMode: ['class', '[data-theme="dark"]'],
}
