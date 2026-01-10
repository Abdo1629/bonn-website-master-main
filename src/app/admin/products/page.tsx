"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { BRAND_NAMES, BrandKey } from "../../lib/Brands";
import { supabase } from "../../lib/supabaseClient";
import {
  Plus,
  Search,
  Package,
  Star,
  Ban,
  CheckCircle,
  Pencil,
  Trash2,
  EyeOff
} from "lucide-react";
import { toast } from "sonner";
import { useTranslation } from "react-i18next";



type Product = {
  id: string;
  name_en: string;
  name_ar: string;
  description_en: string;
  description_ar: string;
  image: string;
  brand: BrandKey;
  bestSelling?: boolean;
  featured?: boolean;
  newArrival?: boolean;
  inStock?: boolean;
  disabled?: boolean;
};

export default function AdminProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedBrand, setSelectedBrand] = useState<BrandKey | "all">("all");
  const [showForm, setShowForm] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [search, setSearch] = useState("");
  const { t, i18n } = useTranslation();
  const stats = {
  total: products.length,
  best: products.filter(p => p.bestSelling).length,
  disabled: products.filter(p => p.disabled).length,
  inStock: products.filter(p => p.inStock).length,
};
  const [product, setProduct] = useState<Product>({
    id: "",
    name_en: "",
    name_ar: "",
    description_en: "",
    description_ar: "",
    image: "",
    brand: BRAND_NAMES[0],
    bestSelling: false,
    featured: false,
    newArrival: false,
    inStock: false,
    disabled: false,
  });

  const isArabic = i18n.language === "ar";

const getName = (p: Product) =>
  isArabic ? p.name_ar : p.name_en;

const getDescription = (p: Product) =>
  isArabic ? p.description_ar : p.description_en;


  // 🔹 Fetch products
  useEffect(() => {
    const fetchProducts = async () => {
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) console.error(error);
      else setProducts(data || []);

      setLoading(false);
    };
    fetchProducts();
  }, []);

  // 🔹 Filter by brand
  const filteredProducts = products.filter((p) => {
  const matchesBrand =
    selectedBrand === "all" || p.brand === selectedBrand;

  const matchesSearch =
    p.name_en.toLowerCase().includes(search.toLowerCase()) ||
    p.name_ar.toLowerCase().includes(search.toLowerCase());

  return matchesBrand && matchesSearch;
});


  // 🔹 Toggle flags
  const toggleFlag = async (id: string, key: keyof Product) => {
    const target = products.find((p) => p.id === id);
    if (!target) return;

    const newValue = !target[key];
    const { error } = await supabase
      .from("products")
      .update({ [key]: newValue })
      .eq("id", id);

    if (error) alert(error.message);
    else
      setProducts((prev) =>
        prev.map((p) => (p.id === id ? { ...p, [key]: newValue } : p))
      );
  };

  // 🔹 Delete
  const handleDelete = async (id: string) => {
    if (!confirm("Delete this product?")) return;

    const { error } = await supabase.from("products").delete().eq("id", id);

    if (error) toast.error("Failed to delete: " + error.message);
    else setProducts((prev) => prev.filter((p) => p.id !== id));
  };

  // 🔹 Handle form changes
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const target = e.target;
    const { name, value, type } = target;
    const checked = (target as HTMLInputElement).checked;

    setProduct((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // 🔹 Submit form
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const { id, ...productData } = product;
    let error;

    if (isEditing) {
      const { error: updateError } = await supabase
        .from("products")
        .update(productData)
        .eq("id", id);
      error = updateError;
    } else {
      const { error: insertError } = await supabase
        .from("products")
        .insert([productData]);
      error = insertError;
    }

    if (error) toast.error(t("toast.deleteError") + error.message);
    else {
      toast.success(isEditing ? t("toast.updated") : t("toast.added"));
      setShowForm(false);
      window.location.reload();
    }
  };

  const handleEdit = (p: Product) => {
    setProduct(p);
    setIsEditing(true);
    setShowForm(true);
  };

const handleImageUpload = async (file: File) => {
  try {
    const fileExt = file.name.split(".").pop();
    const fileName = `${crypto.randomUUID()}.${fileExt}`;
    const filePath = `images/${fileName}`;
    const { error: uploadError } = await supabase.storage
      .from("products")
      .upload(filePath, file, { cacheControl: "3600", upsert: true }); // upsert true

    if (uploadError) throw uploadError;
    const { data: urlData } = supabase.storage
      .from("products")
      .getPublicUrl(filePath);

    if (!urlData?.publicUrl) throw new Error("No URL returned");

    return urlData.publicUrl;
  } catch (err: unknown) {
    const error = err instanceof Error ? err : new Error(String(err));
    console.error("Upload failed:", error.message);
    throw error;
  }
};


  if (loading) return <div className="p-6">Loading products...</div>;

  return (
<div
  className="p-6 space-y-6 mt-16"
  dir={i18n.language === "ar" ? "rtl" : "ltr"}
>
<h1 className="text-3xl font-bold">
  {t("products.title")}
</h1>
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

{/* ===== Add Product Button ===== */}
  <button
    dir={i18n.language === "ar" ? "ltr" : "rtl"}
    onClick={() => {
      setIsEditing(false);
      setShowForm(true);
    }}
    className="flex items-center hover:cursor-pointer gap-2 bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800"
  >
    <Plus size={18} />
    {t("products.add")}
  </button>
</div>
{/* ===== Form ===== */}
      {showForm && (
        <form
          onSubmit={handleSubmit}
          className="bg-white p-6 rounded shadow space-y-4"
        >
          <input
            name="name_en"
            value={product.name_en}
            onChange={handleChange}
            placeholder={t("admin-form.nameEn")}
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
                  alert("Image upload failed");
                } finally {
                  setUploadingImage(false);
                  e.target.value = "";
                }
              }}
            />
            <label
              htmlFor="product-image-input"
              className="inline-block px-4 py-2 bg-gray-200 rounded cursor-pointer"
            >
              {uploadingImage ? t("admin-form.uploading") : t("admin-form.upload")}
            </label>

            {product.image && (
              <img
                src={product.image}
                alt="preview"
                className="h-32 w-32 object-cover rounded border"
              />
            )}
          </div>

          {/* Brand */}
          <select
            name="brand"
            value={product.brand}
            onChange={handleChange}
            className="border p-2 rounded w-full"
          >
            {BRAND_NAMES.map((b) => (
              <option key={b} value={b}>
                {b}
              </option>
            ))}
          </select>

          {/* Flags */}
          <div className="flex flex-wrap gap-4">
            {["bestSelling", "featured", "newArrival", "inStock", "disabled"].map(
              (flag) => (
                <label key={flag} className="flex items-center gap-1">
                  <input
                    type="checkbox"
                    name={flag}
                    checked={product[flag as keyof Product] as boolean}
                    onChange={handleChange}
                  />
                  {flag}
                </label>
              )
            )}
          </div>

          {/* Form Actions */}
          <div className="flex gap-2">
            <button
              type="submit"
              disabled={uploadingImage}
              className={`px-4 py-2 rounded hover:cursor-pointer text-white ${
                uploadingImage ? "bg-gray-400" : "bg-blue-600"
              }`}
            >
              {isEditing ? t("update") : t("add")}
            </button>
            <button
              type="button"
              onClick={() => setShowForm(false)}
              className="bg-gray-300 px-4 py-2 rounded hover:cursor-pointer"
            >
              {t("cancel")}
            </button>
          </div>
        </form>
      )}

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

  <div className="bg-white border rounded-xl p-4 flex items-center gap-4">
    <CheckCircle className="text-green-600" />
    <div>
      <p className="text-sm text-gray-500">{t("stats.inStock")}</p>
      <p className="text-xl font-semibold">{stats.inStock}</p>
    </div>
  </div>
