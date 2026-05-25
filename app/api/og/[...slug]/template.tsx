type Variant = 'post' | 'exam' | 'event' | 'book' | 'default'

const GRADIENTS: Record<Variant, string> = {
  post:    'linear-gradient(135deg, #5b21b6, #ec4899)',
  exam:    'linear-gradient(135deg, #9a3412, #f97316)',
  event:   'linear-gradient(135deg, #065f46, #10b981)',
  book:    'linear-gradient(135deg, #854d0e, #f59e0b)',
  default: 'linear-gradient(135deg, #0f172a, #1e3a8a)',
}

const LABEL: Record<Variant, string> = {
  post: 'Bài viết', exam: 'Đề thi', event: 'Sự kiện', book: 'Sách', default: 'istudy',
}

function fitTitle(title: string): number {
  if (title.length <= 40) return 64
  if (title.length <= 70) return 52
  return 40
}

export function OgTemplate({
  variant,
  title,
  subtitle,
}: {
  variant: Variant
  title: string
  subtitle: string
}) {
  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        background: GRADIENTS[variant],
        padding: '64px 80px',
        color: 'white',
        fontFamily: 'Inter, "Noto Sans", sans-serif',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', fontSize: 28, fontWeight: 700, opacity: 0.9 }}>
        <span style={{ marginRight: 16 }}>istudy</span>
        <span style={{ opacity: 0.5 }}>·</span>
        <span style={{ marginLeft: 16 }}>{LABEL[variant]}</span>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
        <div style={{ fontSize: fitTitle(title), fontWeight: 800, lineHeight: 1.1, maxWidth: 1040 }}>
          {title}
        </div>
        {subtitle ? (
          <div style={{ fontSize: 32, opacity: 0.85, fontWeight: 500 }}>{subtitle}</div>
        ) : null}
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 22, opacity: 0.85 }}>
        <span>aistudy.com.vn</span>
        <span>Học tiếng Anh thông minh</span>
      </div>
    </div>
  )
}

export const OG_VARIANTS = new Set<Variant>(['post', 'exam', 'event', 'book', 'default'])

export function isVariant(x: string): x is Variant {
  return OG_VARIANTS.has(x as Variant)
}
