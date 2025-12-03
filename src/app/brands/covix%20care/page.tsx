"use client";

import React, { useMemo } from "react";
import Head from "next/head";
import { motion ,useInView} from "framer-motion";
import Link from "next/link";
import { useTranslation } from "react-i18next";
import { Globe, ShieldCheck, Layers, Sparkles, Star, CheckCircle , ArrowRight, ArrowLeft, Wrench, Rocket, Calendar} from "lucide-react";
import CountUp from "react-countup";

const ORANGE = "#F68A28";

const translations = {
  ar: {
    lang: "ar",
    dir: "rtl",
    brandName: "كوفيكس كير",
    heroTitle: "كوفيكس كير العلامة التجارية",
    heroSubtitle: "حلول عناية شخصية علمية وفعالة للمرأة العربية",
    heroCta: "استكشفي منتجاتنا",
    whoTitle: "من نحن",
    whoText: `كوفيكس كير علامة تجميل سعودية فخورة بجذورها تعيد تعريف العناية الشخصية من خلال فن التركيبة المتوازنة حيث تلتقي قوة البحث العلمي مع لطف المكونات الطبيعية في كل منتج.

وجودنا موجه لكل امرأة ترفض فكرة التنازل تريد نتائج واضحة بدون مجازفة بسلامة بشرتها، تقدر الشفافية، وتستحق عناية تحترم احتياجات بشرتها الحقيقية.

تتموضع كوفيكس كير كعلامة عناية بريميوم في المتناول: متخصصة في حلول شاملة للعناية بالبشرة والجسم، والشعر، والمنطقة الحميمة مصممة لتلائم مناخ المنطقة وأسلوب حياة المرأة في الخليج والعالم العربي.`,
    featuresTitle: "قيمنا",
    features: [
      { title: "الأمان أولاً", desc: "تلتزم تركيباتنا بمراحل اختبار دقيقة، مع مكونات طبيعية آمنة للاستخدام اليومي.", icon: ShieldCheck },
      { title: "جودة بلا مساومة", desc: "معايير تصنيع عالمية، ومكونات عالية الجودة، بدون أي اختصارات.", icon: Star },
      { title: "نتائج حقيقية", desc: "تحسن ملموس في البشرة، ترطيب متوازن وراحة حقيقية في الاستخدام.", icon: CheckCircle },
      { title: "دقة في كل تفصيلة", desc: "خطوط متخصصة حسب نوع البشرة لضمان فعالية العناية.", icon: Layers },
    ],
    categoriesTitle: "محفظة منتجاتنا",
    categories: [
      "عناية الوجه",
      "عناية الجسم",
      "العناية الحميمة",
      "عناية البشرة الحساسة",
      "عناية الشعر",
    ],
    numbersTitle: "بالأرقام",
    numbers: [
      { label: "عملاء مخدومين", value: "650+" },
      { label: "عبوات مُنتَجة", value: "≈ 4,000,000" },
      { label: "أسواق", value: "6+" },
    ],
    timelineTitle: "مسار تطوير المنتجات",
    timelineSteps: [
      "اختيار المكونات",
      "التوازن والتركيب",
      "الاختبار",
      "الاعتماد",
      "الإطلاق",
    ],
    contactTitle: "تواصل معنا",
    contactEmail: "CustomerRelation@bonnmed.com",
    contactPhone: "+966580347173",
    ctaTitle: "جاهزة لتجربة الفرق؟",
    ctaBtn:  " ",
  },
  en: {
    lang: "en",
    dir: "ltr",
    brandName: "Covix Care",
    heroTitle: "Covix Care Brand",
    heroSubtitle: "Science-led, effective personal care solutions for Arab women",
    heroCta: "Discover our products",
    whoTitle: "Who we are",
    whoText: `Covix Care is a proudly Saudi beauty brand combining science and nature to deliver effective, safe personal care.

Our presence is aimed at every woman who refuses compromise, seeks visible results without risking her skin, values transparency, and deserves care respecting her real skin needs.

Covix Care positions itself as a premium yet accessible brand: specializing in comprehensive care for skin, body, hair, and intimate areas tailored to Gulf and Arab climates and lifestyle.`,
    featuresTitle: "Our Values",
    features: [
      { title: "Safety First", desc: "Formulas undergo precise testing with natural ingredients safe for daily use.", icon: ShieldCheck },
      { title: "Uncompromising Quality", desc: "Manufactured to international standards with premium ingredients.", icon: Star },
      { title: "Real Results", desc: "Visible improvements, balanced hydration, and true comfort.", icon: CheckCircle },
      { title: "Attention to Detail", desc: "Specialized lines per skin type to ensure effective care.", icon: Layers },
    ],
    categoriesTitle: "Our Product Range",
    categories: [
      "Face Care",
      "Body Care",
      "Intimate Wellness",
      "Sensitive Skin",
      "Hair Care",
    ],
    numbersTitle: "By the numbers",
    numbers: [
      { label: "served customers", value: "650+" },
      { label: "units produced", value: "≈ 4,000,000" },
      { label: "markets", value: "6+" },
    ],
    timelineTitle: "Product Development",
    timelineSteps: [
      "Ingredient selection",
      "Formulation",
      "Testing",
      "Validation",
      "Launch",
    ],
    contactTitle: "Contact us",
    contactEmail: "CustomerRelation@bonnmed.com",
    contactPhone: "+966580347173",
    ctaTitle: "Ready to feel the difference?",
    ctaBtn: "Start your routine",
  },
};

