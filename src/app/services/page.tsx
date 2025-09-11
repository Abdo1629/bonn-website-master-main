"use client";

import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import Link from "next/link";
import i18n from "../../i18n";
import { db } from "../lib/firebaseConfig";
import { collection, getDocs } from "firebase/firestore";
import { FaStethoscope, FaCapsules, FaTruck, FaHeadset } from "react-icons/fa";
import { brandsInfo, BrandKey } from "../lib/Brands";
import { updateDoc, doc, increment } from "firebase/firestore";
import { FaRegHeart, FaHeart } from "react-icons/fa";

export default function ServicesPage() {
  const { t } = useTranslation();
  const isArabic = i18n.language === "ar";

  interface Product {
    id: string;
    name_en: string;
    name_ar: string;
    description_en: string;
    description_ar: string;
    price: number | string;
    image: string;
    bestSelling?: boolean;
    likes?: number;
    slug: string;
    brand?: string;
  }

  const [likedProducts, setLikedProducts] = useState<Record<string, boolean>>({});
  const [productsData, setProductsData] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const toggleLike = async (productId: string, alreadyLiked: boolean) => {
    try {
      const productRef = doc(db, "products", String(productId));

      await updateDoc(productRef, {
        likes: increment(alreadyLiked ? -1 : 1),
      });

      setLikedProducts((prev) => ({
        ...prev,
        [productId]: !alreadyLiked,
      }));

      setProductsData((prev) =>
        prev.map((p) =>
          p.id === productId
            ? {
                ...p,
                likes: (Number(p.likes) || 0) + (alreadyLiked ? -1 : 1),
              }
            : p
        )
      );
    } catch (err) {
      console.error("Error updating likes:", err);
    }
  };

  // 🟢 fetch products
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const productsCol = collection(db, "products");
        const snapshot = await getDocs(productsCol);
        const products = snapshot.docs.map((doc) => {
          const data = doc.data();
          return {
            id: doc.id,
            likes: data.likes ?? 0, // ✅ default likes = 0
            ...data,
          };
        }) as Product[];
        setProductsData(products);
      } catch (err) {
        console.error("Firestore fetch error:", err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // 🟢 group by brand
  const groupedProducts = productsData.reduce((acc, product) => {
    const brandKey = product.brand?.trim() || "Other";
    if (!acc[brandKey]) acc[brandKey] = [];
    acc[brandKey].push(product);
    return acc;
  }, {} as Record<string, Product[]>);

  const steps = [
    { step: 1, title: t("Breif"), desc: t("Breif_desc") },
    { step: 2, title: t("R&D"), desc: t("R&D_desc") },
    { step: 3, title: t("Sampling"), desc: t("Sampling_desc") },
    { step: 4, title: t("Validation"), desc: t("Validation_desc") },
    { step: 5, title: t("Production"), desc: t("Production_desc") },
    { step: 6, title: t("Delivery"), desc: t("Delivery_desc") },
  ];

  return (
    <div className="w-full">

      {/* 2. Main Services */}
      <section className="py-20 px-6 md:px-12 bg-[#F4F8FF]">
        <h2 className="text-4xl mt-5 font-bold text-[#0056D2] mb-14 text-center">
          {t("services") || "الخدمات الأساسية"}
        </h2>
        <div className="grid gap-10 grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
          {[
            { Icon: FaStethoscope, title: t("medical_consultiton"), desc: "نوفر استشارات طبية متخصصة على أعلى مستوى من الجودة." },
            { Icon: FaCapsules, title: "توزيع أدوية", desc: "توزيع أدوية ومنتجات طبية معتمدة." },
            { Icon: FaTruck, title: "خدمات لوجستية", desc: "نقدم خدمات لوجستية لضمان سرعة التوصيل." },
            { Icon: FaHeadset, title: "دعم فني", desc: "خدمة عملاء متاحة على مدار الساعة." },
          ].map((s, idx) => (
            <div
              key={idx}
              className="relative group bg-white shadow-lg rounded-xl p-8 text-center hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 border border-transparent hover:border-[#0056D2]/40"
            >
              <s.Icon className="text-[#0056D2] text-5xl mb-4 mx-auto group-hover:scale-110 transition-transform duration-300" />
              <h3 className="font-bold mb-2 text-lg">{s.title}</h3>
              <p className="text-gray-600 text-sm">{s.desc}</p>
              {/* underline animation */}
              <span className="absolute bottom-0 left-1/2 w-0 h-1 bg-[#0056D2] group-hover:w-full group-hover:left-0 transition-all duration-300"></span>
            </div>
          ))}
        </div>
      </section>

      {/* 3. How We Work */}
      <section className="py-20 px-6 md:px-12 bg-white">
        <h2 className="text-4xl font-bold text-[#0056D2] mb-16 text-center">
          {t("how_we_work") || "كيف نعمل"}
        </h2>

        <div className="relative">
          {/* الخط الأساسي */}
          <div className="absolute left-1/2 top-0 h-full w-1 bg-[#E0E7FF] -translate-x-1/2 z-0 hidden md:block"></div>

          <div className="flex flex-col gap-16">
            {steps.map((item, idx) => (
              <div
                key={item.step}
                className="relative flex flex-col md:flex-row items-center w-full animate-fade-up"
              >
                {/* الدائرة */}
                <div className="relative flex items-center justify-center w-14 h-14 rounded-full bg-[#0056D2] text-white font-bold shadow-md z-10 mb-4 md:mb-0 md:absolute md:left-1/2 md:transform md:-translate-x-1/2">
                  {item.step}
                  <span className="absolute w-full h-full rounded-full animate-[pulse-ring_2s_infinite]"></span>
                </div>

                {/* الكارد */}
                <div
                  className={`bg-white border border-[#E0E7FF] shadow rounded-xl p-6 w-full md:w-[45%] ${
                    idx % 2 === 0
                      ? "md:text-right md:pr-10 md:ml-auto"
                      : "md:text-left md:pl-10 md:mr-auto"
                  }`}
                >
                  <h3 className="text-lg font-semibold text-[#003D99] mb-2">{item.title}</h3>
                  <p className="text-sm text-gray-600">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Products Section */}
      <section className="py-20 px-4 md:px-12 bg-[#F4F8FF] w-full">
        <h2 className="text-2xl font-bold text-[#0056D2] mb-12 text-center">
          {t("all_products_title") || "منتجاتنا"}
        </h2>

        {loading ? (
          <div className="text-center py-10 text-[#003D99]">{t("loading")}...</div>
        ) : error ? (
          <div className="text-center py-10 text-red-600 font-semibold">
            {t("error_loading_products") || "حدث خطأ أثناء تحميل المنتجات."}
          </div>
        ) : (
          Object.keys(groupedProducts).map((brandKey) => {
            const brandProducts = groupedProducts[brandKey];
            const key = brandKey as BrandKey;

            const brandInfo = brandsInfo[key] || {
              logo: "/brands/default.png",
              name: brandKey,
            };

            return (
              <div key={brandKey} className="mb-16">
                {/* عنوان البراند + اللوجو */}
                <div className="flex items-center gap-4 mb-6">
                  <img
                    src={brandInfo.logo}
                    alt={brandInfo.name}
                    className="w-14 h-14 object-contain"
                  />
                  <h3 className="text-xl font-bold text-[#003D99]">{brandInfo.name}</h3>
                </div>

                {/* المنتجات */}
                <div
                  dir={isArabic ? "rtl" : "ltr"}
                  className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
                >
                  {brandProducts.map((product) => (
                    <Link href={`/products/${product.slug}`} key={product.id}>
                      <div className="relative bg-white border border-[#E0E7FF] rounded-xl p-4 shadow hover:shadow-lg hover:scale-[1.02] transition cursor-pointer h-full">
                        {product.bestSelling && (
                          <span className="absolute top-2 left-2 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded-full shadow">
                            {t("best_seller")}
                          </span>
                        )}
                        <img
                          src={product.image}
                          alt={product.name_ar || product.name_en}
                          className="w-full h-40 object-cover rounded-lg mb-4 shadow-sm"
                        />
                        <h3 className="text-base font-semibold text-[#0056D2] mb-1 truncate">
                          {isArabic ? product.name_ar : product.name_en}
                        </h3>
                        <p className="text-xs text-gray-600 mb-2 line-clamp-2">
                          {isArabic ? product.description_ar : product.description_en}
                        </p>
                        <button
                          onClick={(e) => {
                            e.preventDefault(); // عشان ما يفتحش لينك المنتج
                            toggleLike(product.id, likedProducts[product.id] || false);
                          }}
                          className="flex items-center gap-2 text-sm text-red-600 hover:scale-110 transition"
                        >
                          {likedProducts[product.id] ? (
                            <FaHeart className="text-red-600" />
                          ) : (
                            <FaRegHeart className="text-red-600" />
                          )}
                          <span>{product.likes || 0}</span>
                        </button>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            );
          })
        )}
      </section>
    </div>
  );
}
