"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { BRAND_NAMES } from "../../lib/Brands";
import { supabase } from "../../lib/supabaseClient";
import {
  Plus,
  Search,
  Package,
  Star,
  Ban,
  Pencil,
  Trash2,
  EyeOff,
} from "lucide-react";
import { toast } from "sonner";
import { useTranslation } from "react-i18next";

// ---- Types ----
type Product = {
  id: string; // client-generated UUID (or DB-generated if you prefer)
  brand: string; // brand name shown in UI
  name_en: string;
  name_ar: string;
  slug: string;
  tagline_en: string;
  tagline_ar: string;
  description_en: string;
  description_ar: string;
  category: string;
  usage_en: string;
  usage_ar: string;
  compliance: string[];
  image: string;
  brand_id: string | null;
  seo_title_en: string;
  seo_title_ar: string;
  seo_desc_en: string;
  seo_desc_ar: string;
  best_selling: boolean;
  featured: boolean;
  new_arrival: boolean;
  disabled: boolean;
};

const initialProduct = (): Product => ({
  id: "",
  brand: "",
  name_en: "",
  name_ar: "",
  slug: "",
  tagline_en: "",
  tagline_ar: "",
  description_en: "",
  description_ar: "",
  category: "",
  usage_en: "",
  usage_ar: "",
  compliance: [],
  image: "",
  brand_id: null,
  seo_title_en: "",
  seo_title_ar: "",
  seo_desc_en: "",
  seo_desc_ar: "",
  best_selling: false,
  featured: false,
  new_arrival: false,
  disabled: false,
});

