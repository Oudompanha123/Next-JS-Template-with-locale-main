import { NextIntlClientProvider, hasLocale } from "next-intl";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import type { Metadata } from "next";
import { Geist, Geist_Mono, Kantumruy_Pro } from "next/font/google";
import "@/styles/globals.css";
import AuthLayout from "@/components/layout/AuthLayout";
import { AuthProvider } from "@/lib/context/auth-context";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const kantumruyPro = Kantumruy_Pro({
  variable: "--font-kantumruy-pro",
  subsets: ["khmer"],
});

export const metadata: Metadata = {
  title: "PPCB E-Learning",
  description: "PPCB E-Learning",
};

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  return (
    <html lang={locale}>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${kantumruyPro.variable} antialiased`}
      >
        <NextIntlClientProvider>
          <AuthLayout>
            <AuthProvider>{children}</AuthProvider>
          </AuthLayout>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
