import { useParams, Link } from "react-router-dom";
import { Phone, MessageCircle, Navigation, Store, Search, ShoppingCart, Star, MapPin, Clock, ChevronLeft } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import RatingStars from "@/components/shared/RatingStars";
import MapPlaceholder from "@/components/shared/MapPlaceholder";
import { pharmacies } from "@/data/pharmacies";
import { formatPrice } from "@/lib/formatters";

export default function PharmacyProfile() {
  const { id } = useParams();
  const pharmacy = pharmacies.find((p) => p.id === id);

  if (!pharmacy) {
    return <div className="min-h-screen flex flex-col"><Navbar /><main className="flex-1 flex items-center justify-center"><p>لم يتم العثور على الصيدلية</p></main></div>;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 bg-background py-6 lg:py-10">
        <div className="container-app">
          <nav className="text-sm text-muted-foreground mb-4 flex items-center gap-1">
            <Link to="/" className="hover:text-primary">الرئيسية</Link>
            <ChevronLeft className="w-3.5 h-3.5" />
            <Link to="/pharmacies" className="hover:text-primary">الصيدليات</Link>
            <ChevronLeft className="w-3.5 h-3.5" />
            <span className="text-foreground font-medium">{pharmacy.name}</span>
          </nav>

          {/* Header */}
          <div className="card-base p-6 mb-6">
            <div className="flex items-start gap-4">
              <div className="w-20 h-20 rounded-xl bg-accent flex items-center justify-center text-3xl shrink-0">
                🏪
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <h1 className="text-xl font-bold">{pharmacy.name} - {pharmacy.nameEn}</h1>
                  <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${pharmacy.isOpen ? "bg-success/10 text-success" : "bg-destructive/10 text-destructive"}`}>
                    {pharmacy.isOpen ? "مفتوح الآن" : "مغلق"}
                  </span>
                </div>
                <div className="flex items-center gap-3 mt-2 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5" /> {pharmacy.area}</span>
                  <RatingStars rating={pharmacy.rating} reviewCount={pharmacy.reviewCount} />
                </div>
              </div>
            </div>
            <div className="flex gap-2 mt-4">
              <button className="btn-ghost border border-border text-xs"><Phone className="w-4 h-4" /> اتصال</button>
              <button className="btn-ghost border border-border text-xs bg-success/10 text-success">
                <MessageCircle className="w-4 h-4" /> واتساب
              </button>
              <button className="btn-ghost border border-border text-xs"><Navigation className="w-4 h-4" /> الاتجاهات</button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Main */}
            <div className="lg:col-span-2 space-y-6">
              {/* Medicines */}
              <div className="card-base p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="font-bold text-lg">الأدوية والمنتجات المتاحة</h2>
                  <div className="relative w-48">
                    <input className="input-field text-xs pr-8 py-2" placeholder="بحث في هذه الصيدلية..." />
                    <Search className="absolute top-1/2 -translate-y-1/2 right-2.5 w-3.5 h-3.5 text-muted-foreground" />
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {pharmacy.medicines.map((med) => (
                    <div key={med.id} className="flex items-center gap-3 p-3 rounded-xl border border-border hover:border-primary transition-colors">
                      <div className="w-14 h-14 rounded-lg flex items-center justify-center shrink-0" style={{ backgroundColor: med.imageColor + "20" }}>
                        <div className="w-8 h-8 rounded" style={{ backgroundColor: med.imageColor }} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-semibold text-sm truncate">{med.name}</h4>
                        <p className="text-xs text-muted-foreground truncate">{med.description}</p>
                      </div>
                      <div className="text-left flex items-center gap-2">
                        <span className="font-bold text-primary text-sm">{formatPrice(med.price)}</span>
                        <button className="w-8 h-8 rounded-lg bg-accent flex items-center justify-center text-primary hover:bg-primary hover:text-primary-foreground transition-colors">
                          <ShoppingCart className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
                <button className="btn-outline w-full mt-4 text-sm">عرض كافة المنتجات</button>
              </div>

              {/* Reviews */}
              <div className="card-base p-6">
                <h2 className="font-bold text-lg mb-4">تقييمات المرضى</h2>
                {pharmacy.reviews.length === 0 ? (
                  <p className="text-sm text-muted-foreground">لا توجد تقييمات بعد</p>
                ) : (
                  pharmacy.reviews.map((r, i) => (
                    <div key={i} className="flex items-start gap-3 mb-4 last:mb-0">
                      <div className="w-10 h-10 rounded-full bg-accent flex items-center justify-center text-sm font-bold text-primary shrink-0">
                        {r.name.charAt(0)}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <h4 className="font-semibold text-sm">{r.name}</h4>
                          <span className="text-xs text-muted-foreground">{r.date}</span>
                        </div>
                        <div className="flex gap-0.5 my-1">
                          {[1,2,3,4,5].map(s => <Star key={s} className={`w-3 h-3 ${s <= r.rating ? "fill-warning text-warning" : "text-border"}`} />)}
                        </div>
                        <p className="text-sm text-muted-foreground">{r.text}</p>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              <div className="card-base p-5">
                <h3 className="font-bold mb-3">عن الصيدلية</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{pharmacy.description}</p>
              </div>
              <div className="card-base p-5">
                <h3 className="font-bold mb-3 flex items-center gap-2"><Clock className="w-4 h-4 text-primary" /> أوقات العمل</h3>
                <div className="text-sm space-y-2">
                  <div className="flex justify-between"><span className="text-muted-foreground">السبت - الخميس</span><span>{pharmacy.openHours}</span></div>
                  <div className="flex justify-between"><span className="text-muted-foreground">الجمعة</span><span>{pharmacy.fridayHours}</span></div>
                </div>
              </div>
              <div className="card-base p-5">
                <h3 className="font-bold mb-3">الموقع الجغرافي</h3>
                <MapPlaceholder label={pharmacy.area} />
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
