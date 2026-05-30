import Header from "@/components/Header";
import { fetchMegaMenuKhoDe } from "@/lib/api/mega-menu";
import { fetchActiveEvents } from "@/lib/events-data";

export default async function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [khoDeSlots, eventsResponse] = await Promise.all([
    fetchMegaMenuKhoDe(),
    fetchActiveEvents(),
  ]);
  return (
    <>
      <Header khoDeSlots={khoDeSlots} eventsResponse={eventsResponse} />
      {children}
    </>
  );
}
