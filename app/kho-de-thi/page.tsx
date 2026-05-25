import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { fetchMegaMenuKhoDe } from "@/lib/api/mega-menu";
import {
  fetchExamsList,
  fetchSidebarFacets,
  type ExamListQuery,
} from "@/lib/api/exams";
import { resolveSeo } from "@/lib/seo/resolve";
import { buildMetadata } from "@/lib/seo/buildMetadata";
import { KhoDeThiClient } from "./KhoDeThiClient";

interface Props {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}

export async function generateMetadata(): Promise<Metadata> {
  const seo = await resolveSeo({
    collection: "exams",
    routeTitle: "Kho đề thi tiếng Anh",
    routeDescription:
      "Tổng hợp đề thi tiếng Anh các loại — TOEIC, IELTS, học sinh.",
    subtitle: "Đề thi",
  });
  return buildMetadata(seo, "https://aistudy.com.vn/kho-de-thi");
}

function pickStr(v: string | string[] | undefined): string | undefined {
  if (Array.isArray(v)) return v[0];
  return v;
}

export default async function KhoDeThiPage({ searchParams }: Props) {
  const sp = await searchParams;
  const query: ExamListQuery = {
    cat: pickStr(sp.cat),
    province: pickStr(sp.province),
    year: pickStr(sp.year),
    examType: pickStr(sp.examType) as ExamListQuery["examType"],
    yearMax: pickStr(sp.yearMax),
    sort: pickStr(sp.sort) as ExamListQuery["sort"],
    limit: 20,
    offset: 0,
  };

  const [khoDeSlots, list, facets] = await Promise.all([
    fetchMegaMenuKhoDe(),
    fetchExamsList(query).catch(() => ({
      items: [],
      total: 0,
      limit: 20,
      offset: 0,
    })),
    fetchSidebarFacets(),
  ]);

  return (
    <>
      <Header activeNav="kho-de" khoDeSlots={khoDeSlots} />
      <KhoDeThiClient
        initialItems={list.items}
        initialTotal={list.total}
        initialQuery={query}
        sidebarGroups={facets.groups}
      />
      <Footer />
    </>
  );
}
