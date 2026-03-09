import { Link, useSearchParams } from "react-router-dom";
import { CheckCircle, Calendar, Clock, MapPin, Home, CalendarPlus } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import DoctorAvatar from "@/components/shared/DoctorAvatar";
import MapPlaceholder from "@/components/shared/MapPlaceholder";
import { doctors } from "@/data/doctors";

export default function BookingConfirmation() {
  const [searchParams] = useSearchParams();
  const doctorId = searchParams.get("doctor") || "1";
  const time = searchParams.get("time") || "10:30 صباحاً";
  const doctor = doctors.find((d) => d.id === doctorId) || doctors[0];
  const refNumber = `SH-${Math.floor(10000 + Math.random() * 90000)}`;

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 bg-background py-10 lg:py-16">
        <div className="container-app max-w-2xl mx-auto text-center">
          <div className="w-16 h-16 rounded-full bg-success/10 flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="w-9 h-9 text-success" />
          </div>
          <h1 className="text-2xl font-bold mb-2">تم تأكيد الحجز بنجاح</h1>
          <p className="text-sm text-muted-foreground mb-8">
            تم حجز موعدك بنجاح. رقم المرجع الخاص بك هو <span className="font-bold text-foreground">#{refNumber}</span>. لقد أرسلنا تفاصيل الموعد إلى بريدك الإلكتروني.
          </p>

          <div className="card-base p-6 text-right space-y-5">
            <h2 className="font-bold flex items-center gap-2"><Calendar className="w-5 h-5 text-primary" /> ملخص الموعد</h2>

            <div className="flex items-center gap-3">
              <DoctorAvatar initials={doctor.initials} color={doctor.avatarColor} size="sm" />
              <div>
                <h3 className="font-bold">{doctor.name}</h3>
                <p className="text-sm text-primary">{doctor.title}</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="bg-background rounded-lg p-4">
                <div className="flex items-center gap-1 text-xs text-muted-foreground mb-1"><Calendar className="w-3.5 h-3.5 text-primary" /> التاريخ</div>
                <p className="text-sm font-semibold">الخميس، 24 أكتوبر 2024</p>
              </div>
              <div className="bg-background rounded-lg p-4">
                <div className="flex items-center gap-1 text-xs text-muted-foreground mb-1"><Clock className="w-3.5 h-3.5 text-primary" /> الوقت</div>
                <p className="text-sm font-semibold">{time} - 11:00 صباحاً</p>
              </div>
            </div>

            <div className="flex items-center gap-2 text-sm">
              <MapPin className="w-4 h-4 text-primary shrink-0" />
              <span>مجمع الرياض الطبي - مبنى العيادات الخارجية</span>
            </div>

            <MapPlaceholder label="مجمع الرياض الطبي" />

            <div className="grid grid-cols-2 gap-3 pt-4">
              <button className="btn-primary py-3 text-sm">
                <CalendarPlus className="w-4 h-4" /> إضافة إلى التقويم
              </button>
              <Link to="/" className="btn-outline py-3 text-sm text-center">
                <Home className="w-4 h-4" /> العودة للرئيسية
              </Link>
            </div>
          </div>

          <p className="text-sm text-muted-foreground mt-6">
            هل تحتاج للمساعدة؟ <Link to="#" className="text-primary font-medium hover:underline">اتصل بنا</Link>
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
}