</div>

      {/* ===== Brand Filter ===== */}
      <div className="flex gap-2 flex-wrap">
        <button
          onClick={() => setSelectedBrand("all")}
          className={`px-4 py-1 rounded hover:cursor-pointer ${
            selectedBrand === "all" ? "bg-blue-600 text-white" : "bg-gray-200"
          }`}
        >
          All
        </button>

        {BRAND_NAMES.map((brand) => (
          <button
            key={brand}
            onClick={() => setSelectedBrand(brand)}
            className={`px-4 py-1 rounded hover:cursor-pointer ${
              selectedBrand === brand ? "bg-blue-600 text-white" : "bg-gray-200"
            }`}
          >
            {brand}
          </button>
        ))}
      </div>

      {/* ===== Products Grid ===== */}
      <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredProducts.map((p) => (
          <div
            key={p.id}
            className="bg-white rounded-xl shadow p-4"
          >
            <div className="bg-white rounded-xl overflow-hidden group">
  <div className="relative h-48">
    <Image
      src={p.image || "/placeholder.png"}
      alt={getName(p)}
      fill
      className="object-cover"
    />

    {p.disabled && (
      <div className="absolute inset-0 bg-white/70 flex items-center justify-center text-sm font-medium">
        Disabled
      </div>
    )}
  </div>

  <div className="p-4  flex justify-between gap-4">
    <div>
        <h2 className="font-medium">
  {getName(p)}
</h2>
<p className="text-xs text-gray-500 line-clamp-2">
  {getDescription(p)}
</p>


      <p className="text-xs text-gray-500">{p.brand}</p>
    </div>

    {/* Tags */}
    <div className="flex gap-2 flex-wrap text-xs">
      {p.bestSelling && <span className="px-2 py-1 bg-gray-100 rounded">Best</span>}
      {p.featured && <span className="px-2 py-1 bg-gray-100 rounded">Featured</span>}
      {p.newArrival && <span className="px-2 py-1 bg-gray-100 rounded">New</span>}
      {p.inStock && <span className="px-2 py-1 bg-gray-100 rounded">In Stock</span>}
    </div>

    {/* Actions */}
    <div className="flex justify-end gap-2 pt-2">
      <button
        title={t("actions.edit")}
        onClick={() => handleEdit(p)}
        className="p-2 rounded hover:bg-gray-100 hover:cursor-pointer"
      >
        <Pencil size={16} />
      </button>

      <button
        title={t("actions.disable")}
        onClick={() => toggleFlag(p.id, "disabled")}
        className="p-2 rounded hover:bg-gray-100 hover:cursor-pointer"
      >
        <EyeOff size={16} />
      </button>

      <button
        title={t("actions.delete")}
        onClick={() => handleDelete(p.id)}
        className="p-2 rounded hover:bg-red-50 text-red-600 hover:cursor-pointer"
      >
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
