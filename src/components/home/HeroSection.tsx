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
    <section className="relative overflow-hidden py-6 sm:py-10 lg:py-14">
      <div className="absolute inset-0" style={{ background: "var(--gradient-hero)" }} />
      <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: "radial-gradient(circle, white 1px, transparent 1px)", backgroundSize: "28px 28px" }} />

      <div className="relative container-app">
        {/* Mobile: Stacked layout with headline first */}
        <div className="lg:hidden space-y-5">
          {/* Badge + Headline */}
          <div className="text-center">
            <div className="inline-flex items-center gap-1.5 bg-card/10 backdrop-blur-sm rounded-full px-3 py-1.5 text-primary-foreground text-xs font-medium border border-card/20 mb-3">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>منصة رعاية صحية موثوقة</span>
            </div>
            <h1 className="text-primary-foreground text-2xl sm:text-3xl font-extrabold leading-tight mb-2">
              احجز أفضل الأطباء<br />في مصر بسهولة
            </h1>
            <p className="text-primary-foreground/80 text-sm leading-relaxed max-w-xs mx-auto">
              ابحث حسب التخصص والمدينة واحجز موعدك في دقائق.
            </p>
          </div>

          {/* Stats Row */}
          <div className="flex justify-center gap-3">
            {[
              { icon: Users, label: "مستخدم", value: "+1M" },
              { icon: Stethoscope, label: "طبيب", value: "+5K" },
              { icon: Clock, label: "موعد/شهر", value: "+50K" },
            ].map((stat) => (
              <div key={stat.label} className="bg-card/10 border border-card/20 rounded-xl px-3 py-2 text-center backdrop-blur-sm">
                <p className="text-primary-foreground font-bold text-sm leading-none">{stat.value}</p>
                <p className="text-primary-foreground/70 text-[10px] mt-0.5">{stat.label}</p>
              </div>
            ))}
          </div>

          {/* Search Card */}
          <div className="bg-card rounded-2xl p-4 shadow-xl">
            <div className="space-y-3">
              <div>
                <label className="text-xs font-medium text-foreground mb-1.5 block">التخصص</label>
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
                <label className="text-xs font-medium text-foreground mb-1.5 block">المدينة</label>
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
            <div className="mt-3 pt-3 border-t border-border">
              <div className="flex flex-wrap gap-1.5">
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
        </div>

        {/* Desktop: Side by side */}
        <div className="hidden lg:grid lg:grid-cols-2 gap-12 items-center">
          {/* Content Side */}
          <div className="text-right">
            <div className="inline-flex items-center gap-2 bg-card/10 backdrop-blur-sm rounded-full px-4 py-2 mb-4 text-primary-foreground text-sm font-medium border border-card/20">
              <ShieldCheck className="w-4 h-4" />
              <span>منصة رعاية صحية موثوقة في مصر</span>
            </div>

            <h1 className="text-primary-foreground text-4xl xl:text-5xl font-extrabold leading-[1.1] mb-4">
              احجز أفضل الأطباء في مصر بسهولة
            </h1>
            <p className="text-primary-foreground/80 text-lg leading-relaxed max-w-xl mb-6">
              ابحث حسب التخصص والمدينة، قارن التقييمات والأسعار، واحجز موعدك في دقائق معدودة.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 max-w-md">
              {[
                { icon: Users, label: "مستخدم نشط", value: "+1M" },
                { icon: Stethoscope, label: "طبيب معتمد", value: "+5K" },
                { icon: Clock, label: "موعد شهرياً", value: "+50K" },
              ].map((stat) => (
                <div key={stat.label} className="bg-card/10 border border-card/20 rounded-xl p-3 text-center backdrop-blur-sm">
                  <stat.icon className="w-5 h-5 mx-auto mb-1.5 text-primary-foreground" />
                  <p className="text-primary-foreground font-bold text-base leading-none">{stat.value}</p>
                  <p className="text-primary-foreground/70 text-xs mt-1">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Search Card */}
          <div className="glass rounded-2xl p-6 shadow-2xl border-card/30">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center">
                <Search className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h2 className="text-lg font-bold">ابحث عن طبيبك الآن</h2>
                <p className="text-sm text-muted-foreground">تجربة حجز أسرع وأوضح</p>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-foreground mb-1.5 block">التخصص</label>
                <div className="relative">
                  <Stethoscope className="absolute top-1/2 -translate-y-1/2 right-3 w-4 h-4 text-muted-foreground" />
                  <select 
                    className="select-field pr-10"
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
                <label className="text-sm font-medium text-foreground mb-1.5 block">المدينة</label>
                <div className="relative">
                  <MapPin className="absolute top-1/2 -translate-y-1/2 right-3 w-4 h-4 text-muted-foreground" />
                  <select 
                    className="select-field pr-10"
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

              <button onClick={handleSearch} className="btn-primary w-full py-3.5 mt-2">
                <Search className="w-5 h-5" />
                ابدأ البحث الآن
              </button>
            </div>

            {/* Quick Pills */}
            <div className="mt-5 pt-5 border-t border-border">
              <p className="text-xs text-muted-foreground mb-2">تخصصات شائعة:</p>
              <div className="flex flex-wrap gap-2">
                {specialties.slice(0, 4).map((spec) => (
                  <button 
                    key={spec.id} 
                    onClick={() => setSpecialty(spec.id)} 
                    className="pill-interactive text-xs"
                  >
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
