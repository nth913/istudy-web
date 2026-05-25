import type { Group, ItemSlot } from './mega-menu-data'
import type { TabSlots, MegaMenuExamItem } from './api/mega-menu'

export type ResolvedItem =
  | { kind: 'item'; name: string; sub?: string; tag?: 'HOT' | 'NEW' | 'LIVE'; href: string }
  | { kind: 'placeholder' }
  | { kind: 'omit' }

export type GroupKey = 'chinhThuc' | 'thiThu' | 'minhHoa'

type ExamWithBadge = MegaMenuExamItem & { badge: 'HOT' | 'NEW' }

export function resolveSlots(
  group: Group,
  tabData: TabSlots | null | undefined,
  groupKey: GroupKey,
): ResolvedItem[] {
  // Pull data for the requested group bucket. Year buckets only carry `years`;
  // exam buckets only carry `hot`/`new`. Defaulting via `??` keeps the resolver
  // tolerant when the CMS shape is partial.
  const slotsForGroup = tabData?.[groupKey] as
    | { years?: Array<{ year: string; count: number }> }
    | { hot?: MegaMenuExamItem[]; new?: MegaMenuExamItem[] }
    | undefined

  const years: Array<{ year: string; count: number }> =
    (slotsForGroup as { years?: Array<{ year: string; count: number }> } | undefined)?.years ?? []

  const examBucket = slotsForGroup as
    | { hot?: MegaMenuExamItem[]; new?: MegaMenuExamItem[] }
    | undefined

  // HOT first (preserve incoming order), then NEW. Badge captured per-item so
  // the slot resolver does not need to know which bucket the exam came from.
  const examPool: ExamWithBadge[] = [
    ...((examBucket?.hot ?? []).map((e) => ({ ...e, badge: 'HOT' as const }))),
    ...((examBucket?.new ?? []).map((e) => ({ ...e, badge: 'NEW' as const }))),
  ]

  let yearIdx = 0
  let examIdx = 0

  return group.slots.map((slot: ItemSlot): ResolvedItem => {
    switch (slot.kind) {
      case 'static':
        return {
          kind: 'item',
          name: slot.name,
          sub: slot.sub,
          tag: slot.tag,
          href: slot.href,
        }
      case 'dynamic-year': {
        const y = years[yearIdx]
        yearIdx += 1
        if (!y) return { kind: 'placeholder' }
        return {
          kind: 'item',
          name: y.year,
          sub: `Đề Sở GD năm ${y.year}`,
          // First dynamic-year slot (newest year) gets NEW badge.
          tag: yearIdx === 1 ? 'NEW' : undefined,
          href: slot.href(y.year),
        }
      }
      case 'dynamic-exam': {
        const exam = examPool[examIdx]
        examIdx += 1
        if (!exam) {
          // chinhThuc compact-up: skip empty slots in render layer.
          // thiThu/minhHoa keep placeholder to preserve 6-slot grid layout.
          return groupKey === 'chinhThuc' ? { kind: 'omit' } : { kind: 'placeholder' }
        }
        return {
          kind: 'item',
          name: exam.title,
          sub: exam.year,
          tag: exam.badge,
          href: slot.href(exam.slug),
        }
      }
      case 'placeholder':
        return { kind: 'placeholder' }
    }
  })
}

export function isGroupEmpty(resolved: ResolvedItem[]): boolean {
  return resolved.every((r) => r.kind === 'placeholder' || r.kind === 'omit')
}
