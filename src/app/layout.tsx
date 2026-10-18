import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
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

export const metadata: Metadata = {
  metadataBase: new URL('https://manishek.ir'),
  title: {
    default: 'مانی شکفته (Mani Shekofteh) — توسعه‌دهنده بک‌اند',
    template: '%s | مانی شکفته',
  },
  description: 'وبسایت شخصی مانی شکفته — مهندس بک‌اند با تمرکز بر توسعه با .NET، ASP.NET Core و C# در کنار Node.js و NestJS. طراحی APIهای استاندارد و سیستم‌های مقیاس‌پذیر با PostgreSQL، SQL Server، MongoDB و الگوهای معماری مدرن.',
  keywords: ['مانی شکفته', 'Mani Shekofteh', 'توسعه‌دهنده بک‌اند', 'Backend Developer', '.NET', 'ASP.NET Core', 'C#', 'Node.js', 'NestJS', 'TypeScript', 'PostgreSQL', 'SQL Server', 'MongoDB', 'API Design', 'منی شکفته برنامه نویس'],
  authors: [{ name: 'Mani Shekofteh', url: 'https://manishek.ir' }],
  creator: 'Mani Shekofteh',
  publisher: 'Mani Shekofteh',
  icons: {
    icon: '/favicon.svg',
  },
  openGraph: {
    title: 'مانی شکفته (Mani Shekofteh) — توسعه‌دهنده بک‌اند',
    description: 'وبسایت شخصی مانی شکفته — مهندس بک‌اند با تمرکز بر توسعه با .NET، ASP.NET Core و C# در کنار Node.js و NestJS.',
    url: 'https://manishek.ir',
    siteName: 'مانی شکفته | Mani Shekofteh',
    locale: 'fa_IR',
    alternateLocale: ['en_US'],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'مانی شکفته (Mani Shekofteh) — توسعه‌دهنده بک‌اند',
    description: 'وبسایت شخصی مانی شکفته — مهندس بک‌اند با تمرکز بر توسعه با .NET، ASP.NET Core و C# در کنار Node.js و NestJS.',
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
      <body className={`${inter.variable} antialiased`}>
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
