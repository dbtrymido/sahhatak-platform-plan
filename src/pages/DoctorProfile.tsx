import { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { MapPin, Clock, ChevronLeft, ChevronRight, Star, Share2, Heart, GraduationCap, Briefcase, Sun, Moon } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import DoctorAvatar from "@/components/shared/DoctorAvatar";
import RatingStars from "@/components/shared/RatingStars";
import MapPlaceholder from "@/components/shared/MapPlaceholder";
import { doctors } from "@/data/doctors";
import { formatPrice } from "@/lib/formatters";
import { getWeekDates } from "@/lib/formatters";

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
          <p className="text-muted-foreground">لم يتم العثور على الطبيب</p>
        </main>
      </div>
    );
  }

  const morningSlots = doctor.timeSlots.filter((s) => s.period === "morning");
  const eveningSlots = doctor.timeSlots.filter((s) => s.period === "evening");

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 bg-background py-6 lg:py-10">
        <div className="container-app">
          {/* Breadcrumb */}
          <nav className="text-sm text-muted-foreground mb-4 flex items-center gap-1">
            <Link to="/" className="hover:text-primary">الرئيسية</Link>
            <ChevronLeft className="w-3.5 h-3.5" />
            <Link to="/doctors" className="hover:text-primary">بحث الأطباء</Link>
            <ChevronLeft className="w-3.5 h-3.5" />
            <span className="text-foreground font-medium">{doctor.fullName}</span>
          </nav>

          <div className="flex flex-col lg:flex-row gap-6">
            {/* Main Content */}
            <div className="flex-1 space-y-6">
              {/* Doctor Info Card */}
              <div className="card-base p-6">
                <div className="flex items-start gap-4">
                  <DoctorAvatar initials={doctor.initials} color={doctor.avatarColor} size="lg" />
                  <div className="flex-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h1 className="text-xl font-bold text-foreground">{doctor.name}</h1>
                      <span className="w-3 h-3 rounded-full bg-success shrink-0" />
                    </div>
                    <p className="text-sm text-primary font-medium mt-1">{doctor.title}</p>
                    <div className="flex items-center gap-3 mt-2 text-xs text-muted-foreground flex-wrap">
                      <RatingStars rating={doctor.rating} reviewCount={doctor.reviewCount} />
                      <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5" />{doctor.city}، {doctor.area}</span>
                      <span>{doctor.experience}+ سنة خبرة</span>
                    </div>
                  </div>
                </div>
                <div className="flex gap-2 mt-4">
                  <button className="btn-ghost border border-border text-xs"><Share2 className="w-4 h-4" /> مشاركة</button>
                  <button className="btn-ghost border border-border text-xs"><Heart className="w-4 h-4" /> حفظ</button>
                </div>
              </div>

              {/* Tabs */}
              <div className="flex gap-1 border-b border-border">
                {[
                  { id: "about", label: "عن الطبيب" },
                  { id: "qualifications", label: "الخبرة والتعليم" },
                  { id: "location", label: "الموقع والعيادة" },
                  { id: "reviews", label: "آراء المرضى" },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    className={`px-4 py-3 text-sm font-medium border-b-2 transition-colors ${activeTab === tab.id ? "border-primary text-primary" : "border-transparent text-muted-foreground hover:text-foreground"}`}
                    onClick={() => setActiveTab(tab.id)}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              {/* Tab Content */}
              {activeTab === "about" && (
                <div className="card-base p-6">
                  <h2 className="font-bold text-lg mb-3">نبذة عن الطبيب</h2>
                  <p className="text-sm text-muted-foreground leading-relaxed">{doctor.bio}</p>
                </div>
              )}

              {activeTab === "qualifications" && (
                <div className="card-base p-6 space-y-4">
                  <h2 className="font-bold text-lg mb-3">الخبرات والمؤهلات</h2>
                  {doctor.qualifications.map((q, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-lg bg-accent flex items-center justify-center shrink-0">
                        {i === 0 ? <GraduationCap className="w-5 h-5 text-primary" /> : <Briefcase className="w-5 h-5 text-primary" />}
                      </div>
                      <div>
                        <p className="font-semibold text-sm">{q.title}</p>
                        <p className="text-xs text-muted-foreground">{q.institution} | {q.year}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {activeTab === "location" && (
                <div className="card-base p-6 space-y-4">
                  <h2 className="font-bold text-lg mb-3">موقع العيادة</h2>
                  <p className="text-sm text-muted-foreground flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-primary" />
                    {doctor.area}، {doctor.city}
                  </p>
                  <MapPlaceholder label={`مجمع العيادات الطبية، ${doctor.city}`} />
                </div>
              )}

              {activeTab === "reviews" && (
                <div className="card-base p-6 space-y-6">
                  <h2 className="font-bold text-lg">آراء المرضى</h2>
                  {doctor.reviews.length === 0 ? (
                    <p className="text-sm text-muted-foreground">لا توجد تقييمات بعد</p>
                  ) : (
                    doctor.reviews.map((r, i) => (
                      <div key={i} className="flex items-start gap-3 border-b border-border pb-4 last:border-0">
                        <div className="w-10 h-10 rounded-full bg-accent flex items-center justify-center text-sm font-bold text-primary shrink-0">
                          {r.name.charAt(0)}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <h4 className="font-semibold text-sm">{r.name}</h4>
                            <span className="text-xs text-muted-foreground">{r.date}</span>
                          </div>
                          <div className="flex gap-0.5 my-1">
                            {[1,2,3,4,5].map(s => <Star key={s} className={`w-3 h-3 ${s <= r.rating ? "fill-warning text-warning" : "text-border"}`} />)}
                          </div>
                          <p className="text-sm text-muted-foreground">{r.text}</p>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              )}
            </div>

            {/* Booking Sidebar */}
            <aside className="lg:w-80 shrink-0">
              <div className="card-base p-5 sticky top-20 space-y-5">
                <h3 className="font-bold text-foreground">احجز موعدك الآن</h3>

                {/* Week dates */}
                <div className="flex items-center gap-1">
                  <button className="p-1 rounded border border-border"><ChevronRight className="w-4 h-4" /></button>
                  <div className="flex gap-1 flex-1 overflow-x-auto">
                    {weekDates.slice(0, 4).map((d, i) => (
                      <button
                        key={i}
                        className={`flex-1 flex flex-col items-center py-2 px-1 rounded-lg text-xs transition-colors ${selectedDate === i ? "bg-primary text-primary-foreground" : "border border-border text-foreground hover:border-primary"}`}
                        onClick={() => setSelectedDate(i)}
                      >
                        <span className="text-[10px]">{d.day}</span>
                        <span className="text-lg font-bold">{d.date}</span>
                        {d.isToday && <span className="text-[10px]">اليوم</span>}
                      </button>
                    ))}
                  </div>
                  <button className="p-1 rounded border border-border"><ChevronLeft className="w-4 h-4" /></button>
                </div>

                {/* Time slots */}
                <div>
                  <h4 className="text-sm font-semibold mb-2 flex items-center gap-1"><Sun className="w-4 h-4 text-warning" /> الفترات المتاحة</h4>
                  <div className="grid grid-cols-3 gap-2">
                    {morningSlots.slice(0, 3).map((s) => (
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

                {eveningSlots.length > 0 && (
                  <div>
                    <div className="grid grid-cols-3 gap-2">
                      {eveningSlots.slice(0, 3).map((s) => (
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

                {/* Price */}
                <div className="flex items-center justify-between pt-3 border-t border-border">
                  <span className="text-sm text-muted-foreground">رسوم الكشف</span>
                  <span className="text-lg font-bold text-primary">{formatPrice(doctor.price)}</span>
                </div>

                <button
                  className="btn-primary w-full py-3"
                  disabled={!selectedSlot}
                  onClick={() => navigate(`/booking/${doctor.id}?date=${selectedDate}&time=${selectedSlot}`)}
                >
                  تأكيد الحجز
                </button>
                <p className="text-xs text-center text-muted-foreground">لا يتم خصم أي مبالغ حتى بعد الزيارة</p>
              </div>
            </aside>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
