import { Search, MapPin, Stethoscope, Users, Clock, ShieldCheck } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { specialties, cities } from "@/data/specialties";

export default function HeroSection() {
  const navigate = useNavigate();
  const [specialty, setSpecialty] = useState("");
  const [city, setCity] = useState("");

  const handleSearch = (e?: React.FormEvent) => {
    if (e) e.preventDefault(); // منع إعادة تحميل الصفحة عند ضغط Enter
    const params = new URLSearchParams();
    if (specialty) params.set("specialty", specialty);
    if (city) params.set("city", city);
    navigate(`/doctors?${params.toString()}`);
  };

  // دالة للبحث السريع عند الضغط على التخصصات الشائعة
  const handleQuickSearch = (specId: string) => {
    const params = new URLSearchParams();
    params.set("specialty", specId);
    if (city) params.set("city", city);
    navigate(`/doctors?${params.toString()}`);
  };

  return (
    <section className="relative overflow-hidden">
      {/* Gradient Background */}
      <div
        className="absolute inset-0"
        style={{
          background: "linear-gradient(135deg,#1E88E5 0%,#2BB6E6 45%,#4FC3F7 100%)",
        }}
      />

      {/* Dot Pattern */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: "radial-gradient(rgba(255,255,255,0.25) 1px, transparent 1px)",
          backgroundSize: "20px 20px",
          opacity: 0.45,
        }}
      />

      {/* Glow Circles */}
      <div className="pointer-events-none absolute -top-32 -left-32 w-[420px] h-[420px] rounded-full bg-white/10 blur-[120px]" />
      <div className="pointer-events-none absolute -bottom-32 -right-24 w-[380px] h-[380px] rounded-full bg-cyan-200/10 blur-[120px]" />

      {/* Hero Container */}
      <div className="relative container-app pt-8 pb-14 sm:pt-10 sm:pb-16 lg:pt-12 lg:pb-18">
        <div className="relative mx-auto flex max-w-4xl flex-col items-center text-center gap-4 sm:gap-5">
          
          {/* Trust Badge */}
          <div className="inline-flex items-center gap-1.5 rounded-full bg-white/14 px-3 py-1.5 text-xs font-medium text-primary-foreground border border-white/20 backdrop-blur-sm">
            <ShieldCheck className="h-3.5 w-3.5" />
            <span>منصة رعاية صحية موثوقة في مصر</span>
          </div>

          {/* Title */}
          <div className="max-w-2xl">
            <h1 className="text-white text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-extrabold leading-tight mb-3">
              احجز أفضل الأطباء في مصر بسهولة
            </h1>
            <p className="text-white/90 text-sm sm:text-base lg:text-lg leading-relaxed">
              ابحث حسب التخصص والمدينة، قارن التقييمات والأسعار، واحجز موعدك في دقائق.
            </p>
          </div>

          {/* Search Card */}
          <div className="w-full max-w-3xl">
            <div className="bg-white rounded-3xl shadow-xl border border-white/40 p-4 sm:p-6 mx-auto">
              
              {/* تم دمج الموبايل والديسكتوب في فورم واحد متجاوب */}
              <form onSubmit={handleSearch} className="flex flex-col sm:flex-row items-end gap-3 sm:gap-4">
                
                {/* Specialty Select */}
                <div className="flex-1 w-full text-start">
                  <label htmlFor="specialty-select" className="text-xs font-medium text-muted-foreground mb-1 block">
                    التخصص
                  </label>
                  <div className="relative">
                    <Stethoscope className="absolute top-1/2 -translate-y-1/2 start-3 w-4 h-4 text-muted-foreground pointer-events-none" />
                    <select
                      id="specialty-select"
                      className="select-field w-full text-sm ps-10 h-11 sm:h-12 rounded-xl"
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

                {/* City Select */}
                <div className="flex-1 w-full text-start">
                  <label htmlFor="city-select" className="text-xs font-medium text-muted-foreground mb-1 block">
                    المدينة
                  </label>
                  <div className="relative">
                    <MapPin className="absolute top-1/2 -translate-y-1/2 start-3 w-4 h-4 text-muted-foreground pointer-events-none" />
                    <select
                      id="city-select"
                      className="select-field w-full text-sm ps-10 h-11 sm:h-12 rounded-xl"
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

                {/* Submit Button */}
                <button
                  type="submit"
                  className="btn-primary w-full sm:w-auto px-7 h-11 sm:h-12 shrink-0 rounded-xl text-sm sm:text-base font-semibold shadow-md hover:shadow-lg transition-shadow flex items-center justify-center gap-2"
                >
                  <Search className="w-4 h-4" />
                  <span>ابحث الآن</span>
                </button>
              </form>

              {/* Quick Pills */}
              <div className="mt-4 pt-3 border-t border-border/50 flex items-center justify-center gap-2 flex-wrap">
                <span className="text-[11px] text-muted-foreground">شائع:</span>
                {specialties.slice(0, 4).map((spec) => (
                  <button
                    key={spec.id}
                    type="button"
                    onClick={() => handleQuickSearch(spec.id)}
                    className="text-[11px] sm:text-xs font-medium px-3 py-1.5 rounded-full bg-sky-500/10 text-sky-900/80 border border-sky-500/15 hover:bg-sky-500/15 transition-colors"
                  >
                    {spec.name}
                  </button>
                ))}
              </div>

            </div>
          </div>

          {/* Stats */}
          <div className="flex flex-wrap items-center justify-center gap-6 text-white/90 mt-2">
            {[
              { icon: Clock, label: "موعد شهريًا", value: "50K+" },
              { icon: Stethoscope, label: "طبيب معتمد", value: "5K+" },
              { icon: Users, label: "مستخدم نشط", value: "1M+" },
            ].map((stat) => {
              const Icon = stat.icon;
              return (
                <div key={stat.label} className="flex items-center gap-2">
                  <div className="w-9 h-9 rounded-xl bg-white/20 flex items-center justify-center">
                    <Icon className="w-4 h-4 text-white" />
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-bold leading-none">{stat.value}</p>
                    <p className="text-[11px] text-white/70">{stat.label}</p>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </div>
    </section>
  );
}
