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

  return (
    <main>
      {/* ================= HERO / SERVICES ================= */}
      <section className="py-32 bg-gradient-to-br from-[#032e6a] via-[#0046b0] to-[#00265a] text-white">
        <div className="max-w-7xl mx-auto px-6">
          <h1 className="text-6xl font-bold mb-6 max-[468px]:text-5xl ">{t("services.title")}</h1>
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
      
    </main>
  );
}
