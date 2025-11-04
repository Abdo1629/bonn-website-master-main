"use client";

import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

export default function ArtVid() {
  const { t } = useTranslation();

  return (
    <motion.section
      className="relative w-full py-28 px-6 md:px-16 overflow-hidden bg-gradient-to-b from-[#eff2ff] via-[#F6F9FF] to-[#fbfbff]"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 1, ease: "easeOut" }}
    >
      {/* خلفية لامعة */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,#E2E8FF_0%,transparent_60%)] -z-10"></div>

      {/* العنوان */}
      <div className="text-center mb-14">
        <motion.h2
          className="text-4xl md:text-5xl font-extrabold text-[#0056D2] drop-shadow-sm"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          {t("whyChooseUs")}
        </motion.h2>

        <motion.div
          className="mt-4 mx-auto w-24 h-[3px] bg-gradient-to-r from-[#a8a8ff] to-[#5c57b9] rounded-full"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        />

        <motion.p
          className="text-lg md:text-xl text-[#4B4B4B]/80 mt-6 max-w-2xl mx-auto leading-relaxed"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.8 }}
        >
          {t("whyChooseUsDesc")}
        </motion.p>
      </div>

      {/* الفيديو */}
      <motion.div
        className="relative max-w-4xl mx-auto rounded-[2rem] overflow-hidden shadow-[0_0_40px_-10px_rgba(139,123,255,0.4)] backdrop-blur-md border border-white/40"
        whileHover={{ scale: 1.015 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        {/* layer ناعم فوق الفيديو */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#00000010] to-transparent z-10 pointer-events-none" />
        <video
          src="https://res.cloudinary.com/dbgdvnkev/video/upload/v1761160485/whiteboard_final_v_1_nujzk5.webm"
          controls
          className="w-full h-auto object-cover rounded-[2rem]"
          autoPlay
          muted
          loop
        />
      </motion.div>

      {/* reflection ناعم */}
      <div className="max-w-4xl mx-auto h-20 mt-[-10px] bg-gradient-to-t from-[#9BB0FF]/20 to-transparent blur-3xl opacity-70 rounded-b-[2rem]"></div>
    </motion.section>
  );
}