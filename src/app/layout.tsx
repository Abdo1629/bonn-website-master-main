import I18nProvider from "./i18n-provider";
import type { Metadata } from "next";
import "./globals.css";
import i18n from "../i18n";
import Header from './components/Header';
import Footer from './components/Footer';

<script
  type="application/ld+json"
  dangerouslySetInnerHTML={{
    __html: JSON.stringify({
      "@context": "https://schema.org",
      "@type": "Organization",
      "name": "Bonn Medical Industry",
      "alternateName": "Bonn Medical Industries (BMI)",
      "url": "https://www.bonnmed.com",
      "logo": "https://www.bonnmed.com/images/logo.png",
      "description":
        "Bonn Medical Industry is a GMP & ISO certified cosmetics, skincare, haircare & medical product manufacturer in Saudi Arabia.",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "6833",
        "addressLocality": "Riyadh",
        "postalCode": "14326",
        "addressCountry": "SA",
      },
      "contactPoint": [
        {
          "@type": "ContactPoint",
          "telephone": "+966580347173",
          "contactType": "Customer Service",
          "areaServed": ["SA", "Middle East", "Global"],
        },
        {
          "@type": "ContactPoint",
          "email": "marketing@bonnmed.com",
          "contactType": "Customer Service",
        },
      ],
      "sameAs": [
        "https://www.facebook.com/bonnmedical",
        "https://www.instagram.com/bonnmedical",
        "https://www.linkedin.com/company/bonnmedical",
      ],
      "foundingDate": "2018",
      "founders": [
        {
          "@type": "Person",
          "name": "Bonn Medical Founders",
        },
      ],
      "makesOffer": {
        "@type": "OfferCatalog",
        "name": "Manufacturing & OEM Services",
        "itemListElement": [
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Product",
              "name": "Skincare & Cosmetics Manufacturing",
            },
          },
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Product",
              "name": "Haircare Manufacturing",
            },
          },
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Product",
              "name": "Medical Product Manufacturing",
            },
          },
        ],
      },
      "hasPOS": {
        "@type": "Place",
        "name": "Bonn Medical Factory",
        "address": {
          "@type": "PostalAddress",
          "addressLocality": "Riyadh",
          "addressCountry": "SA",
        },
      },
    }),
  }}
/>



