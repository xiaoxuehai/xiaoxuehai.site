import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

import { ThemeProvider } from '@/app/ThemeProvider';
import { BackTop } from '@/components/BackTop';
// import { Toaster } from '@/components/ui/toaster';

import './globals.css';

const inter = Inter({ subsets: ['latin'] });

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
    <html lang='en'>
      <body className={inter.className}>
        <ThemeProvider
          attribute='class'
          defaultTheme='light'
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <BackTop />
        </ThemeProvider>
        {/* <Toaster /> */}
      </body>
    </html>
  );
}
