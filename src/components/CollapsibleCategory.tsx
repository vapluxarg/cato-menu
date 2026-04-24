"use client";

import React, { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

type Product = {
  id: string;
  name: string;
  price: number;
};

type CollapsibleCategoryProps = {
  category: {
    id: string;
    name: string;
  };
  products: Product[];
};

export default function CollapsibleCategory({ category, products }: CollapsibleCategoryProps) {
  const [isOpen, setIsOpen] = useState(true);

  if (products.length === 0) return null;

  return (
    <div className="category-block surface-low">
      <div 
        className="category-header-row" 
        onClick={() => setIsOpen(!isOpen)}
        style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", cursor: "pointer", userSelect: "none" }}
      >
        <h2 className="headline-lg category-title" style={{ marginBottom: isOpen ? "1rem" : "0", marginTop: "0" }}>
          {category.name}
        </h2>
        <div className="category-toggle-icon">
          {isOpen ? <ChevronUp size={32} /> : <ChevronDown size={32} />}
        </div>
      </div>
      
      {isOpen && (
        <div className="product-list">
          {products.map(prod => (
            <div key={prod.id} className="product-item">
              <span className="product-name body-md">{prod.name}</span>
              <span className="product-price label-md">${prod.price}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
