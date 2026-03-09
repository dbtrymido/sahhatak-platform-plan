import { useState, useMemo } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { SlidersHorizontal, ChevronLeft, ChevronRight } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import DoctorCard from "@/components/doctors/DoctorCard";
import { doctors } from "@/data/doctors";
import { specialties, cities } from "@/data/specialties";

export default function DoctorSearch() {
  const [searchParams] = useSearchParams();
  const [selectedSpecialty, setSelectedSpecialty] = useState(searchParams.get("specialty") || "");
  const [selectedCity, setSelectedCity] = useState(searchParams.get("city") || "");
  const [priceRange, setPriceRange] = useState(500);
  const [selectedGender, setSelectedGender] = useState("all");
  const [showFilters, setShowFilters] = useState(false);

  const filtered = useMemo(() => {
    return doctors.filter((d) => {
      if (selectedSpecialty && d.specialtyId !== selectedSpecialty) return false;
      if (selectedCity && d.city !== selectedCity) return false;
      if (d.price > priceRange) return false;
      if (selectedGender !== "all" && d.gender !== selectedGender) return false;
      return true;
    });
  }, [selectedSpecialty, selectedCity, priceRange, selectedGender]);

  const specName = specialties.find((s) => s.id === selectedSpecialty)?.name;

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 bg-background py-6 lg:py-10">
        <div className="container-app">
          {/* Breadcrumb */}
          <nav className="text-sm text-muted-foreground mb-4 flex items-center gap-1">
            <Link to="/" className="hover:text-primary">الرئيسية</Link>
            <ChevronLeft className="w-3.5 h-3.5" />
            <span className="text-foreground font-medium">البحث عن طبيب</span>
          </nav>

          {/* Header */}
          <div className="card-base p-6 mb-6 text-right">
            <h1 className="text-xl lg:text-2xl font-bold text-primary">
              نتائج البحث{specName ? ` عن أخصائي ${specName}` : ""}{selectedCity ? ` في ${selectedCity}` : ""}
            </h1>
            <p className="text-sm text-muted-foreground mt-1">
              تم العثور على {filtered.length} طبيب متاح لحجز موعد
            </p>
          </div>

          <div className="flex flex-col lg:flex-row gap-6">
            {/* Filters */}
            <aside className={`lg:w-72 shrink-0 ${showFilters ? "block" : "hidden lg:block"}`}>
              <div className="card-base p-5 sticky top-20 space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-foreground flex items-center gap-2">
                    <SlidersHorizontal className="w-4 h-4" /> التصفية
                  </h3>
                  <button className="text-xs text-primary hover:underline" onClick={() => { setSelectedSpecialty(""); setSelectedCity(""); setPriceRange(500); setSelectedGender("all"); }}>
                    مسح الكل
                  </button>
                </div>

                {/* Specialty */}
                <div>
                  <h4 className="text-sm font-semibold mb-3 flex items-center gap-2">🩺 التخصص</h4>
                  <div className="space-y-2">
                    {specialties.slice(0, 5).map((s) => (
                      <label key={s.id} className="filter-checkbox">
                        <input type="checkbox" className="rounded text-primary" checked={selectedSpecialty === s.id} onChange={() => setSelectedSpecialty(selectedSpecialty === s.id ? "" : s.id)} />
                        {s.name}
                      </label>
                    ))}
                  </div>
                </div>

                {/* City */}
                <div>
                  <h4 className="text-sm font-semibold mb-3">المدينة / المنطقة</h4>
                  <select className="input-field text-sm" value={selectedCity} onChange={(e) => setSelectedCity(e.target.value)}>
                    <option value="">الكل</option>
                    {cities.map((c) => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>

                {/* Gender */}
                <div>
                  <h4 className="text-sm font-semibold mb-3">النوع</h4>
                  <div className="flex gap-2">
                    {[{ v: "all", l: "الكل" }, { v: "male", l: "ذكر" }, { v: "female", l: "أنثى" }].map((g) => (
                      <button
                        key={g.v}
                        className={`flex-1 text-xs py-2 rounded-lg border transition-colors ${selectedGender === g.v ? "bg-primary text-primary-foreground border-primary" : "border-border text-muted-foreground hover:border-primary"}`}
                        onClick={() => setSelectedGender(g.v)}
                      >
                        {g.l}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Price */}
                <div>
                  <h4 className="text-sm font-semibold mb-3">سعر الكشف</h4>
                  <input type="range" min="50" max="500" value={priceRange} onChange={(e) => setPriceRange(Number(e.target.value))} className="w-full accent-primary" />
                  <div className="flex justify-between text-xs text-muted-foreground mt-1">
                    <span>50 ر.س</span>
                    <span>+500 ر.س</span>
                  </div>
                </div>
              </div>
            </aside>

            {/* Results */}
            <div className="flex-1 space-y-4">
              <button className="lg:hidden btn-outline text-sm w-full mb-2" onClick={() => setShowFilters(!showFilters)}>
                <SlidersHorizontal className="w-4 h-4" />
                {showFilters ? "إخفاء الفلاتر" : "عرض الفلاتر"}
              </button>

              {filtered.length === 0 ? (
                <div className="card-base p-10 text-center">
                  <p className="text-lg text-muted-foreground">لم يتم العثور على نتائج</p>
                  <p className="text-sm text-muted-foreground mt-2">حاول تغيير معايير البحث</p>
                </div>
              ) : (
                filtered.map((doc) => <DoctorCard key={doc.id} doctor={doc} variant="list" />)
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
