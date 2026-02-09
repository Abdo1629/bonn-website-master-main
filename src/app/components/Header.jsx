"use client";


import Fuse from "fuse.js";
import { useTranslation } from "react-i18next";
import i18n from "../../i18n";
import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { HiOutlineMenuAlt3 } from "react-icons/hi";
import { IoCloseSharp } from "react-icons/io5";
import { FaSearch } from "react-icons/fa";
import Image from "next/image";
import { supabase } from "../lib/supabaseClient";

function highlightText(text, matches, key) {
  if (!matches) return text;

  const match = matches.find((m) => m.key === key);
  if (!match) return text;

  let result = [];
  let lastIndex = 0;

  match.indices.forEach(([start, end], i) => {
    // normal text
    if (start > lastIndex) {
      result.push(text.slice(lastIndex, start));
    }

    // highlighted text
    result.push(
      <mark
        key={i}
        className="bg-yellow-200 text-black px-[1px] rounded"
      >
        {text.slice(start, end + 1)}
      </mark>
    );

    lastIndex = end + 1;
  });

  // remaining text
  if (lastIndex < text.length) {
    result.push(text.slice(lastIndex));
  }

  return result;
}


export default function FactoryHeader() {
  const [showIntro, setShowIntro] = useState(true);
  const { t } = useTranslation();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [brandsOpen, setBrandsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [searchError, setSearchError] = useState("");
  const [products, setProducts] = useState([]);
  const [langOpen, setLangOpen] = useState(false);
  
  useEffect(() => {
  const fetchProducts = async () => {
    const { data, error } = await supabase
      .from("products")
      .select("*");

    if (!error && data) {
      setProducts(data);
    }
  };

  fetchProducts();
}, []);

  useEffect(() => {
  const timer = setTimeout(() => {
    setShowIntro(false);
  }, 3000);

  return () => clearTimeout(timer);
}, []);


const navItems = [
  { key: "home", path: "/" },
  { key: "about", path: "/about" },
  { key: "brands", type: "dropdown" }, 
  { key: "services.title", path: "/services" },
  { key: "certifications", path: "/certifications" },
  { key: "operation", path: "/Operations" },
  { key: "contact", path: "/#contact" },
];


const brands = [
  {
    name: "Covix Care",
    slug: "covix-care",
    logo: "/images/covix.png",
  },
  {
    name: "Le Visage Plus",
    slug: "leVisagePlus",
    logo: "/images/Visage.png",
  },
];






  // ✅ Fuse Search Logic
  useEffect(() => {
    if (!searchTerm.trim() || products.length === 0) {
      setSearchResults([]);
      setSearchError("");
      return;
    }

 const fuse = new Fuse(products, {
  keys: ["name_en", "name_ar"],
  threshold: 0.3,
  includeMatches: true,
});


    const results = fuse.search(searchTerm);
    if (results.length > 0) {
      setSearchResults(results.map((r) => r.item));
      setSearchError("");
    } else {
      setSearchResults([]);
      setSearchError(t("productNotFound"));
    }
  }, [searchTerm, products]);

  const handleSearchAction = () => {
    if (!searchTerm.trim()) return;
    const fuse = new Fuse(products, {
      keys: ["name_en", "name_ar"],
      threshold: 0.3,
    });
    const results = fuse.search(searchTerm);
    if (results.length > 0) {
      setSearchResults(results.map((r) => r.item));
      setSearchError("");
    } else {
      setSearchResults([]);
      setSearchError(t("productNotFound"));
    }
  };


  return (
    <>
    {showIntro && (
  <motion.div
    initial={{ opacity: 1 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    className="fixed inset-0 bg-white z-[999] flex flex-col justify-center items-center"
  >
    <motion.div
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ duration: 1 }}
      className="w-[120px] h-[120px] object-contain"
    >
      <Image
      src="/images/logo.webp"
      alt="logo"
      width="120"
      height="120"
      className="object-contain"
      />
      </motion.div>

    <motion.h1
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1, duration: 1 }}
      className="mt-6 text-2xl font-bold text-[#0056D2]"
    >
      {i18n.language === "ar" ? "احلامك، مهمتنا" : "Your Dreams, Our Mission"}
    </motion.h1>
  </motion.div>
)}

<motion.header
  initial={{ opacity: 0, y: -20 }}
  animate={{ opacity: showIntro ? 0 : 1, y: showIntro ? -30 : 0 }}
  transition={{ delay: 0.5, duration: 0.6, ease: "easeOut" }}
  className="
    w-full fixed top-0 left-0 z-50
    bg-white/85 md:bg-white/80
    backdrop-blur-lg md:backdrop-blur-xl
    border-b border-[#4CA1FF]/10
    shadow-[0_4px_30px_rgba(0,0,0,0.06)]
    after:content-[''] after:absolute after:bottom-0 after:left-0
    after:w-full after:h-px
    after:bg-gradient-to-r after:from-transparent after:via-[#4CA1FF]/40 after:to-transparent
  "
  dir="ltr"
>

      <div className="max-w-7xl mx-auto px-6 py-3 flex justify-between items-center relative">
        <div className="flex items-center gap-4 lg:gap-18">
          <Link href="/" className="text-2xl font-bold text-[#4CA1FF]">
            <Image src="/images/logo.webp"className="min-w-15" alt="Bonn Medical Industries Logo" width="70" height="70" />
          </Link>

          {/* ✅ Search Bar */}
          <div className="max-[917px]:hidden relative">
            <div className="flex items-center gap-2">
              <div className="relative">
                <FaSearch
                  className="absolute left-2 top-1/2 -translate-y-1/2 text-[#4CA1FF] cursor-pointer"
                  onClick={handleSearchAction}
                />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSearchAction()}
                  placeholder={t("searchProduct")}
                  className="w-[250px] max-[850px]:w-[190px] pl-8 text-sm px-3 py-1 border border-[#4CA1FF] rounded hover:bg-[#0058d210] transition"
                />
              </div>

<div className="relative">
  <button
    onClick={() => setLangOpen(!langOpen)}
    className="flex items-center gap-2 px-2 h-8 rounded-lg border border-[#4CA1FF]/40 text-sm hover:bg-[#4CA1FF]/10 transition"
  >
     <Image
      src={i18n.language === "ar" ? "/images/sa.svg" : "/images/gb.svg"}
      alt="lang"
      width={16}
      height={8}
    /> 
    <span className="text-[#4CA1FF] font-medium">
      {i18n.language === "ar" ? "العربية" : "English"}
    </span>
  </button>

  <AnimatePresence>
    {langOpen && (
      <motion.div
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -8 }}
        className="absolute right-0 mt-2 bg-white rounded-xl shadow-lg w-36 overflow-hidden z-50"
      >
        <button
          onClick={() => {
            i18n.changeLanguage("ar");
            document.documentElement.dir = "rtl";
            setLangOpen(false);
          }}
          className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 w-full text-sm"
        >
          <Image src="/images/sa.svg" alt="" width={18} height={12} />
          العربية
        </button>

        <button
          onClick={() => {
            i18n.changeLanguage("en");
            document.documentElement.dir = "ltr";
            setLangOpen(false);
          }}
          className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 w-full text-sm"
        >
          <Image src="/images/gb.svg" alt="" width={18} height={12} />
          English
        </button>
      </motion.div>
    )}
  </AnimatePresence>
