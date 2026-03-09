import { useState, useMemo } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { SlidersHorizontal, ChevronLeft, Search, ArrowUpDown, Star, BriefcaseMedical, X } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import DoctorCard from "@/components/doctors/DoctorCard";
import { doctors } from "@/data/doctors";
import { specialties, cities } from "@/data/specialties";

type SortOption = "rating" | "price_asc" | "price_desc" | "experience";

export default function DoctorSearch() {
  const [searchParams] = useSearchParams();
  const [selectedSpecialty, setSelectedSpecialty] = useState(searchParams.get("specialty") || "");
  const [selectedCity, setSelectedCity] = useState(searchParams.get("city") || "");
  const [priceRange, setPriceRange] = useState(500);
  const [selectedGender, setSelectedGender] = useState("all");
  const [minRating, setMinRating] = useState(0);
  const [minExperience, setMinExperience] = useState(0);
  const [sortBy, setSortBy] = useState<SortOption>("rating");
  const [showFilters, setShowFilters] = useState(false);
  const [nameQuery, setNameQuery] = useState("");

  const hasActiveFilters = selectedSpecialty || selectedCity || minRating > 0 || minExperience > 0 || priceRange < 500;

  const filtered = useMemo(() => {
    const result = doctors.filter((d) => {
      if (selectedSpecialty && d.specialtyId !== selectedSpecialty) return false;
      if (selectedCity && d.city !== selectedCity) return false;
      if (d.price > priceRange) return false;
      if (selectedGender !== "all" && d.gender !== selectedGender) return false;
      if (minRating > 0 && d.rating < minRating) return false;
      if (minExperience > 0 && d.yearsOfExperience < minExperience) return false;
      if (nameQuery && !d.fullName.toLowerCase().includes(nameQuery.toLowerCase()) && !d.specialty.toLowerCase().includes(nameQuery.toLowerCase())) return false;
      return true;
    });

    result.sort((a, b) => {
      if (sortBy === "price_asc") return a.price - b.price;
      if (sortBy === "price_desc") return b.price - a.price;
      if (sortBy === "experience") return b.yearsOfExperience - a.yearsOfExperience;
      return b.rating - a.rating;
    });

    return result;
  }, [selectedSpecialty, selectedCity, priceRange, selectedGender, minRating, minExperience, sortBy, nameQuery]);

  const specName = specialties.find((s) => s.id === selectedSpecialty)?.name;

  const clearFilters = () => {
    setSelectedSpecialty("");
    setSelectedCity("");
    setPriceRange(500);
    setSelectedGender("all");
    setMinRating(0);
    setMinExperience(0);
    setNameQuery("");
    setSortBy("rating");
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 bg-background section-padding-sm">
        <div className="container-app">
          {/* Breadcrumb */}
          <nav className="text-sm text-muted-foreground mb-5 flex items-center gap-2">
            <Link to="/" className="hover:text-primary transition-colors">الرئيسية</Link>
            <ChevronLeft className="w-3.5 h-3.5" />
            <span className="text-foreground font-medium">البحث عن طبيب</span>
          </nav>

          {/* Page Header + Search Bar */}
          <div className="card-base p-5 lg:p-6 mb-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
              <div>
                <h1 className="text-xl sm:text-2xl font-bold text-foreground">
                  {specName ? `أطباء ${specName}` : "البحث عن طبيب"}
                  {selectedCity ? ` في ${selectedCity}` : ""}
                </h1>
                <p className="text-sm text-muted-foreground mt-1">
                  تم العثور على <span className="text-primary font-bold">{filtered.length}</span> طبيب متاح
                </p>
              </div>
              {hasActiveFilters && (
                <button 
                  onClick={clearFilters} 
                  className="btn-ghost border border-destructive/30 text-destructive text-xs hover:bg-destructive/5 self-start sm:self-center"
                >
                  <X className="w-3.5 h-3.5" />
                  مسح الفلاتر
                </button>
              )}
            </div>

            {/* Enhanced Search Input */}
            <div className="relative">
              <Search className="absolute top-1/2 -translate-y-1/2 right-4 w-5 h-5 text-muted-foreground" />
              <input
                className="search-input pr-12"
                placeholder="ابحث باسم الطبيب أو التخصص..."
                value={nameQuery}
                onChange={(e) => setNameQuery(e.target.value)}
              />
            </div>
          </div>

          <div className="flex flex-col lg:flex-row gap-6">
            {/* Filter Sidebar - Slide-in on Mobile */}
            <aside className={`lg:w-72 shrink-0 ${showFilters ? "block" : "hidden lg:block"}`}>
              <div className="card-base p-5 lg:sticky lg:top-20 space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-foreground flex items-center gap-2 text-base">
                    <SlidersHorizontal className="w-4 h-4 text-primary" /> التصفية والترتيب
                  </h3>
                  {hasActiveFilters && (
                    <button className="text-xs text-destructive hover:underline" onClick={clearFilters}>
                      مسح الكل
                    </button>
                  )}
                </div>

                {/* Specialty */}
                <div>
                  <label className="text-sm font-semibold mb-2 block text-foreground">التخصص</label>
                  <select 
                    className="select-field text-sm" 
                    value={selectedSpecialty} 
                    onChange={(e) => setSelectedSpecialty(e.target.value)}
                  >
                    <option value="">كل التخصصات</option>
                    {specialties.map((s) => <option key={s.id} value={s.id}>{s.name}</option>)}
                  </select>
                </div>

                {/* City */}
                <div>
                  <label className="text-sm font-semibold mb-2 block text-foreground">المدينة</label>
                  <select 
                    className="select-field text-sm" 
                    value={selectedCity} 
                    onChange={(e) => setSelectedCity(e.target.value)}
                  >
                    <option value="">كل المدن</option>
                    {cities.map((c) => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>

                {/* Gender */}
                <div>
                  <label className="text-sm font-semibold mb-2 block text-foreground">الجنس</label>
                  <div className="grid grid-cols-3 gap-2">
                    {[{ v: "all", l: "الكل" }, { v: "male", l: "ذكر" }, { v: "female", l: "أنثى" }].map((g) => (
                      <button
                        key={g.v}
                        className={`pill-interactive text-xs ${selectedGender === g.v ? "active" : ""}`}
                        onClick={() => setSelectedGender(g.v)}
                      >
                        {g.l}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Price Range */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="text-sm font-semibold text-foreground">سعر الكشف</label>
                    <span className="text-sm font-bold text-primary">حتى {priceRange} ج.م</span>
                  </div>
                  <input 
                    type="range" 
                    min="50" 
                    max="500" 
                    value={priceRange} 
                    onChange={(e) => setPriceRange(Number(e.target.value))} 
                    className="w-full h-2 accent-primary cursor-pointer"
                  />
                  <div className="flex justify-between text-xs text-muted-foreground mt-1">
                    <span>50 ج.م</span>
                    <span>+500 ج.م</span>
                  </div>
                </div>

                {/* Rating Filter */}
                <div>
                  <label className="text-sm font-semibold mb-2 block text-foreground flex items-center gap-1">
                    <Star className="w-3.5 h-3.5 fill-warning text-warning" /> التقييم الأدنى
                  </label>
                  <div className="grid grid-cols-4 gap-2">
                    {[0, 3, 4, 4.5].map((r) => (
                      <button 
                        key={r} 
                        onClick={() => setMinRating(r)} 
                        className={`pill-interactive text-xs ${minRating === r ? "active" : ""}`}
                      >
                        {r === 0 ? "الكل" : `${r}+`}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Experience Filter */}
                <div>
                  <label className="text-sm font-semibold mb-2 block text-foreground flex items-center gap-1">
                    <BriefcaseMedical className="w-3.5 h-3.5" /> سنوات الخبرة
                  </label>
                  <div className="grid grid-cols-4 gap-2">
                    {[0, 5, 10, 15].map((y) => (
                      <button 
                        key={y} 
                        onClick={() => setMinExperience(y)} 
                        className={`pill-interactive text-xs ${minExperience === y ? "active" : ""}`}
                      >
                        {y === 0 ? "الكل" : `${y}+`}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </aside>

            {/* Results Column */}
            <div className="flex-1 space-y-4">
              {/* Mobile Controls Row */}
              <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center">
                <button 
                  className={`lg:hidden btn-outline text-sm flex-1 ${showFilters ? "bg-primary text-primary-foreground border-primary" : ""}`}
                  onClick={() => setShowFilters(!showFilters)}
                >
                  <SlidersHorizontal className="w-4 h-4" />
                  {showFilters ? "إخفاء الفلاتر" : "الفلاتر والتصفية"}
                  {hasActiveFilters && <span className="bg-primary text-primary-foreground rounded-full w-5 h-5 flex items-center justify-center text-[10px] font-bold">!</span>}
                </button>

                <div className="flex items-center gap-2 sm:mr-auto">
                  <ArrowUpDown className="w-4 h-4 text-muted-foreground shrink-0" />
                  <select 
                    className="select-field text-sm py-2.5 flex-1" 
                    value={sortBy} 
                    onChange={(e) => setSortBy(e.target.value as SortOption)}
                  >
                    <option value="rating">الأعلى تقييماً</option>
                    <option value="experience">الأكثر خبرة</option>
                    <option value="price_asc">السعر: الأقل أولاً</option>
                    <option value="price_desc">السعر: الأعلى أولاً</option>
                  </select>
                </div>
              </div>

              {/* Results */}
              {filtered.length === 0 ? (
                <div className="card-base empty-state">
                  <div className="empty-state-icon"><Search className="w-8 h-8 text-muted-foreground" /></div>
                  <p className="empty-state-title">لا توجد نتائج مطابقة</p>
                  <p className="empty-state-description">جرّب تقليل الفلاتر أو تغيير كلمات البحث للعثور على الطبيب المناسب.</p>
                  <button onClick={clearFilters} className="btn-soft mt-4 text-sm">مسح جميع الفلاتر</button>
                </div>
              ) : (
                <div className="space-y-4">
                  {filtered.map((doc, index) => (
                    <div 
                      key={doc.id} 
                      style={{ animationDelay: `${index * 50}ms` }}
                      className="animate-in"
                    >
                      <DoctorCard doctor={doc} variant="list" />
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
