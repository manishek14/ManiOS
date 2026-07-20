import type { Metadata } from 'next';
import { Inter, Grand_Hotel } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from 'next-themes';
import { AppProvider } from '@/components/providers/app-provider';
import { Toaster } from '@/components/ui/toaster';

const inter = Inter({
  variable: '--font-geist-sans',
  subsets: ['latin'],
  display: 'swap',
});

const grandHotel = Grand_Hotel({
  weight: '400',
  variable: '--font-grand-hotel',
  subsets: ['latin'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Mani Shekofteh — Backend Engineer',
  description: 'Backend engineer specializing in Node.js, NestJS, and scalable API design. Building production systems with TypeScript, PostgreSQL, and modern architecture patterns.',
  keywords: ['Mani Shekofteh', 'Backend Developer', 'Node.js', 'NestJS', 'TypeScript', 'PostgreSQL', 'API Design', 'Software Engineer'],
  authors: [{ name: 'Mani Shekofteh', url: 'https://github.com/manishek14' }],
  icons: {
    icon: '/favicon.svg',
  },
  openGraph: {
    title: 'Mani Shekofteh — Backend Engineer',
    description: 'Backend engineer specializing in Node.js, NestJS, and scalable API design.',
    type: 'website',
    locale: 'en_US',
    alternateLocale: ['fa_IR', 'ar_SA'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Mani Shekofteh — Backend Engineer',
    description: 'Backend engineer specializing in Node.js, NestJS, and scalable API design.',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className="dark">
      <body className={`${inter.variable} ${grandHotel.variable} antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
          disableTransitionOnChange
        >
          <AppProvider>
            {children}
            <Toaster />
          </AppProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}