"use client";

import Image from "next/image";
import i18n from "../../i18n";
import { FaBox, FaTools, FaCheckCircle } from "react-icons/fa";

type Product = {
  id: string;
  brand: string;
  brand_logo?: string;
  brand_color?: string;
  name_en: string;
  name_ar: string;
  slug: string;
  tagline_en?: string;
  tagline_ar?: string;
  description_en?: string;
  description_ar?: string;
  category?: string;
  usage_en?: string;
  usage_ar?: string;
  compliance?: string[];
  image?: string;
};

// Reusable Card Component
const InfoCard = ({
  title,
  value,
  icon: Icon,
  color = "#0056D2",
}: {
  title: string;
  value?: string | null;
  icon: React.ComponentType<{ className?: string }>;
  color?: string;
}) => {
  if (!value) value = i18n.language === "ar" ? "غير محدد" : "–";

  return (
    <div
      className="flex items-center gap-5 p-6 bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 cursor-default"
      style={{ borderLeft: `5px solid ${color}` }}
    >
      <div className="text-3xl text-gray-400">
        <Icon />
      </div>
      <div className="flex flex-col">
        <h4 className="text-sm font-semibold text-gray-500">{title}</h4>
        <p className="text-lg font-bold">{value}</p>
      </div>
    </div>
  );
};

export default function ProductDetails({ product }: { product: Product }) {
  const isArabic = i18n.language === "ar";

  return (
    <main className="bg-gray-50 min-h-screen font-sans">
      {/* HERO */}
      <section className="relative py-24">
        <div className="max-w-7xl mx-auto px-6 flex flex-col-reverse md:flex-row items-center gap-12">
          {/* Brand Info */}
          <div className="flex flex-col gap-4 md:w-1/2 z-10">
            {product.brand_logo && (
              <Image
                src={product.brand_logo}
                alt={product.brand}
                width={80}
                height={80}
                className="rounded-full p-2 bg-white shadow-md"
              />
            )}
            <h1 className="text-4xl md:text-5xl font-extrabold mt-2 text-gray-900 tracking-tight">
              {isArabic ? product.name_ar : product.name_en}
            </h1>
            {product.tagline_en && (
              <p className="mt-4 text-lg md:text-xl text-gray-600 max-w-xl">
                {isArabic ? product.tagline_ar : product.tagline_en}
              </p>
            )}
          </div>

          {/* Product Image */}
          {product.image && (
            <div className="relative w-full md:w-1/2 h-[400px] rounded-3xl overflow-hidden shadow-2xl hover:scale-105 transition-transform duration-500">
              <Image
                src={product.image}
                alt={product.name_en}
                fill
                className="object-cover"
              />
            </div>
          )}
        </div>
      </section>

      {/* INFO CARDS */}
      <section className="py-24">
        <div className="max-w-6xl mx-auto px-6 grid sm:grid-cols-1 md:grid-cols-3 gap-8">
          <InfoCard
            title={isArabic ? "الفئة" : "Category"}
            value={product.category}
            icon={FaBox}
            color={product.brand_color}
          />
          <InfoCard
            title={isArabic ? "الاستخدام" : "Usage"}
            value={isArabic ? product.usage_ar : product.usage_en}
            icon={FaTools}
            color={product.brand_color}
          />
          <InfoCard
            title={isArabic ? "المطابقة" : "Compliance"}
            value={product.compliance?.join(", ")}
            icon={FaCheckCircle}
            color={product.brand_color}
          />
        </div>
      </section>

      {/* DESCRIPTION */}
      {(product.description_en || product.description_ar) && (
        <section className="py-24 bg-white">
          <div className="max-w-4xl mx-auto px-6">
            <h2 className="text-3xl md:text-4xl font-semibold mb-6 text-gray-900">
              {isArabic ? "عن هذا المنتج" : "Why This Product"}
            </h2>
            <p className="text-gray-700 text-lg leading-relaxed">
              {isArabic ? product.description_ar : product.description_en}
            </p>
          </div>
        </section>
      )}

      {/* MANUFACTURING - PREMIUM Timeline Style */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-4xl mx-auto px-6">
          <h3 className="text-2xl md:text-3xl font-semibold mb-12 text-gray-900">
            {isArabic
              ? "مصنع بواسطة Bonn Medical Industries"
              : "Manufactured by Bonn Medical Industries"}
          </h3>

          <div className="relative">
            {/* Timeline vertical line */}
            <div className="absolute left-5 top-0 w-1 h-full bg-gray-300"></div>

            <div className="flex flex-col gap-10">
              {/* Step 1 */}
              <div className="flex items-start gap-6 relative">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white text-xl">
                  <FaTools />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">
                    {isArabic ? "الإنتاج" : "Production"}
                  </h4>
                  <p className="text-gray-600">
                    {isArabic
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
                    {isArabic ? "ضبط الجودة" : "Quality Control"}
                  </h4>
                  <p className="text-gray-600">
                    {isArabic
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
                    {isArabic ? "الامتثال والشهادات" : "Compliance & Certifications"}
                  </h4>
                  <p className="text-gray-600">
                    {isArabic
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
