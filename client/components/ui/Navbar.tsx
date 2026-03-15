"use client";

import Link from "next/link";
import Logo from "./Logo";

const Navbar = () => {
  return (
    <nav className="w-full max-w-sm md:max-w-lg mx-auto flex items-center justify-between">
      <Link href="/" className="flex items-center gap-2.5">
        <Logo size={28} />
        <span
          className="text-sm tracking-[0.3em] uppercase"
          style={{ color: "var(--text-secondary)" }}
        >
          Authkit
        </span>
      </Link>

      
      <a  href="https://github.com/SHIVAM-KUMAR-59/authkit"
        target="_blank"
        rel="noopener noreferrer"
        className="text-[11px] tracking-[0.2em] uppercase px-3 py-1.5 transition-colors border rounded-md"
        style={{ color: "var(--text-secondary)", borderColor: "var(--border)" }}
        onMouseEnter={(e) => {
          (e.currentTarget as HTMLElement).style.color = "var(--text-primary)";
          (e.currentTarget as HTMLElement).style.borderColor = "var(--text-secondary)";
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLElement).style.color = "var(--text-secondary)";
          (e.currentTarget as HTMLElement).style.borderColor = "var(--border)";
        }}
      >
        GitHub →
      </a>
    </nav>
  );
};

export default Navbar;