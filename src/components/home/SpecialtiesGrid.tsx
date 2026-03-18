import { Link } from "react-router-dom";
import { specialties } from "@/data/specialties";
import { Smile, Fingerprint, Baby, Heart, Eye, Brain, Bone, Stethoscope, Layers } from "lucide-react";

const iconMap: Record<string, React.ElementType> = {
  Smile, Fingerprint, Baby, Heart, Eye, Brain, Bone, Stethoscope,
};

export default function SpecialtiesGrid() {
  return (
    <section className="py-8 sm:py-10 lg:py-12">
      <div className="container-app">
        <div className="flex items-end justify-between gap-3 mb-5 lg:mb-8">
          <div className="text-right">
            <div className="flex items-center gap-1.5 text-primary text-xs lg:text-sm font-medium mb-1">
              <Layers className="w-3.5 h-3.5 lg:w-4 lg:h-4" />
              <span>تخصصات متنوعة</span>
            </div>
            <h2 className="text-lg sm:text-xl lg:text-2xl font-bold">اختر تخصصك بسرعة</h2>
          </div>
          <Link to="/doctors" className="btn-soft text-xs lg:text-sm whitespace-nowrap px-3 py-1.5 lg:px-4 lg:py-2">كل التخصصات</Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
          {specialties.map((spec) => {
            const IconComp = iconMap[spec.icon] || Stethoscope;
            return (
              <Link key={spec.id} to={`/doctors?specialty=${spec.id}`} className="card-hover p-3 sm:p-4 lg:p-5 flex items-center gap-3 lg:gap-4 text-right group">
                <div className="w-10 h-10 sm:w-11 sm:h-11 lg:w-12 lg:h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0 transition-colors group-hover:bg-primary/15">
                  <IconComp className="w-5 h-5 lg:w-6 lg:h-6 text-primary" />
                </div>
                <div className="min-w-0">
                  <p className="text-sm lg:text-base font-semibold text-foreground truncate">{spec.name}</p>
                  <p className="text-xs lg:text-sm text-muted-foreground">{spec.doctorCount} دكتور</p>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
