import React from "react";
import Image from "next/image";

type Product = {
  name_en: string;
  tagline_en?: string;
  image: string;
  category?: string;
  usage_en?: string;
  compliance?: string[];
  description_en?: string;
};

type Props = {
  product: Product;
};

const Info: React.FC<{ title: string; value?: React.ReactNode }> = ({ title, value }) => (
  <div>
    <h4 className="text-sm font-medium text-gray-500">{title}</h4>
    <p className="mt-2 text-lg font-semibold text-gray-900">{value ?? "—"}</p>
  </div>
);

export default function ProductDetails({ product }: Props) {
  return (
    <main className="bg-white">
      {/* HERO */}
      <section className="py-32 bg-gradient-to-br from-[#0B1C39] to-[#050B18] text-white">
        <div className="max-w-7xl mx-auto px-6">
          <h1 className="text-6xl font-bold mb-4">
            {product.name_en}
          </h1>
          <p className="text-xl text-white/70 max-w-2xl">
            {product.tagline_en}
          </p>
        </div>
      </section>

      {/* PRODUCT IMAGE */}
      <section className="py-24">
        <div className="max-w-4xl mx-auto">
          <div className="relative w-full overflow-hidden rounded-3xl shadow-xl" style={{ height: 480 }}>
<Image
  src={product.image || "/placeholder.png"}
  alt={product.name_en}
  fill
  sizes="(max-width: 640px) 100vw, 800px"
  className="object-cover"
  priority
/>

          </div>
        </div>
      </section>

      {/* KEY INFO */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-10 px-6">
          <Info title="Category" value={product.category} />
          <Info title="Usage" value={product.usage_en} />
<Info
  title="Compliance"
  value={
    product.compliance && product.compliance.length
      ? product.compliance.join(", ")
      : "—"
  }
/>

        </div>
      </section>

      {/* WHY THIS PRODUCT */}
      <section className="py-24">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-3xl font-semibold mb-6">
            Why This Product
          </h2>
          <p className="text-gray-600 leading-relaxed">
            {product.description_en}
          </p>
        </div>
      </section>

      {/* MANUFACTURED BY BONN */}
      <section className="py-24 bg-[#0B1C39] text-white">
        <div className="max-w-4xl mx-auto px-6">
          <h3 className="text-2xl font-semibold mb-4">
            Manufactured by Bonn Medical Industries
          </h3>
          <p className="text-white/70">
            Produced under GMP-certified facilities with strict quality
            control, trusted by leading healthcare brands.
          </p>
        </div>
      </section>
    </main>
  );
}
         