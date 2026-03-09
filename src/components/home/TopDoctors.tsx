import { Link } from "react-router-dom";
import { doctors } from "@/data/doctors";
import DoctorCard from "@/components/doctors/DoctorCard";
import { Star } from "lucide-react";

export default function TopDoctors() {
  return (
    <section className="py-8 sm:py-10 lg:py-12 bg-muted/30">
      <div className="container-app">
        <div className="flex items-end justify-between gap-3 mb-5">
          <div className="text-right">
            <div className="flex items-center gap-1.5 text-primary text-xs font-medium mb-1">
              <Star className="w-3.5 h-3.5 fill-current" />
              <span>الأعلى تقييماً</span>
            </div>
            <h2 className="text-lg sm:text-xl font-bold">أفضل الأطباء</h2>
          </div>
          <Link to="/doctors" className="btn-soft text-xs whitespace-nowrap px-3 py-1.5">عرض الكل</Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          {doctors.slice(0, 4).map((doc) => (
            <DoctorCard key={doc.id} doctor={doc} variant="grid" />
          ))}
        </div>
      </div>
    </section>
  );
}
