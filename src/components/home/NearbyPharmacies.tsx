import { Link } from "react-router-dom";
import { MapPin, Clock, Store } from "lucide-react";
import { pharmacies } from "@/data/pharmacies";
import { formatDistance } from "@/lib/formatters";

export default function NearbyPharmacies() {
  return (
    <section className="py-12 lg:py-16">
      <div className="container-app">
        <div className="flex items-center justify-between mb-8">
          <div className="text-right">
            <h2 className="section-title">صيدليات قريبة منك</h2>
            <p className="section-subtitle">اطلب دواءك أو مستلزماتك الطبية من أقرب صيدلية إليك واستلمها في خمس دقائق</p>
          </div>
          <Link to="/pharmacies" className="btn-outline text-xs px-4 py-2 whitespace-nowrap">
            <MapPin className="w-4 h-4" />
            عرض الخريطة
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {pharmacies.slice(0, 4).map((pharmacy) => (
            <Link
              key={pharmacy.id}
              to={`/pharmacies/${pharmacy.id}`}
              className="card-hover p-4 flex items-center gap-4"
            >
              <div className="w-12 h-12 rounded-xl bg-accent flex items-center justify-center shrink-0">
                <Store className="w-6 h-6 text-primary" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-foreground text-sm">{pharmacy.name}</h3>
                <p className="text-xs text-muted-foreground mt-0.5">
                  على بعد {formatDistance(pharmacy.distance)} · {pharmacy.openHours}
                </p>
              </div>
              <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${pharmacy.isOpen ? "bg-success/10 text-success" : "bg-destructive/10 text-destructive"}`}>
                {pharmacy.isOpen ? "مفتوح" : "مغلق"}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
