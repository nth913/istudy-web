import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { fetchMegaMenuKhoDe } from "@/lib/api/mega-menu";
import { KhoDeThiClient } from "./KhoDeThiClient";

export default async function KhoDeThiPage() {
  const khoDeSlots = await fetchMegaMenuKhoDe();

  return (
    <>
      <Header activeNav="kho-de" khoDeSlots={khoDeSlots} />
      <KhoDeThiClient />
      <Footer />
    </>
  );
}
