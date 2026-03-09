import { useState } from "react";
import { Link } from "react-router-dom";
import { Search, SlidersHorizontal, Store, ShoppingCart, ChevronLeft, Info } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import RatingStars from "@/components/shared/RatingStars";
import { pharmacies, medicines, pharmacyInventory } from "@/data/pharmacies";
import { formatPrice, formatDistance } from "@/lib/formatters";

export default function PharmacySearch() {
  const [query, setQuery] = useState("");

  const filteredMeds = medicines.filter((m) => {
    if (query && !m.name.includes(query) && !m.scientificName.includes(query)) return false;
    return true;
  });

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 bg-background py-6 lg:py-10">
        <div className="container-app">
          <nav className="text-sm text-muted-foreground mb-4 flex items-center gap-1">
            <Link to="/" className="hover:text-primary">الرئيسية</Link>
            <ChevronLeft className="w-3.5 h-3.5" />
            <span className="text-foreground font-medium">نتائج البحث عن "{query || "بنادول"}"</span>
          </nav>

          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold">نتائج البحث</h1>
            <p className="text-sm text-muted-foreground mt-1">تم العثور على {filteredMeds.length} دواء متوفر في {pharmacies.length} صيدلية</p>
          </div>

          <div className="flex flex-col lg:flex-row gap-6">
            {/* Filters */}
            <aside className="lg:w-64 shrink-0">
              <div className="card-base p-5 sticky top-20 space-y-5">
                <h3 className="font-bold flex items-center gap-2"><SlidersHorizontal className="w-4 h-4" /> تصفية النتائج</h3>
                <div>
                  <h4 className="text-sm font-semibold mb-2">التصنيف</h4>
                  {["مسكنات الألم", "أدوية السكري", "المضادات الحيوية", "الفيتامينات"].map((c) => (
                    <label key={c} className="filter-checkbox mb-2">
                      <input type="checkbox" className="rounded" />
                      {c}
                    </label>
                  ))}
                </div>
                <div>
                  <h4 className="text-sm font-semibold mb-2">المدينة</h4>
                  <select className="input-field text-sm"><option>الرياض</option><option>جدة</option></select>
                </div>
                <button className="btn-primary w-full text-sm">تطبيق الفلاتر</button>
              </div>
            </aside>

            {/* Results */}
            <div className="flex-1 space-y-6">
              {/* Search bar */}
              <div className="relative">
                <input className="input-field pr-10 pl-4" placeholder="ابحث عن دواء، صيدلية، أو مكمل غذائي..." value={query} onChange={(e) => setQuery(e.target.value)} />
                <Search className="absolute top-1/2 -translate-y-1/2 right-3 w-4 h-4 text-muted-foreground" />
              </div>

              {filteredMeds.map((med) => {
                // Find pharmacies that have this medicine via inventory junction table
                const medInventory = pharmacyInventory.filter((inv) => inv.medicineId === med.id);
                const lowestPrice = medInventory.length > 0 ? Math.min(...medInventory.map((inv) => inv.price)) : 0;

                return (
                  <div key={med.id} className="card-base overflow-hidden">
                    <div className="flex flex-col sm:flex-row">
                      {/* Medicine info */}
                      <div className="p-6 flex-1 text-center sm:text-right">
                        <div className="w-24 h-24 rounded-xl mx-auto sm:mx-0 mb-3 flex items-center justify-center" style={{ backgroundColor: med.imageColor + "20" }}>
                          <div className="w-12 h-12 rounded-lg" style={{ backgroundColor: med.imageColor }} />
                        </div>
                        <h3 className="font-bold text-lg">{med.name}</h3>
                        <p className="text-xs text-muted-foreground">الاسم العلمي: {med.scientificName}</p>
                        <p className="text-xs text-muted-foreground mt-1">{med.description}</p>
                        <div className="mt-3 inline-block bg-accent rounded-lg px-3 py-1.5">
                          <span className="text-xs text-muted-foreground">يبدأ من</span>
                          <p className="text-lg font-bold text-primary">{formatPrice(lowestPrice)}</p>
                        </div>
                        <button className="btn-outline text-xs mt-3 w-full sm:w-auto">
                          <Info className="w-3.5 h-3.5" /> تفاصيل الدواء
                        </button>
                      </div>

                      {/* Pharmacies selling this */}
                      <div className="p-6 border-t sm:border-t-0 sm:border-r border-border flex-1">
                        <h4 className="font-semibold text-sm mb-3 flex items-center gap-1">
                          <Store className="w-4 h-4 text-primary" /> الصيدليات المتوفر بها هذا الدواء
                        </h4>
                        <div className="space-y-3">
                          {medInventory.slice(0, 3).map((inv) => {
                            const p = pharmacies.find((ph) => ph.id === inv.pharmacyId);
                            if (!p) return null;
                            return (
                              <Link key={p.id} to={`/pharmacies/${p.id}`} className="flex items-center gap-3 p-3 rounded-lg border border-border hover:border-primary transition-colors">
                                <Store className="w-8 h-8 text-primary shrink-0" />
                                <div className="flex-1 min-w-0">
                                  <h5 className="font-semibold text-sm">{p.name}</h5>
                                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                    <RatingStars rating={p.rating} size="sm" />
                                    <span>({p.reviewCount} تقييم)</span>
                                  </div>
                                </div>
                                <div className="text-left">
                                  <span className="text-xs text-muted-foreground">المسافة</span>
                                  <p className="font-bold text-sm">{formatDistance(p.distance ?? 0)}</p>
                                </div>
                                <div className="text-left">
                                  <span className="text-xs text-muted-foreground">السعر</span>
                                  <p className="font-bold text-sm text-primary">{formatPrice(inv.price)}</p>
                                </div>
                                <span className={`text-xs px-2 py-0.5 rounded-full ${inv.inStock ? "bg-success/10 text-success" : "bg-destructive/10 text-destructive"}`}>
                                  {inv.inStock ? "متوفر حالياً" : "غير متوفر"}
                                </span>
                              </Link>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
