"use client";

import { motion, useAnimation } from "framer-motion";
import { useTranslation } from "react-i18next";
import { ArrowRight, ArrowLeft } from "lucide-react";
import i18n from "../../i18n";
import Link from "next/link";

export default function HeroVideo() {
  const { t } = useTranslation();
  const isArabic = i18n.language === "ar";

  const servicesControls = useAnimation();
  const registerControls = useAnimation();

  const handleHoverStart = (controls) => {
    controls.start({
      x: isArabic ? [0, -20, 12, 0] : [0, 20, -12, 0],
      transition: { duration: 0.6 },
    });
  };

  const handleHoverEnd = (controls) => {
    controls.start({ x: 0 });
  };

  return (
    <section
      className="relative w-full h-[55vh] md:h-[65vh] overflow-hidden mt-[65px]"
      aria-label={isArabic ? "قسم الفيديو الرئيسي" : "Main hero video section"}
    >
      <video
        className="absolute top-0 left-0 w-full h-full object-cover z-0"
        src="https://res.cloudinary.com/dbgdvnkev/video/upload/v1760711233/WhatsApp_Video_2025-10-17_at_17.24.45_uqrhah.webm"
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
      />

      <div className="absolute top-0 left-0 w-full h-full bg-black/45 z-10 will-change-[opacity]" />

      <div className="relative z-20 h-full flex flex-col items-center justify-center text-center px-6 text-white">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          viewport={{ once: true }}
        >
          <h4
            className="text-sm md:text-lg uppercase tracking-widest text-[#4ca1ff] font-semibold mb-2"
            style={{ willChange: "transform, opacity" }}
          >
            {isArabic
              ? "رواد تصنيع مستحضرات التجميل الطبية في السعودية"
              : "Leaders in Cosmetic & Medical Manufacturing in Saudi Arabia"}
          </h4>

          <h1
            className="text-3xl md:text-5xl font-extrabold mb-4 leading-tight"
            style={{ willChange: "transform, opacity" }}
          >
            {isArabic
              ? "نصنع الجمال... بمعايير عالمية"
              : "We Manufacture Beauty — With Global Standards"}
          </h1>

          <p className="text-sm md:text-base max-w-2xl mx-auto mb-8 text-gray-200">
            {isArabic
              ? "بـون ميديكال إنـدستري مصنع سعودي حاصل على شهادات GMP و ISO لتصنيع مستحضرات التجميل والعناية بالبشرة والشعر والمستلزمات الطبية، بخبرات تمتد لأكثر من 5 سنوات في دعم العلامات التجارية المحلية والعالمية."
              : "Bonn Medical Industry is a Saudi GMP & ISO certified manufacturer specializing in cosmetics, skincare, haircare, and medical products — helping brands bring their vision to life with trusted quality and innovation."}
          </p>

          <div className="flex flex-col md:flex-row gap-4 justify-center items-center">
            {/* Services Button */}
            <motion.button
              onHoverStart={() => handleHoverStart(servicesControls)}
              onHoverEnd={() => handleHoverEnd(servicesControls)}
              aria-label={isArabic ? "استعرض خدماتنا" : "Explore our services"}
              className="relative border-2 border-[#4ca1ff] text-[#4ca1ff] px-8 py-2 rounded-lg overflow-hidden group hover:bg-[#4ca1ff] hover:text-white transition-all duration-300 font-semibold"
            >
              <Link href="/services" className="flex items-center justify-center gap-2">
                <motion.span animate={servicesControls}>
                  {isArabic ? "خدماتنا" : "Our Services"}
                </motion.span>
                {isArabic ? <ArrowLeft size={18} /> : <ArrowRight size={18} />}
              </Link>
            </motion.button>

            {/* Register Button */}
            <motion.button
              onHoverStart={() => handleHoverStart(registerControls)}
              onHoverEnd={() => handleHoverEnd(registerControls)}
              whileTap={{ scale: 0.96 }}
              animate={{
                boxShadow: [
                  "0 0 0px rgba(34,197,94,0.6)",
                  "0 0 18px rgba(34,197,94,0.6)",
                  "0 0 0px rgba(34,197,94,0.6)",
                ],
              }}
              transition={{ duration: 2, repeat: Infinity, repeatType: "mirror" }}
              aria-label={isArabic ? "ابدأ مشروعك الآن" : "Start your project"}
              className="relative border-2 border-green-500 text-green-500 px-8 py-2 rounded-lg overflow-hidden group hover:bg-green-500 hover:text-white transition-all duration-300 font-semibold"
            >
              <Link href="/registration" className="flex items-center justify-center gap-2">
                <motion.span animate={registerControls}>
                  {isArabic ? "ابدأ مشروعك الآن" : "Start Your Brand"}
                </motion.span>
                {isArabic ? <ArrowLeft size={18} /> : <ArrowRight size={18} />}
              </Link>
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
