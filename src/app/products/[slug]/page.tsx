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
  category: string[];
  usage_en: string;
  usage_ar: string;
  compliance: string[];
  images: string[];
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

export const runtime = "nodejs";
export const revalidate = 0;

/* ================= SEO ================= */
export async function generateMetadata(
  { params }: { params: { slug: string } }
): Promise<Metadata> {
  const slug = params.slug;

  try {
 const { data } = await supabaseServer
  .from("products")
  .select(`
    name_en,
    seo_title_en,
    seo_desc_en,
    images,
    brand
  `)
  .eq("slug", slug)
  .limit(1)
  .single();


    const title = data?.seo_title_en || data?.name_en || "Product | Bonn Medical";
    const description =
      data?.seo_desc_en ||
      "Medical products manufactured by Bonn Medical Industries";

    const image =
      data?.images?.[0] ||
      "https://www.bonnmed.com/cover.png"; // default cover

    const brandName = data?.brand
      ? `by ${data.brand}`
      : "by Bonn Medical Industries";

    return {
      title: `${title} | ${brandName}`,
      description,

      openGraph: {
        title: `${title} | ${brandName}`,
        description,
        url: `https://www.bonnmed.com/products/${slug}`,
        siteName: "Bonn Medical Industries",
        type: "website",

        images: [
          {
            url: image,
            width: 1200,
            height: 630,
            alt: `${title} ${brandName}`,
          },
        ],
      },

      twitter: {
        card: "summary_large_image",
        title: `${title} | ${brandName}`,
        description,
        images: [image],
      },
    };
  } catch (e) {
    /* ===== لو Supabase وقع لأي سبب ===== */
    return {
      title: "Product | Bonn Medical",
      description: "Medical products manufactured by Bonn Medical Industries",
      openGraph: {
        images: [
          {
            url: "https://www.bonnmed.com/cover.png",
            width: 1200,
            height: 630,
          },
        ],
      },
    };
  }
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
