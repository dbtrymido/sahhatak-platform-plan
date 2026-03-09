import { Link, useSearchParams } from "react-router-dom";
import { CheckCircle, Calendar, Clock, MapPin, Home, CalendarPlus, Sparkles } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import DoctorAvatar from "@/components/shared/DoctorAvatar";
import { doctors } from "@/data/doctors";

export default function BookingConfirmation() {
  const [searchParams] = useSearchParams();
  const doctorId = searchParams.get("doctor") || "1";
  const time = searchParams.get("time") || "10:30 ص";
  const doctor = doctors.find((d) => d.id === doctorId) || doctors[0];
  const refNumber = `SH-${Math.floor(10000 + Math.random() * 90000)}`;

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 bg-background section-padding">
        <div className="container-app max-w-2xl mx-auto">
          {/* Success Animation */}
          <div className="text-center mb-8 animate-in">
            <div className="w-20 h-20 rounded-full bg-success/15 border-4 border-success/20 flex items-center justify-center mx-auto mb-5">
              <CheckCircle className="w-10 h-10 text-success" />
            </div>
            <h1 className="page-title mb-3">تم تأكيد حجزك بنجاح! 🎉</h1>
            <p className="text-muted-foreground leading-relaxed max-w-md mx-auto">
              رقم الحجز الخاص بك هو{" "}
              <span className="font-bold text-foreground bg-accent px-2 py-0.5 rounded-lg">#{refNumber}</span>
              <br />
              تم إرسال تفاصيل الموعد على هاتفك وبريدك الإلكتروني.
            </p>
          </div>

          {/* Appointment Summary Card */}
          <div className="card-base p-6 text-right space-y-5 animate-in">
            <h2 className="card-title flex items-center gap-2">
              <Calendar className="w-5 h-5 text-primary" />
              ملخص الموعد
            </h2>

            {/* Doctor Info */}
            <div className="flex items-center gap-4 p-4 rounded-2xl bg-primary/5 border border-primary/10">
              <DoctorAvatar initials={doctor.initials} color={doctor.avatarColor} size="sm" />
              <div className="flex-1 min-w-0">
                <h3 className="font-bold truncate">{doctor.fullName}</h3>
                <p className="text-sm text-primary font-medium">{doctor.title}</p>
              </div>
              <span className="badge-available">مؤكد</span>
            </div>

            {/* Details Grid */}
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-muted/30 rounded-xl p-4">
                <div className="flex items-center gap-1.5 text-xs text-muted-foreground mb-2">
                  <Calendar className="w-3.5 h-3.5 text-primary" />
                  التاريخ
                </div>
                <p className="text-sm font-semibold">الخميس، 24 أكتوبر 2024</p>
              </div>
              <div className="bg-muted/30 rounded-xl p-4">
                <div className="flex items-center gap-1.5 text-xs text-muted-foreground mb-2">
                  <Clock className="w-3.5 h-3.5 text-primary" />
                  الوقت
                </div>
                <p className="text-sm font-semibold">{time}</p>
              </div>
            </div>

            <div className="flex items-center gap-2.5 text-sm text-muted-foreground">
              <MapPin className="w-4 h-4 text-primary shrink-0" />
              <span>مستشفى دار الفؤاد - مبنى العيادات الخارجية</span>
            </div>

            {/* Actions */}
            <div className="grid grid-cols-2 gap-3 pt-2">
              <button className="btn-primary py-3 text-sm">
                <CalendarPlus className="w-4 h-4" />
                أضف للتقويم
              </button>
              <Link to="/" className="btn-outline py-3 text-sm text-center">
                <Home className="w-4 h-4" />
                الرئيسية
              </Link>
            </div>
          </div>

          {/* Help Note */}
          <div className="card-base p-4 mt-5 flex items-center gap-3 bg-accent/50 animate-in">
            <Sparkles className="w-5 h-5 text-primary shrink-0" />
            <p className="text-sm text-muted-foreground">
              هل تحتاج للمساعدة؟{" "}
              <Link to="#" className="text-primary font-semibold hover:underline">اتصل بفريق الدعم</Link>
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
