import { Search, MapPin, Stethoscope, Users, Clock, ShieldCheck } from "lucide-react";
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
    <section className="relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0" style={{ background: "var(--gradient-hero)" }} />
      <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: "radial-gradient(circle, white 1px, transparent 1px)", backgroundSize: "24px 24px" }} />

      <div className="relative container-app pt-8 pb-20 sm:pt-12 sm:pb-24 lg:pt-14 lg:pb-28">
        {/* Centered Content */}
        <div className="text-center max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-1.5 bg-card/10 backdrop-blur-sm rounded-full px-3 py-1.5 text-primary-foreground text-xs font-medium border border-card/20 mb-4">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>منصة رعاية صحية موثوقة في مصر</span>
          </div>

          <h1 className="text-primary-foreground text-2xl sm:text-3xl lg:text-5xl font-extrabold leading-tight mb-3 lg:mb-4">
            احجز أفضل الأطباء في مصر بسهولة
          </h1>

          <p className="text-primary-foreground/80 text-sm sm:text-base lg:text-lg leading-relaxed max-w-lg mx-auto mb-6">
            ابحث حسب التخصص والمدينة، قارن التقييمات والأسعار، واحجز موعدك في دقائق.
          </p>

          {/* Stats */}
          <div className="flex justify-center gap-4 sm:gap-6">
            {[
              { icon: Users, label: "مستخدم نشط", value: "+1M" },
              { icon: Stethoscope, label: "طبيب معتمد", value: "+5K" },
              { icon: Clock, label: "موعد شهرياً", value: "+50K" },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="text-primary-foreground font-bold text-base sm:text-lg leading-none">{stat.value}</p>
                <p className="text-primary-foreground/60 text-[10px] sm:text-xs mt-0.5">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Search Card — overlapping the hero bottom */}
      <div className="relative container-app -mt-12 sm:-mt-14 pb-6 sm:pb-8">
        <div className="bg-card rounded-2xl shadow-xl border border-border/50 p-4 sm:p-5 max-w-3xl mx-auto">
          {/* Desktop: inline row */}
          <div className="hidden sm:flex items-end gap-3">
            <div className="flex-1">
              <label className="text-xs font-medium text-muted-foreground mb-1 block">التخصص</label>
              <div className="relative">
                <Stethoscope className="absolute top-1/2 -translate-y-1/2 right-3 w-4 h-4 text-muted-foreground" />
                <select
                  className="select-field text-sm pr-10 py-2.5"
                  value={specialty}
                  onChange={(e) => setSpecialty(e.target.value)}
                >
                  <option value="">اختر التخصص</option>
                  {specialties.map((s) => (
                    <option key={s.id} value={s.id}>{s.name}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="flex-1">
              <label className="text-xs font-medium text-muted-foreground mb-1 block">المدينة</label>
              <div className="relative">
                <MapPin className="absolute top-1/2 -translate-y-1/2 right-3 w-4 h-4 text-muted-foreground" />
                <select
                  className="select-field text-sm pr-10 py-2.5"
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

            <button onClick={handleSearch} className="btn-primary px-6 py-2.5 shrink-0">
              <Search className="w-4 h-4" />
              ابحث
            </button>
          </div>

          {/* Mobile: stacked */}
          <div className="sm:hidden space-y-3">
            <div>
              <label className="text-xs font-medium text-muted-foreground mb-1 block">التخصص</label>
              <div className="relative">
                <Stethoscope className="absolute top-1/2 -translate-y-1/2 right-3 w-4 h-4 text-muted-foreground" />
                <select
                  className="select-field text-sm pr-10 py-2.5"
                  value={specialty}
                  onChange={(e) => setSpecialty(e.target.value)}
                >
                  <option value="">اختر التخصص</option>
                  {specialties.map((s) => (
                    <option key={s.id} value={s.id}>{s.name}</option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="text-xs font-medium text-muted-foreground mb-1 block">المدينة</label>
              <div className="relative">
                <MapPin className="absolute top-1/2 -translate-y-1/2 right-3 w-4 h-4 text-muted-foreground" />
                <select
                  className="select-field text-sm pr-10 py-2.5"
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

            <button onClick={handleSearch} className="btn-primary w-full py-3 text-sm">
              <Search className="w-4 h-4" />
              ابدأ البحث
            </button>
          </div>

          {/* Quick Pills */}
          <div className="mt-3 pt-3 border-t border-border/50 flex items-center gap-2 flex-wrap">
            <span className="text-[11px] text-muted-foreground">شائع:</span>
            {specialties.slice(0, 4).map((spec) => (
              <button
                key={spec.id}
                onClick={() => setSpecialty(spec.id)}
                className="text-[11px] px-2.5 py-1 rounded-full bg-muted text-muted-foreground hover:bg-primary/10 hover:text-primary transition-colors"
              >
                {spec.name}
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
