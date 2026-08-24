import { prisma } from "@/lib/db";
import { ReviewModeration } from "@/components/admin/review-moderation";

export default async function ReviewsAdmin() {
  const reviews = await prisma.review.findMany({ include: { product: true, user: true }, orderBy: { createdAt: "desc" } });
  return (
    <div>
      <h1 className="text-3xl font-semibold">Отзывы</h1>
      <p className="mt-2 text-sm text-[color:var(--fg-mute)]">Публикуйте только проверенные отзывы. Внешний social proof — Playerok и Telegram.</p>
      <ReviewModeration reviews={reviews} />
    </div>
  );
}
