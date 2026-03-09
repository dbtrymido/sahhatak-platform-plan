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
    <section className="relative overflow-hidden py-14 lg:py-20">
      <div className="absolute inset-0" style={{ background: "var(--gradient-hero)" }} />
      <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: "radial-gradient(circle, white 1px, transparent 1px)", backgroundSize: "28px 28px" }} />

      <div className="relative container-app">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-14 items-center">
          <div className="text-right">
            <div className="inline-flex items-center gap-2 bg-card/10 backdrop-blur-sm rounded-full px-4 py-2 mb-6 text-primary-foreground text-sm font-medium border border-card/20">
              <ShieldCheck className="w-4 h-4" />
              <span>منصة رعاية صحية موثوقة في مصر</span>
            </div>

            <h1 className="text-primary-foreground text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-[1.1] mb-5 text-balance">
              احجز أفضل الأطباء في مصر بسهولة
            </h1>
            <p className="text-primary-foreground/80 text-lg leading-relaxed max-w-xl mb-8">
              ابحث حسب التخصص والمدينة، قارن التقييمات والأسعار، واحجز موعدك في دقائق.
            </p>

            <div className="grid grid-cols-3 gap-3 max-w-xl">
              {[
                { icon: Users, label: "مستخدم نشط", value: "+1M" },
                { icon: Stethoscope, label: "طبيب معتمد", value: "+5K" },
                { icon: Clock, label: "موعد شهرياً", value: "+50K" },
              ].map((stat) => (
                <div key={stat.label} className="bg-card/10 border border-card/20 rounded-2xl p-3 text-center backdrop-blur-sm">
                  <stat.icon className="w-4 h-4 mx-auto mb-1.5 text-primary-foreground" />
                  <p className="text-primary-foreground font-bold text-lg leading-none">{stat.value}</p>
                  <p className="text-primary-foreground/70 text-[11px] mt-1">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="glass rounded-3xl p-5 lg:p-7 shadow-xl border-card/30">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                <Search className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h2 className="text-lg font-bold">ابحث عن طبيبك الآن</h2>
                <p className="text-sm text-muted-foreground">تجربة حجز أسرع وأوضح</p>
              </div>
            </div>

            <div className="space-y-3.5">
              <div>
                <label className="text-sm font-medium text-foreground mb-1.5 block">التخصص</label>
                <div className="relative">
                  <Stethoscope className="absolute top-1/2 -translate-y-1/2 right-3.5 w-4 h-4 text-muted-foreground" />
                  <select className="select-field" value={specialty} onChange={(e) => setSpecialty(e.target.value)}>
                    <option value="">اختر التخصص المطلوب</option>
                    {specialties.map((s) => (
                      <option key={s.id} value={s.id}>{s.name}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="text-sm font-medium text-foreground mb-1.5 block">المدينة</label>
                <div className="relative">
                  <MapPin className="absolute top-1/2 -translate-y-1/2 right-3.5 w-4 h-4 text-muted-foreground" />
                  <select className="select-field" value={city} onChange={(e) => setCity(e.target.value)}>
                    <option value="">اختر المدينة</option>
                    {cities.map((c) => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>
              </div>

              <button onClick={handleSearch} className="w-full btn-primary py-3.5 text-base mt-1">
                <Search className="w-5 h-5" />
                ابدأ البحث الآن
              </button>
            </div>

            <div className="mt-5 pt-5 border-t border-border">
              <p className="text-xs text-muted-foreground mb-2">تخصصات شائعة:</p>
              <div className="flex flex-wrap gap-2">
                {specialties.slice(0, 4).map((spec) => (
                  <button key={spec.id} onClick={() => setSpecialty(spec.id)} className="pill-interactive">
                    {spec.name}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