</div>

            </div>

            {/* ✅ Search Results Dropdown */}
{searchTerm && (
  <div className="absolute z-50 bg-white border border-gray-200 rounded shadow-md mt-1 w-[250px] max-[850px]:w-[190px] max-h-60 overflow-auto">
    {searchResults.length > 0 ? (
      searchResults.map((res) => {
        // يدعم الشكلين: item أو object عادي
        const product = res?.item || res;
        const matches = res?.matches || [];

        if (!product) return null;

        const highlightText = (text, key) => {
          if (!text || !matches.length) return text;

          const match = matches.find((m) => m.key === key);
          if (!match) return text;

          let parts = [];
          let lastIndex = 0;

          match.indices.forEach(([start, end], i) => {
            if (start > lastIndex) {
              parts.push(text.slice(lastIndex, start));
            }

            parts.push(
              <mark
                key={i}
                className="bg-yellow-200 text-black px-[1px] rounded"
              >
                {text.slice(start, end + 1)}
              </mark>
            );

            lastIndex = end + 1;
          });

          if (lastIndex < text.length) {
            parts.push(text.slice(lastIndex));
          }

          return parts;
        };

        const nameKey = i18n.language === "ar" ? "name_ar" : "name_en";
        const descKey =
          i18n.language === "ar" ? "description_ar" : "description_en";

        const nameText =
          i18n.language === "ar"
            ? product?.name_ar || ""
            : product?.name_en || "";

        const descText =
          i18n.language === "ar"
            ? product?.description_ar || ""
            : product?.description_en || "";

        return (
          <Link
            key={product.id}
            href={`/products/${product.slug}`}
            dir={i18n.language === "ar" ? "rtl" : "ltr"}
            className="flex items-center p-2 hover:bg-gray-100 transition"
          >
            <Image
              src={product?.images?.[0] || "/placeholder.png"}
              alt={nameText}
              className="rounded object-cover mr-2"
              width={40}
              height={40}
            />

            <div className="text-sm pr-5 pl-5">
              {/* Name */}
              <div className="font-medium text-gray-900">
                {highlightText(nameText, nameKey)}
              </div>

              {/* Description (2 lines only) */}
              <div className="text-gray-500 line-clamp-2">
                {highlightText(descText, descKey)}
              </div>
            </div>
          </Link>
        );
      })
    ) : (
      <div className="p-2 text-sm text-gray-600">{searchError}</div>
    )}
  </div>
)}

          </div>
        </div>
