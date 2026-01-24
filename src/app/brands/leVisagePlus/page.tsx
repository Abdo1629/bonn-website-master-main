"use client";

import React, { useState } from "react";
import Head from "next/head";
import { motion } from "framer-motion";
import Link from "next/link";
import {
  Globe,
  ShieldCheck,
  Layers,
  Sparkles,
  Star,
  CheckCircle,
  ArrowLeft,
  Wrench,
  Rocket,
  Calendar,
} from "lucide-react";
import CountUp from "react-countup";
import { useTranslation } from "react-i18next";

// Map icon names from JSON to actual components
const iconMap: Record<string, React.FC > = {
  Globe,
  ShieldCheck,
  Layers,
  Sparkles,
  Star,
  CheckCircle,
  Wrench,
  Rocket,
  Calendar,
};

type NumberBoxProps = {
  value: string | number;
  label: string;
  delay?: number;
  color?: string;
};

function NumberBox({ value, label, delay = 0, color = "#d81e46" }: NumberBoxProps) {
  const numeric = parseInt(String(value).replace(/[^0-9]/g, "")) || 0;
  const showPlus = String(value).includes("+");
  const [start, setStart] = useState(false);

  return (
    <motion.div
      className="p-6 sm:p-8 rounded-xl bg-white shadow hover:shadow-lg transition-all"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ delay }}
      onViewportEnter={() => setStart(true)}
    >
      <div className="text-3xl sm:text-4xl font-extrabold" style={{ color }}>
        {start ? <CountUp start={0} end={numeric} duration={2} separator="," /> : 0}
        {showPlus ? "+" : ""}
      </div>
      <div className="text-gray-600 mt-2 text-sm sm:text-base">{label}</div>
    </motion.div>
  );
}

export default function LeVisagePage() {
  const { t, i18n } = useTranslation();
  const lang = i18n.language === "ar" ? "ar" : "en";
  const RED = "#d81e46";


  const fadeUp = {
    initial: { opacity: 0, y: 18 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.2 },
  };

  // Get features and numbers from translation JSON
  const features = t("features", { returnObjects: true }) as Array<{ title: string; desc: string; icon: string }>;
  const numbers = t("numbers", { returnObjects: true }) as Array<{ value: string; label: string }>;

  return (
    <>
      <Head>
        <title>{t("brandName")} — {t("heroTitle")}</title>
        <meta name="description" content={t("heroSubtitle")} />
      </Head>

      <main dir={lang === "ar" ? "rtl" : "ltr"} className="min-h-screen bg-gradient-to-b from-white to-[#fff7f0] text-[#0b1220] antialiased font-sans">

        {/* HERO */}
        <section
          aria-labelledby="hero-title"
          className="relative overflow-hidden bg-cover bg-center mt-10"
          style={{ backgroundImage: "url('/images/visageProducts.png')" }}
        >
          <div className="absolute inset-0 bg-black/45 z-10" />
          <div className="max-w-7xl mx-auto px-6 py-16 md:py-32 flex flex-col-reverse md:flex-row items-center gap-10 relative z-10">
            <motion.div {...fadeUp} className="flex-1" tabIndex={-1}>
              <div className="inline-flex items-center gap-3 mb-4">
                <div style={{ background: RED }} className="w-3 h-3 rounded-full" />
                <span className="text-sm font-semibold text-white">{t("brandName")}</span>
              </div>

              <h1 id="hero-title" className="text-3xl sm:text-4xl md:text-5xl font-extrabold leading-tight mb-4 text-white">
                {t("heroTitle")}
              </h1>

              <p className="text-white max-w-2xl mb-6 whitespace-pre-line">{t("heroSubtitle")}</p>

              <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4">
                <Link
                  href="/services"
                  aria-label={t("heroCta")}
                  className="inline-flex items-center gap-3 bg-gray-100 border border-white hover:text-white text-[#d81e46] px-6 py-2 rounded-full font-semibold hover:bg-transparent focus:outline-none focus:ring-2 focus:ring-red-300 w-full sm:w-auto justify-center transition-all duration-300 ease-in-out"
                >
                  {t("heroCta")}
                  <ArrowLeft size={16} />
                </Link>

                <Link
                  href="/registration"
                  aria-label="شراكات وتوزيع"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white text-white hover:bg-gray-100 hover:text-[#d81e46] focus:outline-none focus:ring-2 focus:ring-red-100 w-full sm:w-auto justify-center transition-all duration-300 ease-in-out"
                >
                  <Sparkles size={16} /> شراكات وتوزيع
                </Link>
              </div>
            </motion.div>
          </div>
        </section>

        {/* WHO WE ARE */}
        <section aria-labelledby="who-title" className="relative py-20 bg-white">
          <div className="absolute inset-0 mt-20 mb-5 bg-center bg-no-repeat bg-contain opacity-40"
               style={{ backgroundImage: "url('/images/levisage-logo.png')" }} />
          <div className="absolute inset-0 bg-white/20 backdrop-blur-xs"></div>
          <div className="relative max-w-7xl mx-auto px-6">
            <motion.h2 {...fadeUp} id="who-title" className="text-3xl sm:text-4xl md:text-4xl font-bold mb-4 text-[#d81e46]">
              {t("whoTitle")}
            </motion.h2>
            <motion.p {...fadeUp} className="text-base sm:text-lg md:text-xl text-gray-700 whitespace-pre-line">
              {t("whoText")}
            </motion.p>
          </div>
        </section>

        {/* FEATURES */}
        <section className="py-12 bg-white">
          <div className="max-w-7xl mx-auto px-6">
            <h2 className="text-3xl font-bold mb-12">{t("featuresTitle")}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8">
              {features.map((f, i) => {
                const Icon = iconMap[f.icon] || Globe;
                return (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="p-6 rounded-2xl bg-white shadow hover:shadow-lg transition"
                  >
                    <div className="w-14 h-14 flex items-center justify-center mb-4 rounded-xl" style={{ background: `${RED}20` }}>
                <div style={{ background: RED }} className="w-3 h-3 rounded-full" />
                    </div>
                    <h3 className="font-semibold mb-2">{f.title}</h3>
                    <p className="text-gray-600 text-sm sm:text-base">{f.desc}</p>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* NUMBERS */}
        <section aria-labelledby="numbers-title" className="py-12 bg-[#fff7f0]">
          <div className="max-w-7xl mx-auto px-6 text-center">
            <motion.h3 {...fadeUp} id="numbers-title" className="text-2xl sm:text-3xl font-bold mb-6">
              {t("numbersTitle")}
            </motion.h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {numbers.map((n, i) => (
                <NumberBox key={i} value={n.value} label={n.label} delay={i * 0.12} color={RED} />
              ))}
            </div>
          </div>
        </section>

      </main>
    </>
  );
}
