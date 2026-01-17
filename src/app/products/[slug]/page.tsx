import { supabaseServer } from "../../lib/supabaseServer";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import ProductDetails from "../../components/ProductDetails";

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: { slug: string } | Promise<{ slug: string }>;
}): Promise<Metadata> {
  const resolvedParams = await params; // فك الـ promise
  const slug = resolvedParams.slug;

  if (!slug) {
    return {
      title: "Product not found",
      description: "Invalid product",
    };
  }

  const { data: product } = await supabaseServer
    .from("products")
    .select("name_en, seo_title_en, seo_desc_en, image")
    .eq("slug", slug)
    .maybeSingle();

  if (!product) {
    return {
      title: "Product not found",
      description: "This product does not exist",
    };
  }

  return {
    title: product.seo_title_en || product.name_en,
    description: product.seo_desc_en,
    openGraph: {
      title: product.seo_title_en || product.name_en,
      description: product.seo_desc_en,
      images: product.image ? [product.image] : [],
    },
  };
}



export default async function Page({ params }: { params: { slug: string } | Promise<{ slug: string }> }) {
  const { slug } = await params; // فك الـ promise

  if (!slug) {
    notFound();
  }

  const { data: product } = await supabaseServer
    .from("products")
    .select("*")
    .eq("slug", slug)
    .maybeSingle();

  if (!product) {
    notFound();
  }

  return <ProductDetails product={product} />;
}


