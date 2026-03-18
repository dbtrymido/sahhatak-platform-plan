import { Link } from "react-router-dom";
import { ArrowLeft, Sparkles } from "lucide-react";

export default function CTABanner() {
  return (
    <section className="py-8 sm:py-10 lg:py-12">
      <div className="container-app">
        <div className="relative rounded-2xl overflow-hidden p-6 sm:p-8 lg:p-10 text-center" style={{ background: "var(--gradient-cta)" }}>
          <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: "radial-gradient(circle, white 1px, transparent 1px)", backgroundSize: "28px 28px" }} />

          <div className="relative">
            <div className="inline-flex items-center gap-1.5 bg-card/10 backdrop-blur-sm rounded-full px-3 py-1.5 mb-3 text-primary-foreground text-xs font-medium border border-card/20">
              <Sparkles className="w-3.5 h-3.5" />
              <span>أكثر من مليون مستخدم</span>
            </div>

            <h2 className="text-xl sm:text-2xl lg:text-3xl xl:text-4xl font-extrabold text-primary-foreground mb-2 lg:mb-3">
              ابدأ رحلتك لحياة صحية أفضل
            </h2>
            <p className="text-sm lg:text-base text-primary-foreground/80 mb-5 lg:mb-7 max-w-md mx-auto">
              صحتك بين إيديك... احجز دكتورك دلوقتي! 💙
            </p>

            <div className="flex flex-col sm:flex-row gap-2 justify-center">
              <Link to="/doctors" className="inline-flex items-center justify-center gap-2 rounded-xl bg-card px-5 py-2.5 text-sm font-bold text-primary hover:scale-105 transition-transform">
                احجز موعدك الآن
                <ArrowLeft className="w-4 h-4" />
              </Link>
              <Link to="/register" className="inline-flex items-center justify-center gap-2 rounded-xl border-2 border-card/40 px-5 py-2.5 text-sm font-medium text-primary-foreground hover:bg-card/10 transition-colors">
                سجّل مجاناً
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
