import { getCurrentUser } from "@/lib/session";
import { prisma } from "@/lib/db";
import { redirect } from "next/navigation";

export default async function DownloadsPage() {
  const user = await getCurrentUser();
  if (!user) redirect("/login");
  const files = await prisma.download.findMany({ where: { userId: user.id } });
  return (
    <div>
      <h1 className="text-3xl font-semibold">Загрузки</h1>
      {files.length === 0 ? (
        <p className="mt-4 text-sm text-[color:var(--fg-mute)]">Файловых загрузок в этом заказе нет — большинство товаров NeuroX выдаются ключом.</p>
      ) : (
        <ul className="mt-4 space-y-2">
          {files.map((f) => (
            <li key={f.id} className="card p-4">
              <a href={f.fileUrl}>{f.fileName}</a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