export default function CovixCarePage() {
  const { i18n } = useTranslation();
  const lang = (i18n && i18n.language === "ar") ? "ar" : "en";
  const t = useMemo(() => translations[lang], [lang]);

  const fadeUp = {
    initial: { opacity: 0, y: 18 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.2 },
  };

  return (
    <>
      <Head>
        <title>{t.brandName} — {t.heroTitle}</title>
        <meta name="description" content={t.heroSubtitle} />
        <meta name="keywords" content={`Covix Care, Bonn Medical, Saudi cosmetics, personal care, skincare, ${lang === "ar" ? "العناية الشخصية, الخليج" : "Gulf, Arab"} `} />
        <meta property="og:title" content={`${t.brandName} — ${t.heroTitle}`} />
        <meta property="og:description" content={t.heroSubtitle} />
        <meta property="og:type" content="website" />
        <meta property="og:locale" content={t.lang === "ar" ? "ar_SA" : "en_US"} />
        <link rel="alternate" hrefLang="ar" href="https://www.bonnmed.com/ar/covix-care" />
        <link rel="alternate" hrefLang="en" href="https://www.bonnmed.com/en/covix-care" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Brand",
              name: t.brandName,
              description: t.heroSubtitle,
              url: "https://www.bonnmed.com/brands/covix-care",
              logo: "",
              areaServed: ["SA", "GCC", "MENA"],
              contactPoint: [{ "@type": "ContactPoint", telephone: t.contactPhone, contactType: "Customer Service" }],
            }),
          }}
        />
      </Head>

      <main dir={t.dir} className="min-h-screen bg-gradient-to-b from-white to-[#fff7f0] text-[#0b1220] antialiased font-sans">
{/* HERO */}
<section
  aria-labelledby="hero-title"
  className="relative overflow-hidden bg-cover bg-center mt-10"
  style={{ backgroundImage: "url('/images/covixproducts.png')" }}
