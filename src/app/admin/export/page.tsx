import { createClient } from '@/lib/supabase/server'
import ExportClient from './ExportClient'
import ExportableMenu from '@/components/ExportableMenu'

export default async function ExportPage() {
  const supabase = await createClient()
  const { data: categories } = await supabase.from('categories').select('*').order('order_idx')
  const { data: products } = await supabase.from('products').select('*').order('order_idx')

  return (
    <div>
      {/* Preload fonts so html2canvas can capture them */}
      {/* eslint-disable-next-line @next/next/no-page-custom-font */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      {/* eslint-disable-next-line @next/next/no-page-custom-font */}
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      {/* eslint-disable-next-line @next/next/no-page-custom-font */}
      <link
        href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@900&family=Jost:wght@400;500;600;700;800&display=swap"
        rel="stylesheet"
      />


      {/*
        These menus are rendered at FULL resolution (1080px wide) completely off-screen.
        html2canvas will target them by ID and capture them without any CSS transform interference.
        They are NOT inside any scaled/transformed container.
      */}
      <div style={{ position: 'fixed', left: '-9999px', top: 0, zIndex: -1, pointerEvents: 'none' }}>
        {/* @ts-ignore */}
        <ExportableMenu id="export-cafe" theme="cafe" categories={categories ?? []} products={products ?? []} />
        {/* @ts-ignore */}
        <ExportableMenu id="export-bar" theme="bar" categories={categories ?? []} products={products ?? []} />
      </div>

      {/* Client component: just buttons + placeholder previews */}
      <ExportClient />
    </div>
  )
}
