import { Link } from "react-router-dom";
import { specialties } from "@/data/specialties";
import {
  Smile, Fingerprint, Baby, Heart, Eye, Brain, Bone, Stethoscope
} from "lucide-react";

const iconMap: Record<string, React.ElementType> = {
  Smile, Fingerprint, Baby, Heart, Eye, Brain, Bone, Stethoscope,
};

export default function SpecialtiesGrid() {
  return (
    <section className="py-16 lg:py-20">
      <div className="container-app">
        <div className="flex items-end justify-between mb-10">
          <div className="text-right">
            <h2 className="section-title">التخصصات الطبية</h2>
            <p className="section-subtitle">تصفح الأطباء حسب التخصص الطبي الذي تحتاجه</p>
          </div>
          <Link to="/doctors" className="text-sm font-semibold text-primary hover:text-primary-light transition-colors whitespace-nowrap">
            عرض الكل ←
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {specialties.map((spec) => {
            const IconComp = iconMap[spec.icon] || Stethoscope;
            return (
              <Link
                key={spec.id}
                to={`/doctors?specialty=${spec.id}`}
                className="group card-hover p-6 flex items-center gap-4 text-right"
              >
                <div className="w-14 h-14 rounded-2xl bg-primary/8 flex items-center justify-center shrink-0 group-hover:bg-primary/15 transition-colors duration-300">
                  <IconComp className="w-7 h-7 text-primary" />
                </div>
                <div>
                  <span className="text-sm font-bold text-foreground block">{spec.name}</span>
                  <span className="text-xs text-muted-foreground mt-0.5 block">{spec.doctorCount} طبيب</span>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
