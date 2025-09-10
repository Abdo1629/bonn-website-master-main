"use client";

import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";

export default function RandDPage() {
  const { t, i18n } = useTranslation();
  const isAr = i18n.language === "ar";

  return (
    <main className="w-full text-[#0F2451]">
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient from-[#0B5BD3] to-[#0B5BD3]/80 text-white">
        <div className="mx-auto max-w-7xl px-6 py-20 md:px-10">
          <motion.h1
            className="text-4xl md:text-6xl font-extrabold leading-tight drop-shadow-md"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            {t("rnd.title")}
          </motion.h1>

          <motion.p
            className="mt-5 max-w-3xl text-white/90 text-lg md:text-xl leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            {t("rnd.subtitle")}
          </motion.p>
        </div>

        <svg
          className="absolute bottom-0 left-0 w-full"
          viewBox="0 0 1440 120"
          preserveAspectRatio="none"
        >
          <path fill="#fff" d="M0,96L1440,0L1440,120L0,120Z"></path>
        </svg>
      </section>

      {/* Process */}
<section id="process" className="bg-[#F6F9FF] py-16">
  <div className="mx-auto max-w-7xl px-6 md:px-10">
    <motion.h2
      className="text-3xl md:text-4xl font-extrabold text-[#0F2451] mb-6 text-center"
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
    >
      {t("rnd.process.title")}
    </motion.h2>
            <motion.div
          className="grid  gap-8 items-center text-center"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="md:col-span-7 space-y-4">
            <p className="text-[#1A3351] leading-relaxed text-lg">
              {t("rnd.intro")}
            </p>
          </div>
        </motion.div>

    <div className="mt-10 space-y-8">
{(t("rnd.process.steps", { returnObjects: true }) as { title: string; desc: string }[]).map(
  (step, idx) => (
    <motion.div
      key={idx}
      className="rounded-2xl bg-white border border-[#E6EEFF] shadow-sm p-6"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
    >
      <div className="flex items-baseline gap-3 mb-2">
        <span className="text-[#0B5BD3] font-extrabold text-xl">{idx + 1}.</span>
        <h3 className="text-lg md:text-xl font-bold text-[#0F2451]">{step.title}</h3>
      </div>
      <p className="text-[#334766] leading-relaxed">{step.desc}</p>
    </motion.div>
  )
)}

    </div>
  </div>
</section>


      {/* CTA */}
      <section className="py-16">
        <div className="mx-auto max-w-4xl px-6 md:px-10 text-center">
          <motion.div
            className="rounded-3xl bg-gradient-to-r from-[#0B5BD3] to-[#1F7AF1] p-8 text-white"
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h3 className="text-2xl md:text-3xl font-extrabold mb-3">
              {t("rnd.cta.title")}
            </h3>
            <p className="mb-6">{t("rnd.cta.subtitle")}</p>
            <div className="flex justify-center gap-3">
              <a className="bg-white text-[#0B5BD3] px-6 py-3 rounded-full font-semibold">
                {t("rnd.cta.primary")}
              </a>
              <a className="bg-white/10 px-6 py-3 rounded-full font-semibold">
                {t("rnd.cta.secondary")}
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
