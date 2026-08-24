import { prisma } from "@/lib/db";
import { FaqAdmin } from "@/components/admin/faq-admin";

export default async function FaqAdminPage() {
  const faqs = await prisma.faq.findMany({ orderBy: { sortOrder: "asc" } });
  return (
    <div>
      <h1 className="text-3xl font-semibold">FAQ</h1>
      <FaqAdmin faqs={faqs} />
    </div>
  );
}
