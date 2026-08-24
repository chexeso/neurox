import { Footer } from "@/components/store/footer";
import { Header } from "@/components/store/header";
import { CosmicBg } from "@/components/store/cosmic-bg";
import { getOrCreateCart } from "@/lib/cart";
import { getCurrentUser } from "@/lib/session";

export const dynamic = "force-dynamic";

export default async function StoreLayout({ children }: { children: React.ReactNode }) {
  let user: Awaited<ReturnType<typeof getCurrentUser>> = null;
  let count = 0;
  try {
    user = await getCurrentUser();
  } catch (e) {
    console.error("layout user:", e);
  }
  try {
    const cart = await getOrCreateCart();
    count = cart.items.reduce((s, i) => s + i.quantity, 0);
  } catch (e) {
    console.error("layout cart:", e);
    count = 0;
  }
  return (
    <div className="relative min-h-screen" style={{ isolation: "isolate" }}>
      <CosmicBg />
      <div className="relative" style={{ zIndex: 1 }}>
        <Header cartCount={count} userName={user?.name || user?.email} />
        <main className="min-h-[70vh]">{children}</main>
        <Footer />
      </div>
    </div>
  );
}
