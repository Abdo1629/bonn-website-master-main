"use client";

import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import {
  FaCheckCircle,
  FaChevronDown,
  FaIndustry,
  FaFlask,
  FaLeaf,
  FaTemperatureLow,
  FaUserShield,
  FaBox,
  FaTools,
} from "react-icons/fa";
import { useTranslation } from "react-i18next";

type Product = {
  brand: string;

  name_en: string;
  name_ar: string;

  tagline_en: string;
  tagline_ar: string;

  description_en: string;
  description_ar: string;

  usage_en: string;
  usage_ar: string;

  usage_target_en: string;
  usage_target_ar: string;

  instructions_en?: string;
  instructions_ar?: string;

  ingredients_en?: string[];
  ingredients_ar?: string[];

  storage_en?: string;
  storage_ar?: string;

  compliance: string[];
  images: string[];
};

export default function ProductDetails({ product }: { product: Product }) {
  const { i18n } = useTranslation();
  const isAr = i18n.language === "ar";

  const images = product.images || [];
  const [activeIndex, setActiveIndex] = useState(0);
  const active = images[activeIndex];

  useEffect(() => {
    if (images.length < 2) return;
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % images.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [images.length]);

  const t = {
    name: isAr ? product.name_ar : product.name_en,
    tagline: isAr ? product.tagline_ar : product.tagline_en,
    desc: isAr ? product.description_ar : product.description_en,
    usage: isAr ? product.usage_ar : product.usage_en,
    target: isAr ? product.usage_target_ar : product.usage_target_en,
    instructions: isAr ? product.instructions_ar : product.instructions_en,
    ingredients: isAr ? product.ingredients_ar : product.ingredients_en,
    storage: isAr ? product.storage_ar : product.storage_en,
  };

  const [openAccordion, setOpenAccordion] = useState("instructions");

  function Accordion({
    id,
    title,
    children,
  }: {
    id: string;
    title: string;
    children: React.ReactNode;
  }) {
    const isOpen = openAccordion === id;
    return (
      <div className="border-b">
        <button
          onClick={() => setOpenAccordion(isOpen ? "" : id)}
          className="w-full py-6 flex justify-between items-center text-lg font-semibold"
        >
          {title}
          <FaChevronDown
            className={`transition-transform ${
              isOpen ? "rotate-180" : ""
            }`}
          />
        </button>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="pb-6 text-gray-600 leading-relaxed"
            >
              {children}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  }

  return (
    <main className="bg-[#F8FAFF] py-20" dir={isAr ? "rtl" : "ltr"}>
      {/* ================= HERO ================= */}
      <section className="max-w-7xl mx-auto px-6 grid lg:grid-cols-[1.1fr_0.9fr] gap-20 items-start">
{/* ===== Gallery ===== */}
<div className="w-full">
  {/* Desktop / Tablet */}
  <div className="hidden md:flex gap-6">
    {/* Thumbnails */}
    <div className="flex flex-col gap-3">
      {images.map((img, idx) => (
        <button
          key={img}
          onClick={() => setActiveIndex(idx)}
          className={`relative w-20 h-24 rounded-xl overflow-hidden transition
            ${
              idx === activeIndex
                ? "ring-2 ring-blue-600"
                : "opacity-50 hover:opacity-100 hover:scale-105 hover:ring-1 hover:ring-gray-200 hover:cursor-pointer"
            }
          `}
        >
          <Image src={img} alt="" fill className="object-cover" />
        </button>
      ))}
    </div>

    {/* Main Image */}
    <motion.div
      key={active}
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      className="relative flex-1 h-[520px] bg-white rounded-[40px] shadow-2xl"
    >
      <Image
        src={active}
        alt={t.name}
        fill
        className="object-contain p-12"
      />
    </motion.div>
  </div>

  {/* Mobile Slider */}
  <div className="md:hidden">
    <motion.div
      key={active}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="relative w-full h-[380px] bg-white rounded-3xl shadow-xl"
    >
      <Image
        src={active}
        alt={t.name}
        fill
        className="object-contain p-8"
      />
    </motion.div>

    {/* Dots */}
    <div className="flex justify-center gap-2 mt-4">
      {images.map((_, i) => (
        <button
          key={i}
          onClick={() => setActiveIndex(i)}
          className={`w-2.5 h-2.5 rounded-full transition
            ${i === activeIndex ? "bg-blue-600" : "bg-gray-300"}
          `}
        />
      ))}
    </div>
  </div>
</div>


        {/* ===== Product Info ===== */}
        <div className="space-y-6">
          <span className="text-xs tracking-widest uppercase text-blue-600 font-semibold">
  {product.brand}
</span>

<h1 className="text-4xl md:text-5xl font-bold leading-tight">
  {t.name}
</h1>

<p className="text-lg text-gray-500 max-w-prose">
  {t.tagline}
</p>

          {/* Trust Icons */}
          <div className="flex flex-wrap gap-4 mt-4">
            <Trust icon={<FaIndustry />} label="GMP Facility" />
            <Trust icon={<FaFlask />} label="Lab Tested" />
            <Trust icon={<FaLeaf />} label="Safe Ingredients" />
            <Trust icon={<FaUserShield />} label="Medical Grade" />
          </div>

          {/* Description */}
          <p className="text-gray-700 leading-relaxed max-w-prose">
            {t.desc}
          </p>

          {/* Target */}
          {t.target && (
            <div className="bg-white rounded-xl p-5 shadow-sm">
              <h4 className="font-semibold mb-1">
                {isAr ? "الفئة المستهدفة" : "Target Audience"}
              </h4>
              <p className="text-sm text-gray-600">{t.target}</p>
            </div>
          )}

          {/* Usage Snapshot */}
          <div className="bg-white flex justify-between rounded-2xl p-5 text-center shadow hover:shadow-md transition">
            <UsageCard icon={<FaUserShield />} title="Usage" text={t.usage} />
            <UsageCard icon={<FaLeaf />} title="Skin Type" text="All Types" />
            <UsageCard icon={<FaFlask />} title="Formulation" text="Dermal" />
            <UsageCard
              icon={<FaTemperatureLow />}
              title="Storage"
              text="Below 30°C"
            />
          </div>
        </div>
      </section>

      {/* ================= DETAILS ================= */}
      <section className="max-w-4xl mx-auto px-6 mt-24">
        {t.instructions && (
          <Accordion
            id="instructions"
            title={isAr ? "تعليمات الاستخدام" : "Instructions"}
          >
            <p>{t.instructions}</p>
          </Accordion>
        )}

        {t.ingredients?.length && (
          <Accordion
            id="ingredients"
            title={isAr ? "المكونات" : "Ingredients"}
          >
            <ul className="grid grid-cols-2 gap-3">
              {t.ingredients.map((i) => (
                <li key={i} className="flex gap-2 text-sm">
                  <span className="w-2 h-2 mt-2 bg-blue-500 rounded-full" />
                  {i}
                </li>
              ))}
            </ul>
          </Accordion>
        )}

        {t.storage && (
          <Accordion id="storage" title={isAr ? "التخزين" : "Storage"}>
            <p>{t.storage}</p>
          </Accordion>
        )}
      </section>
       {/* MANUFACTURING - PREMIUM Timeline Style */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-4xl mx-auto px-6">
          <h3 className="text-2xl md:text-3xl font-semibold mb-12 text-gray-900">
            {isAr
              ? "مصنع بواسطة Bonn Medical Industries"
              : "Manufactured by Bonn Medical Industries"}
          </h3>

          <div className="relative">
            {/* Timeline vertical line */}
            <div className="flex gap-5 items-start"></div>

            <div className="flex flex-col gap-10">
              {/* Step 1 */}
              <div className="flex items-start gap-6 relative">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white text-xl">
                  <FaTools />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">
                    {isAr ? "الإنتاج" : "Production"}
                  </h4>
                  <p className="text-gray-600">
                    {isAr
                      ? "تم الإنتاج في منشآت معتمدة وفق معايير GMP."
                      : "Produced under GMP-certified facilities."}
                  </p>
                </div>
              </div>

              {/* Step 2 */}
              <div className="flex items-start gap-6 relative">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-green-600 flex items-center justify-center text-white text-xl">
                  <FaCheckCircle />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">
                    {isAr ? "ضبط الجودة" : "Quality Control"}
                  </h4>
                  <p className="text-gray-600">
                    {isAr
                      ? "ضبط جودة صارم لضمان أعلى معايير المنتج."
                      : "Strict quality control ensures top product standards."}
                  </p>
                </div>
              </div>

              {/* Step 3 */}
              <div className="flex items-start gap-6 relative">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-yellow-600 flex items-center justify-center text-white text-xl">
                  <FaBox />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">
                    {isAr ? "الامتثال والشهادات" : "Compliance & Certifications"}
                  </h4>
                  <p className="text-gray-600">
                    {isAr
                      ? "مواصفات وامتثال لجميع الشهادات المطلوبة."
                      : "Compliance with all required certifications."}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

/* ================= Components ================= */

function Trust({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <div className="flex items-center gap-2 text-sm text-gray-700">
      <span className="text-blue-600">{icon}</span>
      {label}
    </div>
  );
}

function UsageCard({
  icon,
  title,
  text,
}: {
  icon: React.ReactNode;
  title: string;
  text: string;
}) {
  return (
    <div className="bg-white rounded-xl p-4 text-center shadow-sm">
      <div className="text-blue-600 mb-2 flex justify-center">{icon}</div>
      <h5 className="text-sm font-semibold">{title}</h5>
      <p className="text-xs text-gray-600 mt-1">{text}</p>
    </div>
  );
}
