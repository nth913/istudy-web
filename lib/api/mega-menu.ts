export type MegaMenuExamItem = {
  slug: string
  title: string
  year: string
  isHot: boolean
}

export type TabSlots = {
  chinhThuc: { years: Array<{ year: string; count: number }> }
  thiThu: { hot: MegaMenuExamItem[]; new: MegaMenuExamItem[] }
  minhHoa: { hot: MegaMenuExamItem[]; new: MegaMenuExamItem[] }
}

export type MegaMenuKhoDeData = {
  vao10: TabSlots
  thptQg: TabSlots
}

function cmsBase(): string {
  return process.env.NEXT_PUBLIC_CMS_URL || 'http://localhost:3131'
}

export async function fetchMegaMenuKhoDe(): Promise<MegaMenuKhoDeData | null> {
  try {
    const res = await fetch(`${cmsBase()}/api/mega-menu/kho-de`, {
      next: { revalidate: 600, tags: ['mega-menu-kho-de'] },
    })
    if (!res.ok) return null
    return (await res.json()) as MegaMenuKhoDeData
  } catch {
    return null
  }
}
