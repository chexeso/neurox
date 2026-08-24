import { prisma } from "@/lib/db";
import { CmsForm } from "@/components/admin/cms-form";

export default async function CmsPage() {
  const settings = await prisma.cmsSetting.findMany();
  return (
    <div>
      <h1 className="text-3xl font-semibold">CMS</h1>
      <CmsForm settings={settings} />
    </div>
  );
}