export const metadata: Metadata = {
  title: "Bonn Medical Industry | GMP & ISO Certified Cosmetics Manufacturer in Saudi Arabia",
  description:
    "Bonn Medical Industry (BMI) is a Saudi GMP & ISO certified factory specializing in cosmetics, skincare, haircare, and medical products manufacturing. We provide private label, OEM, packaging, and SFDA registration support for local and international brands.",
  keywords: [

    "Bonn Medical Industry",
    "Bonn Med",
    "Saudi Arabia manufacturing",
    "Medical manufacturer Riyadh",
    "Cosmetics private label KSA",
    "GMP Saudi Arabia",
    "ISO certified manufacturer",
    "Skincare manufacturing",
    "Medical devices Saudi",
    "OEM cosmetics supplier",
    "Health products factory",
    "Private label cosmetics MENA",
    "مصنع بون",
    "خدمات طبية",
    "شركة تصنيع منتجات طبية",
    "مصنع مستحضرات التجميل",
    "تصنيع منتجات العناية بالبشرة",
    "تصنيع كريمات الشعر والبشرة",
    "تصنيع مكياج برايفت ليبل",
    "تصنيع بلسم ومرطبات طبيعية",
    "خطوط إنتاج مستحضرات التجميل",
    "تصنيع مستحضرات العناية الشخصية",
    "تصنيع الشامبو والبلسم",
    "حلول التغليف والتعبئة الحديثة",
    "تسجيل منتجات التجميل في هيئة الغذاء والدواء",
    "توثيق منتجات التجميل في السعودية",
    "اختيار عبوات مخصصة",
    "تصنيع منتجات العناية بالجسم",
    "منتجات عناية طبيعية وعضوية",
    "شركة تصنيع مستحضرات تجميل خاصة",
    "تصنيع منتجات الأطفال عناية شامبو كريم",
    "باكج خاص للموزعين",
    "أسعار تصنيع مستحضرات التجميل",
    "Cosmetic manufacturing Saudi Arabia",
    "Private label cosmetics manufacturer",
    "OEM cosmetics factory Middle East",
    "Skincare product manufacturing",
    "Natural personal care production",
    "Hair care manufacturing solutions",
    "Custom formulation cosmetics",
    "Bulk cosmetic supplier GCC",
    "Beauty product development company",
    "GMP ISO certified cosmetics plant",
    "Cosmetics packaging and labeling provider",
    "SFDA product registration support",
    "Custom cosmetic packaging solutions",
    "Organic cosmetics manufacturer",
    "Contract manufacturing for beauty brands",
    "Turnkey solutions for beauty startups",
    "Export cosmetics from Saudi Arabia",
    "Kids & baby personal care manufacturer",
    "Dermatologically tested cosmetics",
    "Eco-friendly cosmetics production",
    "Halal certified personal care production",
    "Low MOQ beauty manufacturer",
    "Complete supply chain cosmetics",
    "كيفية تسجيل مستحضرات التجميل في السعودية",
    "أفضل مصنع مكياج ومنتجات عناية للتوزيع في الشرق الأوسط",
    "أماكن مصانع تعبئة مستحضرات العناية في الخليج",
    "شركات تصنيع كريمات طبيعية وشامبو عضوي",
    "خدمات إرسال عينات مستحضرات تجميل حسب الطلب",
    "مصنع خطوط إنتاج مستحضرات عناية بالجسم بجودة أوروبية",
    "أسعار تصنيع مستحضرات عناية خاصة بكميات صغيرة",
    "How to register cosmetics with SFDA Saudi Arabia",
    "Best private label skincare manufacturer Gulf region",
    "Custom packaging for beauty brands in the Middle East",
    "Natural hair product manufacturer MENA",
    "Export ready cosmetics for distributors Saudi Arabia",
    "Full-service cosmetic development and filling plant",
    "Small batch beauty production for startups",
  ],
  authors: [{ name: "Bonn Medical Industry" }],
  creator: "Bonn Medical Industry",
  openGraph: {
    title: "Bonn Medical Industry | Certified Cosmetics & Medical Manufacturer",
    description:
      "Bonn Medical Industry is a GMP & ISO certified factory in Saudi Arabia specializing in skincare, cosmetics, and health products. Private label & SFDA registration support.",
    url: "https://www.bonnmed.com",
    siteName: "Bonn Medical Industry",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "https://www.bonnmed.com/og-cover.jpg",
        width: 1200,
        height: 630,
        alt: "Bonn Medical Industry Facility",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Bonn Medical Industry | Cosmetics Manufacturer in Saudi Arabia",
    description:
      "GMP & ISO certified cosmetics manufacturer in Saudi Arabia. Private label, OEM, skincare, haircare, and SFDA compliance support.",
    creator: "@bonnmed",
    images: ["https://www.bonnmed.com/og-cover.jpg"],
  },
};


export const viewport = {
  width: 'device-width',
  initialScale: 1
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang={i18n.language} dir={i18n.language === "ar" ? "rtl" : "ltr"}>
      <head>
        <meta property="og:type" content="website" />
        <meta
          property="og:title"
          content="Bonn Medical Industry - Certified Manufacturer"
        />
        <meta
          property="og:description"
          content="GMP & ISO certified cosmetics and medical manufacturer in Saudi Arabia."
        />
        <meta
          property="og:image"
          content="https://www.bonnmed.com/images/logo.png"
        />
        <meta property="og:url" content="https://www.bonnmed.com" />

        {/* ✅ Twitter Card tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Bonn Medical Industry" />
        <meta
          name="twitter:description"
          content="GMP & ISO certified cosmetics and medical manufacturer in Saudi Arabia."
        />
        <meta
          name="twitter:image"
          content="https://www.bonnmed.com/images/logo.png"
        />
      </head>
      <body className={`font-din antialiased.className antialiased`}>
        <I18nProvider>
          <Header />
           <div className="margin-top"></div>
          {children}
          <script
          dangerouslySetInnerHTML={{
            __html: `(function(){if(!window.chatbase||window.chatbase("getState")!=="initialized"){window.chatbase=(...arguments)=>{if(!window.chatbase.q){window.chatbase.q=[]}window.chatbase.q.push(arguments)};window.chatbase=new Proxy(window.chatbase,{get(target,prop){if(prop==="q"){return target.q}return(...args)=>target(prop,...args)}})}const onLoad=function(){const script=document.createElement("script");script.src="https://www.chatbase.co/embed.min.js";script.id="bdeLFyyp29-wRbZv8YtfU";script.domain="www.chatbase.co";document.body.appendChild(script)};if(document.readyState==="complete"){onLoad()}else{window.addEventListener("load",onLoad)}})();`,
          }}
        />
          <Footer />
        </I18nProvider>
      </body>
    </html>
  );
}