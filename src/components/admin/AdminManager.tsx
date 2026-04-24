'use client'

import React, { useState } from 'react'
import { 
  addProduct, updateProduct, deleteProduct, 
  addCategory, updateCategory, deleteCategory 
} from '@/app/admin/actions'

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

  const filteredProducts = initialProducts.filter(prod => {
    const matchesSearch = prod.name.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesType = filterType === 'all' || prod.type === filterType || prod.type === 'both'
    return matchesSearch && matchesType
  })

  return (
    <div style={{ marginTop: '2rem' }}>
      {/* Tabs */}
      <div style={{ 
        display: 'flex', 
        gap: '0.5rem', 
        marginBottom: '2rem', 
        borderBottom: '2px solid var(--surface-container-highest)', 
        paddingBottom: '1rem',
        overflowX: 'auto'
      }}>
        <button 
          onClick={() => setActiveTab('categories')}
          className="btn"
          style={{ 
            padding: '0.75rem 1.25rem', 
            backgroundColor: activeTab === 'categories' ? 'var(--on-surface)' : 'transparent',
            color: activeTab === 'categories' ? 'var(--surface)' : 'var(--on-surface)',
            border: activeTab === 'categories' ? 'none' : '2px solid var(--on-surface)',
            whiteSpace: 'nowrap'
          }}
        >
          Categorías
        </button>
        <button 
          onClick={() => setActiveTab('products')}
          className="btn"
          style={{ 
            padding: '0.75rem 1.25rem', 
            backgroundColor: activeTab === 'products' ? 'var(--on-surface)' : 'transparent',
            color: activeTab === 'products' ? 'var(--surface)' : 'var(--on-surface)',
            border: activeTab === 'products' ? 'none' : '2px solid var(--on-surface)',
            whiteSpace: 'nowrap'
          }}
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
              <button type="submit" className="btn btn-primary" style={{ padding: '0.75rem 1.5rem', backgroundColor: 'var(--on-surface)', color: 'var(--surface)', borderRadius: '4px' }}>Añadir</button>
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
                          <input name="name" defaultValue={cat.name} required className="admin-input" style={{ flex: 1, minWidth: '150px' }} />
                          <select name="type" defaultValue={cat.type} required className="admin-input">
                            <option value="cafe">Cafe</option>
                            <option value="bar">Bar</option>
                            <option value="both">Ambos</option>
                          </select>
                          <input name="order_idx" type="number" defaultValue={cat.order_idx ?? 0} className="admin-input" style={{ width: '80px' }} />
                          <button type="submit" style={{ padding: '0.5rem 1rem', backgroundColor: 'var(--on-surface)', color: 'var(--surface)', border: 'none', cursor: 'pointer', borderRadius: '4px' }}>Guardar</button>
                          <button type="button" onClick={() => setEditingCategory(null)} style={{ padding: '0.5rem 1rem', cursor: 'pointer', background: 'none', border: '1px solid var(--on-surface-variant)', borderRadius: '4px' }}>Cancelar</button>
                        </form>
                      </td>

                    ) : (
                      <>
                        <td>{cat.name}</td>
                        <td><span style={{ textTransform: 'capitalize', fontSize: '0.85rem' }}>{cat.type}</span></td>
                        <td className="hide-mobile">{cat.order_idx}</td>
                        <td>
                          <div style={{ display: 'flex', gap: '1rem' }}>
                            <button onClick={() => setEditingCategory(cat.id)} style={{ color: 'var(--on-surface)', background: 'none', border: 'none', textDecoration: 'underline', cursor: 'pointer', fontSize: '0.875rem' }}>Editar</button>
                            <form action={deleteCategory}>
                              <input type="hidden" name="id" value={cat.id} />
                              <button type="submit" style={{ color: 'var(--primary)', background: 'none', border: 'none', textDecoration: 'underline', cursor: 'pointer', fontSize: '0.875rem' }}>Eliminar</button>
                            </form>
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
              <button type="submit" className="btn" style={{ padding: '0.75rem 1.5rem', backgroundColor: 'var(--on-surface)', color: 'var(--surface)', borderRadius: '4px' }}>Añadir</button>
            </form>
          </div>

          {/* List Products */}
          <div style={{ marginBottom: '1.5rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
              <h2 className="title-md" style={{ margin: 0 }}>Listado de Productos</h2>
              <div style={{ display: 'flex', gap: '0.5rem', overflowX: 'auto', paddingBottom: '0.5rem' }}>
                <button type="button" onClick={() => setFilterType('all')} style={{ padding: '0.5rem 1rem', background: filterType === 'all' ? 'var(--on-surface)' : 'transparent', color: filterType === 'all' ? 'var(--surface)' : 'var(--on-surface)', border: '1px solid var(--on-surface)', cursor: 'pointer', borderRadius: '4px', fontSize: '0.85rem' }}>Todos</button>
                <button type="button" onClick={() => setFilterType('cafe')} style={{ padding: '0.5rem 1rem', background: filterType === 'cafe' ? 'var(--on-surface)' : 'transparent', color: filterType === 'cafe' ? 'var(--surface)' : 'var(--on-surface)', border: '1px solid var(--on-surface)', cursor: 'pointer', borderRadius: '4px', fontSize: '0.85rem' }}>Cafe</button>
                <button type="button" onClick={() => setFilterType('bar')} style={{ padding: '0.5rem 1rem', background: filterType === 'bar' ? 'var(--on-surface)' : 'transparent', color: filterType === 'bar' ? 'var(--surface)' : 'var(--on-surface)', border: '1px solid var(--on-surface)', cursor: 'pointer', borderRadius: '4px', fontSize: '0.85rem' }}>Bar</button>
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

                      <td colSpan={7} style={{ padding: '1rem' }}>
                        <form 
                          action={(formData) => { updateProduct(formData); setEditingProduct(null); }} 
                          className="inline-edit-form"
                        >
                          <input type="hidden" name="id" value={prod.id} />
                          <input name="name" defaultValue={prod.name} required className="admin-input" style={{ flex: '1 1 150px' }} />
                          <input name="price" type="number" step="0.01" defaultValue={prod.price} required className="admin-input" style={{ width: '90px' }} />
                          <select name="category_id" defaultValue={prod.category_id || ""} required className="admin-input" style={{ flex: '1 1 150px' }}>
                            {initialCategories.map(cat => (
                              <option key={cat.id} value={cat.id}>{cat.name}</option>
                            ))}
                          </select>
                          <select name="type" defaultValue={prod.type} required className="admin-input">
                            <option value="cafe">Cafe</option>
                            <option value="bar">Bar</option>
                            <option value="both">Ambos</option>
                          </select>
                          <input name="order_idx" type="number" defaultValue={prod.order_idx ?? 0} className="admin-input" style={{ width: '60px' }} />
                          
                          <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', fontSize: '0.85rem' }}>
                            <input name="available" type="checkbox" defaultChecked={prod.available} value="true" style={{ width: '18px', height: '18px' }} />
                            Disp.
                          </label>

                          <button type="submit" style={{ padding: '0.5rem 1rem', backgroundColor: 'var(--on-surface)', color: 'var(--surface)', border: 'none', cursor: 'pointer', borderRadius: '4px' }}>Guardar</button>
                          <button type="button" onClick={() => setEditingProduct(null)} style={{ padding: '0.5rem 1rem', cursor: 'pointer', background: 'none', border: '1px solid var(--on-surface-variant)', borderRadius: '4px' }}>Cancelar</button>
                        </form>
                      </td>

                    ) : (
                      <>
                        <td>
                          <div style={{ fontWeight: 500 }}>{prod.name}</div>
                        </td>
                        <td>${prod.price}</td>
                        <td className="hide-mobile"><span style={{ fontSize: '0.85rem', color: 'var(--on-surface-variant)' }}>{prod.categories?.name || 'N/A'}</span></td>
                        <td className="hide-mobile"><span style={{ textTransform: 'capitalize', fontSize: '0.85rem' }}>{prod.type}</span></td>
                        <td className="hide-mobile">{prod.order_idx}</td>
                        <td>
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
                                style={{ width: '18px', height: '18px' }}
                              />
                            </label>
                          </form>
                        </td>
                        <td>
                          <div style={{ display: 'flex', gap: '0.75rem' }}>
                            <button onClick={() => setEditingProduct(prod.id)} style={{ color: 'var(--on-surface)', background: 'none', border: 'none', textDecoration: 'underline', cursor: 'pointer', fontSize: '0.875rem' }}>Editar</button>
                            <form action={deleteProduct}>
                              <input type="hidden" name="id" value={prod.id} />
                              <button type="submit" style={{ color: 'var(--primary)', background: 'none', border: 'none', textDecoration: 'underline', cursor: 'pointer', fontSize: '0.875rem' }}>Eliminar</button>
                            </form>
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
    </div>
  )

}
