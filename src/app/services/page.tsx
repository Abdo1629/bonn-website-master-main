"use client";

import { useEffect, useState, useMemo } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useTranslation } from "react-i18next";
import { supabase } from "../lib/supabaseClient";
import {
  Brain,
  FlaskConical,
  PackageCheck,
  Palette,
  Factory,
  FileCheck2,
  Heart,
} from "lucide-react";

/* ================= TYPES ================= */
type Product = {
  id: string;
  slug: string | null;
  name_en: string;
  name_ar: string;
  description_en: string;
  description_ar: string;
  image: string | null;
  brand: string | null;
  best_selling: boolean;
  likes: number | null;
  disabled: boolean | null;
};

/* ================= BRAND UI (LOCAL) ================= */
const BRAND_UI: Record<string, { color: string; logo?: string }> = {
  "Covix Care": {
    color: "#2563EB",
    logo: "/images/covix.png",
  },
  "Le Visage Plus": {
    color: "#E11D48",
    logo: "/images/Visage.png",
  },
};

/* ================= SERVICES ================= */
const services = [
  { key: "ideation", icon: Brain },
  { key: "formulation", icon: FlaskConical },
  { key: "ready", icon: PackageCheck },
  { key: "packaging", icon: Palette },
  { key: "production", icon: Factory },
  { key: "registration", icon: FileCheck2 },
];

export default function ServicesAndProducts() {
  const { t, i18n } = useTranslation();
  const isArabic = i18n.language === "ar";

  const [products, setProducts] = useState<Product[]>([]);
  const [liked, setLiked] = useState<Record<string, boolean>>({});
  const [loading, setLoading] = useState(true);

  /* ================= FETCH ================= */
  useEffect(() => {
    const load = async () => {
      const { data, error } = await supabase
      .from("products")
      .select("*")
        .or("disabled.is.null,disabled.eq.false");

      if (error) {
        console.error(error);
        return;
      }

      setProducts(data || []);
      setLoading(false);
    };

    load();
  }, []);

  /* ================= GROUP + SORT ================= */
  const grouped = useMemo(() => {
    const map: Record<string, Product[]> = {};

    products.forEach((p) => {
      const key = p.brand?.trim() || "Other";
      if (!map[key]) map[key] = [];
      map[key].push(p);
    });

    Object.values(map).forEach((list) =>
      list.sort((a, b) => {
        if (a.best_selling && !b.best_selling) return -1;
        if (!a.best_selling && b.best_selling) return 1;
        return (b.likes || 0) - (a.likes || 0);
      })
    );

    return map;
  }, [products]);

  /* ================= LIKE TOGGLE ================= */
  const toggleLike = async (p: Product) => {
    const isLiked = liked[p.id];
    const newLikes = (p.likes || 0) + (isLiked ? -1 : 1);

    setLiked((prev) => ({ ...prev, [p.id]: !isLiked }));
    setProducts((prev) =>
      prev.map((x) => (x.id === p.id ? { ...x, likes: newLikes } : x))
    );

    await supabase.from("products").update({ likes: newLikes }).eq("id", p.id);
  };

  if (loading) return <p className="text-center py-20">Loading…</p>;

  return (
    <main>
      {/* ================= HERO / SERVICES ================= */}
      <section className="py-32 bg-gradient-to-br from-[#0B1C39] to-[#050B18] text-white">
        <div className="max-w-7xl mx-auto px-6">
          <h1 className="text-6xl font-bold mb-6">{t("services.title")}</h1>
          <p className="text-white/70 max-w-2xl mb-20">
            {t("services.subtitle")}
          </p>

          <div className="grid md:grid-cols-3 gap-10">
            {services.map(({ key, icon: Icon }) => (
              <motion.div
                key={key}
                whileHover={{ y: -8 }}
                className="rounded-3xl p-10 bg-white/5 border border-white/10 backdrop-blur"
              >
                <Icon className="w-12 h-12 mb-6 text-white" />
                <h3 className="text-xl font-semibold mb-2">
                  {t(`services.${key}.title`)}
                </h3>
                <p className="text-sm text-white/70">
                  {t(`services.${key}.desc`)}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= PRODUCTS ================= */}
      <section className="py-32 bg-[#F8FAFF]">
        <div className="max-w-7xl mx-auto px-6 space-y-32">
          {Object.entries(grouped).map(([brandName, items]) => {
            const brandUI = BRAND_UI[brandName];
            const color = brandUI?.color || "#0056D2";

            return (
              <div key={brandName} className="space-y-8 w-7xl">
                {/* BRAND HEADER */}
                <div className="flex items-center gap-4 mb-12">
                  {brandUI?.logo && (
                    <Image
                      src={brandUI.logo}
                      alt={brandName}
                      width={52}
                      height={52}
                    />
                  )}
                  <h2 className="text-4xl font-bold" style={{ color }}>
                    {brandName}
                  </h2>
                </div>

                {/* PRODUCTS */}
                <div
                  dir={isArabic ? "rtl" : "ltr"}
                  className="flex gap-8 overflow-x-auto pb-6"
                >
                  {items.map((p) => {
                    return (
                      <motion.div
                        key={p.id}
                        whileHover={{ y: -10 }}
                        className="w-[280px] bg-white rounded-3xl shadow-xl overflow-hidden"
                      >
                        <Link href={`/products/${p.slug}`} className="block">
                          <Image
                            src={p.image || "/placeholder.png"}
                            alt={isArabic ? p.name_ar : p.name_en}
                            width={400}
                            height={260}
                            className="h-52 w-full object-cover"
                          />

                          <div className="p-6 space-y-3">
                            <h3
                              className="font-semibold text-lg"
                              style={{ color }}
                            >
                              {isArabic ? p.name_ar : p.name_en}
                            </h3>

                            <p className="text-sm text-gray-600 line-clamp-2">
                              {isArabic
                                ? p.description_ar
                                : p.description_en}
                            </p>

                            <div className="flex items-center justify-between pt-4">
                              {p.best_selling && (
                                <span className="text-xs px-2 py-1 rounded bg-red-600 text-white">
                                  Best Seller
                                </span>
                              )}

                              <button
                                onClick={(e) => {
                                  e.preventDefault();
                                  toggleLike(p);
                                }}
                                className={`flex items-center gap-1 transition ${
                                  liked[p.id]
                                    ? "text-red-600"
                                    : "text-gray-400"
                                }`}
                              >
                                <Heart
                                  size={20}
                                  className={
                                    liked[p.id] ? "fill-current" : ""
                                  }
                                />
                                <span className="text-xs">
                                  {p.likes || 0}
                                </span>
                              </button>
                            </div>
                          </div>
                        </Link>
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </main>
  );
}
