import Image from "next/image";
import Link from "next/link";
import { Coffee, Martini } from "lucide-react";
import BackgroundPattern from "@/components/BackgroundPattern";
import "./home.css";

const InstagramIcon = ({ size = 24 }: { size?: number }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);

export default function Home() {
  return (
    <main className="home-container">
      {/* Seamless Minimalist Background Pattern */}
      <BackgroundPattern />

      <div className="home-content">
        <div className="home-logo-container">
          <Image src="/cato.svg" alt="Cato Logo" width={400} height={160} className="logo-img" priority />
        </div>
        
        <div className="home-actions">
          <Link href="/cafe" className="home-action-btn cafe-action-btn" prefetch={true}>
            <Coffee size={24} />
            <span className="title-lg">Cafetería</span>
          </Link>
          <Link href="/bar" className="home-action-btn bar-action-btn" prefetch={true}>
            <Martini size={24} />
            <span className="title-lg">Bar</span>
          </Link>
        </div>
      </div>

      <footer className="home-footer">
        <a href="https://www.instagram.com/cato.cafe/" target="_blank" rel="noopener noreferrer" className="instagram-link">
          <InstagramIcon size={32} />
        </a>
      </footer>
    </main>
  );
}
