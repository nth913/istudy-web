import { ImageResponse } from '@vercel/og'
import { OgTemplate, isVariant } from './template'

export const runtime = 'edge'

type Ctx = { params: Promise<{ slug: string[] }> }

export async function GET(req: Request, ctx: Ctx): Promise<Response> {
  const { slug } = await ctx.params
  const variant = slug[0] ?? 'default'

  if (!isVariant(variant)) {
    return new Response('Unknown variant', { status: 400 })
  }

  const url = new URL(req.url)
  const title = url.searchParams.get('t') ?? 'iStudy'
  const subtitle = url.searchParams.get('sub') ?? ''

  return new ImageResponse(
    (<OgTemplate variant={variant} title={title} subtitle={subtitle} />),
    {
      width: 1200,
      height: 630,
      headers: {
        'Cache-Control': 'public, immutable, max-age=31536000',
      },
    },
  )
}
