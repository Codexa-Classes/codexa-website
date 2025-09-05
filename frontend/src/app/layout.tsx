import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { AuthProvider } from "@/contexts/AuthContext";
import { INSTRUCTOR } from "@/lib/constants";
import { Toaster } from "@/components/ui/sonner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
          default: "Codexa Classes - Best IT Training Institute",
    template: "%s | Codexa Classes"
  },
  description: "Transform your career with comprehensive IT training. Learn PHP, Python, React, MySQL, and Linux from industry experts. Affordable courses starting at ₹10,000 with 100% job placement guarantee.",
  keywords: ["IT training", "programming courses", "PHP course", "Python training", "React development", "web development course", "IT certification"],
  authors: [{ name: INSTRUCTOR.name }],
  creator: "Codexa Classes",
  publisher: "Codexa Classes",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://codexaclasses.com'),
  alternates: {
    canonical: '/',
  },
      openGraph: {
      type: 'website',
      locale: 'en_IN',
      url: 'https://codexaclasses.com',
      siteName: 'Codexa Classes',
      title: 'Codexa Classes - Best IT Training Institute',
      description: 'Transform your career with comprehensive IT training. Learn PHP, Python, React, MySQL, and Linux from industry experts.',
      images: [
        {
          url: '/og-image.png',
          width: 1200,
          height: 630,
          alt: 'Codexa Classes - IT Training Institute',
        },
      ],
    },
      twitter: {
      card: 'summary_large_image',
      title: 'Codexa Classes - Best IT Training Institute',
      description: 'Transform your career with comprehensive IT training. Learn PHP, Python, React, MySQL, and Linux from industry experts.',
      images: ['/og-image.png'],
      creator: '@codexaclasses',
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
  verification: {
    google: 'your-google-verification-code',
    yandex: 'your-yandex-verification-code',
    yahoo: 'your-yahoo-verification-code',
  },
  icons: {
    icon: "/favicon-white.png",
    shortcut: "/favicon-white.png",
    apple: "/favicon-white.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#1e40af" />
        <meta name="msapplication-TileColor" content="#1e40af" />
        <meta property="og:locale" content="en_IN" />
        <meta property="og:locale:alternate" content="hi_IN" />
        <link rel="alternate" href="https://codexaclasses.com" hrefLang="en-IN" />
        <link rel="alternate" href="https://codexaclasses.com/hi" hrefLang="hi-IN" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <AuthProvider>
            {children}
          </AuthProvider>
          <Toaster 
            position="top-right"
            expand={true}
            richColors={true}
            closeButton={true}
            visibleToasts={3}
            toastOptions={{
              duration: 2000,
              style: {
                background: 'var(--background)',
                color: 'var(--foreground)',
                border: '1px solid var(--border)',
              },
            }}
          />
        </ThemeProvider>
      </body>
    </html>
  );
}