>  
      <div className="absolute inset-0 bg-black/45 z-10" />
  <div className="max-w-7xl mx-auto px-6 py-30 flex flex-col-reverse md:flex-row items-center gap-10 relative z-10">
    <motion.div {...fadeUp} className="flex-1" tabIndex={-1}>
      <div className="inline-flex items-center gap-3 mb-4">
        <div style={{ background: ORANGE }} className="w-3 h-3 rounded-full" />
        <span className="text-sm font-semibold text-white">{t.brandName}</span>
      </div>

      <h1 id="hero-title" className="text-3xl md:text-5xl font-extrabold leading-tight mb-4 text-white">
        {t.heroTitle}
      </h1>

      <p className="text-white max-w-2xl mb-6 whitespace-pre-line">{t.heroSubtitle}</p>

      <div className="md:flex items-center gap-4 justify-center md:justify-start space-y-3 md:space-y-0">
        <Link
          href="/services"
          aria-label={t.heroCta}
          className="inline-flex items-center gap-3 bg-gray-100 border border-white hover:text-white text-[#f36f1a] px-6 py-2 rounded-full font-semibold hover:bg-transparent focus:outline-none focus:ring-2 focus:ring-orange-300 w-full justify-center md:justify-start transition-all duration-300 ease-in-out"
        >
          {t.heroCta}
          {lang === "ar" ? <ArrowLeft size={16} /> : <ArrowRight size={16} />}
        </Link>

        <Link
          href="/registration"
          aria-label={lang === "ar" ? "شراكات وتوزيع" : "Partnerships"}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white text-white hover:bg-gray-100 hover:text-[#f36f1a] focus:outline-none focus:ring-2 focus:ring-orange-100 w-full justify-center md:justify-start transition-all duration-300 ease-in-out"
        >
          <Sparkles size={16} /> {lang === "ar" ? "شراكات وتوزيع" : "Partnerships"}
        </Link>
      </div>
    </motion.div>
  </div>
</section>



        {/* WHO WE ARE */}
        <section aria-labelledby="who-title" className="py-12 bg-white/60">
          <div className="max-w-7xl mx-auto px-6">
            <motion.h2 {...fadeUp} id="who-title" className="text-4xl font-bold mb-4 text-[#f36f1a]">{t.whoTitle}</motion.h2>
            <motion.p {...fadeUp} className="text-xl text-gray-700 whitespace-pre-line">{t.whoText}</motion.p>
          </div>
        </section>

{/* FEATURES / VALUES */}
<section className="py-20" style={{ background: "#fff" }}>
  <div className="max-w-7xl mx-auto px-6">
    <h2 className="text-3xl font-bold mb-12">{t.featuresTitle}</h2>
    <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
      {t.features.map((f, i) => {
        const Icon = f.icon;
        return (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="p-6 rounded-2xl bg-white shadow hover:shadow-lg transition"
          >
            <div className="w-14 h-14 flex items-center justify-center mb-4 rounded-xl" style={{ background: `${ORANGE}20` }}>
              <Icon size={24} color={ORANGE} />
            </div>
            <h3 className="font-semibold mb-2">{f.title}</h3>
            <p className="text-gray-600">{f.desc}</p>
          </motion.div>
        );
      })}
    </div>
  </div>
</section>


        {/* CATEGORIES */}
        <section aria-labelledby="categories-title" className="py-12 bg-[#fff9f4]">
          <div className="max-w-7xl mx-auto px-6">
            <motion.h3 {...fadeUp} id="categories-title" className="text-xl font-semibold mb-6">{t.categoriesTitle}</motion.h3>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              {t.categories.map((c, i) => (
                <motion.div key={i} whileHover={{ y: -6, scale: 1.02 }} transition={{ type: "spring", stiffness: 200 }} className="bg-white p-6 rounded-2xl text-center shadow" tabIndex={0}>
                  <div className="w-14 h-14 rounded-full mx-auto mb-3 flex items-center justify-center" style={{ background: `${ORANGE}10` }}>
                    <Layers color={ORANGE} aria-hidden="true" />
                  </div>
                  <div className="font-medium">{c}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>


{/* NUMBERS */}
<section aria-labelledby="numbers-title" className="py-12">
  <div className="max-w-7xl mx-auto px-6 text-center">
    <motion.h3 {...fadeUp} id="numbers-title" className="text-2xl font-bold mb-6">
      {t.numbersTitle}
    </motion.h3>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {t.numbers.map((n, i) => {
        const ref = React.createRef<HTMLDivElement>();
        const isInView = useInView(ref, { once: true });

        return (
          <motion.div
            key={i}
            ref={ref}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.12 }}
            className="p-8 rounded-xl bg-white shadow"
          >
            <div className="text-3xl font-extrabold" style={{ color: ORANGE }}>
              {isInView ? (
                <CountUp
                  start={0}
                  end={parseInt(n.value.replace(/[^0-9]/g, ""))}
                  duration={2}
                  separator=","
                />
              ) : (
                0
              )}
            </div>
            <div className="text-gray-600 mt-2">{n.label}</div>
          </motion.div>
        );
      })}
    </div>
  </div>
</section>

{/* TIMELINE */}
<section className="py-20" style={{ background: "#fff" }}>
  <div className="max-w-7xl mx-auto px-6">
    <h2 className="text-3xl font-bold mb-12">{t.timelineTitle}</h2>
    <div className="relative md:flex md:items-center md:gap-12">
      <div className="hidden md:block absolute top-1/2 left-0 right-0 h-1 bg-gray-200 z-0"></div>
      {t.timelineSteps.map((step, i) => {
        const icons = [Globe, Wrench, Rocket, CheckCircle, Calendar];
        const Icon = icons[i] || Globe;
        return (
          <motion.div
            key={i}
            className="relative z-10 mb-12 md:mb-0 md:flex-1 text-center"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08 }}
          >
            <div className="w-16 h-16 mx-auto mb-4 flex items-center justify-center rounded-full bg-white shadow">
              <Icon size={28} color={ORANGE} />
            </div>
            <span className="font-semibold">{step}</span>
          </motion.div>
        );
      })}
    </div>
  </div>
