import { Link } from "react-router-dom";
import { MapPin, Clock, MapPinned } from "lucide-react";
import { pharmacies } from "@/data/pharmacies";
import { formatDistance } from "@/lib/formatters";

export default function NearbyPharmacies() {
  return (
    <section className="py-16 lg:py-20">
      <div className="container-app">
        <div className="flex items-end justify-between mb-10">
          <div className="text-right">
            <h2 className="section-title">صيدليات قريبة منك</h2>
            <p className="section-subtitle">اطلب أدويتك من أقرب صيدلية واستلمها بسرعة</p>
          </div>
          <Link to="/pharmacies" className="btn-outline text-xs px-4 py-2.5 whitespace-nowrap">
            <MapPinned className="w-4 h-4" />
            عرض الخريطة
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {pharmacies.slice(0, 4).map((pharmacy) => (
            <Link
              key={pharmacy.id}
              to={`/pharmacies/${pharmacy.id}`}
              className="card-hover p-5 flex items-center gap-4"
            >
              <div className="w-14 h-14 rounded-2xl bg-primary/8 flex items-center justify-center shrink-0">
                <span className="text-2xl">🏪</span>
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-bold text-foreground">{pharmacy.name}</h3>
                <div className="flex items-center gap-3 mt-1 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3 h-3" />
                    {formatDistance(pharmacy.distance ?? 0)}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {pharmacy.openHours}
                  </span>
                </div>
              </div>
              <span className={`text-xs font-semibold px-3 py-1.5 rounded-full ${pharmacy.isOpen ? "bg-success/10 text-success" : "bg-destructive/10 text-destructive"}`}>
                {pharmacy.isOpen ? "مفتوح" : "مغلق"}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
