import { Link } from "react-router-dom";
import { specialties } from "@/data/specialties";
import { Smile, Fingerprint, Baby, Heart, Eye, Brain, Bone, Stethoscope, Layers } from "lucide-react";

const iconMap: Record<string, React.ElementType> = {
  Smile, Fingerprint, Baby, Heart, Eye, Brain, Bone, Stethoscope,
};

export default function SpecialtiesGrid() {
  return (
    <section className="py-14 lg:py-18">
      <div className="container-app">
        <div className="section-header flex items-end justify-between gap-4">
          <div className="text-right">
            <div className="section-label">
              <Layers className="w-4 h-4" />
              <span>تخصصات متنوعة</span>
            </div>
            <h2 className="section-title">اختر تخصصك بسرعة</h2>
            <p className="section-subtitle">اكتشف أفضل الأطباء في كل تخصص مع مقارنة واضحة للتقييمات والخبرة.</p>
          </div>
          <Link to="/doctors" className="btn-soft text-xs whitespace-nowrap">كل التخصصات</Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-5">
          {specialties.map((spec) => {
            const IconComp = iconMap[spec.icon] || Stethoscope;
            return (
              <Link key={spec.id} to={`/doctors?specialty=${spec.id}`} className="card-hover p-5 flex items-center gap-3.5 text-right group">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0 transition-colors group-hover:bg-primary/15">
                  <IconComp className="w-6 h-6 text-primary" />
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-bold text-foreground truncate">{spec.name}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">{spec.doctorCount} دكتور</p>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
