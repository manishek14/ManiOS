import type { Metadata } from 'next';
import { Inter, Grand_Hotel } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from 'next-themes';
import { AppProvider } from '@/components/providers/app-provider';
import { Toaster } from '@/components/ui/toaster';
import { JsonLd } from '@/components/seo/json-ld';

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
  metadataBase: new URL('https://manishek.ir'),
  title: {
    default: 'مانی شکفته (Mani Shekofteh) — توسعه‌دهنده بک‌اند',
    template: '%s | مانی شکفته',
  },
  description: 'وبسایت شخصی مانی شکفته — توسعه‌دهنده بک‌اند تخصصی در Node.js، NestJS و TypeScript. طراحی API مقیاس‌پذیر با PostgreSQL، MongoDB و الگوهای معماری مدرن.',
  keywords: ['مانی شکفته', 'Mani Shekofteh', 'توسعه‌دهنده بک‌اند', 'Backend Developer', 'Node.js', 'NestJS', 'TypeScript', 'PostgreSQL', 'MongoDB', 'API Design', 'منی شکفته برنامه نویس'],
  authors: [{ name: 'Mani Shekofteh', url: 'https://manishek.ir' }],
  creator: 'Mani Shekofteh',
  publisher: 'Mani Shekofteh',
  icons: {
    icon: '/favicon.svg',
  },
  openGraph: {
    title: 'مانی شکفته (Mani Shekofteh) — توسعه‌دهنده بک‌اند',
    description: 'وبسایت شخصی مانی شکفته — توسعه‌دهنده بک‌اند تخصصی در Node.js، NestJS و TypeScript.',
    url: 'https://manishek.ir',
    siteName: 'مانی شکفته | Mani Shekofteh',
    locale: 'fa_IR',
    alternateLocale: ['en_US'],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'مانی شکفته (Mani Shekofteh) — توسعه‌دهنده بک‌اند',
    description: 'وبسایت شخصی مانی شکفته — توسعه‌دهنده بک‌اند تخصصی در Node.js، NestJS و TypeScript.',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: 'https://manishek.ir',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fa" dir="rtl" suppressHydrationWarning className="dark">
      <body className={`${inter.variable} ${grandHotel.variable} antialiased`}>
        <JsonLd />
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
