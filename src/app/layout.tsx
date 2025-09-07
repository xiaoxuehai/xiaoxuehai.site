import type { Metadata } from 'next';

import { Inter as FontSans } from 'next/font/google';
import NextTopLoader from 'nextjs-toploader';
import colors from 'tailwindcss/colors';

import { ThemeProvider } from '@/app/ThemeProvider';
import { BackTop } from '@/components/BackTop';
import { Toaster } from '@/components/ui/toaster';

import './globals.css';
import { cn } from '@/lib/utils';
const fontSans = FontSans({
  subsets: ['latin'],
  variable: '--font-sans',
});

export const metadata: Metadata = {
  title: '个人网站',
  description: '使用next.js、typescript、tailwindcss构建',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en' suppressHydrationWarning>
      <body
        className={cn(
          'min-h-screen bg-background font-sans antialiased',
          fontSans.variable,
        )}
      >
        <ThemeProvider
          attribute='class'
          defaultTheme='dark'
          enableSystem
          disableTransitionOnChange
        >
          <NextTopLoader color={colors.teal[500]} />
          {children}
          <BackTop />
        </ThemeProvider>
        <Toaster />
      </body>
    </html>
  );
}
