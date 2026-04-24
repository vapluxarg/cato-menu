import { supabase } from "@/lib/supabase";
import "./menu.css";
import Link from "next/link";
import Image from "next/image";
import BackgroundPattern from "./BackgroundPattern";
import CollapsibleCategory from "./CollapsibleCategory";

type PublicMenuProps = {
  theme: "cafe" | "bar";
};

export default async function PublicMenu({ theme }: PublicMenuProps) {
  const [categoriesResponse, productsResponse] = await Promise.all([
    supabase
      .from("categories")
      .select("*")
      .in("type", [theme, "both"])
      .order("order_idx"),
    supabase
      .from("products")
      .select("*")
      .in("type", [theme, "both"])
      .order("order_idx")
  ]);

  const categories = categoriesResponse.data;
  const products = productsResponse.data;


  return (
    <main className={`public-menu-container theme-${theme}`}>
      <BackgroundPattern />
      <nav className="glass-nav">
        <Link href="/" className="back-link btn">
          ← VOLVER
        </Link>
        <Image src="/cato.svg" alt="Cato Logo" width={100} height={40} className="nav-logo" />
      </nav>
      
      <header className="menu-header">
        <h1 className="display-lg main-title">MENU</h1>
      </header>

      <section className="menu-categories">
        {categories?.length === 0 && (
          <p className="body-md empty-state">No hay productos disponibles.</p>
        )}
        {categories?.map((cat) => {
          const catProducts = products?.filter(p => p.category_id === cat.id && p.available === true) || [];
          return (
            <CollapsibleCategory 
              key={cat.id} 
              category={cat} 
              products={catProducts} 
            />
          );
        })}
      </section>
    </main>
  );
}
