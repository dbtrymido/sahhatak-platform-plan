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
    <section className="py-12 lg:py-16">
      <div className="container-app">
        <div className="flex items-center justify-between mb-8">
          <div className="text-right">
            <h2 className="section-title">التخصصات المميزة</h2>
            <p className="section-subtitle">تصفح الأطباء حسب التخصص الطبي الذي تحتاجه</p>
          </div>
          <Link to="/doctors" className="text-sm font-medium text-primary hover:underline whitespace-nowrap">
            عرض الكل ←
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {specialties.slice(0, 6).map((spec) => {
            const IconComp = iconMap[spec.icon] || Stethoscope;
            return (
              <Link
                key={spec.id}
                to={`/doctors?specialty=${spec.id}`}
                className="card-hover p-5 flex flex-col items-center gap-3 text-center"
              >
                <div className="w-14 h-14 rounded-full bg-accent flex items-center justify-center">
                  <IconComp className="w-7 h-7 text-primary" />
                </div>
                <span className="text-sm font-semibold text-foreground">{spec.name}</span>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