export default function AdminProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedBrand, setSelectedBrand] = useState<string | "all">("all");
  const [showForm, setShowForm] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [search, setSearch] = useState("");
  const { t, i18n } = useTranslation();

  const stats = {
    total: products.length,
    best: products.filter((p) => p.best_selling).length,
    disabled: products.filter((p) => p.disabled).length,
  };

  const [product, setProduct] = useState<Product>(initialProduct());

  const isArabic = i18n.language === "ar";

  const getName = (p: Product) => (isArabic ? p.name_ar : p.name_en);
  const getDescription = (p: Product) => (isArabic ? p.description_ar : p.description_en);

  // ---- helpers ----
  const generateSlug = (value: string) =>
    value
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");

  const sanitizeUUID = (v?: string | null) => (v && v.trim() !== "" ? v : null);

  // ---- fetch products ----
  // helper to extract message from unknown errors
  const getErrorMessage = (err: unknown) => {
    if (typeof err === "string") return err;
    if (err instanceof Error) return err.message;
    try {
      return JSON.stringify(err) || String(err);
    } catch {
      return String(err);
    }
  };


  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const { data, error } = await supabase
          .from("products")
          .select("*")
          .order("created_at", { ascending: false });

        if (error) {
          console.error("fetch products error:", error);
          toast.error("Failed to load products: " + getErrorMessage(error));
          return;
        }

        // Normalize incoming data: ensure brand_id null instead of ""
        if (data) {
          // type the supabase response items as Product
          const normalized = (data as Product[]).map((d) => ({
            ...d,
            brand_id: sanitizeUUID(d.brand_id),
          })) as Product[];
          setProducts(normalized);
        }
      } catch (err: unknown) {
        console.error("fetch products failed:", err);
        toast.error("Failed to load products: " + getErrorMessage(err));
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);
  

  // ---- filtered products ----
  const filteredProducts = products.filter((p) => {
    const matchesBrand = selectedBrand === "all" || p.brand === selectedBrand;

    const s = search.trim().toLowerCase();
    const matchesSearch =
      !s ||
      p.name_en.toLowerCase().includes(s) ||
      p.name_ar.toLowerCase().includes(s) ||
      p.slug.toLowerCase().includes(s);

    return matchesBrand && matchesSearch;
  });

  // ---- toggle flags ----
  const toggleFlag = async (id: string, key: keyof Product) => {
    if (!id) {
      toast.error("Invalid product id");
      return;
    }

    const target = products.find((p) => p.id === id);
    if (!target) return;

    const newValue = !target[key];

    try {
      const { error } = await supabase.from("products").update({ [key]: newValue }).eq("id", id);
      if (error) throw error;

      setProducts((prev) => prev.map((p) => (p.id === id ? { ...p, [key]: newValue } : p)));
      toast.success("Updated");
    } catch (err: unknown) {
      console.error(err);
      toast.error(getErrorMessage(err) || "Update failed");
    }
  };

  // ---- delete ----
  const handleDelete = async (id: string) => {
    if (!id) {
      toast.error("Invalid product ID");
      return;
    }

    if (!confirm("Delete this product?")) return;

    try {
      const { error } = await supabase.from("products").delete().eq("id", id);
      if (error) throw error;
      setProducts((prev) => prev.filter((p) => p.id !== id));
      toast.success("Deleted");
    } catch (err: unknown) {
      console.error(err);
      toast.error(getErrorMessage(err) || "Delete failed");
    }
  };

  // ---- form handlers ----
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const target = e.target;
    const { name, value, type } = target;
    const checked = (target as HTMLInputElement).checked;

    // special case for brand select: set brand name and clear brand_id (unless you have mapping)
    if (name === "brand") {
      setProduct((prev) => ({ ...prev, brand: value, brand_id: null }));
      return;
    }

    setProduct((prev) => ({ ...prev, [name]: type === "checkbox" ? checked : value }));
  };

  const handleEdit = (p: Product) => {
    setProduct({ ...p, brand_id: sanitizeUUID(p.brand_id) });
    setIsEditing(true);
    setShowForm(true);
  };

  const handleImageUpload = async (file: File) => {
    try {
      const fileExt = file.name.split(".").pop();
      const fileName = `${crypto.randomUUID()}.${fileExt}`;
      const filePath = `images/${fileName}`;

      const { error: uploadError } = await supabase.storage.from("products").upload(filePath, file, {
        cacheControl: "3600",
        upsert: true,
      });

      if (uploadError) throw uploadError;

      // supabase storage getPublicUrl result typing varies; narrow to known shape
      type PublicUrlResult = { publicUrl?: string; public_url?: string } | null | undefined;
      const result = supabase.storage.from("products").getPublicUrl(filePath) as unknown as { data?: PublicUrlResult };
      const dataRes = result?.data;
      const publicUrl = dataRes?.publicUrl ?? dataRes?.public_url ?? null;

      if (!publicUrl) throw new Error("No URL returned from storage");
      return publicUrl as string;
    } catch (err: unknown) {
      console.error("Upload failed:", err);
      // rethrow so calling code can show toast if needed
      throw err;
    }
  };

  // ---- submit (insert/update) ----
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!product.name_en || !product.name_ar) {
      toast.error("Name is required");
      return;
    }

    // Generate id client-side so we can reference it immediately (and generate slug later)
    const idToUse = product.id && product.id.trim() !== "" ? product.id : crypto.randomUUID();

    // slug fallback (if empty, build from name_en or name_ar)
const slugValue =
  product.slug?.trim() ||
  generateSlug(product.name_en || product.name_ar);

