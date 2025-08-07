// src/app/products/[slug]/page.tsx

import React from "react";

interface PageProps {
  params: {
    slug: string;
  };
}

export default function ProductPage({ params }: PageProps) {
  return (
    <div>
      <h1>Product: {params.slug}</h1>
    </div>
  );
}
