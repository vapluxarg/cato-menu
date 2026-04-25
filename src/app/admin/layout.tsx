'use client'

import Link from "next/link";
import "./admin.css";
import Image from "next/image";
import { signOut } from "./actions";
import { useRouter, usePathname } from "next/navigation";
import { Menu, X, LogOut, ChevronRight } from "lucide-react";
import { useState, useEffect } from "react";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter()
  const pathname = usePathname()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  // Close menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false)
  }, [pathname])

  const handleLogout = async () => {
    await signOut()
    router.push('/admin/login')
    router.refresh()
  }

  const navLinks = [
    { href: '/admin', label: 'Panel', className: '' },
    { href: '/admin/export', label: 'Exportar', className: 'nav-link-primary' },
    { href: '/', label: 'Sitio', className: 'nav-link-muted' },
  ]

  return (
    <div className="admin-container">
      <header className="admin-header">
         <div className="header-inner">
           <Link href="/admin" className="admin-logo">
             <Image src="/cato.svg" alt="Cato Logo" width={100} height={40} />
           </Link>
           
           <nav className="admin-nav">
             {navLinks.map(link => (
                <Link key={link.href} href={link.href} className={`label-md ${link.className}`}>
                  {link.label}
                </Link>
             ))}
             <button onClick={handleLogout} className="label-md logout-btn">Salir</button>
           </nav>

           <button className="mobile-nav-toggle" onClick={() => setIsMobileMenuOpen(true)}>
             <Menu size={24} />
           </button>
        </div>
      </header>

      {isMobileMenuOpen && (
        <div className="mobile-menu-overlay" onClick={() => setIsMobileMenuOpen(false)}>
          <div className="mobile-menu-content" onClick={e => e.stopPropagation()}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
              <span className="title-md">Navegación</span>
              <button onClick={() => setIsMobileMenuOpen(false)} style={{ background: 'none', border: 'none' }}><X size={24} /></button>
            </div>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {navLinks.map(link => (
                <Link 
                  key={link.href} 
                  href={link.href} 
                  style={{ 
                    display: 'flex', 
                    justifyContent: 'space-between', 
                    alignItems: 'center', 
                    padding: '1rem', 
                    borderRadius: '8px',
                    background: pathname === link.href ? '#f1f5f9' : 'transparent',
                    fontWeight: 600
                  }}
                  className={link.className}
                >
                  {link.label}
                  <ChevronRight size={18} opacity={0.3} />
                </Link>
              ))}
              
              <button 
                onClick={handleLogout} 
                style={{ 
                  marginTop: '1rem', 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: '0.75rem', 
                  padding: '1rem', 
                  color: '#ef4444', 
                  fontWeight: 'bold',
                  background: 'none',
                  border: '1px solid #fee2e2',
                  borderRadius: '8px',
                  width: '100%',
                  justifyContent: 'center'
                }}
              >
                <LogOut size={18} />
                Cerrar Sesión
              </button>
            </div>
          </div>
        </div>
      )}

      <main className="admin-content">
        {children}
      </main>
    </div>
  );
}

