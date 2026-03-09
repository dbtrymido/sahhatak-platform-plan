import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

export default function CTABanner() {
  return (
    <section className="py-16 lg:py-20">
      <div className="container-app">
        <div className="relative rounded-3xl overflow-hidden p-10 lg:p-16 text-center" style={{ background: "var(--gradient-cta)" }}>
          {/* Decorative */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute -top-20 -left-20 w-64 h-64 rounded-full bg-white/5" />
            <div className="absolute -bottom-16 -right-16 w-48 h-48 rounded-full bg-white/5" />
          </div>

          <div className="relative">
            <h2 className="text-2xl lg:text-4xl font-extrabold text-white mb-4 tracking-tight">
              ابدأ رحلتك نحو حياة صحية أفضل
            </h2>
            <p className="text-base lg:text-lg text-white/70 mb-10 max-w-lg mx-auto leading-relaxed">
              انضم إلى أكثر من مليون مستخدم يثقون في "صحتك" لرعايتهم الطبية.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                to="/doctors"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-white px-8 py-4 text-sm font-bold text-primary transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5"
              >
                احجز موعدك الآن
                <ArrowLeft className="w-4 h-4" />
              </Link>
              <Link
                to="/register"
                className="inline-flex items-center justify-center gap-2 rounded-xl border-2 border-white/30 px-8 py-4 text-sm font-semibold text-white transition-all duration-200 hover:bg-white/10"
              >
                إنشاء حساب مجاني
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
