import { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import {
  MapPin, ChevronLeft, Star, Share2, Heart, GraduationCap,
  Briefcase, Sun, Moon, CheckCircle2, BriefcaseMedical, Calendar
} from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import DoctorAvatar from "@/components/shared/DoctorAvatar";
import RatingStars from "@/components/shared/RatingStars";
import MapPlaceholder from "@/components/shared/MapPlaceholder";
import { doctors } from "@/data/doctors";
import { formatPrice, getWeekDates } from "@/lib/formatters";

export default function DoctorProfile() {
  const { id } = useParams();
  const navigate = useNavigate();
  const doctor = doctors.find((d) => d.id === id);
  const [selectedDate, setSelectedDate] = useState(0);
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState("about");
  const weekDates = getWeekDates();

  if (!doctor) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1 flex items-center justify-center">
          <div className="empty-state">
            <p className="empty-state-title">لم يتم العثور على الطبيب</p>
          </div>
        </main>
      </div>
    );
  }

  const morningSlots = doctor.timeSlots.filter((s) => s.period === "morning");
  const eveningSlots = doctor.timeSlots.filter((s) => s.period === "evening");

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 bg-background section-padding-sm">
        <div className="container-app">
          {/* Breadcrumb */}
          <nav className="text-sm text-muted-foreground mb-5 flex items-center gap-2 flex-wrap">
            <Link to="/" className="hover:text-primary transition-colors">الرئيسية</Link>
            <ChevronLeft className="w-3.5 h-3.5" />
            <Link to="/doctors" className="hover:text-primary transition-colors">بحث الأطباء</Link>
            <ChevronLeft className="w-3.5 h-3.5" />
            <span className="text-foreground font-medium truncate">{doctor.fullName}</span>
          </nav>

          <div className="flex flex-col lg:flex-row gap-6">
            {/* Main Content */}
            <div className="flex-1 space-y-5">
              {/* Doctor Info Hero Card */}
              <div className="card-base p-5 lg:p-7">
                <div className="flex flex-col sm:flex-row items-start gap-5">
                  <DoctorAvatar initials={doctor.initials} color={doctor.avatarColor} size="lg" />
                  <div className="flex-1 min-w-0 text-right">
                    <div className="flex items-center gap-2 mb-2 flex-wrap">
                      <h1 className="text-2xl font-bold">{doctor.fullName}</h1>
                      <CheckCircle2 className="w-5 h-5 text-success shrink-0" />
                    </div>
                    <p className="text-primary font-semibold mb-3">{doctor.title}</p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-sm mb-4">
                      <span className="flex items-center gap-2 text-muted-foreground">
                        <BriefcaseMedical className="w-4 h-4 shrink-0 text-primary/70" />
                        {doctor.yearsOfExperience}+ سنة خبرة
                      </span>
                      <span className="flex items-center gap-2 text-muted-foreground">
                        <MapPin className="w-4 h-4 shrink-0 text-primary/70" />
                        {doctor.city}، {doctor.area}
                      </span>
                    </div>

                    <RatingStars rating={doctor.rating} reviewCount={doctor.reviewCount} size="md" />

                    {/* Tags */}
                    {doctor.tags.length > 0 && (
                      <div className="flex flex-wrap gap-2 mt-4">
                        {doctor.tags.slice(0, 4).map((tag) => (
                          <span key={tag} className="badge-specialty text-[11px]">{tag}</span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex gap-2 mt-5 pt-5 border-t border-border/60">
                  <button className="btn-ghost border border-border text-xs gap-1.5 hover:border-primary/30">
                    <Share2 className="w-4 h-4" /> مشاركة
                  </button>
                  <button className="btn-ghost border border-border text-xs gap-1.5 hover:border-destructive/30 hover:text-destructive">
                    <Heart className="w-4 h-4" /> حفظ
                  </button>
                </div>
              </div>

              {/* Tabs */}
              <div className="flex gap-0 border-b border-border overflow-x-auto scrollbar-thin">
                {[
                  { id: "about", label: "عن الطبيب" },
                  { id: "qualifications", label: "الخبرة والتعليم" },
                  { id: "location", label: "الموقع والعيادة" },
                  { id: "reviews", label: `التقييمات (${doctor.reviewCount})` },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    className={`px-5 py-4 text-sm font-medium border-b-2 transition-all whitespace-nowrap shrink-0 ${
                      activeTab === tab.id
                        ? "border-primary text-primary font-semibold"
                        : "border-transparent text-muted-foreground hover:text-foreground hover:border-border"
                    }`}
                    onClick={() => setActiveTab(tab.id)}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              {/* Tab Content */}
              {activeTab === "about" && (
                <div className="card-base p-5 lg:p-6 animate-in">
                  <h2 className="font-bold text-lg mb-4">نبذة عن الطبيب</h2>
                  <p className="text-sm text-muted-foreground leading-relaxed">{doctor.bio}</p>
                </div>
              )}

              {activeTab === "qualifications" && (
                <div className="card-base p-5 lg:p-6 space-y-5 animate-in">
                  <h2 className="font-bold text-lg">الخبرات والمؤهلات</h2>
                  {doctor.qualifications.length === 0 ? (
                    <div className="empty-state py-8">
                      <p className="empty-state-description">لا توجد معلومات إضافية متاحة</p>
                    </div>
                  ) : (
                    doctor.qualifications.map((q, i) => (
                      <div key={i} className="flex items-start gap-4 p-4 rounded-xl bg-muted/30 hover:bg-muted/50 transition-colors">
                        <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                          {i === 0 ? <GraduationCap className="w-5 h-5 text-primary" /> : <Briefcase className="w-5 h-5 text-primary" />}
                        </div>
                        <div>
                          <p className="font-semibold text-sm">{q.title}</p>
                          <p className="text-xs text-muted-foreground mt-0.5">{q.institution} • {q.year}</p>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              )}

              {activeTab === "location" && (
                <div className="card-base p-5 lg:p-6 space-y-5 animate-in">
                  <h2 className="font-bold text-lg">موقع العيادة</h2>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <MapPin className="w-4 h-4 text-primary shrink-0" />
                    <span>{doctor.area}، {doctor.city}</span>
                  </div>
                  <MapPlaceholder label={`مجمع العيادات الطبية، ${doctor.city}`} />
                </div>
              )}

              {activeTab === "reviews" && (
                <div className="card-base p-5 lg:p-6 space-y-5 animate-in">
                  <h2 className="font-bold text-lg">آراء المرضى ({doctor.reviewCount})</h2>
                  {doctor.reviews.length === 0 ? (
                    <div className="empty-state py-8">
                      <p className="empty-state-description">لا توجد تقييمات مسجلة بعد</p>
                    </div>
                  ) : (
                    doctor.reviews.map((r, i) => (
                      <div key={i} className="flex items-start gap-4 pb-5 border-b border-border/60 last:border-0 last:pb-0">
                        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-sm font-bold text-primary shrink-0">
                          {r.name.charAt(0)}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between mb-2 flex-wrap gap-1">
                            <h4 className="font-semibold text-sm">{r.name}</h4>
                            <span className="text-xs text-muted-foreground">{r.date}</span>
                          </div>
                          <div className="mb-2">
                            <RatingStars rating={r.rating} />
                          </div>
                          <p className="text-sm text-muted-foreground leading-relaxed">{r.text}</p>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              )}
            </div>

            {/* Enhanced Mobile-Optimized Booking Sidebar */}
            <aside className="lg:w-96 shrink-0">
              <div className="card-base p-5 lg:p-6 lg:sticky lg:top-20 space-y-5">
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-lg text-foreground">احجز موعدك</h3>
                  <span className="text-xl font-bold text-primary">{formatPrice(doctor.price)}</span>
                </div>

                {/* Date Picker - Mobile Optimized */}
                <div>
                  <p className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-primary" />
                    اختر اليوم
                  </p>
                  <div className="grid grid-cols-4 gap-2">
                    {weekDates.slice(0, 4).map((d, i) => (
                      <button
                        key={i}
                        className={`flex flex-col items-center py-3 px-2 rounded-xl text-xs transition-all hover:scale-105 ${
                          selectedDate === i
                            ? "bg-primary text-primary-foreground shadow-button"
                            : "border border-border text-foreground hover:border-primary/50"
                        }`}
                        onClick={() => setSelectedDate(i)}
                      >
                        <span className="text-[10px] opacity-70 mb-0.5">{d.day}</span>
                        <span className="text-base font-bold">{d.date}</span>
                        {d.isToday && <span className="text-[10px] mt-0.5 font-medium">اليوم</span>}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Morning Slots */}
                {morningSlots.length > 0 && (
                  <div>
                    <p className="text-sm font-semibold mb-3 flex items-center gap-2">
                      <Sun className="w-4 h-4 text-warning" />
                      الصباح
                    </p>
                    <div className="grid grid-cols-3 gap-2">
                      {morningSlots.slice(0, 6).map((s) => (
                        <button
                          key={s.time}
                          className={`time-slot text-xs ${selectedSlot === s.time ? "selected" : ""} ${!s.available ? "disabled" : ""}`}
                          onClick={() => s.available && setSelectedSlot(s.time)}
                          disabled={!s.available}
                        >
                          {s.time}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Evening Slots */}
                {eveningSlots.length > 0 && (
                  <div>
                    <p className="text-sm font-semibold mb-3 flex items-center gap-2">
                      <Moon className="w-4 h-4 text-primary" />
                      المساء
                    </p>
                    <div className="grid grid-cols-3 gap-2">
                      {eveningSlots.slice(0, 6).map((s) => (
                        <button
                          key={s.time}
                          className={`time-slot text-xs ${selectedSlot === s.time ? "selected" : ""} ${!s.available ? "disabled" : ""}`}
                          onClick={() => s.available && setSelectedSlot(s.time)}
                          disabled={!s.available}
                        >
                          {s.time}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Selected Slot Confirmation */}
                {selectedSlot && (
                  <div className="bg-success-light border border-success/20 rounded-xl p-3 flex items-center gap-2 text-sm animate-in">
                    <CheckCircle2 className="w-4 h-4 text-success shrink-0" />
                    <span className="text-success font-medium">تم اختيار موعد {selectedSlot}</span>
                  </div>
                )}

                {/* Booking CTA */}
                <button
                  className="btn-cta w-full"
                  disabled={!selectedSlot}
                  onClick={() => navigate(`/booking/${doctor.id}?date=${selectedDate}&time=${selectedSlot}`)}
                >
                  {selectedSlot ? "تأكيد الحجز" : "اختر موعداً أولاً"}
                </button>

                <p className="text-xs text-center text-muted-foreground">الدفع يتم في العيادة بعد انتهاء الكشف</p>
              </div>
            </aside>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
