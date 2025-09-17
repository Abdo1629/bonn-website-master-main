"use client";

import Image from "next/image";
import { useTranslation } from "react-i18next";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";

const clients = [
  { name: "Company One", logo: "/images/covix.png" },
  { name: "Company Two", logo: "/images/Haut.png" },
  { name: "Company Three", logo: "/images/Shield.png" },
  { name: "Company Four", logo: "/images/Vert.png" },
  { name: "Company Five", logo: "/images/Visage.png" },
  { name: "Company Six", logo: "/images/B1.png" },
];

export default function ClientsSection() {
  const { t } = useTranslation();

  return (
    <section className="py-16  bg-gray-50">
      <div className="mx-auto px-6 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-[#0056D2] mb-10">
          {t("OurClients")}
        </h2>
        <Swiper
          modules={[Autoplay]}
          spaceBetween={5} 
          slidesPerView={2}
          loop={true}
          autoplay={{ delay: 2000, disableOnInteraction: false }}
          breakpoints={{
            640: { slidesPerView: 3 },
            1024: { slidesPerView: 5 },
          }}
          className="flex items-center"
        >
          {clients.map((client, index) => (
<SwiperSlide key={index} className="flex justify-center">
  <div className="group w-full max-w-[160px] sm:max-w-[200px] md:max-w-[220px] lg:max-w-[240px] aspect-[4/3] flex items-center justify-center transition transform hover:scale-105">
    <Image
      src={client.logo}
      alt={client.name}
      width={200}
      height={120}
      className="object-contain max-h-full max-w-full grayscale group-hover:grayscale-0 transition duration-300"
    />
  </div>
</SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
