"use client";

import { useRouter } from "next/navigation";

export function FaqAdmin({ faqs }: { faqs: { id: string; question: string; answer: string }[] }) {
  const router = useRouter();
  return (
    <div className="mt-6 space-y-4">
      <form
        className="card space-y-3 p-5"
        onSubmit={async (e) => {
          e.preventDefault();
          const form = new FormData(e.currentTarget);
          await fetch("/api/admin/faq", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ question: form.get("question"), answer: form.get("answer") }),
          });
          router.refresh();
        }}
      >
        <input name="question" className="field" placeholder="Вопрос" required />
        <textarea name="answer" className="field min-h-24" placeholder="Ответ" required />
        <button className="btn btn-primary">Добавить</button>
      </form>
      {faqs.map((f) => (
        <div key={f.id} className="card p-4">
          <p className="font-medium">{f.question}</p>
          <p className="mt-2 text-sm text-[color:var(--fg-mute)]">{f.answer}</p>
        </div>
      ))}
    </div>
  );
}
