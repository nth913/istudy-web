import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { KHO_DE_THI_CSS } from "@/lib/page-css/kho-de-thi";
import { fetchExamsList, fetchSidebarFacets } from "@/lib/api/exams";
import { KhoDeThiClient } from "./KhoDeThiClient";

interface Props {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}

function pickStr(v: string | string[] | undefined): string | undefined {
  if (Array.isArray(v)) return v[0];
  return v;
}

export default async function KhoDeThiPage({ searchParams }: Props) {
  const sp = await searchParams;
  const query = {
    cat: pickStr(sp.cat),
    province: pickStr(sp.province),
    year: pickStr(sp.year),
    sort: pickStr(sp.sort) as "latest" | "popular" | "views" | undefined,
    limit: 20,
    offset: 0,
  };

  const [list, facets] = await Promise.all([
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
      <style dangerouslySetInnerHTML={{ __html: KHO_DE_THI_CSS }} />
      <Header activeNav="kho-de" />

      <div className="page-wrap">
        <div className="layout">
          <aside className="sidebar" aria-label="Danh mục đề thi">
            {facets.groups.map((g) => (
              <div className="sidebar-cat" key={g.title}>
                <div className="sidebar-cat-title">{g.title}</div>
                {g.items.map((it) => (
                  <Link
                    key={it.label}
                    href={`/kho-de-thi${it.filterQuery}`}
                    className="sidebar-item"
                    aria-label={`Lọc theo ${it.label}`}
                  >
                    <span>{it.label}</span>
                    <span className="count">{it.count}</span>
                  </Link>
                ))}
              </div>
            ))}
          </aside>

          <div className="main">
            <nav className="breadcrumb" aria-label="Breadcrumb">
              <Link href="/">Trang chủ</Link>
              <span className="sep" aria-hidden>
                ›
              </span>
              <Link href="/kho-de-thi">Kho đề thi</Link>
            </nav>

            <KhoDeThiClient
              initialItems={list.items}
              initialTotal={list.total}
              initialQuery={query}
            />

            {list.items.length === 0 && (
              <div className="empty-state">Không có đề thi nào phù hợp</div>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}
