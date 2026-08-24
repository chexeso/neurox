import { prisma } from "./db";

export async function audit(params: {
  userId?: string | null;
  action: string;
  entity: string;
  entityId?: string;
  meta?: unknown;
  ip?: string;
}) {
  await prisma.auditLog.create({
    data: {
      userId: params.userId ?? undefined,
      action: params.action,
      entity: params.entity,
      entityId: params.entityId,
      meta: JSON.stringify(params.meta ?? {}),
      ip: params.ip,
    },
  });
}

export async function track(name: string, extra?: { path?: string; productId?: string; meta?: unknown }) {
  await prisma.analyticsEvent.create({
    data: {
      name,
      path: extra?.path,
      productId: extra?.productId,
      meta: JSON.stringify(extra?.meta ?? {}),
    },
  });
}
