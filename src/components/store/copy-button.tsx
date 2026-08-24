"use client";

export function CopyButton({ value }: { value: string }) {
  return (
    <button
      className="btn btn-ghost mt-3"
      onClick={() => navigator.clipboard.writeText(value)}
      type="button"
    >
      Скопировать ключ
    </button>
  );
}
