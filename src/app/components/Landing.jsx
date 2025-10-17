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
      x: isArabic ? [0, -25, 14, 0] : [0, 25, -14, 0],
      transition: { duration: 0.8 },
    });
  };

  const handleHoverEnd = (controls) => {
    controls.start({ x: 0 });
  };

  return (
    <div className="relative w-full h-[50vh] min-[768px]:h-[60vh] max-[375]:h-[60vh] overflow-hidden mt-[65px]">
      <video
        className="absolute top-0 left-0 w-full h-full object-cover z-0"
        src="https://res.cloudinary.com/dbgdvnkev/video/upload/v1760711233/WhatsApp_Video_2025-10-17_at_17.24.45_uqrhah.webm"
        autoPlay
        muted
        loop
        playsInline
      />

      <div className="absolute top-0 left-0 w-full h-full bg-black/50 z-10" />

      <div className="relative z-20 h-full flex flex-row items-center max-[768px]:justify-center px-6 gap-10 text-white">
        <motion.div
          className="w-full items-center justify-center flex flex-col max-[768px]:text-center"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
        >
          <h4 className="text-base md:text-lg uppercase tracking-widest text-[#4ca1ff] font-semibold mb-[-11px] p-1">
            {t("video-subtitle")}
          </h4>

          <h1 className="text-3xl md:text-5xl font-bold mb-4 leading-tight">
            {isArabic ? "جمال مصنع Bonn" : "Beauty by Bonn Factory"}
          </h1>

          <p className="text-sm mb-6 max-w-xl text-center">
            {isArabic
              ? "مصنع Bonn متخصص في تصنيع مستحضرات التجميل بأعلى معايير الجودة العالمية. نستخدم أحدث التقنيات لإنتاج منتجات فعالة وآمنة."
              : "Bonn factory specializes in producing cosmetics with top global quality standards. We use advanced technologies to ensure safety and performance."}
          </p>

          {/* الزرارين */}
          <div className="flex flex-col md:flex-row gap-4 items-center justify-center">
            {/* زرار الخدمات */}
            <motion.button
              onHoverStart={() => handleHoverStart(servicesControls)}
              onHoverEnd={() => handleHoverEnd(servicesControls)}
              className="w-full relative group overflow-hidden border-2 border-[#4ca1ff] text-[#4ca1ff] px-6 py-2 rounded-lg backdrop-blur-md cursor-pointer hover:bg-[#4ca1ff] hover:text-white transition-colors duration-300"
              aria-label="Explore Services"
           >
              <Link href="/services" className="flex items-center justify-center">
                <motion.div
                  className="absolute -z-10 w-[200%] h-[200%] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rotate-45 bg-gradient-to-r from-[#4ca1ff44] to-[#0056d244] blur-2xl opacity-30"
                  animate={{ x: ["-50%", "50%", "-50%"] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                />
                <motion.span
                  animate={servicesControls}
                  className="flex items-center justify-center gap-2 font-semibold"
                >
                  {t("button")}
                  {isArabic ? <ArrowLeft size={18} /> : <ArrowRight size={18} />}
                </motion.span>
              </Link>
            </motion.button>

            <motion.button
              onHoverStart={() => handleHoverStart(registerControls)}
              onHoverEnd={() => handleHoverEnd(registerControls)}
              whileTap={{ scale: 0.95 }}
              animate={{
              boxShadow: [
      "0 0 0px rgba(34,197,94,0.6)",
      "0 0 20px rgba(34,197,94,0.6)",
      "0 0 0px rgba(34,197,94,0.6)",
    ]
  }}
    transition={{ duration: 2.5, repeat: Infinity, repeatType: "mirror" }}
    aria-label="Register for Manufacturing"
              className="group w-full whitespace-nowrap relative group overflow-hidden border-2 border-green-500 text-green-500 px-5 md:px-10 py-2 rounded-lg backdrop-blur-md cursor-pointer hover:bg-green-500 hover:text-white transition-colors duration-300"
            >
              <Link href="/registration" className="flex items-center justify-center">
                <motion.div
                  className="absolute -z-10 w-[200%] h-[200%] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rotate-45 bg-gradient-to-r from-green-500/30 to-green-700/30 blur-2xl opacity-30"
                  animate={{ x: ["-50%", "50%", "-50%"] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                />
                <motion.span
                  animate={registerControls}
                  className="flex items-center justify-center gap-2 font-semibold"
                >
                  {isArabic ? "سجل للتصنيع معانا" : "Register for Manufacturing"}
                  {isArabic ? <ArrowLeft size={18} /> : <ArrowRight size={18} />}
                </motion.span>
              </Link>
            </motion.button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
