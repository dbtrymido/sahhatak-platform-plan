import { Link } from "react-router-dom";
import { MapPin, Clock, MapPinned, Pill } from "lucide-react";
import { pharmacies } from "@/data/pharmacies";
import { formatDistance } from "@/lib/formatters";

export default function NearbyPharmacies() {
  return (
    <section className="py-8 sm:py-10 lg:py-12">
      <div className="container-app">
        <div className="flex items-end justify-between gap-3 mb-5 lg:mb-8">
          <div className="text-right">
            <div className="flex items-center gap-1.5 text-primary text-xs lg:text-sm font-medium mb-1">
              <MapPinned className="w-3.5 h-3.5 lg:w-4 lg:h-4" />
              <span>الصيدليات</span>
            </div>
            <h2 className="text-lg sm:text-xl lg:text-2xl font-bold">صيدليات قريبة منك</h2>
          </div>
          <Link to="/pharmacies" className="btn-soft text-xs lg:text-sm whitespace-nowrap px-3 py-1.5 lg:px-4 lg:py-2">عرض الكل</Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {pharmacies.slice(0, 4).map((pharmacy) => (
            <Link key={pharmacy.id} to={`/pharmacies/${pharmacy.id}`} className="card-hover p-3 sm:p-4 flex items-center gap-3">
              <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                <Pill className="w-5 h-5 text-primary" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-sm text-foreground truncate">{pharmacy.name}</h3>
                <p className="text-xs text-muted-foreground truncate">{pharmacy.area}</p>
                <div className="flex items-center gap-2 text-[11px] text-muted-foreground mt-0.5">
                  <span className="flex items-center gap-0.5"><MapPin className="w-3 h-3" />{formatDistance(pharmacy.distance ?? 0)}</span>
                  <span className="flex items-center gap-0.5"><Clock className="w-3 h-3" />{pharmacy.isOpen ? "مفتوح" : "مغلق"}</span>
                </div>
              </div>
              <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${pharmacy.isOpen ? "bg-success/10 text-success" : "bg-destructive/10 text-destructive"}`}>
                {pharmacy.isOpen ? "مفتوح" : "مغلق"}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
