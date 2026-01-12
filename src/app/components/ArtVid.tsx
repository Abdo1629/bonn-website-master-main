"use client";

import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

export default function ManufacturingFacility() {
  const { t } = useTranslation();

  return (
    <section className="relative w-full py-28 px-6 md:px-16 bg-[#F6F9FF] overflow-hidden">
      
      {/* subtle background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,#E2E8FF_0%,transparent_55%)] -z-10" />

      {/* ===== Header ===== */}
      <div className="max-w-6xl mx-auto text-center mb-20">
        <motion.h2
          className="text-4xl md:text-5xl font-extrabold text-[#003A8C]"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {t("manufacturingFacility") || "Manufacturing Excellence"}
        </motion.h2>

        <motion.div
          className="mx-auto mt-5 w-28 h-[3px] bg-gradient-to-r from-[#0056D2] to-[#7BA7FF] rounded-full"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          transition={{ duration: 0.7, delay: 0.2 }}
        />

        <motion.p
          className="mt-8 max-w-3xl mx-auto text-lg md:text-xl text-[#4B4B4B]/80 leading-relaxed"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          {t("manufacturingFacilityDesc") ||
            "Our production environment reflects our commitment to quality, precision, and international medical standards."}
        </motion.p>
      </div>

      {/* ===== Content ===== */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">

        {/* ===== Text Block ===== */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <h3 className="text-2xl md:text-3xl font-semibold text-[#003A8C] mb-6">
            {t("facilityTitle") || "Built for Medical-Grade Production"}
          </h3>

          <p className="text-[#4B4B4B]/80 text-lg leading-relaxed mb-6">
            {t("facilityDesc1") ||
              "Our facility operates under strict quality control systems, ensuring consistent output that meets both local and international requirements."}
          </p>

          <p className="text-[#4B4B4B]/80 text-lg leading-relaxed">
            {t("facilityDesc2") ||
              "Every stage of production is monitored to guarantee safety, reliability, and scalability for global distribution."}
          </p>

          {/* mini highlights */}
          <div className="mt-10 grid grid-cols-2 gap-6">
            {[
              "ISO Certified Processes",
              "High-Capacity Production Lines",
              "Strict Quality Control",
              "Export-Ready Standards",
            ].map((item, i) => (
              <div
                key={i}
                className="text-sm md:text-base font-medium text-[#003A8C]"
              >
                • {t(item) || item}
              </div>
            ))}
          </div>
        </motion.div>

        {/* ===== Video Block ===== */}
        <motion.div
          className="relative rounded-xl overflow-hidden border border-[#0056D2]/20 bg-white"
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          {/* soft overlay to calm animation */}
          <div className="absolute inset-0 bg-[#0056D2]/10 mix-blend-multiply z-10 pointer-events-none" />

          <video
            src="https://res.cloudinary.com/dbgdvnkev/video/upload/v1761160485/whiteboard_final_v_1_nujzk5.webm"
            controls
            preload="metadata"
            className="w-full h-full object-cover"
          />
        </motion.div>
      </div>
    </section>
  );
}
