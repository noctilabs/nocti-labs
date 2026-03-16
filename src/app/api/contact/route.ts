import { createClient } from 'next-sanity'
import { NextResponse } from 'next/server'

const writeClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2026-02-21',
  useCdn: false,
  token: process.env.SANITY_WRITE_TOKEN,
})

export async function POST(req: Request) {
  try {
    const body = await req.json()
    await writeClient.create({
      _type: 'contactMessage',
      firstName: body.firstName ?? '',
      lastName: body.lastName ?? '',
      email: body.email ?? '',
      company: body.company ?? '',
      country: body.country ?? '',
      platform: body.platform ?? '',
      phone: body.phone ?? '',
      hearAboutUs: body.hearAboutUs ?? '',
      description: body.description ?? '',
      submittedAt: new Date().toISOString(),
    })
    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error('Contact form submission failed:', err)
    return NextResponse.json({ ok: false, error: 'Submission failed' }, { status: 500 })
  }
}
