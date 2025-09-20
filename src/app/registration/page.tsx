"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import Select from "react-select";
import type { OptionProps, SingleValueProps } from "react-select";
import ReactCountryFlag from "react-country-flag";
import { components } from "react-select";


const countries = [
  { value: "EG", label: "Egypt", flag: "/flags/eg.svg" },
  { value: "SA", label: "Saudi Arabia", flag: "/flags/sa.svg" },
  { value: "US", label: "United States", flag: "/flags/us.svg" },
  { value: "FR", label: "France", flag: "/flags/fr.svg" },
  { value: "DE", label: "Germany", flag: "/flags/de.svg" },
];

type CountryOption = { value: string; label: string; flag: string };

export default function RegistrationPage() {
  const { t } = useTranslation();
  const [successMessage, setSuccessMessage] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState<CountryOption | null>(null);

  const [formData, setFormData] = useState({
    companyName: "",
    contactPerson: "",
    email: "",
    phone: "",
    country: "",
    productCategory: "",
    productForm: "",
    targetMarket: "",
    packaging: "",
    quantity: "",
    certifications: "",
    shelfLife: "",
    budget: "",
    timeline: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // ✅ Country Change
  const handleCountryChange = (option: CountryOption | null) => {
    setSelectedCountry(option);
    setFormData({ ...formData, country: option ? option.value : "" });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form Data Submitted:", formData);

    setSuccessMessage(true);

    // Reset form
    setFormData({
      companyName: "",
      contactPerson: "",
      email: "",
      phone: "",
      country: "",
      productCategory: "",
      productForm: "",
      targetMarket: "",
      packaging: "",
      quantity: "",
      certifications: "",
      shelfLife: "",
      budget: "",
      timeline: "",
      message: "",
    });
    setSelectedCountry(null);

    // Hide success message
    setTimeout(() => {
      setSuccessMessage(false);
    }, 5000);
  };

 // ✅ Custom Option
const customOption = (props: OptionProps<CountryOption, false>) => {
  const { data } = props;
  return (
    <components.Option {...props}>
      <div className="flex items-center gap-2">
        <ReactCountryFlag
          countryCode={data.value}
          svg
          title={data.label}
          style={{ width: "1.5em", height: "1em" }}
        />
        <span>{data.label}</span>
      </div>
    </components.Option>
  );
};

// ✅ Custom Selected Value
const customSingleValue = (props: SingleValueProps<CountryOption, false>) => {
  const { data } = props;
  return (
    <components.SingleValue {...props}>
      <div className="flex items-center gap-2">
        <ReactCountryFlag
          countryCode={data.value}
          svg
          title={data.label}
          style={{ width: "1.5em", height: "1em" }}
        />
        <span>{data.label}</span>
      </div>
    </components.SingleValue>
  );
};

  return (
    <section className="min-h-screen bg-gradient-to-b from-[#DCEEFF]/60 to-white px-6 py-16 flex justify-center items-center">
      <motion.div
        className="w-full max-w-5xl bg-white shadow-2xl rounded-2xl p-8 md:p-12 border border-[#E0E7FF]"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-3xl md:text-4xl font-extrabold text-[#003D99] text-center mb-6">
          {t("form.title")}
        </h2>
        <p className="text-center text-gray-600 mb-10">
          {t("form.subtitle")}
        </p>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Company Name */}
          <div className="col-span-2">
            <label className="block text-sm font-medium text-[#003D99]">
              {t("form.companyName")}
            </label>
            <input
              type="text"
              name="companyName"
              value={formData.companyName}
              onChange={handleChange}
              required
              className="w-full mt-2 px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-[#0056D2] outline-none"
            />
          </div>

          {/* Contact Person */}
          <div className="col-span-1 max-[767px]:col-span-2">
            <label className="block text-sm font-medium text-[#003D99]">
              {t("form.contactPerson")}
            </label>
            <input
              type="text"
              name="contactPerson"
              value={formData.contactPerson}
              onChange={handleChange}
              required
              className="w-full mt-2 px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-[#0056D2] outline-none"
            />
          </div>

          {/* Business Email */}
          <div className="col-span-1 max-[767px]:col-span-2">
            <label className="block text-sm font-medium text-[#003D99]">
              {t("form.email")}
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full mt-2 px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-[#0056D2] outline-none"
            />
          </div>

          {/* Phone */}
          <div className="col-span-1 max-[767px]:col-span-2">
            <label className="block text-sm font-medium text-[#003D99]">
              {t("form.phone")}
            </label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
              className="w-full mt-2 px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-[#0056D2] outline-none"
            />
          </div>

          {/* Country Dropdown */}
          <div className="col-span-1 max-[767px]:col-span-2">
            <label className="block text-sm font-medium text-[#003D99]">
              {t("form.country")}
            </label>
            <Select
              options={countries}
              value={selectedCountry}
              onChange={handleCountryChange}
              components={{ Option: customOption, SingleValue: customSingleValue }}
              className="mt-2"
              isClearable
              placeholder={t("form.selectOption")}
            />
          </div>

          {/* Product Category */}
          <div className="col-span-1 max-[767px]:col-span-2">
            <label className="block text-sm font-medium text-[#003D99]">
              {t("form.productCategory")}
            </label>
            <select
              name="productCategory"
              value={formData.productCategory}
              onChange={handleChange}
              required
              className="w-full mt-2 px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-[#0056D2] outline-none"
            >
              <option value="">{t("form.selectOption")}</option>
              <option value="Skincare">Skincare</option>
              <option value="Haircare">Haircare</option>
              <option value="Bodycare">Bodycare</option>
              <option value="Cosmetics">Cosmetics</option>
              <option value="Supplements">Supplements</option>
              <option value="Other">{t("form.other")}</option>
            </select>
          </div>

          {/* Product Form */}
          <div className="col-span-1 max-[767px]:col-span-2">
            <label className="block text-sm font-medium text-[#003D99]">
              {t("form.productForm")}
            </label>
            <input
              type="text"
              name="productForm"
              value={formData.productForm}
              onChange={handleChange}
              placeholder="Cream, Serum, Shampoo..."
              className="w-full mt-2 px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-[#0056D2] outline-none"
            />
          </div>

          {/* Target Market */}
          <div className="col-span-1 max-[767px]:col-span-2">
            <label className="block text-sm font-medium text-[#003D99]">
              {t("form.targetMarket")}
            </label>
            <select
              name="targetMarket"
              value={formData.targetMarket}
              onChange={handleChange}
              className="w-full mt-2 px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-[#0056D2] outline-none"
            >
              <option value="">{t("form.selectOption")}</option>
              <option value="Local">Local</option>
              <option value="Regional">Regional</option>
              <option value="International">International</option>
            </select>
          </div>

          {/* Packaging */}
          <div className="col-span-1 max-[767px]:col-span-2">
            <label className="block text-sm font-medium text-[#003D99]">
              {t("form.packaging")}
            </label>
            <input
              type="text"
              name="packaging"
              value={formData.packaging}
              onChange={handleChange}
              placeholder="Bottle, Jar, Tube..."
              className="w-full mt-2 px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-[#0056D2] outline-none"
            />
          </div>

          {/* Quantity */}
          <div className="col-span-1 max-[767px]:col-span-2">
            <label className="block text-sm font-medium text-[#003D99]">
              {t("form.quantity")}
            </label>
            <input
              type="number"
              name="quantity"
              value={formData.quantity}
              onChange={handleChange}
              required
              className="w-full mt-2 px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-[#0056D2] outline-none"
            />
          </div>

          {/* Certifications */}
          <div className="col-span-1 max-[767px]:col-span-2">
            <label className="block text-sm font-medium text-[#003D99]">
              {t("form.certifications")}
            </label>
            <input
              type="text"
              name="certifications"
              value={formData.certifications}
              onChange={handleChange}
              placeholder="ISO, GMP, Halal..."
              className="w-full mt-2 px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-[#0056D2] outline-none"
            />
          </div>

          {/* Shelf Life */}
          <div className="col-span-1 max-[767px]:col-span-2">
            <label className="block text-sm font-medium text-[#003D99]">
              {t("form.shelfLife")}
            </label>
            <input
              type="text"
              name="shelfLife"
              value={formData.shelfLife}
              onChange={handleChange}
              placeholder="12 months, 24 months..."
              className="w-full mt-2 px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-[#0056D2] outline-none"
            />
          </div>

          {/* Budget */}
          <div className="col-span-1 max-[767px]:col-span-2">
            <label className="block text-sm font-medium text-[#003D99]">
              {t("form.budget")}
            </label>
            <input
              type="text"
              name="budget"
              value={formData.budget}
              onChange={handleChange}
              placeholder="$5000 - $10000"
              className="w-full mt-2 px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-[#0056D2] outline-none"
            />
          </div>

          {/* Timeline */}
          <div className="col-span-1 max-[767px]:col-span-2">
            <label className="block text-sm font-medium text-[#003D99]">
              {t("form.timeline")}
            </label>
            <input
              type="text"
              name="timeline"
              value={formData.timeline}
              onChange={handleChange}
              placeholder="3 months, 6 months..."
              className="w-full mt-2 px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-[#0056D2] outline-none"
            />
          </div>

          {/* Message */}
          <div className="col-span-2">
            <label className="block text-sm font-medium text-[#003D99]">
              {t("form.message")}
            </label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              rows={4}
              className="w-full mt-2 px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-[#0056D2] outline-none"
            ></textarea>
          </div>
{/* Success Message + Submit */}
          <div className="col-span-2">
            <AnimatePresence>
              {successMessage && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.4 }}
                  className="mb-4 p-4 rounded-lg bg-green-100 border border-green-400 text-green-800 font-medium text-center shadow-md"
                >
                  {t("form.successMessage")}
                </motion.div>
              )}
            </AnimatePresence>

            <button
              type="submit"
              className="w-full py-3 bg-[#0056D2] text-white font-bold rounded-lg shadow-lg hover:scale-[1.02] transition-transform"
            >
              {t("form.submit")}
            </button>
          </div>
        </form>
      </motion.div>
    </section>
  );
}