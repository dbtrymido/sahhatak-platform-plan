import { Link } from "react-router-dom";
import { Phone, Mail, MapPin, Heart, Facebook, Twitter, Instagram, Linkedin } from "lucide-react";
import { Logo } from "@/components/shared/Logo";

const quickLinks = [
  { label: "عن صحتك", path: "/" },
  { label: "دوّر على دكتور", path: "/doctors" },
  { label: "الصيدلية أونلاين", path: "/pharmacies" },
  { label: "المدونة الطبية", path: "#" },
];

const supportLinks = [
  { label: "الأسئلة الشائعة", path: "#" },
  { label: "اتصل بينا", path: "#" },
  { label: "شروط الاستخدام", path: "#" },
  { label: "سياسة الخصوصية", path: "#" },
];

const socialLinks = [
  { icon: Facebook, href: "#", label: "Facebook" },
  { icon: Twitter, href: "#", label: "Twitter" },
  { icon: Instagram, href: "#", label: "Instagram" },
  { icon: Linkedin, href: "#", label: "LinkedIn" },
];

export default function Footer() {
  return (
    <footer className="bg-foreground text-primary-foreground">
      <div className="container-app py-8 sm:py-10">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 sm:gap-8">
          {/* Brand */}
          <div className="col-span-2 sm:col-span-1">
            <div className="mb-3">
              <Logo light />
            </div>
            <p className="text-xs opacity-70 leading-relaxed mb-3 max-w-[200px]">
              أكبر شبكة طبية في مصر 🇪🇬 بنسهّل عليك توصل لأحسن دكاترة 💙
            </p>
            <div className="flex items-center gap-1.5">
              {socialLinks.map((social) => (
                <a key={social.label} href={social.href} className="w-8 h-8 rounded-lg bg-primary-foreground/10 flex items-center justify-center hover:bg-primary-foreground/20 transition-colors" aria-label={social.label}>
                  <social.icon className="w-3.5 h-3.5" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold mb-3 text-sm">روابط سريعة</h4>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <Link to={link.path} className="text-xs opacity-70 hover:opacity-100 transition-opacity">{link.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="font-bold mb-3 text-sm">الدعم</h4>
            <ul className="space-y-2">
              {supportLinks.map((link) => (
                <li key={link.label}>
                  <Link to={link.path} className="text-xs opacity-70 hover:opacity-100 transition-opacity">{link.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-bold mb-3 text-sm">تواصل معانا</h4>
            <ul className="space-y-2">
              <li className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 opacity-70" />
                <span className="text-xs opacity-70">القاهرة، مصر</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 opacity-70" />
                <span className="text-xs opacity-70" dir="ltr">19XXX</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 opacity-70" />
                <span className="text-xs opacity-70">support@sehatuk.com</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom */}
      <div className="border-t border-primary-foreground/10">
        <div className="container-app py-4 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs opacity-60">
          <span>© 2024 منصة صحتك الطبية.</span>
          <span className="flex items-center gap-1">صُنع بـ <Heart className="w-3 h-3 fill-current text-red-400" /> في مصر 🇪🇬</span>
        </div>
      </div>
    </footer>
  );
}
