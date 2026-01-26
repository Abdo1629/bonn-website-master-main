import { supabaseServer } from "../../lib/supabaseServer";
import type { Metadata } from "next";
import ProductDetails from "../../components/ProductDetails";

export const dynamic = "force-dynamic";

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

/* ================= SEO ================= */
export async function generateMetadata(
  { params }: { params: Promise<{ slug: string }> }
): Promise<Metadata> {
  const { slug } = await params;

  const { data } = await supabaseServer
    .from("products")
    .select("seo_title, seo_description, name_en")
    .eq("slug", slug)
    .maybeSingle();

  if (!data) {
    return {
      title: "Product | Bonn Medical",
      description:
        "Medical products manufactured by Bonn Medical Industries",
      robots: { index: false },
    };
  }

  return {
    title: data.seo_title || data.name_en,
    description: data.seo_description || undefined,
    openGraph: {
      title: data.seo_title || data.name_en,
      description: data.seo_description || undefined,
    },
  };
}

/* ================= PAGE ================= */
type PageProps = {
  params: Promise<{ slug: string }>;
};

export default async function Page({ params }: PageProps) {
  const { slug } = await params;

  const { data: product } = await supabaseServer
    .from("products")
    .select("*")
    .eq("slug", slug)
    .maybeSingle<Product>();

  if (!product) {
    return (
      <div className="max-w-4xl mx-auto py-32 px-6 text-center">
        <h1 className="text-3xl font-bold mb-4">
          Product not found
        </h1>
        <p className="text-gray-600">
          This product may have been removed or renamed.
        </p>
      </div>
    );
  }

  return <ProductDetails product={product} />;
}
