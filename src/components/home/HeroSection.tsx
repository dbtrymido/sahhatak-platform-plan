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
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(135deg, #1E88E5 0%, #2BB6E6 45%, #4FC3F7 100%)",
        }}
      />
      <div className="pointer-events-none absolute -top-24 -left-24 h-72 w-72 rounded-full bg-white/12 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-32 -right-24 h-80 w-80 rounded-full bg-cyan-200/14 blur-3xl" />
      <div
        className="absolute inset-0 opacity-[0.1]"
        style={{
          backgroundImage:
            "radial-gradient(circle, rgba(255,255,255,0.95) 1px, transparent 1px)",
          backgroundSize: "24px 24px",
        }}
      />

      <div className="relative container-app pt-10 pb-20 sm:pt-14 sm:pb-24 lg:pt-16 lg:pb-28">
        {/* Subtle glow for depth */}
        <div className="pointer-events-none absolute inset-x-0 top-8 mx-auto h-72 w-[min(44rem,92vw)] rounded-[999px] bg-gradient-to-r from-white/18 via-cyan-100/22 to-white/18 blur-3xl" />

        <div className="relative mx-auto flex max-w-4xl flex-col items-center text-center gap-5 sm:gap-6 lg:gap-7">
          {/* Trust badge */}
          <div className="inline-flex items-center gap-1.5 rounded-full bg-white/14 px-3 py-1.5 text-xs font-medium text-primary-foreground border border-white/20 backdrop-blur-sm">
            <ShieldCheck className="h-3.5 w-3.5" />
            <span>منصة رعاية صحية موثوقة في مصر</span>
          </div>

          {/* Headline & description */}
          <div className="max-w-2xl">
            <h1 className="text-primary-foreground text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-extrabold leading-tight mb-2 sm:mb-3">
              احجز أفضل الأطباء في مصر بسهولة
            </h1>

            <p className="text-primary-foreground/90 text-sm sm:text-base lg:text-lg leading-relaxed">
              ابحث حسب التخصص والمدينة، قارن التقييمات والأسعار، واحجز موعدك في دقائق.
            </p>
          </div>

          {/* Search Card (primary action) */}
          <div className="w-full max-w-3xl">
            <div className="bg-white/95 rounded-3xl shadow-2xl border border-white/40 p-5 sm:p-7 lg:p-8 mx-auto backdrop-blur-md">
              {/* Desktop: inline row */}
              <div className="hidden sm:flex items-end gap-3 sm:gap-4">
                <div className="flex-1">
                  <label className="text-xs font-medium text-muted-foreground mb-1 block">التخصص</label>
                  <div className="relative">
                    <Stethoscope className="absolute top-1/2 -translate-y-1/2 right-3 w-4 h-4 text-muted-foreground" />
                    <select
                      className="select-field text-sm pr-10 h-11 sm:h-12 rounded-xl"
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
                      className="select-field text-sm pr-10 h-11 sm:h-12 rounded-xl"
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

                <button
                  onClick={handleSearch}
                  className="btn-primary px-7 h-11 sm:h-12 shrink-0 rounded-xl text-sm sm:text-base font-semibold shadow-md hover:shadow-lg transition-shadow"
                >
                  <Search className="w-4 h-4" />
                  ابحث الآن
                </button>
              </div>

              {/* Mobile: stacked */}
              <div className="sm:hidden space-y-3">
                <div>
                  <label className="text-xs font-medium text-muted-foreground mb-1 block">التخصص</label>
                  <div className="relative">
                    <Stethoscope className="absolute top-1/2 -translate-y-1/2 right-3 w-4 h-4 text-muted-foreground" />
                    <select
                      className="select-field text-sm pr-10 h-11 rounded-xl"
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
                      className="select-field text-sm pr-10 h-11 rounded-xl"
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

                <button
                  onClick={handleSearch}
                  className="btn-primary w-full py-3.5 text-sm font-semibold rounded-xl shadow-md hover:shadow-lg transition-shadow"
                >
                  <Search className="w-4 h-4" />
                  ابدأ البحث
                </button>
              </div>

              {/* Quick Pills */}
              <div className="mt-4 pt-3.5 border-t border-border/50 flex items-center justify-center gap-2 flex-wrap">
                <span className="text-[11px] text-muted-foreground">شائع:</span>
                {specialties.slice(0, 4).map((spec) => (
                  <button
                    key={spec.id}
                    onClick={() => setSpecialty(spec.id)}
                    className="text-[11px] sm:text-xs font-medium px-3 py-1.5 rounded-full bg-sky-500/10 text-sky-900/80 border border-sky-500/15 hover:bg-sky-500/15 hover:text-sky-900 transition-colors"
                  >
                    {spec.name}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Stats below search */}
          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 lg:gap-5">
            {[
              { icon: Clock, label: "موعد شهريًا", value: "50K+" },
              { icon: Stethoscope, label: "طبيب معتمد", value: "5K+" },
              { icon: Users, label: "مستخدم نشط", value: "1M+" },
            ].map((stat) => {
              const Icon = stat.icon;
              return (
                <div
                  key={stat.label}
                  className="flex items-center gap-2 rounded-2xl bg-white/15 px-3.5 py-2 sm:px-4 sm:py-2.5 border border-white/18 shadow-sm backdrop-blur-md text-primary-foreground"
                >
                  <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-white/18 text-primary-foreground">
                    <Icon className="h-3.5 w-3.5" />
                  </span>
                  <div className="text-right">
                    <p className="text-sm sm:text-base font-bold leading-tight tracking-tight">{stat.value}</p>
                    <p className="text-[10px] sm:text-xs text-primary-foreground/80 leading-tight">
                      {stat.label}
                    </p>
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
