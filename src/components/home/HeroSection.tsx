import { Search, MapPin, Stethoscope, Users, Clock, Sparkles, ShieldCheck } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { specialties, cities } from "@/data/specialties";

export default function HeroSection() {
  const navigate = useNavigate();
  const [specialty, setSpecialty] = useState("");
  const [city, setCity] = useState("");

  const handleSearch = () => {
    const params = new URLSearchParams();
    if (specialty) params.set("specialty", specialty);
    if (city) params.set("city", city);
    navigate(`/doctors?${params.toString()}`);
  };

  return (
    <section className="relative overflow-hidden section-padding">
      <div className="absolute inset-0" style={{ background: "var(--gradient-hero)" }} />
      <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: "radial-gradient(circle, white 1px, transparent 1px)", backgroundSize: "28px 28px" }} />

      <div className="relative container-app">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
          {/* Content Side - Mobile Optimized */}
          <div className="text-center lg:text-right order-2 lg:order-1">
            <div className="inline-flex items-center gap-2 bg-card/10 backdrop-blur-sm rounded-full px-4 py-2.5 mb-6 text-primary-foreground text-sm font-medium border border-card/20">
              <ShieldCheck className="w-4 h-4" />
              <span>منصة رعاية صحية موثوقة في مصر</span>
            </div>

            <h1 className="text-primary-foreground text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-extrabold leading-[1.1] mb-6 text-balance">
              احجز أفضل الأطباء في مصر بسهولة
            </h1>
            <p className="text-primary-foreground/80 text-base lg:text-lg leading-relaxed max-w-xl mx-auto lg:mx-0 mb-8">
              ابحث حسب التخصص والمدينة، قارن التقييمات والأسعار، واحجز موعدك في دقائق معدودة.
            </p>

            {/* Mobile-Optimized Stats */}
            <div className="grid grid-cols-3 gap-3 max-w-sm mx-auto lg:mx-0">
              {[
                { icon: Users, label: "مستخدم نشط", value: "+1M" },
                { icon: Stethoscope, label: "طبيب معتمد", value: "+5K" },
                { icon: Clock, label: "موعد شهرياً", value: "+50K" },
              ].map((stat) => (
                <div key={stat.label} className="bg-card/10 border border-card/20 rounded-2xl p-3 text-center backdrop-blur-sm">
                  <stat.icon className="w-4 h-4 mx-auto mb-2 text-primary-foreground" />
                  <p className="text-primary-foreground font-bold text-sm lg:text-base leading-none">{stat.value}</p>
                  <p className="text-primary-foreground/70 text-[10px] lg:text-xs mt-1">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Search Card - Mobile Enhanced */}
          <div className="order-1 lg:order-2">
            <div className="glass rounded-3xl p-5 lg:p-7 shadow-2xl border-card/30">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                  <Search className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h2 className="text-lg lg:text-xl font-bold">ابحث عن طبيبك الآن</h2>
                  <p className="text-sm text-muted-foreground">تجربة حجز أسرع وأوضح</p>
                </div>
              </div>

              <div className="space-y-4">
                {/* Enhanced Mobile-First Form Fields */}
                <div>
                  <label className="text-sm font-medium text-foreground mb-2 block">التخصص</label>
                  <div className="relative">
                    <Stethoscope className="absolute top-1/2 -translate-y-1/2 right-4 w-5 h-5 text-muted-foreground" />
                    <select 
                      className="select-field text-base pr-12"
                      value={specialty} 
                      onChange={(e) => setSpecialty(e.target.value)}
                    >
                      <option value="">اختر التخصص المطلوب</option>
                      {specialties.map((s) => (
                        <option key={s.id} value={s.id}>{s.name}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium text-foreground mb-2 block">المدينة</label>
                  <div className="relative">
                    <MapPin className="absolute top-1/2 -translate-y-1/2 right-4 w-5 h-5 text-muted-foreground" />
                    <select 
                      className="select-field text-base pr-12"
                      value={city} 
                      onChange={(e) => setCity(e.target.value)}
                    >
                      <option value="">اختر المدينة</option>
                      {cities.map((c) => (
                        <option key={c} value={c}>{c}</option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Enhanced CTA Button */}
                <button 
                  onClick={handleSearch} 
                  className="btn-cta w-full gap-3 mt-6 tap-highlight-none"
                >
                  <Search className="w-5 h-5" />
                  ابدأ البحث الآن
                </button>
              </div>

              {/* Quick Specialty Pills - Mobile Optimized */}
              <div className="mt-6 pt-6 border-t border-border">
                <p className="text-xs text-muted-foreground mb-3">تخصصات شائعة:</p>
                <div className="flex flex-wrap gap-2">
                  {specialties.slice(0, 4).map((spec) => (
                    <button 
                      key={spec.id} 
                      onClick={() => setSpecialty(spec.id)} 
                      className="pill-interactive touch-target text-xs"
                    >
                      {spec.name}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}