import { Search, MapPin, Stethoscope, Shield, Users, Clock } from "lucide-react";
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
      {/* Gradient background */}
      <div className="absolute inset-0" style={{ background: "var(--gradient-hero)" }} />
      {/* Decorative shapes */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-24 -left-24 w-96 h-96 rounded-full bg-white/5 animate-float" />
        <div className="absolute top-1/3 -right-16 w-72 h-72 rounded-full bg-white/5 animate-float" style={{ animationDelay: "1s" }} />
        <div className="absolute -bottom-20 left-1/3 w-80 h-80 rounded-full bg-white/5 animate-float" style={{ animationDelay: "2s" }} />
        {/* Dot pattern */}
        <div className="absolute inset-0 opacity-[0.04]" style={{
          backgroundImage: "radial-gradient(circle, white 1px, transparent 1px)",
          backgroundSize: "24px 24px",
        }} />
      </div>

      <div className="relative container-app py-16 lg:py-24">
        <div className="max-w-3xl mx-auto text-center">
          {/* Trust badge */}
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 mb-6 text-white/90 text-sm font-medium border border-white/10">
            <Shield className="w-4 h-4" />
            <span>أكثر من +5,000 طبيب معتمد في مصر</span>
          </div>

          <h1 className="text-white text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-[1.15] mb-5 tracking-tight">
            صحتك بين يديك،
            <br />
            <span className="text-white/90">في كل وقت وكل مكان</span>
          </h1>
          <p className="text-white/75 text-lg lg:text-xl mb-10 max-w-xl mx-auto leading-relaxed">
            احجز موعدك مع أفضل الأطباء المعتمدين واطلب أدويتك أونلاين بسهولة
          </p>

          {/* Search Bar */}
          <div className="bg-white rounded-2xl p-2 shadow-xl max-w-2xl mx-auto">
            <div className="flex flex-col sm:flex-row gap-2">
              <div className="flex-1 relative">
                <Stethoscope className="absolute top-1/2 -translate-y-1/2 right-3.5 w-4 h-4 text-muted-foreground" />
                <select
                  className="w-full rounded-xl border-0 bg-muted/50 pr-10 px-4 py-3.5 text-sm text-foreground transition-colors focus:bg-muted focus:outline-none"
                  value={specialty}
                  onChange={(e) => setSpecialty(e.target.value)}
                >
                  <option value="">التخصص</option>
                  {specialties.map((s) => (
                    <option key={s.id} value={s.id}>{s.name}</option>
                  ))}
                </select>
              </div>
              <div className="flex-1 relative">
                <MapPin className="absolute top-1/2 -translate-y-1/2 right-3.5 w-4 h-4 text-muted-foreground" />
                <select
                  className="w-full rounded-xl border-0 bg-muted/50 pr-10 px-4 py-3.5 text-sm text-foreground transition-colors focus:bg-muted focus:outline-none"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                >
                  <option value="">المدينة</option>
                  {cities.map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>
              <button onClick={handleSearch} className="btn-primary rounded-xl gap-2 px-8 py-3.5 shrink-0 text-base">
                <Search className="w-5 h-5" />
                ابحث الآن
              </button>
            </div>
          </div>

          {/* Stats */}
          <div className="flex flex-wrap justify-center gap-8 mt-10">
            {[
              { icon: Users, label: "مستخدم نشط", value: "+1M" },
              { icon: Stethoscope, label: "طبيب معتمد", value: "+5K" },
              { icon: Clock, label: "موعد شهرياً", value: "+50K" },
            ].map((stat) => (
              <div key={stat.label} className="flex items-center gap-3 text-white/80">
                <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center">
                  <stat.icon className="w-5 h-5 text-white" />
                </div>
                <div className="text-right">
                  <p className="text-white font-bold text-lg leading-none">{stat.value}</p>
                  <p className="text-white/60 text-xs mt-0.5">{stat.label}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
