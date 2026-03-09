import { Link } from "react-router-dom";
import { doctors } from "@/data/doctors";
import DoctorCard from "@/components/doctors/DoctorCard";
import { Star } from "lucide-react";

export default function TopDoctors() {
  return (
    <section className="py-14 lg:py-18 bg-card">
      <div className="container-app">
        <div className="section-header flex items-end justify-between gap-4">
          <div className="text-right">
            <div className="section-label">
              <Star className="w-4 h-4 fill-current" />
              <span>الأعلى تقييماً</span>
            </div>
            <h2 className="section-title">أفضل أطباء موصى بهم</h2>
            <p className="section-subtitle">اختيارات مبنية على تقييمات المرضى وعدد سنوات الخبرة.</p>
          </div>
          <Link to="/doctors" className="btn-soft text-xs whitespace-nowrap">عرض كل الأطباء</Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-5">
          {doctors.slice(0, 4).map((doc) => (
            <DoctorCard key={doc.id} doctor={doc} variant="grid" />
          ))}
        </div>
      </div>
    </section>
  );
}
