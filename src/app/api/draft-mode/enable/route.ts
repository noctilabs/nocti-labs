import { draftMode } from 'next/headers'
import { redirect } from 'next/navigation'
import { NextRequest } from 'next/server'

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl
  const secret = searchParams.get('secret')
  const redirectTo = searchParams.get('redirect') || '/'

  const expectedSecret = process.env.SANITY_PREVIEW_SECRET || process.env.NEXT_PUBLIC_SANITY_PREVIEW_SECRET
  if (secret !== expectedSecret) {
    return new Response('Invalid secret', { status: 401 })
  }

  const draft = await draftMode()
  draft.enable()

  redirect(redirectTo)
}
