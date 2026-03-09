import { Search, MapPin, Stethoscope, Shield, Users, Clock, Sparkles } from "lucide-react";
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
    <section className="relative overflow-hidden py-16 lg:py-24 flex items-center">
      {/* Modern gradient background */}
      <div className="absolute inset-0" style={{ background: "var(--gradient-hero)" }} />
      
      {/* Decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Floating orbs */}
        <div className="absolute -top-32 -left-32 w-[500px] h-[500px] rounded-full bg-white/[0.03] animate-float blur-3xl" />
        <div className="absolute top-1/4 -right-24 w-96 h-96 rounded-full bg-white/[0.05] animate-float" style={{ animationDelay: "1s" }} />
        <div className="absolute -bottom-32 left-1/4 w-[400px] h-[400px] rounded-full bg-white/[0.04] animate-float" style={{ animationDelay: "2s" }} />
        
        {/* Medical cross pattern */}
        <div className="absolute top-20 right-20 opacity-[0.03]">
          <svg width="120" height="120" viewBox="0 0 120 120" fill="white">
            <rect x="45" y="10" width="30" height="100" rx="4" />
            <rect x="10" y="45" width="100" height="30" rx="4" />
          </svg>
        </div>
        <div className="absolute bottom-32 left-16 opacity-[0.03]">
          <svg width="80" height="80" viewBox="0 0 120 120" fill="white">
            <rect x="45" y="10" width="30" height="100" rx="4" />
            <rect x="10" y="45" width="100" height="30" rx="4" />
          </svg>
        </div>
        
        {/* Dot pattern */}
        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: "radial-gradient(circle, white 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }} />
      </div>

      <div className="relative container-app py-20 lg:py-28">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Content Side */}
          <div className="text-right order-1">
            {/* Trust badge */}
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-5 py-2.5 mb-8 text-white/90 text-sm font-medium border border-white/10">
              <Sparkles className="w-4 h-4" />
              <span>أكتر من +5,000 طبيب معتمد في مصر 🇪🇬</span>
            </div>

            <h1 className="text-white text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-extrabold leading-[1.1] mb-6 tracking-tight">
              احجز أفضل الأطباء
              <br />
              <span className="text-white/90">في مصر بسهولة</span>
              <span className="inline-block mr-2 text-3xl sm:text-4xl lg:text-5xl animate-pulse-soft">💙</span>
            </h1>
            
            <p className="text-white/70 text-lg lg:text-xl mb-4 max-w-lg leading-relaxed">
              دور على دكتورك، احجز موعدك، وخلّص كل حاجة أونلاين...
            </p>
            <p className="text-white/90 text-xl lg:text-2xl font-bold mb-10">
              وبالشفا إن شاء الله! ✨
            </p>

            {/* Stats row */}
            <div className="flex flex-wrap gap-6 lg:gap-10">
              {[
                { icon: Users, label: "مستخدم نشط", value: "+1M" },
                { icon: Stethoscope, label: "طبيب معتمد", value: "+5K" },
                { icon: Clock, label: "موعد شهرياً", value: "+50K" },
              ].map((stat) => (
                <div key={stat.label} className="flex items-center gap-3 text-white/80">
                  <div className="w-12 h-12 rounded-2xl bg-white/10 backdrop-blur-sm flex items-center justify-center border border-white/10">
                    <stat.icon className="w-5 h-5 text-white" />
                  </div>
                  <div className="text-right">
                    <p className="text-white font-bold text-xl leading-none">{stat.value}</p>
                    <p className="text-white/50 text-xs mt-1">{stat.label}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Search Card Side */}
          <div className="order-2">
            <div className="bg-white/95 backdrop-blur-xl rounded-3xl p-6 lg:p-8 shadow-2xl border border-white/20">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                  <Search className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-bold text-foreground">ابحث عن طبيبك</h3>
                  <p className="text-sm text-muted-foreground">دوّر واحجز في ثواني</p>
                </div>
              </div>

              <div className="space-y-4">
                {/* Specialty Select */}
                <div>
                  <label className="text-sm font-medium text-foreground mb-2 block">التخصص</label>
                  <div className="relative">
                    <Stethoscope className="absolute top-1/2 -translate-y-1/2 right-4 w-5 h-5 text-muted-foreground" />
                    <select
                      className="w-full rounded-xl border border-border bg-muted/30 pr-12 pl-4 py-4 text-sm text-foreground transition-all focus:bg-card focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary appearance-none cursor-pointer"
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

                {/* City Select */}
                <div>
                  <label className="text-sm font-medium text-foreground mb-2 block">المدينة</label>
                  <div className="relative">
                    <MapPin className="absolute top-1/2 -translate-y-1/2 right-4 w-5 h-5 text-muted-foreground" />
                    <select
                      className="w-full rounded-xl border border-border bg-muted/30 pr-12 pl-4 py-4 text-sm text-foreground transition-all focus:bg-card focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary appearance-none cursor-pointer"
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

                {/* Search Button */}
                <button
                  onClick={handleSearch}
                  className="w-full btn-primary rounded-xl gap-3 py-4 text-base mt-2"
                >
                  <Search className="w-5 h-5" />
                  دوّر دلوقتي
                </button>
              </div>

              {/* Quick specialties */}
              <div className="mt-6 pt-6 border-t border-border">
                <p className="text-xs text-muted-foreground mb-3">تخصصات شائعة:</p>
                <div className="flex flex-wrap gap-2">
                  {["الأسنان", "الجلدية", "العيون", "الباطنية"].map((spec) => (
                    <span
                      key={spec}
                      className="px-3 py-1.5 rounded-full bg-accent text-accent-foreground text-xs font-medium cursor-pointer hover:bg-primary/10 transition-colors"
                    >
                      {spec}
                    </span>
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