</section>


        {/* CTA */}
        <section className="py-12 bg-white/60" aria-labelledby="final-cta">
          <div className="max-w-7xl mx-auto px-6 text-center">
            <motion.h3 {...fadeUp} id="final-cta" className="text-2xl font-bold mb-4">{t.ctaTitle}</motion.h3>
            <div className="flex items-center justify-center gap-4">
              <Link href="/products" className="px-10 py-3 rounded-full bg-gradient-to-r from-[#ff9a49] to-[#f36f1a] text-white font-semibold" aria-label={t.ctaBtn}>
                {t.ctaBtn}
              </Link>
            </div>
          </div>
        </section>

        {/* Contact Us */}
        <section className="py-20 bg-gray-50" aria-labelledby="contact-title">
<div className="max-w-5xl mx-auto px-6">
<h2 id="contact-title" className="text-3xl font-bold mb-10 text-center">
تواصل معنا
</h2>


<form className="bg-white shadow-lg rounded-2xl p-8 grid grid-cols-1 md:grid-cols-2 gap-6">
<div className="flex flex-col md:col-span-1">
<label className="font-semibold mb-2">الاسم</label>
<input
type="text"
className="border border-gray-300 rounded-xl p-3 focus:ring-2 focus:ring-orange-300 focus:outline-none"
placeholder="اكتب اسمك الكامل"
/>
</div>


<div className="flex flex-col md:col-span-1">
<label className="font-semibold mb-2">البريد الإلكتروني</label>
<input
type="email"
className="border border-gray-300 rounded-xl p-3 focus:ring-2 focus:ring-orange-300 focus:outline-none"
placeholder="example@email.com"
/>
</div>


<div className="flex flex-col md:col-span-2">
<label className="font-semibold mb-2">رقم الهاتف</label>
<input
type="text"
className="border border-gray-300 rounded-xl p-3 focus:ring-2 focus:ring-orange-300 focus:outline-none"
placeholder="+96000000000"
/>
</div>


<div className="flex flex-col md:col-span-2">
<label className="font-semibold mb-2">الرسالة</label>
<textarea
className="border border-gray-300 rounded-xl p-3 focus:ring-2 focus:ring-orange-300 focus:outline-none"
placeholder="اكتب رسالتك هنا..."
>

</textarea>
</div>


<div className="md:col-span-2 flex justify-center">
<button
type="submit"
className="px-10 py-3 bg-gradient-to-r from-[#ff9a49] to-[#f36f1a] hover:cursor-pointer text-white font-semibold rounded-full shadow hover:opacity-90 transition"
>
إرسال
</button>
</div>
</form>
</div>
</section>
      </main>
    </>
  );
}
