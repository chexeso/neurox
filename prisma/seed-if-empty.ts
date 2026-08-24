import { PrismaClient } from "@prisma/client";
import { spawnSync } from "child_process";

const prisma = new PrismaClient();

async function main() {
  try {
    const count = await prisma.product.count();
    if (count > 0) {
      console.log(`[seed-if-empty] products=${count}, skip`);
      return;
    }
  } catch (e) {
    console.log("[seed-if-empty] count failed, will try full seed", e);
  }
  console.log("[seed-if-empty] running full seed...");
  const r = spawnSync("npx", ["tsx", "prisma/seed.ts"], { stdio: "inherit", shell: true });
  if (r.status !== 0) console.error("[seed-if-empty] seed exit", r.status);
}

main()
  .catch((e) => console.error(e))
  .finally(async () => {
    await prisma.$disconnect();
  });