if (!slugValue) {
  toast.error("Slug is required");
  return;
}

    const rawData: Product = {
      ...product,
      id: idToUse,
      slug: slugValue,
      brand_id: sanitizeUUID(product.brand_id),
    };

    // remove empty-string fields that must be null
    if (!rawData.brand_id) rawData.brand_id = null;

    try {
      if (isEditing && product.id) {
        const { error } = await supabase.from("products").update(rawData).eq("id", product.id);
        if (error) throw error;

        setProducts((prev) => prev.map((p) => (p.id === product.id ? rawData : p)));
        toast.success("Product updated");
      } else {
        const { error } = await supabase.from("products").insert([rawData]);
        if (error) throw error;

        setProducts((prev) => [rawData, ...prev]);
        toast.success("Product added");
      }

      setShowForm(false);
      setIsEditing(false);
      setProduct(initialProduct());
    } catch (err: unknown) {
      console.error(err);
      toast.error(getErrorMessage(err) || "Save failed");
    }
  };

  // ---- UI ----
  if (loading) return <div className="p-6">Loading products...</div>;

  return (
    <div className="p-6 space-y-6 mt-16" dir={i18n.language === "ar" ? "rtl" : "ltr"}>
      <h1 className="text-3xl font-bold">{t("products.title")}</h1>

      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="relative w-full md:w-1/3">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <input
            type="text"
            placeholder={t("products.search")}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10 pr-4 py-2 w-full border rounded-lg"
          />
        </div>

        <button
          dir={i18n.language === "ar" ? "ltr" : "rtl"}
          onClick={() => {
            setIsEditing(false);
            setProduct(initialProduct());
            setShowForm(true);
          }}
          className="flex items-center hover:cursor-pointer gap-2 bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800"
        >
          <Plus size={18} />
          {t("products.add")}
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow space-y-4">
          <input
            name="name_en"
            value={product.name_en}
            onChange={(e) => {
              const value = e.target.value;
              setProduct((prev) => ({ ...prev, name_en: value, slug: prev.slug || generateSlug(value) }));
            }}
            placeholder="Product name (EN)"
            className="border p-2 rounded w-full"
            required
          />

          <input
            name="name_ar"
            value={product.name_ar}
            onChange={handleChange}
            placeholder={t("admin-form.nameAr")}
            className="border p-2 rounded w-full"
            required
          />

          <textarea
            name="description_en"
            value={product.description_en}
            onChange={handleChange}
            placeholder={t("admin-form.descriptionEn")}
            className="border p-2 rounded w-full"
          />

          <textarea
            name="description_ar"
            value={product.description_ar}
            onChange={handleChange}
            placeholder={t("admin-form.descriptionAr")}
            className="border p-2 rounded w-full"
          />

          {/* Image Upload */}
          <div className="space-y-2">
            <input
              id="product-image-input"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={async (e) => {
                const file = e.target.files?.[0];
                if (!file) return;

                try {
                  setUploadingImage(true);
                  const url = await handleImageUpload(file);
                  setProduct((prev) => ({ ...prev, image: url }));
                } catch {
                  // intentionally ignore error detail here; toast below
                  toast.error("Image upload failed");
                } finally {
                  setUploadingImage(false);
                  (e.target as HTMLInputElement).value = "";
                }
              }}
            />

            <label htmlFor="product-image-input" className="inline-block px-4 py-2 bg-gray-200 rounded cursor-pointer">
              {uploadingImage ? t("admin-form.uploading") : t("admin-form.upload")}
            </label>

            {product.image && (
              <div className="h-32 w-32 relative">
                <Image src={product.image} alt="preview" fill className="object-cover rounded border" />
              </div>
            )}
          </div>

          {/* Brand */}
          <select name="brand" value={product.brand} onChange={handleChange} className="border p-2 rounded w-full">
            <option value="">{t("admin-form.selectBrand") || "Select Brand"}</option>
            {BRAND_NAMES.map((b) => (
              <option key={b} value={b}>
                {b}
              </option>
            ))}
          </select>

          <input name="seo_title_en" value={product.seo_title_en} onChange={handleChange} placeholder="SEO Title (EN)" className="border p-2 rounded w-full" />

          <input name="seo_title_ar" value={product.seo_title_ar} onChange={handleChange} placeholder="SEO Title (AR)" className="border p-2 rounded w-full" />

          <textarea name="seo_desc_en" value={product.seo_desc_en} onChange={handleChange} placeholder="SEO Description (EN)" className="border p-2 rounded w-full" />

          <textarea name="seo_desc_ar" value={product.seo_desc_ar} onChange={handleChange} placeholder="SEO Description (AR)" className="border p-2 rounded w-full" />

          {/* Flags */}
          <div className="flex flex-wrap gap-4">
            {(["best_selling", "featured", "new_arrival", "disabled"] as Array<keyof Product>).map((flag) => (
              <label key={flag} className="flex items-center gap-1">
                <input type="checkbox" name={flag} checked={product[flag] as boolean} onChange={handleChange} />
                {flag}
              </label>
            ))}
          </div>

          <div className="flex gap-2">
            <button type="submit" disabled={uploadingImage} className={`px-4 py-2 rounded hover:cursor-pointer text-white ${uploadingImage ? "bg-gray-400" : "bg-blue-600"}`}>
              {isEditing ? t("update") : t("add")}
            </button>

            <button type="button" onClick={() => { setShowForm(false); setProduct(initialProduct()); }} className="bg-gray-300 px-4 py-2 rounded hover:cursor-pointer">
              {t("cancel")}
            </button>
          </div>
        </form>
      )}

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white border rounded-xl p-4 flex items-center gap-4">
          <Package className="text-gray-600" />
          <div>
            <p className="text-sm text-gray-500">{t("stats.total")}</p>
            <p className="text-xl font-semibold">{stats.total}</p>
          </div>
        </div>

        <div className="bg-white border rounded-xl p-4 flex items-center gap-4">
          <Star className="text-yellow-500" />
          <div>
            <p className="text-sm text-gray-500">{t("stats.bestSelling")}</p>
            <p className="text-xl font-semibold">{stats.best}</p>
          </div>
        </div>

        <div className="bg-white border rounded-xl p-4 flex items-center gap-4">
          <Ban className="text-red-500" />
          <div>
            <p className="text-sm text-gray-500">{t("stats.disabled")}</p>
            <p className="text-xl font-semibold">{stats.disabled}</p>
          </div>
        </div>
      </div>

      {/* Brand Filter */}
      <div className="flex gap-2 flex-wrap">
        <button onClick={() => setSelectedBrand("all")} className={`px-4 py-1 rounded hover:cursor-pointer ${selectedBrand === "all" ? "bg-blue-600 text-white" : "bg-gray-200"}`}>
          All
        </button>

        {BRAND_NAMES.map((brand) => (
          <button key={brand} onClick={() => setSelectedBrand(brand)} className={`px-4 py-1 rounded hover:cursor-pointer ${selectedBrand === brand ? "bg-blue-600 text-white" : "bg-gray-200"}`}>
            {brand}
          </button>
        ))}
      </div>

      {/* Products Grid */}
      <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredProducts.map((p) => (
          <div key={p.id} className="bg-white rounded-xl shadow p-4">
            <div className="bg-white rounded-xl overflow-hidden group">
              <div className="relative h-48">
                <Image src={p.image || "/placeholder.png"} alt={getName(p)} fill className="object-cover" />
                <img src={p.image || "/placeholder.png"} alt={getName(p)} className="w-full h-full object-cover" />

                {p.disabled && (
                  <div className="absolute inset-0 bg-white/70 flex items-center justify-center text-sm font-medium">Disabled</div>
                )}
              </div>

              <div className="p-4  flex justify-between gap-4">
                <div>
                  <h2 className="font-medium">{getName(p)}</h2>
                  <p className="text-xs text-gray-500 line-clamp-2">{getDescription(p)}</p>

                  <p className="text-xs text-gray-500">{p.brand}</p>
                </div>

                <div className="flex gap-2 flex-wrap text-xs">
                  {p.best_selling && <span className="px-2 py-1 bg-gray-100 rounded">Best</span>}
                  {p.featured && <span className="px-2 py-1 bg-gray-100 rounded">Featured</span>}
                  {p.new_arrival && <span className="px-2 py-1 bg-gray-100 rounded">New</span>}
                </div>

                <div className="flex justify-end gap-2 pt-2">
                  <button title={t("actions.edit")} onClick={() => handleEdit(p)} className="p-2 rounded hover:bg-gray-100 hover:cursor-pointer">
                    <Pencil size={16} />
                  </button>

                  <button title={t("actions.disable")} onClick={() => toggleFlag(p.id, "disabled")} className="p-2 rounded hover:bg-gray-100 hover:cursor-pointer">
                    <EyeOff size={16} />
                  </button>

                  <button title={t("actions.delete")} onClick={() => handleDelete(p.id)} className="p-2 rounded hover:bg-red-50 text-red-600 hover:cursor-pointer">
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
