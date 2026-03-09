import { useState } from "react";
import { Link } from "react-router-dom";
import { Search, SlidersHorizontal, Store, ChevronLeft, Info, MapPin, Package, CheckCircle2, XCircle } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import RatingStars from "@/components/shared/RatingStars";
import { pharmacies, medicines, pharmacyInventory } from "@/data/pharmacies";
import { formatPrice, formatDistance } from "@/lib/formatters";

export default function PharmacySearch() {
  const [query, setQuery] = useState("بنادول");
  const [showFilters, setShowFilters] = useState(false);

  const filteredMeds = medicines.filter((m) => {
    if (query && !m.name.includes(query) && !m.scientificName.includes(query)) return false;
    return true;
  });

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 bg-background py-6 lg:py-10">
        <div className="container-app">
          <nav className="text-sm text-muted-foreground mb-5 flex items-center gap-1">
            <Link to="/" className="hover:text-primary">الرئيسية</Link>
            <ChevronLeft className="w-3.5 h-3.5" />
            <span className="text-foreground font-medium">البحث عن دواء</span>
          </nav>

          <div className="card-base p-5 lg:p-6 mb-6">
            <h1 className="text-2xl font-bold mb-2">نتائج البحث عن "{query}"</h1>
            <p className="text-sm text-muted-foreground mb-4">تم العثور على {filteredMeds.length} دواء متوفر في {pharmacies.length} صيدلية</p>

            <div className="relative">
              <Search className="absolute top-1/2 -translate-y-1/2 right-3.5 w-5 h-5 text-muted-foreground" />
              <input
                className="input-field pr-11 pl-4 text-base"
                placeholder="ابحث عن دواء، صيدلية، أو مكمل غذائي..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
            </div>
          </div>

          <div className="flex flex-col lg:flex-row gap-6">
            <aside className={`lg:w-64 shrink-0 ${showFilters ? "block" : "hidden lg:block"}`}>
              <div className="card-base p-5 sticky top-20 space-y-5">
                <h3 className="font-bold flex items-center gap-2"><SlidersHorizontal className="w-4 h-4" />تصفية النتائج</h3>

                <div>
                  <h4 className="text-sm font-semibold mb-2">التصنيف</h4>
                  <div className="space-y-2">
                    {["مسكنات الألم", "أدوية السكري", "المضادات الحيوية", "الفيتامينات"].map((c) => (
                      <label key={c} className="filter-checkbox">
                        <input type="checkbox" className="rounded" />
                        {c}
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-semibold mb-2">المدينة</h4>
                  <select className="select-field text-sm">
                    <option>القاهرة</option>
                    <option>الجيزة</option>
                    <option>الإسكندرية</option>
                  </select>
                </div>

                <button className="btn-primary w-full text-sm">تطبيق الفلاتر</button>
              </div>
            </aside>

            <div className="flex-1 space-y-5">
              <button className="lg:hidden btn-outline text-sm w-full" onClick={() => setShowFilters(!showFilters)}>
                <SlidersHorizontal className="w-4 h-4" />
                {showFilters ? "إخفاء الفلاتر" : "عرض الفلاتر"}
              </button>

              {filteredMeds.map((med) => {
                const medInventory = pharmacyInventory.filter((inv) => inv.medicineId === med.id);
                const lowestPrice = medInventory.length > 0 ? Math.min(...medInventory.map((inv) => inv.price)) : 0;

                return (
                  <article key={med.id} className="card-base overflow-hidden">
                    <div className="flex flex-col sm:flex-row">
                      <div className="p-6 flex-1 text-center sm:text-right border-b sm:border-b-0 sm:border-l border-border">
                        <div className="w-20 h-20 rounded-2xl mx-auto sm:mx-0 mb-4 flex items-center justify-center" style={{ backgroundColor: med.imageColor + "15" }}>
                          <div className="w-10 h-10 rounded-xl" style={{ backgroundColor: med.imageColor }} />
                        </div>

                        <h2 className="font-bold text-lg mb-1">{med.name}</h2>
                        <p className="text-xs text-muted-foreground mb-1">الاسم العلمي: {med.scientificName}</p>
                        <p className="text-xs text-muted-foreground mb-3">{med.description}</p>

                        <div className="inline-flex flex-col items-center bg-accent rounded-xl px-4 py-3 mb-3">
                          <span className="text-xs text-muted-foreground">يبدأ من</span>
                          <p className="text-2xl font-bold text-primary">{formatPrice(lowestPrice)}</p>
                        </div>

                        <button className="btn-outline text-xs w-full sm:w-auto">
                          <Info className="w-3.5 h-3.5" />
                          تفاصيل الدواء
                        </button>
                      </div>

                      <div className="p-6 flex-1">
                        <h3 className="font-semibold text-sm mb-4 flex items-center gap-2">
                          <Store className="w-4 h-4 text-primary" />
                          الصيدليات المتوفر بها ({medInventory.length})
                        </h3>

                        <div className="space-y-3">
                          {medInventory.slice(0, 3).map((inv) => {
                            const p = pharmacies.find((ph) => ph.id === inv.pharmacyId);
                            if (!p) return null;

                            return (
                              <Link
                                key={p.id}
                                to={`/pharmacies/${p.id}`}
                                className="card-interactive p-4 flex items-center gap-3"
                              >
                                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                                  <Store className="w-5 h-5 text-primary" />
                                </div>

                                <div className="flex-1 min-w-0">
                                  <h4 className="font-semibold text-sm truncate">{p.name}</h4>
                                  <div className="flex items-center gap-3 mt-1">
                                    <RatingStars rating={p.rating} size="sm" />
                                    <span className="text-xs text-muted-foreground">({p.reviewCount})</span>
                                  </div>
                                </div>

                                <div className="flex flex-col items-end gap-2 shrink-0">
                                  <div className="text-left">
                                    <p className="text-xs text-muted-foreground">السعر</p>
                                    <p className="font-bold text-sm text-primary">{formatPrice(inv.price)}</p>
                                  </div>

                                  <div className="flex items-center gap-1.5">
                                    {inv.inStock ? (
                                      <>
                                        <CheckCircle2 className="w-3.5 h-3.5 text-success" />
                                        <span className="text-xs text-success font-medium">متوفر</span>
                                      </>
                                    ) : (
                                      <>
                                        <XCircle className="w-3.5 h-3.5 text-destructive" />
                                        <span className="text-xs text-destructive font-medium">غير متوفر</span>
                                      </>
                                    )}
                                  </div>
                                </div>
                              </Link>
                            );
                          })}

                          {medInventory.length > 3 && (
                            <button className="btn-soft text-xs w-full">عرض المزيد من الصيدليات</button>
                          )}
                        </div>
                      </div>
                    </div>
                  </article>
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
