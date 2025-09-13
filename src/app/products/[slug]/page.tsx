import { getDocs, collection, query, where } from "firebase/firestore";
import { db } from "@/app/lib/firebaseConfig";
import { notFound } from "next/navigation";
import Image from "next/image";

interface ProductType {
  id: string;
  slug: string;
  name_en: string;
  name_ar: string;
  description_en: string;
  description_ar: string;
  price: number | string;
  image: string;
  brand?: string;
  bestSelling?: boolean;
  likes?: number;
  outlets?: string[];
}

export async function generateStaticParams() {
  const snapshot = await getDocs(collection(db, "products"));
  return snapshot.docs
    .map((doc) => doc.data().slug)
    .filter((slug): slug is string => typeof slug === "string")
    .map((slug) => ({ slug }));
}

async function getProductBySlug(slug: string): Promise<ProductType | null> {
  const q = query(collection(db, "products"), where("slug", "==", slug));
  const snapshot = await getDocs(q);
  if (snapshot.empty) return null;

  const productDoc = snapshot.docs[0];
  return {
    id: productDoc.id,
    ...productDoc.data(),
  } as ProductType;
}

// ✅ من غير PageProps نهائيًا
export default async function ProductPage({
  params,
}: {
  params: { slug: string };
}) {
  const { slug } = params;
  const product = await getProductBySlug(slug);

  if (!product) return notFound();

  return (
    <section className="mt-20 max-w-5xl mx-auto py-12 px-6 bg-white rounded-2xl shadow-lg">
      <h1 className="text-3xl font-bold text-[#0056D2] mb-6">
        {product.name_en}
      </h1>

      <div className="grid md:grid-cols-2 gap-8">
        <Image
          src={product.image}
          alt={product.name_en}
          width={500}
          height={400}
          className="rounded-2xl object-cover shadow-md"
        />

        <div className="space-y-4">
          <p className="text-gray-700">{product.description_en}</p>

          {product.brand && (
            <p className="text-sm text-gray-700">
              <span className="font-medium text-gray-800">Brand:</span>{" "}
              {product.brand}
            </p>
          )}

          {product.bestSelling && (
            <span className="inline-block bg-red-500 text-white text-xs px-3 py-1 rounded-full">
              Best Seller
            </span>
          )}

          {product.outlets && product.outlets.length > 0 && (
            <div>
              <h4 className="text-sm font-semibold text-gray-700">
                Available at:
              </h4>
              <ul className="list-disc list-inside text-sm text-gray-600">
                {product.outlets.map((outlet, idx) => (
                  <li key={idx}>{outlet}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
