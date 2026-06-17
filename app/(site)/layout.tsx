import Header from "@/components/Header";
import { fetchMegaMenuKhoDe } from "@/lib/api/mega-menu";
import { fetchActiveEvents } from "@/lib/events-data";
import { fetchSearchConfig } from "@/lib/api/search";

export default async function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [khoDeSlots, eventsResponse, searchConfig] = await Promise.all([
    fetchMegaMenuKhoDe(),
    fetchActiveEvents(),
    fetchSearchConfig(),
  ]);
  return (
    <>
      <Header khoDeSlots={khoDeSlots} eventsResponse={eventsResponse} searchConfig={searchConfig} />
      {children}
    </>
  );
}
