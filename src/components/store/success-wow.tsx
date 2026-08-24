"use client";

import { useEffect, useState } from "react";
import { CopyButton } from "@/components/store/copy-button";

export function SuccessWow({ number }: { number: string }) {
  const [burst, setBurst] = useState(true);
  useEffect(() => {
    const t = setTimeout(() => setBurst(false), 1800);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="relative overflow-hidden rounded-3xl border border-sky-400/25 bg-sky-400/5 p-8 text-center">
      {burst && <div className="nx-burst" aria-hidden />}
      <p className="text-xs uppercase tracking-[0.16em] text-sky-300">Оплата прошла</p>
      <h1 className="mt-2 text-4xl font-semibold tracking-tight">Ключ готов</h1>
      <p className="mt-6 font-mono text-4xl font-semibold tracking-[0.12em] text-sky-100">{number}</p>
      <div className="mt-4 flex justify-center">
        <CopyButton value={number} />
      </div>
    </div>
  );
}
