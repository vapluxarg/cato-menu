import { createClient } from '@/lib/supabase/server'
import AdminManager from '@/components/admin/AdminManager'

export default async function AdminDashboard() {
  const supabase = await createClient()
  
  // Fetch lists in parallel
  const [categoriesRes, productsRes] = await Promise.all([
    supabase.from('categories').select('*').order('order_idx'),
    supabase.from('products').select('*, categories(name)').order('order_idx')
  ])

  const categories = categoriesRes.data
  const products = productsRes.data


  return (
    <div className="admin-page">
      <h1 className="headline-lg">Panel de Administración</h1>
      <p className="body-md" style={{ marginTop: '1rem', color: 'var(--on-surface-variant)', maxWidth: '800px' }}>
        Gestione sus categorías y productos. Los cambios se reflejarán inmediatamente en el sitio público y en la herramienta de exportación.
      </p>

      <AdminManager 
        initialCategories={categories || []} 
        initialProducts={products || []} 
      />
    </div>

  )
}
