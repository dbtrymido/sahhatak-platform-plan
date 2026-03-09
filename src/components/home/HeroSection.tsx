import { Search, MapPin, User, Stethoscope } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { specialties, cities } from "@/data/specialties";
import heroDoctor from "@/assets/hero-doctor.png";

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
    <section className="bg-card py-10 lg:py-16">
      <div className="container-app">
        <div className="flex flex-col-reverse lg:flex-row items-center gap-8 lg:gap-12">
          {/* Image */}
          <div className="w-full lg:w-5/12">
            <img
              src={heroDoctor}
              alt="طبيب محترف"
              className="w-full max-w-md mx-auto rounded-2xl object-cover"
            />
          </div>

          {/* Content */}
          <div className="w-full lg:w-7/12 text-right">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground leading-tight mb-4">
              صحتك بين يديك،
              <br />
              <span className="text-primary">في كل وقت وكل مكان</span>
            </h1>
            <p className="text-muted-foreground text-base lg:text-lg mb-8 max-w-lg">
              احجز موعدك الآن مع أفضل الأطباء المعتمدين في منطقتك، واطلب أدويتك أونلاين بضغطة زر واحدة.
            </p>

            {/* Search Bar */}
            <div className="bg-background rounded-xl p-2 border border-border flex flex-col sm:flex-row gap-2">
              <div className="flex-1 relative">
                <Stethoscope className="absolute top-1/2 -translate-y-1/2 right-3 w-4 h-4 text-muted-foreground" />
                <select
                  className="input-field pr-10 bg-background"
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
                <MapPin className="absolute top-1/2 -translate-y-1/2 right-3 w-4 h-4 text-muted-foreground" />
                <select
                  className="input-field pr-10 bg-background"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                >
                  <option value="">المدينة</option>
                  {cities.map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>
              <div className="flex-1 relative">
                <User className="absolute top-1/2 -translate-y-1/2 right-3 w-4 h-4 text-muted-foreground" />
                <input className="input-field pr-10 bg-background" placeholder="اسم" />
              </div>
              <button onClick={handleSearch} className="btn-primary gap-1 shrink-0">
                <Search className="w-4 h-4" />
                بحث
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
