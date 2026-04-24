'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'

// PRODUCT ACTIONS
export async function addProduct(formData: FormData) {
  const supabase = await createClient()
  const name = formData.get('name') as string
  const price = parseFloat(formData.get('price') as string)
  const category_id = formData.get('category_id') as string
  const type = formData.get('type') as 'cafe' | 'bar' | 'both'
  const order_idx = parseInt(formData.get('order_idx') as string) || 0
  
  await supabase.from('products').insert({
    name, price, category_id, type, order_idx, available: true
  })
  
  revalidatePath('/admin')
  revalidatePath('/cafe')
  revalidatePath('/bar')
}

export async function updateProduct(formData: FormData) {
  const supabase = await createClient()
  const id = formData.get('id') as string
  const name = formData.get('name') as string
  const price = parseFloat(formData.get('price') as string)
  const category_id = formData.get('category_id') as string
  const type = formData.get('type') as 'cafe' | 'bar' | 'both'
  const order_idx = parseInt(formData.get('order_idx') as string) || 0
  const available = formData.get('available') === 'on' || formData.get('available') === 'true'
  
  await supabase.from('products').update({
    name, price, category_id, type, order_idx, available
  }).eq('id', id)
  
  revalidatePath('/admin')
  revalidatePath('/cafe')
  revalidatePath('/bar')
}

export async function deleteProduct(formData: FormData) {
  const supabase = await createClient()
  const id = formData.get('id') as string
  await supabase.from('products').delete().eq('id', id)
  
  revalidatePath('/admin')
  revalidatePath('/cafe')
  revalidatePath('/bar')
}

// CATEGORY ACTIONS
export async function addCategory(formData: FormData) {
  const supabase = await createClient()
  const name = formData.get('name') as string
  const type = formData.get('type') as 'cafe' | 'bar' | 'both'
  const order_idx = parseInt(formData.get('order_idx') as string) || 0
  
  await supabase.from('categories').insert({ name, type, order_idx })
  
  revalidatePath('/admin')
  revalidatePath('/cafe')
  revalidatePath('/bar')
}

export async function updateCategory(formData: FormData) {
  const supabase = await createClient()
  const id = formData.get('id') as string
  const name = formData.get('name') as string
  const type = formData.get('type') as 'cafe' | 'bar' | 'both'
  const order_idx = parseInt(formData.get('order_idx') as string) || 0
  
  await supabase.from('categories').update({ name, type, order_idx }).eq('id', id)
  
  revalidatePath('/admin')
  revalidatePath('/cafe')
  revalidatePath('/bar')
}

export async function deleteCategory(formData: FormData) {
  const supabase = await createClient()
  const id = formData.get('id') as string
  await supabase.from('categories').delete().eq('id', id)
  
  revalidatePath('/admin')
  revalidatePath('/cafe')
  revalidatePath('/bar')
}

// AUTH ACTIONS
export async function signOut() {
  const supabase = await createClient()
  await supabase.auth.signOut()
  revalidatePath('/admin')
  revalidatePath('/admin/login')
}

