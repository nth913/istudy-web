import { describe, it, expect, vi, beforeEach } from "vitest";
import type { Mock } from "vitest";
import SiteLayout from "../layout";
import { fetchMegaMenuKhoDe } from "@/lib/api/mega-menu";
import { fetchActiveEvents } from "@/lib/events-data";
import type { MegaMenuKhoDeData } from "@/lib/api/mega-menu";
import type { ActiveEventsResponse } from "@/lib/events-data";

vi.mock("@/lib/api/mega-menu", () => ({
  fetchMegaMenuKhoDe: vi.fn(),
}));
vi.mock("@/lib/events-data", () => ({
  fetchActiveEvents: vi.fn(),
}));
vi.mock("@/components/Header", () => ({
  __esModule: true,
  default: (props: Record<string, unknown>) => (
    <div data-testid="mock-header" data-props={JSON.stringify(props)} />
  ),
}));

const mockSlots: MegaMenuKhoDeData = {
  vao10: {
    chinhThuc: { years: [] },
    thiThu: { hot: [], new: [] },
    minhHoa: { hot: [], new: [] },
  },
  thptQg: {
    chinhThuc: { years: [] },
    thiThu: { hot: [], new: [] },
    minhHoa: { hot: [], new: [] },
  },
};

const mockEvents: ActiveEventsResponse = {
  slots: { hero: null, popup: null, megaMenu: {} },
  events: [],
  updatedAt: "2026-05-27T00:00:00+07:00",
};

describe("SiteLayout", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    (fetchMegaMenuKhoDe as Mock).mockResolvedValue(mockSlots);
    (fetchActiveEvents as Mock).mockResolvedValue(mockEvents);
  });

  it("calls fetchMegaMenuKhoDe and fetchActiveEvents in parallel", async () => {
    await SiteLayout({ children: <div data-testid="child" /> });
    expect(fetchMegaMenuKhoDe).toHaveBeenCalledTimes(1);
    expect(fetchActiveEvents).toHaveBeenCalledTimes(1);
  });

  it("passes khoDeSlots and eventsResponse as props to Header", async () => {
    const el = (await SiteLayout({
      children: <div data-testid="child" />,
    })) as React.ReactElement;
    // el is a Fragment whose children are [Header, child]
    const children = (el.props as { children: React.ReactNode[] }).children;
    const header = children[0] as React.ReactElement;
    const headerProps = header.props as {
      khoDeSlots: MegaMenuKhoDeData;
      eventsResponse: ActiveEventsResponse;
    };
    expect(headerProps.khoDeSlots).toEqual(mockSlots);
    expect(headerProps.eventsResponse).toEqual(mockEvents);
  });

  it("renders children after Header", async () => {
    const childNode = <div data-testid="child" />;
    const el = (await SiteLayout({ children: childNode })) as React.ReactElement;
    const children = (el.props as { children: React.ReactNode[] }).children;
    expect(children[1]).toBe(childNode);
  });
});
