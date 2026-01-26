import { supabaseServer } from "../../lib/supabaseServer";
import type { Metadata } from "next";
import ProductDetails from "../../components/ProductDetails";

export const dynamic = "force-dynamic";

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

  usage_target_en: string;
  usage_target_ar: string;
instructions_en?: string;
instructions_ar?: string;
ingredients_en?: string[];
ingredients_ar?: string[];
storage_en?: string;
storage_ar?: string;

  featured: boolean;
  new_arrival: boolean;
  disabled: boolean;
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
  const { data: relatedProducts } = await supabaseServer
    .from("products")
    .select("id, name_en, name_ar, slug, images, tagline_en, brand")
    .overlaps("category", product.category)
    .neq("id", product.id)
    .limit(4);

  return <
    ProductDetails product={product} relatedProducts={relatedProducts || [] }/>;
}
