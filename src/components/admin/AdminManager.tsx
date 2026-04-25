'use client'

import React, { useState } from 'react'
import {
  addProduct, updateProduct, deleteProduct,
  addCategory, updateCategory, deleteCategory
} from '@/app/admin/actions'
import { Pencil, Trash2, Check, X, Plus, AlertCircle } from 'lucide-react'

type Category = {
  id: string
  name: string
  type: string
  order_idx: number | null
}

type Product = {
  id: string
  name: string
  price: number
  category_id: string | null
  type: string
  order_idx: number | null
  available: boolean
  categories?: { name: string } | null
}


export default function AdminManager({
  initialCategories,
  initialProducts
}: {
  initialCategories: Category[],
  initialProducts: Product[]
}) {
  const [activeTab, setActiveTab] = useState<'categories' | 'products'>('categories')

  // Edit State Maps (id -> isEditing)
  const [editingCategory, setEditingCategory] = useState<string | null>(null)
  const [editingProduct, setEditingProduct] = useState<string | null>(null)

  // Filtering State
  const [searchQuery, setSearchQuery] = useState('')
  const [filterType, setFilterType] = useState<'all' | 'cafe' | 'bar'>('all')
  const [itemToDelete, setItemToDelete] = useState<{ id: string, name: string, type: 'category' | 'product' } | null>(null)

  const confirmDelete = async () => {
    if (!itemToDelete) return
    const formData = new FormData()
    formData.append('id', itemToDelete.id)
    
    if (itemToDelete.type === 'category') {
      await deleteCategory(formData)
    } else {
      await deleteProduct(formData)
    }
    setItemToDelete(null)
  }

  const filteredProducts = initialProducts.filter(prod => {
    const matchesSearch = prod.name.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesType = filterType === 'all' || prod.type === filterType || prod.type === 'both'
    return matchesSearch && matchesType
  })

  return (
    <div style={{ marginTop: '2rem' }}>
      {/* Tabs */}
      <div className="admin-tabs-container">
        <button
          onClick={() => setActiveTab('categories')}
          className={`tab-btn ${activeTab === 'categories' ? 'active' : ''}`}
        >
          Categorías
        </button>
        <button
          onClick={() => setActiveTab('products')}
          className={`tab-btn ${activeTab === 'products' ? 'active' : ''}`}
        >
          Productos
        </button>
      </div>

      {activeTab === 'categories' && (
        <div>
          {/* Add Category */}
          <div className="admin-card">
            <h2 className="title-md" style={{ marginBottom: '1.5rem' }}>Añadir Categoría</h2>
            <form action={addCategory} className="form-grid">
              <div className="input-group">
                <label>Nombre</label>
                <input name="name" type="text" required className="admin-input" placeholder="Ej: Cafetería" />
              </div>
              <div className="input-group">
                <label>Tipo Visual</label>
                <select name="type" required className="admin-input">
                  <option value="cafe">Cafe</option>
                  <option value="bar">Bar</option>
                  <option value="both">Ambos</option>
                </select>
              </div>
              <div className="input-group">
                <label>Orden</label>
                <input name="order_idx" type="number" defaultValue="0" className="admin-input" />
              </div>
              <button type="submit" className="btn-admin btn-admin-primary" style={{ height: '48px' }}>
                <Plus size={18} />
                Crear Categoría
              </button>
            </form>
          </div>

          {/* List Categories */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
            <h2 className="title-md">Listado de Categorías</h2>
          </div>

          <div style={{ overflowX: 'auto', WebkitOverflowScrolling: 'touch' }}>
            <table className="admin-data-table">
              <thead>
                <tr>
                  <th>Nombre</th>
                  <th>Tipo</th>
                  <th className="hide-mobile">Orden</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {initialCategories.map((cat) => (
                  <tr key={cat.id}>
                    {editingCategory === cat.id ? (

                      <td colSpan={4} style={{ padding: '1rem' }}>
                        <form
                          action={(formData) => { updateCategory(formData); setEditingCategory(null); }}
                          className="inline-edit-form"
                        >
                          <input type="hidden" name="id" value={cat.id} />
                          <div className="input-group">
                            <label>Nombre</label>
                            <input name="name" defaultValue={cat.name} required className="admin-input" />
                          </div>
                          <div className="input-group">
                            <label>Tipo Visual</label>
                            <select name="type" defaultValue={cat.type} required className="admin-input">
                              <option value="cafe">Cafe</option>
                              <option value="bar">Bar</option>
                              <option value="both">Ambos</option>
                            </select>
                          </div>
                          <div className="input-group">
                            <label>Orden</label>
                            <input name="order_idx" type="number" defaultValue={cat.order_idx ?? 0} className="admin-input" />
                          </div>
                          <div style={{ display: 'flex', gap: '0.5rem', marginTop: '1.25rem' }}>
                            <button type="submit" className="btn-icon btn-save" title="Guardar"><Check size={20} /></button>
                            <button type="button" onClick={() => setEditingCategory(null)} className="btn-icon btn-cancel" title="Cancelar"><X size={20} /></button>
                          </div>
                        </form>
                      </td>

                    ) : (
                      <>
                        <td data-label="Nombre" style={{ fontWeight: 700 }}>{cat.name}</td>
                        <td data-label="Tipo"><span className={`tag-type tag-type-${cat.type}`}>{cat.type}</span></td>
                        <td data-label="Orden" className="hide-mobile" style={{ color: 'var(--admin-text-secondary)' }}>{cat.order_idx}</td>
                        <td data-label="Acciones">
                          <div style={{ display: 'flex', gap: '1.25rem' }}>
                            <button
                              onClick={() => setEditingCategory(cat.id)}
                              style={{ color: 'var(--admin-text-main)', background: 'none', border: 'none', cursor: 'pointer', padding: '0.5rem' }}
                              title="Editar"
                            >
                              <Pencil size={18} />
                            </button>
                            <button
                              type="button"
                              onClick={() => setItemToDelete({ id: cat.id, name: cat.name, type: 'category' })}
                              style={{ color: '#ef4444', background: 'none', border: 'none', cursor: 'pointer', padding: '0.5rem' }}
                              title="Eliminar"
                            >
                              <Trash2 size={18} />
                            </button>
                          </div>
                        </td>
                      </>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeTab === 'products' && (
        <div>
          {/* Add Product */}
          <div className="admin-card">
            <h2 className="title-md" style={{ marginBottom: '1.5rem' }}>Añadir Producto</h2>
            <form action={addProduct} className="form-grid">
              <div className="input-group">
                <label>Nombre</label>
                <input name="name" type="text" required className="admin-input" placeholder="Ej: Cappuccino" />
              </div>
              <div className="input-group">
                <label>Precio</label>
                <input name="price" type="number" step="0.01" required className="admin-input" />
              </div>
              <div className="input-group">
                <label>Categoría</label>
                <select name="category_id" required className="admin-input">
                  <option value="">Seleccionar...</option>
                  {initialCategories.map(cat => (
                    <option key={cat.id} value={cat.id}>{cat.name} ({cat.type})</option>
                  ))}
                </select>
              </div>
              <div className="input-group">
                <label>Tipo Visual</label>
                <select name="type" required className="admin-input">
                  <option value="cafe">Cafe</option>
                  <option value="bar">Bar</option>
                  <option value="both">Ambos</option>
                </select>
              </div>
              <div className="input-group">
                <label>Orden</label>
                <input name="order_idx" type="number" defaultValue="0" className="admin-input" />
              </div>
              <button type="submit" className="btn-admin btn-admin-primary" style={{ height: '48px' }}>
                <Plus size={18} />
                Crear Producto
              </button>
            </form>
          </div>

          {/* List Products */}
          <div style={{ marginBottom: '1.5rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
              <h2 className="title-md" style={{ margin: 0 }}>Listado de Productos</h2>
              <div style={{ display: 'flex', gap: '0.5rem', overflowX: 'auto', paddingBottom: '0.5rem' }}>
                <button type="button" onClick={() => setFilterType('all')} style={{ padding: '0.5rem 1rem', background: filterType === 'all' ? 'var(--admin-text-main)' : '#fff', color: filterType === 'all' ? '#fff' : 'var(--admin-text-main)', border: '1px solid var(--admin-border)', cursor: 'pointer', borderRadius: '20px', fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase' }}>Todos</button>
                <button type="button" onClick={() => setFilterType('cafe')} style={{ padding: '0.5rem 1rem', background: filterType === 'cafe' ? '#fef3c7' : '#fff', color: filterType === 'cafe' ? '#92400e' : 'var(--admin-text-main)', border: filterType === 'cafe' ? '1px solid #fde68a' : '1px solid var(--admin-border)', cursor: 'pointer', borderRadius: '20px', fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase' }}>Cafe</button>
                <button type="button" onClick={() => setFilterType('bar')} style={{ padding: '0.5rem 1rem', background: filterType === 'bar' ? '#fee2e2' : '#fff', color: filterType === 'bar' ? '#991b1b' : 'var(--admin-text-main)', border: filterType === 'bar' ? '1px solid #fecaca' : '1px solid var(--admin-border)', cursor: 'pointer', borderRadius: '20px', fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase' }}>Bar</button>
              </div>
            </div>

            <input
              type="text"
              placeholder="Buscar por nombre..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="admin-input"
              style={{ width: '100%', marginBottom: '1rem' }}
            />
          </div>

          <div style={{ overflowX: 'auto', WebkitOverflowScrolling: 'touch' }}>
            <table className="admin-data-table">
              <thead>
                <tr>
                  <th>Producto</th>
                  <th>Precio</th>
                  <th className="hide-mobile">Categoría</th>
                  <th className="hide-mobile">Tipo</th>
                  <th className="hide-mobile">Orden</th>
                  <th>Disp.</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {filteredProducts.map((prod) => (
                  <tr key={prod.id} style={{ opacity: prod.available ? 1 : 0.6 }}>
                    {editingProduct === prod.id ? (

                      <td colSpan={7}>
                        <form
                          action={(formData) => { updateProduct(formData); setEditingProduct(null); }}
                          className="inline-edit-form"
                        >
                          <input type="hidden" name="id" value={prod.id} />
                          <div className="input-group">
                            <label>Nombre</label>
                            <input name="name" defaultValue={prod.name} required className="admin-input" />
                          </div>
                          <div className="input-group">
                            <label>Precio</label>
                            <input name="price" type="number" step="0.01" defaultValue={prod.price} required className="admin-input" />
                          </div>
                          <div className="input-group">
                            <label>Categoría</label>
                            <select name="category_id" defaultValue={prod.category_id || ""} required className="admin-input">
                              {initialCategories.map(cat => (
                                <option key={cat.id} value={cat.id}>{cat.name}</option>
                              ))}
                            </select>
                          </div>
                          <div className="input-group">
                            <label>Tipo Visual</label>
                            <select name="type" defaultValue={prod.type} required className="admin-input">
                              <option value="cafe">Cafe</option>
                              <option value="bar">Bar</option>
                              <option value="both">Ambos</option>
                            </select>
                          </div>
                          <div className="input-group">
                            <label>Orden</label>
                            <input name="order_idx" type="number" defaultValue={prod.order_idx ?? 0} className="admin-input" />
                          </div>

                          <div className="input-group">
                            <label>Disponibilidad</label>
                            <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', fontSize: '0.85rem', height: '100%' }}>
                              <input name="available" type="checkbox" defaultChecked={prod.available} value="true" style={{ width: '20px', height: '20px' }} />
                              Disponible
                            </label>
                          </div>

                          <div style={{ display: 'flex', gap: '0.5rem', marginTop: '1.25rem' }}>
                            <button type="submit" className="btn-admin btn-admin-primary" title="Guardar"><Check size={20} /></button>
                            <button type="button" onClick={() => setEditingProduct(null)} className="btn-admin btn-admin-secondary" title="Cancelar"><X size={20} /></button>
                          </div>
                        </form>
                      </td>

                    ) : (
                      <>
                        <td data-label="Producto">
                          <div style={{ fontWeight: 700, color: 'var(--admin-text-main)' }}>{prod.name}</div>
                        </td>
                        <td data-label="Precio" style={{ fontWeight: 700, color: 'var(--primary)' }}>${prod.price}</td>
                        <td data-label="Categoría" className="hide-mobile"><span style={{ fontSize: '0.8rem', color: 'var(--admin-text-secondary)', background: '#f1f5f9', padding: '2px 8px', borderRadius: '4px' }}>{prod.categories?.name || 'N/A'}</span></td>
                        <td data-label="Tipo" className="hide-mobile"><span className={`tag-type tag-type-${prod.type}`}>{prod.type}</span></td>
                        <td data-label="Orden" className="hide-mobile">{prod.order_idx}</td>
                        <td data-label="Disp.">
                          <form action={updateProduct}>
                            <input type="hidden" name="id" value={prod.id} />
                            <input type="hidden" name="name" value={prod.name} />
                            <input type="hidden" name="price" value={prod.price} />
                            <input type="hidden" name="category_id" value={prod.category_id || ""} />
                            <input type="hidden" name="type" value={prod.type} />
                            <input type="hidden" name="order_idx" value={prod.order_idx ?? ""} />
                            <label style={{ cursor: 'pointer', display: 'flex', alignItems: 'center' }}>
                              <input
                                type="checkbox"
                                name="available"
                                defaultChecked={prod.available}
                                onChange={(e) => e.target.form?.requestSubmit()}
                                style={{ width: '20px', height: '20px', accentColor: 'var(--primary)' }}
                              />
                            </label>
                          </form>
                        </td>
                        <td data-label="Acciones">
                          <div style={{ display: 'flex', gap: '1.25rem' }}>
                            <button
                              onClick={() => setEditingProduct(prod.id)}
                              style={{ color: 'var(--admin-text-main)', background: 'none', border: 'none', cursor: 'pointer', padding: '0.5rem' }}
                              title="Editar"
                            >
                              <Pencil size={18} />
                            </button>
                            <button
                              type="button"
                              onClick={() => setItemToDelete({ id: prod.id, name: prod.name, type: 'product' })}
                              style={{ color: '#ef4444', background: 'none', border: 'none', cursor: 'pointer', padding: '0.5rem' }}
                              title="Eliminar"
                            >
                              <Trash2 size={18} />
                            </button>
                          </div>
                        </td>
                      </>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Confirmation Modal */}
      {itemToDelete && (
        <div className="modal-overlay" onClick={() => setItemToDelete(null)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <div className="modal-icon-danger">
                <AlertCircle size={24} />
              </div>
              <h3 className="title-md" style={{ margin: 0 }}>¿Estás seguro?</h3>
            </div>
            <p style={{ color: 'var(--admin-text-secondary)', lineHeight: 1.5, margin: 0 }}>
              Estás por eliminar <strong>{itemToDelete.name}</strong>. Esta acción no se puede deshacer.
            </p>
            <div className="modal-actions">
              <button 
                type="button" 
                className="btn-admin btn-admin-secondary" 
                onClick={() => setItemToDelete(null)}
              >
                Cancelar
              </button>
              <button 
                type="button" 
                className="btn-admin btn-admin-primary" 
                style={{ backgroundColor: '#ef4444' }}
                onClick={confirmDelete}
              >
                Eliminar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )

}
