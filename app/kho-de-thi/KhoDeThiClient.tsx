"use client";
import type { ExamListItem, ExamListQuery } from "@/lib/api/exams";

export function KhoDeThiClient({
  initialItems,
}: {
  initialItems: ExamListItem[];
  initialTotal: number;
  initialQuery: ExamListQuery;
}) {
  return (
    <div data-stub="kho-de-thi-client">
      {initialItems.map((e) => (
        <article className="exam-row" key={e.slug}>
          <h3>{e.title}</h3>
        </article>
      ))}
    </div>
  );
}
