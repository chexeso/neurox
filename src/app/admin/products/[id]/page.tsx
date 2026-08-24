import { prisma } from "@/lib/db";
import { notFound } from "next/navigation";
import { ProductForm } from "@/components/admin/product-form";

export default async function EditProduct({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const isNew = id === "new";
  const product = isNew
    ? null
    : await prisma.product.findUnique({ where: { id }, include: { variants: true } });
  if (!isNew && !product) notFound();
  const categories = await prisma.category.findMany({ orderBy: { name: "asc" } });
  return (
    <div>
      <h1 className="text-3xl font-semibold">{isNew ? "Новый товар" : product!.name}</h1>
      <ProductForm product={product} categories={categories} />
    </div>
  );
}
