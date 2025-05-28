/** @type {import('tailwindcss').Config} */
module.exports = {
	darkMode: ['class'],
	content: [
		'./pages/**/*.{ts,tsx}',
		'./components/**/*.{ts,tsx}',
		'./app/**/*.{ts,tsx}',
		'./src/**/*.{ts,tsx}',
	],
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px',
			},
		},
		extend: {
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))',
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))',
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))',
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))',
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))',
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))',
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))',
				},
				gradient: {
					from: 'hsl(var(--gradient-from))',
					via: 'hsl(var(--gradient-via))',
					to: 'hsl(var(--gradient-to))',
				},
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)',
			},
			boxShadow: {
				soft: '0 4px 15px -3px hsla(var(--foreground), 0.05), 0 2px 8px -2px hsla(var(--foreground), 0.1)',
				medium: '0 6px 20px -4px hsla(var(--foreground), 0.1), 0 4px 12px -3px hsla(var(--foreground), 0.1)',
				hard: '0 10px 30px -5px hsla(var(--foreground), 0.15), 0 6px 15px -3px hsla(var(--foreground), 0.1)',
				glow: '0 0 15px hsla(var(--primary), 0.3)',
				'glow-strong': '0 0 25px hsla(var(--primary), 0.4)',
			},
			keyframes: {
				'accordion-down': {
					from: { height: 0 },
					to: { height: 'var(--radix-accordion-content-height)' },
				},
				'accordion-up': {
					from: { height: 'var(--radix-accordion-content-height)' },
					to: { height: 0 },
				},
				'pulse': {
					'0%, 100%': { opacity: 1 },
					'50%': { opacity: 0.7 },
				},
				'bounce': {
					'0%, 100%': { transform: 'translateY(0)' },
					'50%': { transform: 'translateY(-15%)' },
				},
				'float': {
					'0%, 100%': { transform: 'translateY(0)' },
					'50%': { transform: 'translateY(-5px)' },
				},
				'spin-slow': {
					'from': { transform: 'rotate(0deg)' },
					'to': { transform: 'rotate(360deg)' },
				},
				'gradient-move': {
					'0%': { backgroundPosition: '0% 50%' },
					'50%': { backgroundPosition: '100% 50%' },
					'100%': { backgroundPosition: '0% 50%' },
				},
				'scale-up': {
					'0%': { transform: 'scale(0.95)', opacity: '0' },
					'100%': { transform: 'scale(1)', opacity: '1' },
				},
				'scale-down': {
					'0%': { transform: 'scale(1.05)', opacity: '0' },
					'100%': { transform: 'scale(1)', opacity: '1' },
				},
				'fade-in': {
					'0%': { opacity: '0' },
					'100%': { opacity: '1' },
				},
				'fade-out': {
					'0%': { opacity: '1' },
					'100%': { opacity: '0' },
				},
				'slide-in': {
					'0%': { transform: 'translateY(20px)', opacity: '0' },
					'100%': { transform: 'translateY(0)', opacity: '1' },
				},
				'slide-out': {
					'0%': { transform: 'translateY(0)', opacity: '1' },
					'100%': { transform: 'translateY(20px)', opacity: '0' },
				},
				'shake': {
					'0%, 100%': { transform: 'translateX(0)' },
					'10%, 30%, 50%, 70%, 90%': { transform: 'translateX(-5px)' },
					'20%, 40%, 60%, 80%': { transform: 'translateX(5px)' },
				},
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'pulse': 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
				'bounce': 'bounce 2s ease infinite',
				'float': 'float 3s ease-in-out infinite',
				'spin-slow': 'spin-slow 3s linear infinite',
				'gradient-move': 'gradient-move 6s ease infinite',
				'scale-up': 'scale-up 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards',
				'scale-down': 'scale-down 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards',
				'fade-in': 'fade-in 0.3s ease-out forwards',
				'fade-out': 'fade-out 0.3s ease-in forwards',
				'slide-in': 'slide-in 0.4s cubic-bezier(0.43, 0.13, 0.23, 0.96) forwards',
				'slide-out': 'slide-out 0.4s cubic-bezier(0.43, 0.13, 0.23, 0.96) forwards',
				'shake': 'shake 0.5s cubic-bezier(0.36, 0.07, 0.19, 0.97)',
			},
			transitionTimingFunction: {
				'bounce': 'cubic-bezier(0.175, 0.885, 0.32, 1.275)',
				'spring': 'cubic-bezier(0.43, 0.13, 0.23, 0.96)',
				'smooth': 'cubic-bezier(0.4, 0, 0.2, 1)',
			},
			transitionDuration: {
				'slow': '700ms',
				'medium': '400ms',
				'fast': '250ms',
			},
		},
	},
	plugins: [require('tailwindcss-animate')],
}