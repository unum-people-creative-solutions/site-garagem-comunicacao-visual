import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Script from "next/script";
import "../styles/globals.css";
import { LeadProvider } from "@/context/LeadContext";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Garagem Comunicação Visual | Fachadas e Envelopamento em Curitiba",
  description: "Transformamos fachadas comuns em marcas que dominam a rua. Comunicação visual estratégica em Curitiba, Colombo e região.",
  keywords: ["Comunicação Visual Curitiba", "Fachadas ACM", "Envelopamento de Frotas", "Letra Caixa", "Lonas", "Colombo PR"],
  authors: [{ name: "Garagem Comunicação Visual" }],
  openGraph: {
    title: "Garagem Comunicação Visual | Fachadas e Envelopamento em Curitiba",
    description: "Sua marca em destaque. Seu negócio na frente. Especialistas em fachadas de alto impacto.",
    url: "https://garagemcomunicacaovisual.com.br",
    siteName: "Garagem Comunicação Visual",
    locale: "pt_BR",
    type: "website",
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
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "Garagem Comunicação Visual",
    "image": "https://garagemcomunicacaovisual.com.br/images/logo_unum.png", // Placeholder
    "url": "https://garagemcomunicacaovisual.com.br",
    "telephone": "+5541992675409",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "R. Califórnia, 287",
      "addressLocality": "Colombo",
      "addressRegion": "PR",
      "postalCode": "83410-140",
      "addressCountry": "BR"
    },
    "openingHoursSpecification": {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      "opens": "08:00",
      "closes": "18:00"
    }
  };

  return (
    <html lang="pt-BR" className={`${inter.variable} scroll-smooth`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="antialiased min-h-screen bg-primary text-white">
        {/* Placeholder para Google Ads / GTM */}
        {/* 
        <Script
          strategy="afterInteractive"
          src={`https://www.googletagmanager.com/gtag/js?id=YOUR_GTAG_ID`}
        />
        <Script id="google-ads-tag" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag("js", new Date());
            gtag("config", "YOUR_GTAG_ID");
          `}
        </Script>
        */}
        <LeadProvider>
          {children}
        </LeadProvider>
      </body>
    </html>
  );
}
