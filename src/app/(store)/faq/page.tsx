import { prisma } from "@/lib/db";

export const metadata = { title: "FAQ" };

export default async function FaqPage() {
  const faqs = await prisma.faq.findMany({ where: { isActive: true }, orderBy: { sortOrder: "asc" } });
  return (
    <div className="container-nx py-16">
      <h1 className="text-4xl font-semibold">FAQ</h1>
      <div className="mt-8 space-y-3">
        {faqs.map((f) => (
          <details key={f.id} className="card p-5">
            <summary className="cursor-pointer font-medium">{f.question}</summary>
            <p className="mt-3 text-sm leading-6 text-[color:var(--fg-mute)]">{f.answer}</p>
          </details>
        ))}
      </div>
    </div>
  );
}
