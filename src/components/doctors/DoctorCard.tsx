import { Link } from "react-router-dom";
import { MapPin, Clock, Star, BriefcaseMedical, CalendarClock } from "lucide-react";
import type { Doctor } from "@/data/doctors";
import RatingStars from "@/components/shared/RatingStars";
import DoctorAvatar from "@/components/shared/DoctorAvatar";
import { formatPrice } from "@/lib/formatters";

interface DoctorCardProps {
  doctor: Doctor;
  variant?: "grid" | "list";
}

export default function DoctorCard({ doctor, variant = "grid" }: DoctorCardProps) {
  if (variant === "list") {
    return (
      <article className="card-hover animate-in">
        <div className="p-5 sm:p-6 flex flex-col sm:flex-row gap-4">
          {/* Doctor Info */}
          <div className="flex items-start gap-4 flex-1 min-w-0">
            <DoctorAvatar initials={doctor.initials} color={doctor.avatarColor} size="md" />
            <div className="flex-1 text-right min-w-0">
              <div className="flex items-start justify-between gap-2 mb-2">
                <div className="flex-1 min-w-0">
                  <h3 className="font-bold text-foreground text-lg leading-tight truncate">{doctor.fullName}</h3>
                  <p className="text-sm text-primary font-semibold mt-0.5 truncate">{doctor.specialty}</p>
                </div>
                {doctor.available && <span className="badge-available shrink-0">متاح</span>}
              </div>

              <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-xs text-muted-foreground mb-3">
                <span className="flex items-center gap-1.5">
                  <BriefcaseMedical className="w-3.5 h-3.5 shrink-0" />
                  {doctor.yearsOfExperience}+ سنة خبرة
                </span>
                <span className="flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 shrink-0" />
                  {doctor.city}
                </span>
              </div>

              <RatingStars rating={doctor.rating} reviewCount={doctor.reviewCount} />

              {doctor.available && doctor.nextAvailableSlot && (
                <p className="text-xs text-success font-medium mt-2.5 flex items-center gap-1.5 bg-success-light rounded-lg px-2.5 py-1.5 w-fit">
                  <CalendarClock className="w-3.5 h-3.5" />
                  أقرب موعد متاح: {doctor.nextAvailableSlot}
                </p>
              )}
            </div>
          </div>

          {/* Price & Action */}
          <div className="flex flex-row sm:flex-col items-center sm:items-end justify-between sm:justify-between gap-3 sm:min-w-[160px] sm:border-r sm:border-border sm:pr-4 sm:mr-4 pt-4 sm:pt-0 border-t sm:border-t-0 border-border">
            <div className="text-right">
              <span className="text-xs text-muted-foreground block">سعر الكشف</span>
              <p className="text-2xl font-bold text-primary leading-none mt-0.5">{formatPrice(doctor.price)}</p>
            </div>
            <Link 
              to={`/doctors/${doctor.id}`} 
              className="btn-primary text-sm px-6 whitespace-nowrap"
            >
              احجز الآن
            </Link>
          </div>
        </div>
      </article>
    );
  }

  // Grid variant
  return (
    <article className="card-hover p-5 lg:p-6 flex flex-col h-full animate-in">
      {/* Header */}
      <div className="flex items-start gap-3 lg:gap-4 mb-4">
        <DoctorAvatar initials={doctor.initials} color={doctor.avatarColor} size="sm" />
        <div className="flex-1 min-w-0 text-right">
          <h3 className="font-bold text-foreground text-sm lg:text-base leading-tight truncate">{doctor.fullName}</h3>
          <p className="text-xs lg:text-sm text-primary font-semibold mt-1 truncate">{doctor.specialty}</p>
          {doctor.available && <span className="badge-available text-[10px] lg:text-xs mt-1 inline-flex">متاح</span>}
        </div>
      </div>

      {/* Details */}
      <div className="space-y-2 text-xs lg:text-sm text-muted-foreground mb-3">
        <div className="flex items-center gap-1.5">
          <BriefcaseMedical className="w-3.5 h-3.5 lg:w-4 lg:h-4 shrink-0" />
          <span>{doctor.yearsOfExperience} سنة خبرة</span>
        </div>
        <div className="flex items-center gap-1.5">
          <MapPin className="w-3.5 h-3.5 lg:w-4 lg:h-4 shrink-0" />
          <span>{doctor.city}</span>
        </div>
        {doctor.nextAvailableSlot && (
          <div className="flex items-center gap-1.5">
            <CalendarClock className="w-3.5 h-3.5 lg:w-4 lg:h-4 shrink-0 text-success" />
            <span className="text-success font-medium">{doctor.nextAvailableSlot}</span>
          </div>
        )}
      </div>

      {/* Rating */}
      <div className="mb-4">
        <RatingStars rating={doctor.rating} reviewCount={doctor.reviewCount} />
      </div>

      {/* Footer */}
      <div className="mt-auto pt-4 border-t border-border/60 flex items-center justify-between gap-3">
        <div>
          <span className="text-[11px] lg:text-xs text-muted-foreground">الكشف</span>
          <p className="text-lg lg:text-xl font-bold text-primary leading-none mt-0.5">{formatPrice(doctor.price)}</p>
        </div>
        <Link 
          to={`/doctors/${doctor.id}`} 
          className="btn-primary text-xs lg:text-sm px-4 lg:px-5 py-2.5"
        >
          احجز الآن
        </Link>
      </div>
    </article>
  );
}
