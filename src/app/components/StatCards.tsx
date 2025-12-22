"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import { motion } from "framer-motion";
import CountUp from "react-countup";
import { useTranslation } from "react-i18next";

import "swiper/css";

const stats = [
  { value: 500, suffix: "+", label: "products" },
  { value: 10, suffix: "+", label: "clients" },
  { value: 100, suffix: "%", label: "satisfaction" },
  { value: 25, suffix: "+", label: "tonsPerDay" },
  { value: 9, suffix: "+", label: "countries" },
  { value: 7, suffix: "+", label: "productionLines" },
];

type StatCardProps = {
  value: number;
  suffix: string;
  label: string;
};

function StatCard({ value, suffix, label }: StatCardProps) {
  const { t } = useTranslation();

  return (
 <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="relative mx-3 rounded-2xl p-8 text-center shadow-xl"
    >
      {/* Glow */}
      <div className="absolute inset-0 rounded-2xl bg-white/5 blur-xl opacity-20 -z-10" />

      <h3 className="text-6xl md:text-7xl font-extrabold text-white">
        <CountUp
          end={value}
          duration={2}
          suffix={suffix}
          enableScrollSpy
        />
      </h3>

      <p className="mt-3 text-lg text-white/80 tracking-wide">
        {t(label)}
      </p>
    </motion.div>
  );
}

export default function StatsCarousel() {
  return (
<section className="relative py-20 overflow-hidden bg-gradient-to-br from-[#0056D2] via-[#0046b0] to-[#003a8c]">
  
  {/* background blobs */}
  <div className="absolute -top-20 -left-20 w-72 h-72 bg-white/10 rounded-full blur-3xl" />
  <div className="absolute bottom-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl" />

  <Swiper
    modules={[Autoplay]}
    loop
    autoplay={{ delay: 3000, disableOnInteraction: false }}
    speed={900}
    slidesPerView={1}
    breakpoints={{
      640: { slidesPerView: 2 },
      1024: { slidesPerView: 3 },
    }}
    className="relative max-w-7xl mx-auto px-4"
  >
    {stats.map((stat, index) => (
      <SwiperSlide key={index}>
        <StatCard {...stat} />
      </SwiperSlide>
    ))}
  </Swiper>
</section>

  );
}
