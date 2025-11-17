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
      x: isArabic ? [0, -18, 10, 0] : [0, 18, -10, 0],
      transition: { duration: 0.55 },
    });
  };

  const handleHoverEnd = (controls) => {
    controls.start({ x: 0 });
  };

  return (
    <section className="relative w-full h-[60vh] md:h-[75vh] overflow-hidden mt-[65px]">
      
      {/* Background Video */}
      <video
        className="absolute inset-0 w-full h-full object-cover z-0"
        src="https://res.cloudinary.com/dbgdvnkev/video/upload/v1760711233/WhatsApp_Video_2025-10-17_at_17.24.45_uqrhah.webm"
        autoPlay
        muted
        loop
        playsInline
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/45 z-10" />

      {/* CONTENT */}
      <div className="relative z-20 h-full flex flex-col items-center justify-center text-center px-6 text-white">

        {/* Title */}
        <h4
            className="text-sm md:text-lg uppercase tracking-widest text-[#4ca1ff] font-semibold mb-2"
            style={{ willChange: "transform, opacity" }}
          >
            {isArabic
              ? "رواد تصنيع مستحضرات التجميل الطبية في السعودية"
              : "Leaders in Cosmetic & Medical Manufacturing in Saudi Arabia"}
          </h4>

          <motion.h1
            className="text-3xl md:text-5xl font-extrabold mb-4 leading-tight"
            style={{ willChange: "transform, opacity" }}
            initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          >
            {isArabic
              ? "نحوّل فكرتك إلى منتج جاهز للسوق"
              : "Transforming Your Vision into Market-Ready Products"}
          </motion.h1>

        {/* Short Description */}
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.6 }}
          className="text-sm md:text-lg text-gray-200 max-w-2xl mb-8"
        >
          {isArabic
            ? "مصنع سعودي معتمد لتصنيع مستحضرات التجميل والعناية والمستلزمات الطبية بخبرة تتجاوز 5 سنوات."
            : "A certified Saudi manufacturer specializing in cosmetics, care products, and medical supplies with over 5 years of experience."}
        </motion.p>

        {/* Buttons */}
        <div className="flex flex-col md:flex-row gap-4 justify-center items-center">

          {/* Services Button */}
          <motion.button
            onHoverStart={() => handleHoverStart(servicesControls)}
            onHoverEnd={() => handleHoverEnd(servicesControls)}
            className="relative border-2 border-[#4ca1ff] text-[#4ca1ff] px-8 py-2 rounded-lg hover:bg-[#4ca1ff] hover:text-white transition-all duration-300 font-semibold text-sm md:text-base"
          >
            <Link href="/services" className="flex items-center justify-center gap-2">
              <motion.span animate={servicesControls}
                  className="flex items-center gap-2" 
>
                {isArabic ? "خدماتنا" : "Our Services"}
                {isArabic ? <ArrowLeft size={18} /> : <ArrowRight size={18} />}
              </motion.span>
            </Link>
          </motion.button>

          {/* Register Button */}
          <motion.button
            onHoverStart={() => handleHoverStart(registerControls)}
            onHoverEnd={() => handleHoverEnd(registerControls)}
            whileTap={{ scale: 0.96 }}
            animate={{
              boxShadow: [
                "0 0 0px rgba(34,197,94,0.5)",
                "0 0 14px rgba(34,197,94,0.5)",
                "0 0 0px rgba(34,197,94,0.5)",
              ],
            }}
            transition={{ duration: 2, repeat: Infinity, repeatType: "mirror" }}
            className="flex border-2 border-green-500 text-green-500 px-8 py-2 rounded-lg hover:bg-green-500 hover:text-white transition-all duration-300 font-semibold text-sm md:text-base"
          >
<Link 
  href="/registration" 
  className="flex items-center justify-center gap-2"
>
  <motion.span 
    className="flex items-center gap-2" 
    animate={registerControls}
  >
    {isArabic ? "ابدأ الآن" : "Start Now"}
    {isArabic ? <ArrowLeft size={18} /> : <ArrowRight size={18} />}
  </motion.span>
</Link>
          </motion.button>
        </div>
      </div>
    </section>
  );
}