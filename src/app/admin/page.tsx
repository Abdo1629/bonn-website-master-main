"use client";

import { useEffect, useState } from "react";
import { collection, getDocs, deleteDoc, doc, updateDoc } from "firebase/firestore";
import { db } from "../lib/firebaseConfig";
import { useTranslation } from "react-i18next";
import { brandsInfo, BRAND_NAMES, BrandKey } from "../lib/Brands";
import { generateClientPDF } from "../lib/pdf";
import Image from "next/image";

type Product = {
  id: string;
  name_en: string;
  name_ar: string;
  price: string;
  description_en: string;
  description_ar: string;
  image: string;
  brand?: BrandKey;
  outlets?: string[];
  bestSelling?: boolean;
  featured?: boolean;
  newArrival?: boolean;
  inStock?: boolean;
  disabled?: boolean;
  slug?: string;
};

function generateSlug(text: string) {
  return text
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^\w\-]+/g, "")
    .replace(/\-\-+/g, "-")
    .replace(/^-+/, "")
    .replace(/-+$/, "");
}

export default function AdminPage() {
  const { t } = useTranslation();
  const [products, setProducts] = useState<Product[]>([]);
  const [product, setProduct] = useState<Product>({
    id: "",
    name_en: "",
    name_ar: "",
    price: "",
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

  const [showForm, setShowForm] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [outlets, setOutlets] = useState<string[]>([]);
  const [pdfs, setPdfs] = useState<{ name: string; url: string }[]>([]);

  useEffect(() => {
    const createPDFs = async () => {
      const tempPdfs: { name: string; url: string }[] = [];
      const res = await fetch("/api/getClients");
      const clients = await res.json();

      for (const client of clients) {
        const pdfBytes = await generateClientPDF(client); // Uint8Array
        const blob = new Blob([new Uint8Array(pdfBytes)], { type: "application/pdf" });
        const url = URL.createObjectURL(blob);
        tempPdfs.push({ name: client.contactPerson || client.companyName, url });
      }

      setPdfs(tempPdfs);
    };

    createPDFs();
  }, []);

  // جلب المنتجات من Firestore
  useEffect(() => {
    const fetchProducts = async () => {
      const productsCol = collection(db, "products");
      const snapshot = await getDocs(productsCol);
      const productsData = snapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      })) as Product[];
      setProducts(productsData);
    };
    fetchProducts();
  }, []);

  // ضبط الـ outlets حسب المنتج الحالي
  useEffect(() => {
    setOutlets(product.outlets ?? [""]);
  }, [product]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const target = e.target;
    const { name, value, type } = target;
    let newValue: string | boolean = value;
    if (type === "checkbox" && target instanceof HTMLInputElement) {
      newValue = target.checked;
    }
    setProduct((prev) => ({
      ...prev,
      [name]: newValue,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const brandKey = product.brand as BrandKey;
    const brandInfo = brandsInfo[brandKey] ?? {
      logo: "/brands/default.png",
      name: product.brand || "",
    };
    const slug = generateSlug(product.name_en || `product-${Date.now()}`);
    const finalProduct = { ...product, outlets, slug, brand: brandInfo.name };

    const res = await fetch(
      isEditing ? `/api/products/edit/${product.id}` : "/api/products/add",
      {
        method: isEditing ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(finalProduct),
      }
    );
    const data = await res.json();
    alert(data.message || (isEditing ? t("updated") : t("added")));
    window.location.reload();
  };

  const handleEdit = (prod: Product) => {
    setProduct(prod);
    setShowForm(true);
    setIsEditing(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm(t("confirmDelete"))) return;
    await deleteDoc(doc(db, "products", id));
    alert(t("deleted"));
    setProducts(products.filter((p) => p.id !== id));
  };

  const toggleStatus = async (id: string, key: keyof Product) => {
    const productRef = doc(db, "products", id);
    const targetProduct = products.find((p) => p.id === id);
    if (!targetProduct) return;
    const updatedValue = !targetProduct[key];
    await updateDoc(productRef, { [key]: updatedValue });
    setProducts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, [key]: updatedValue } : p))
    );
  };

  const sortedProducts = [...products].sort((a, b) => {
    if (a.bestSelling && !b.bestSelling) return -1;
    if (!a.bestSelling && b.bestSelling) return 1;
    if (a.featured && !b.featured) return -1;
    if (!a.featured && b.featured) return 1;
    return 0;
  });

  return (
    <div className="max-w-5xl mt-12 mx-auto px-4 py-10">
      {/* ======= إدارة المنتجات ======= */}
      {!showForm ? (
        <div className="grid gap-4">
          <button
            onClick={() => {
              setProduct({
                id: "",
                name_en: "",
                name_ar: "",
                price: "",
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
              setShowForm(true);
              setIsEditing(false);
            }}
            className="mb-6 bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700"
            aria-label="Add New Product"
          >
            + {t("addNew")}
          </button>

          {sortedProducts.map((p) => (
<div
  key={p.id}
  className="border rounded-xl p-6 shadow-lg bg-white hover:shadow-2xl transition-shadow duration-300 flex justify-between items-center"
>
  {/* صورة المنتج */}
  <div className="flex items-center gap-4">
    <Image
      src={p.image || "/placeholder.png"}
      alt={p.name_en}
      className="w-16 h-16 object-cover rounded-lg border"
    />
    <div>
      <h2 className="text-lg font-semibold text-gray-900">{p.name_en}</h2>
      <p className="text-sm text-gray-600">{p.price} SAR</p>
      <div className="flex gap-2 mt-1 flex-wrap">
        {p.bestSelling && <span className="px-2 py-1 bg-yellow-100 text-yellow-700 text-xs rounded">🔥 {t("bestSelling")}</span>}
        {p.featured && <span className="px-2 py-1 bg-indigo-100 text-indigo-700 text-xs rounded">⭐ {t("featured")}</span>}
        {p.newArrival && <span className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded">🆕 {t("newArrival")}</span>}
        {p.inStock && <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded">📦 {t("inStock")}</span>}
        {p.disabled && <span className="px-2 py-1 bg-red-100 text-red-700 text-xs rounded">⛔ {t("disabled")}</span>}
      </div>
    </div>
  </div>

  <div className="flex gap-2">
    <button onClick={() => handleEdit(p)} className="p-2 bg-yellow-100 text-yellow-600 rounded hover:bg-yellow-200" aria-label="Edit">
      Edit
    </button>
    <button onClick={() => handleDelete(p.id)} className="p-2 bg-red-100 text-red-600 rounded hover:bg-red-200" aria-label="Delete">
      Delete
    </button>
    <button onClick={() => toggleStatus(p.id, "disabled")} className={`p-2 rounded ${p.disabled ? "bg-red-600 text-white" : "bg-gray-200 text-gray-700"} hover:opacity-80`} aria-label="Toggle Disabled Status">
      {t("disabled")}
    </button>
  </div>
</div>
          ))}
            {/* ======= تقارير العملاء ======= */}
<div className="mt-12">
  <h1 className="text-4xl font-bold text-center mb-10 text-[rgb(11,91,211)]">
    Client Reports
  </h1>
  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
    {pdfs.map((pdf) => (
      <div
        key={pdf.name}
        className="border rounded-xl shadow-lg p-6 bg-white hover:shadow-2xl transition-shadow duration-300"
      >
        <h2 className="font-semibold mb-3 text-lg text-blue-800">{pdf.name}</h2>
        <iframe
          src={pdf.url}
          width="100%"
          height="400px"
          className="mb-4 border rounded"
        ></iframe>
        <a
          href={pdf.url}
          className="mr-2 inline-block bg-cyan-600 hover:bg-cyan-800 text-white px-5 py-2 rounded-lg transition-colors duration-300"
          target="_blank"
          rel="noopener noreferrer"
        >
          View
        </a>
        <a
          href={pdf.url}
          download={`${pdf.name}-Report.pdf`}
          className="inline-block bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-300"
        >
          Download PDF
        </a>
      </div>
    ))}
  </div>
</div>

        </div>
      ) : (
        <form
          onSubmit={handleSubmit}
          className="space-y-6 mt-10 bg-white p-6 rounded-xl shadow"
        >
          <h2 className="text-2xl font-bold mb-4 text-center text-[#0056D2]">
            {isEditing ? t("editProduct") : t("addProduct")}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              name="id"
              value={product.id}
              onChange={handleChange}
              placeholder="ID"
className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
            />
            <input
              name="price"
              value={product.price}
              onChange={handleChange}
              placeholder={t("price")}
              className="border border-[#0056D2] rounded hover:bg-[#0058d210] transition"
            />
            <input
              name="name_en"
              value={product.name_en}
              onChange={handleChange}
              placeholder={t("nameEn")}
              className="border border-[#0056D2] rounded hover:bg-[#0058d210] transition"
            />
            <input
              name="name_ar"
              value={product.name_ar}
              onChange={handleChange}
              placeholder={t("nameAr")}
              className="border border-[#0056D2] rounded hover:bg-[#0058d210] transition"
            />
            <select
              name="brand"
              value={product.brand}
              onChange={handleChange}
              className="border border-[#0056D2] rounded hover:bg-[#0058d210] transition"
            >
              {BRAND_NAMES.map((b) => (
                <option key={b} value={b}>
                  {b}
                </option>
              ))}
            </select>
            <input
              name="image"
              value={product.image}
              onChange={handleChange}
              placeholder={t("image")}
              className="border border-[#0056D2] rounded hover:bg-[#0058d210] transition"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <textarea
              name="description_en"
              value={product.description_en}
              onChange={handleChange}
              placeholder={t("descEn")}
              className="border border-[#0056D2] rounded hover:bg-[#0058d210] transition"
            />
            <textarea
              name="description_ar"
              value={product.description_ar}
              onChange={handleChange}
              placeholder={t("descAr")}
              className="border border-[#0056D2] rounded hover:bg-[#0058d210] transition"
            />
          </div>

          <div>
            <h3 className="font-semibold mb-2">{t("outlets")}</h3>
            {outlets.map((outlet, index) => (
              <input
                key={index}
                value={outlet}
                onChange={(e) => {
                  const updated = [...outlets];
                  updated[index] = e.target.value;
                  setOutlets(updated);
                }}
                placeholder={`${t("outlet")} ${index + 1}`}
                className="border border-[#0056D2] rounded hover:bg-[#0058d210] transition mb-2"
              />
            ))}
            <button
              type="button"
              onClick={() => setOutlets([...outlets, ""])}
              className="text-sm text-blue-600 underline"
              aria-label="Add Outlet"
            >
              + {t("addOutlet")}
            </button>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-4">
            {["bestSelling", "featured", "newArrival", "inStock", "disabled"].map((key) => (
              <label key={key} className="flex items-center gap-2">
                <input
                  type="checkbox"
                  name={key}
                  checked={product[key as keyof Product] as boolean}
                  onChange={handleChange}
                />
                {t(key)}
              </label>
            ))}
          </div>

          <div className="flex justify-between mt-6">
            <button
              type="submit"
              className="bg-blue-600 text-white font-semibold py-2 px-6 rounded hover:bg-blue-700"
              aria-label={isEditing ? "Update Product" : "Add Product"}
            >
              {isEditing ? t("update") : t("add")}
            </button>
            <button
              type="button"
              onClick={() => setShowForm(false)}
              className="bg-gray-300 text-black py-2 px-6 rounded hover:bg-gray-400"
              aria-label="Cancel"
            >
              {t("cancel")}
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
