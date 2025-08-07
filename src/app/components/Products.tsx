"use client";

import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import {
  Brain,
  FlaskConical,
  PackageCheck,
  Palette,
  Factory,
  FileCheck2,
} from "lucide-react";

const services = [
  {
    title: "Product Ideation & Selection",
    description:
      "We help identify market trends and select suitable product concepts that match your brand vision and market needs.",
    icon: <Brain size={80} className="text-[#0056D2]" />,
  },
  {
    title: "Custom Formulation",
    description:
      "Our R&D team develops tailor-made formulations using active ingredients to achieve targeted cosmetic benefits.",
    icon: <FlaskConical size={80} className="text-[#0056D2]" />,
  },
  {
    title: "Ready-to-Use Formulations",
    description:
      "Choose from our standard, pre-approved, high-quality formulas ready for fast market deployment.",
    icon: <PackageCheck size={80} className="text-[#0056D2]" />,
  },
  {
    title: "Packaging Development & Design",
    description:
      "We design and source creative, brand-aligned packaging tailored to regulatory and aesthetic standards.",
    icon: <Palette size={80} className="text-[#0056D2]" />,
  },
  {
    title: "End-to-End Production",
    description:
      "From raw material sourcing to filling and labeling, we handle full-scale production under GMP standards.",
    icon: <Factory size={80} className="text-[#0056D2]" />,
  },
  {
    title: "Documentation & Registration",
    description:
      "We prepare regulatory documentation and assist in registering products in local and international markets.",
    icon: <FileCheck2 size={80} className="text-[#0056D2]" />,
  },
];

const brands = [
  {
    name: "Covix Care",
    description: "Specialized in protective care.",
    image: "/images/brands/covix-care.png",
  },
  {
    name: "Rubin",
    description: "Medical-grade skin solutions.",
    image: "/images/brands/rubin.png",
  },
  {
    name: "B1 Care",
    description: "Innovative skincare for all.",
    image: "/images/brands/b1care.png",
  },
  {
    name: "Le Visage Plus",
    description: "Luxury skincare for a radiant look.",
    image: "/images/brands/le-visage-plus.png",
  },
  {
    name: "PuCare",
    description: "Premium skincare for sensitive skin.",
    image: "/images/brands/pucare.png",
  },
];

export default function ServicesAndBrands() {
  const { t } = useTranslation();

  return (
    <section className="bg-[#0056D2] py-20 px-6 md:px-12">
      {/* Services */}
      <div className="text-center mb-16">
        <h2 className="text-5xl font-bold text-gray-200 mb-2">
          {t("our_services")}
        </h2>
        <p className="text-gray-200 text-xl max-w-2xl mx-auto">
          {t("we_build_brands")}
        </p>
      </div>

<div className="background grid md:grid-cols-3 gap-5 md:ml-28 md:mr-28">
  {services.map((service, index) => (
    <motion.div
      key={service.title}
      initial={{ opacity: 0, y: 60, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.6, delay: index * 0.1, ease: "easeOut" }}
      className="bg-white/30 backdrop-blur-md rounded-2xl p-8 shadow-md hover:shadow-2xl transition-all border border-white/30"
    >
      <div className="flex justify-center mb-6">{service.icon}</div>
      <h3 className="text-2xl font-semibold text-gray-200 mb-3 text-center">
        {t(service.title)}
      </h3>
      <p className="text-gray-900 text-center mb-4">{t(service.description)}</p>
    </motion.div>
  ))}
</div>


      {/* Brands */}
      {/* <div className="mt-24 text-center">
        <h2 className="text-3xl font-bold text-[#003D99] mb-10">
          {t("our_brands")}
        </h2>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8">
          {brands.map((brand, i) => (
            <motion.div
              key={brand.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="bg-[#F5F8FF] rounded-xl p-6 shadow hover:shadow-md transition text-center"
            >
              <img
                src={brand.image}
                alt={brand.name}
                width={120}
                height={120}
                className="mx-auto mb-4"
              />
              <h4 className="font-semibold text-[#003D99]">{t(brand.name)}</h4>
              <p className="text-sm text-gray-600 mt-1">
                {t(brand.description)}
              </p>
            </motion.div>
          ))}
        </div>
      </div> */}
    </section>
  );
}
