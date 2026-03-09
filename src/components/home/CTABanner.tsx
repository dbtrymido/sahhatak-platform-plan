import { Link } from "react-router-dom";
import { ArrowLeft, Sparkles } from "lucide-react";

export default function CTABanner() {
  return (
    <section className="py-14 lg:py-18">
      <div className="container-app">
        <div className="relative rounded-3xl overflow-hidden p-8 lg:p-14 text-center" style={{ background: "var(--gradient-cta)" }}>
          <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: "radial-gradient(circle, white 1px, transparent 1px)", backgroundSize: "28px 28px" }} />

          <div className="relative">
            <div className="inline-flex items-center gap-2 bg-card/10 backdrop-blur-sm rounded-full px-4 py-2 mb-5 text-primary-foreground text-sm font-medium border border-card/20">
              <Sparkles className="w-4 h-4" />
              <span>انضم لأكتر من مليون مستخدم</span>
            </div>

            <h2 className="text-3xl lg:text-4xl font-extrabold text-primary-foreground mb-4 text-balance">
              ابدأ رحلتك لحياة صحية أفضل
            </h2>
            <p className="text-base lg:text-lg text-primary-foreground/80 mb-8 max-w-lg mx-auto leading-relaxed">
              صحتك بين إيديك... احجز دكتورك دلوقتي وبالشفا! 💙
            </p>

            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link to="/doctors" className="inline-flex items-center justify-center gap-2 rounded-xl bg-card px-7 py-3.5 text-sm font-bold text-primary hover-lift">
                احجز موعدك الآن
                <ArrowLeft className="w-4 h-4" />
              </Link>
              <Link to="/register" className="inline-flex items-center justify-center gap-2 rounded-xl border-2 border-card/40 px-7 py-3.5 text-sm font-semibold text-primary-foreground hover:bg-card/10 transition-colors">
                سجّل حساب مجاني
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