<nav className="hidden min-[916px]:flex items-center lg:gap-6 md:gap-3">
{navItems.map((item, index) => (
  <motion.div
    key={item.key}
    initial={{ opacity: 0, y: -10 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 0.3 + index * 0.15, duration: 0.4 }}
    className="relative"
  >
    {item.type === "dropdown" ? (
      <>
        {/* Brands Button */}
        <button
          onClick={() => setBrandsOpen(!brandsOpen)}
          className={`flex items-center gap-1 font-medium transition ${
            brandsOpen
              ? "text-[#4CA1FF]"
              : "text-gray-700 hover:text-[#4CA1FF]"
          }`}
        >
          {t("ourbrands")}
          <motion.span
            animate={{ rotate: brandsOpen ? 180 : 0 }}
            transition={{ duration: 0.2 }}
            className="text-xs"
          >
            ▼
          </motion.span>
        </button>

        {/* Dropdown */}
        <AnimatePresence>
          {brandsOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25 }}
              className="absolute top-full mt-3 left-0 bg-white rounded-xl shadow-lg p-3 w-56 z-50"
            >
              {brands.map((brand) => (
                <Link
                  key={brand.slug}
                  href={`/brands/${brand.slug}`}
                  className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-gray-100 transition"
                  onClick={() => setBrandsOpen(false)}
                >
                  <Image
                    src={brand.logo}
                    alt={brand.name}
                    width={40}
                    height={20}
                    className="object-contain"
                  />
                  <span className="text-sm font-medium text-gray-800">
                    {brand.name}
                  </span>
                </Link>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </>
    ) : (
      <Link
        href={item.path}
        className={`relative font-medium transition-colors ${
          pathname === item.path
            ? "text-[#4CA1FF] after:absolute after:left-0 after:-bottom-1 after:w-full after:h-[2px] after:bg-[#4CA1FF]"
            : "text-gray-700 hover:text-[#4CA1FF]"
        } group`}
      >
        <span className="relative z-10">{t(item.key)}</span>
        <span className="absolute bottom-[-4] left-0 w-0 h-[2px] bg-[#4CA1FF] group-hover:w-full transition-all duration-300"></span>
      </Link>
    )}
  </motion.div>
))}
</nav>


<button
  onClick={() => setIsOpen(!isOpen)}
  className="min-[916px]:hidden text-gray-800 absolute top-6 right-4 z-50"
  aria-label="Toggle Menu"
>
  <motion.div
    initial={false}
    animate={{ rotate: isOpen ? 180 : 0 }}
    transition={{ duration: 0.3 }}
  >
    {isOpen ? <IoCloseSharp size={36} /> : <HiOutlineMenuAlt3 size={36} />}
  </motion.div>
</button>

 {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
      initial={{ opacity: 0, y: -10, scaleY: 0 }}
      animate={{ opacity: 1, y: 0, scaleY: 1 }}
      exit={{ opacity: 0, y: -10, scaleY: 0 }}
      transition={{ duration: 0.35 }}
      style={{ originY: 0 }}
      className="absolute right-[-20px] top-full z-40 bg-white p-4 rounded-b-xl shadow-xl w-[100%] mx-5"
          >
<div className="flex items-center gap-3 px-6 pt-4">
  {/* Language Button */}
<div className="relative">
  <button
    onClick={() => setLangOpen(!langOpen)}
    className="flex items-center gap-2 px-3 h-8 rounded-lg border border-[#4CA1FF]/40 text-sm hover:bg-[#4CA1FF]/10 transition"
  >
     <Image
      src={i18n.language === "ar" ? "/images/sa.svg" : "/images/gb.svg"}
      alt="lang"
      width={20}
      height={14}
    /> 
    <span className="text-[#4CA1FF] font-medium">
      {i18n.language === "ar" ? "العربية" : "English"}
    </span>
  </button>

  <AnimatePresence>
    {langOpen && (
      <motion.div
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -8 }}
        className="absolute right-0 mt-2 bg-white rounded-xl shadow-lg w-36 overflow-hidden z-50"
      >
        <button
          onClick={() => {
            i18n.changeLanguage("ar");
            document.documentElement.dir = "rtl";
            setLangOpen(false);
          }}
          className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 w-full text-sm"
        >
          <Image src="/images/sa.svg" alt="" width={18} height={12} />
          العربية
        </button>

        <button
          onClick={() => {
            i18n.changeLanguage("en");
            document.documentElement.dir = "ltr";
            setLangOpen(false);
          }}
          className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 w-full text-sm"
        >
          <Image src="/images/gb.svg" alt="" width={18} height={12} />
          English
        </button>
      </motion.div>
    )}
  </AnimatePresence>
</div>


  {/* Search Input */}
  <div className="relative flex-1">
    <FaSearch
      className="absolute left-2 top-1/2 -translate-y-1/2 text-[#4CA1FF] cursor-pointer"
      onClick={handleSearchAction}
    />
    <input
      type="text"
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
      onKeyDown={(e) => e.key === "Enter" && handleSearchAction()}
      placeholder={t("searchProduct")}
      className="w-full pl-8 text-sm px-3 py-1 border border-[#4CA1FF] rounded hover:bg-[#0058d24b] hover:text-white transition"
    />
    {searchTerm && (
      <div className="absolute z-50 bg-white border border-gray-200 rounded shadow-md mt-1 w-full max-h-60 overflow-auto">
        {searchResults.length > 0 ? (
          searchResults.map((product) => (
            <Link
            dir={i18n.language === "ar" ? "rtl" : "ltr"}
              key={product.slug}
              href={`/products/${product.slug}`}
              className="flex items-center p-2 hover:bg-gray-100 transition"
            >
              <Image
src={product.images?.[0] || "/placeholder.png"}
alt={i18n.language === "ar" ? product.name_ar : product.name_en}
                className="w-10 h-10 rounded object-cover mr-2"
                width="40"
                height="40"
              />
              <div className="text-sm pr-5 pl-5">
                <div className="font-medium text-gray-900">{i18n.language === "ar" ? product.name_ar : product.name_en}</div>
                <div className="text-gray-500">{i18n.language === "ar"
  ? product.description_ar
  : product.description_en}</div>
              </div>
            </Link>
          ))
        ) : (
          <div className="p-2 text-sm text-gray-600">{searchError}</div>
        )}
      </div>
    )}
  </div>
</div>



            <div className="flex flex-col p-6 space-y-4">
{navItems.map((item, index) => (
  <motion.div
    key={item.key}
    initial={{ opacity: 0, y: -10 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 0.3 + index * 0.15, duration: 0.4 }}
    className="relative"
  >
    {item.type === "dropdown" ? (
      <>
        {/* Brands Button */}
        <button
          onClick={() => setBrandsOpen(!brandsOpen)}
          className={`flex items-center gap-1 font-medium transition ${
            brandsOpen
              ? "text-[#0056D2]"
              : "text-gray-700 hover:text-[#0056D2]"
          }`}
        >
          {t("ourbrands")}
          <motion.span
            animate={{ rotate: brandsOpen ? 180 : 0 }}
            transition={{ duration: 0.2 }}
            className="text-xs"
          >
            ▼
          </motion.span>
        </button>

        {/* Dropdown */}
        <AnimatePresence>
          {brandsOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25 }}
              className="absolute top-full mt-3 left-0 bg-white rounded-xl shadow-lg p-3 w-56 z-50"
            >
              {brands.map((brand) => (
                <Link
                
                  key={brand.slug}
                  href={`/brands/${brand.slug}`}
                  className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-gray-100 transition"
                  onClick={() => setBrandsOpen(false)}
                >
                  <Image
                    src={brand.logo}
                    alt={brand.name}
                    width={40}
                    height={20}
                    className="object-contain"
                  />
                  <span className="text-sm font-medium text-gray-800">
                    {brand.name}
                  </span>
                </Link>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </>
    ) : (
      <Link
      onClick={() => setIsOpen(false)}
        href={item.path}
        className={`relative font-medium transition-colors ${
          pathname === item.path
            ? "text-[#0056D2] after:absolute after:left-0 after:-bottom-1 after:w-full after:h-[2px] after:bg-[#0056D2]"
            : "text-gray-700 hover:text-[#0056D2]"
        } group`}
      >
        <span className="relative z-10">{t(item.key)}</span>
        <span className="absolute bottom-[-4] left-0 w-0 h-[2px] bg-[#0056D2] group-hover:w-full transition-all duration-300"></span>
      </Link>
    )}
  </motion.div>
))}

            </div>
          </motion.div>
        )}
      </AnimatePresence>
      </div>
    </motion.header>
    </>
  );
}