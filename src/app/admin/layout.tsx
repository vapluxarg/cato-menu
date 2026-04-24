'use client'

import Link from "next/link";
import "./admin.css";
import Image from "next/image";
import { signOut } from "./actions";
import { useRouter } from "next/navigation";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter()

  const handleLogout = async () => {
    await signOut()
    router.push('/admin/login')
    router.refresh()
  }

  return (
    <div className="admin-container">
      <header className="admin-header">
         <div className="header-inner">
           <Link href="/admin" className="admin-logo">
             <Image src="/cato.svg" alt="Cato Logo" width={100} height={40} />
           </Link>
           
           <nav className="admin-nav">
             <Link href="/admin" className="label-md">Panel</Link>
             <Link href="/admin/export" className="label-md" style={{ color: 'var(--primary)' }}>Exportar</Link>
             <Link href="/" className="label-md" style={{ opacity: 0.5 }}>Sitio</Link>
             <button onClick={handleLogout} className="label-md logout-btn" style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--primary)', fontWeight: 'bold' }}>Salir</button>
           </nav>
        </div>
      </header>
      <main className="admin-content">
        {children}
      </main>
    </div>
  );
}

