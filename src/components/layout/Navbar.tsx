import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { Logo } from "@/components/shared/Logo";

const navLinks = [
  { label: "الرئيسية", path: "/" },
  { label: "الأطباء", path: "/doctors" },
  { label: "الصيدليات", path: "/pharmacies" },
  { label: "المواعيد", path: "/dashboard" },
  { label: "المقالات الصحية", path: "#" },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="sticky top-0 z-50 bg-card/95 backdrop-blur-lg border-b border-border/50">
      <div className="container-app">
        <div className="flex items-center justify-between h-16 lg:h-[4.5rem]">
          <Link to="/" className="shrink-0 hover-lift">
            <Logo />
          </Link>

          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link key={link.path} to={link.path} className={`nav-link ${isActive(link.path) ? "active" : ""}`}>
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="hidden lg:flex items-center gap-3">
            <Link to="/login" className="btn-ghost text-sm px-5 py-2.5 border border-border/80 rounded-xl hover:border-primary/30">
              تسجيل الدخول
            </Link>
            <Link to="/register" className="btn-primary text-sm px-6 py-2.5">
              إنشاء حساب
            </Link>
          </div>

          <button
            className="lg:hidden p-2.5 text-foreground rounded-xl hover:bg-muted transition-colors"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label={mobileOpen ? "إغلاق القائمة" : "فتح القائمة"}
          >
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      <div className={`lg:hidden overflow-hidden transition-all duration-300 ease-out ${mobileOpen ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"}`}>
        <div className="border-t border-border/50 bg-card">
          <nav className="container-app py-4 flex flex-col gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`nav-link block py-3 ${isActive(link.path) ? "active" : ""}`}
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <hr className="border-border my-3" />
            <div className="flex flex-col gap-2 pt-2">
              <Link to="/login" className="btn-ghost border border-border text-center text-sm rounded-xl py-3" onClick={() => setMobileOpen(false)}>
                تسجيل الدخول
              </Link>
              <Link to="/register" className="btn-primary text-center text-sm py-3" onClick={() => setMobileOpen(false)}>
                إنشاء حساب
              </Link>
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
}
