"use client";

import { useEffect, useState } from "react";
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
  image: string;
  brand: string;
  bestSelling?: boolean;
  likes?: number;
  disabled?: boolean;
};

type Brand = {
  name: string;
  color: string;
  logo?: string;
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
  const [brands, setBrands] = useState<Record<string, Brand>>({});
  const [loading, setLoading] = useState(true);

  /* ===== Fetch everything ===== */
  useEffect(() => {
    const load = async () => {
      const [{ data: productsData }, { data: brandsData }] = await Promise.all([
        supabase.from("products").select("*").eq("disabled", false),
        supabase.from("brands").select("*"),
      ]);

      setProducts(productsData || []);

      const brandMap: Record<string, Brand> = {};
      (brandsData || []).forEach((b) => {
        brandMap[b.name] = b;
      });
      setBrands(brandMap);

      setLoading(false);
    };

    load();
  }, []);

  /* ===== Group + Sort ===== */
  const grouped = products.reduce((acc, p) => {
    if (!acc[p.brand]) acc[p.brand] = [];
    acc[p.brand].push(p);
    return acc;
  }, {} as Record<string, Product[]>);

  Object.values(grouped).forEach((list) =>
    list.sort((a, b) => {
      if (a.bestSelling && !b.bestSelling) return -1;
      if (!a.bestSelling && b.bestSelling) return 1;
      return (b.likes || 0) - (a.likes || 0);
    })
  );

  /* ===== Like handler ===== */
  const toggleLike = async (p: Product) => {
    const newLikes = (p.likes || 0) + 1;

    await supabase
      .from("products")
      .update({ likes: newLikes })
      .eq("id", p.id);

    setProducts((prev) =>
      prev.map((x) => (x.id === p.id ? { ...x, likes: newLikes } : x))
    );
  };

  if (loading) {
    return <p className="text-center py-20">Loading…</p>;
  }

  return (
    <main>
      {/* ================= HERO / SERVICES ================= */}
<section className="py-32 bg-gradient-to-br from-[#0B1C39] to-[#050B18] text-white">
<div className="max-w-7xl mx-auto px-6">
<h1 className="text-6xl font-bold tracking-tight mb-6">
{t("services.title")}
</h1>
<p className="text-white/70 max-w-2xl mb-20">
{t("services.subtitle")}
</p>


<div className="grid md:grid-cols-3 gap-10">
{services.map(({ key, icon: Icon }) => (
<motion.div
key={key}
whileHover={{ y: -6 }}
className="rounded-3xl p-10 bg-white/5 backdrop-blur border border-white/10"
>
<Icon className="w-12 h-12 mb-6" />
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
