import { useState } from "react";
import { useParams, useSearchParams, Link, useNavigate } from "react-router-dom";
import { ChevronLeft, User, Phone, Mail, FileText, Calendar, Clock, MapPin, ArrowLeft } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import DoctorAvatar from "@/components/shared/DoctorAvatar";
import { doctors } from "@/data/doctors";
import { formatPrice, getWeekDates } from "@/lib/formatters";

export default function BookingPage() {
  const { doctorId } = useParams();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const doctor = doctors.find((d) => d.id === doctorId);
  const selectedTime = searchParams.get("time") || "10:00 ص";
  const dateIdx = Number(searchParams.get("date") || 0);
  const weekDates = getWeekDates();
  const selectedDate = weekDates[dateIdx];

  const [form, setForm] = useState({ name: "", phone: "", email: "", reason: "" });
  const update = (field: string, value: string) => setForm((f) => ({ ...f, [field]: value }));

  if (!doctor) {
    return <div className="min-h-screen flex flex-col"><Navbar /><main className="flex-1 flex items-center justify-center"><p>لم يتم العثور على الطبيب</p></main></div>;
  }

  const price = doctor.price;
  const vat = price * 0.15;
  const total = price + vat;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate(`/booking/confirmation?doctor=${doctor.id}&time=${selectedTime}`);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 bg-background py-6 lg:py-10">
        <div className="container-app">
          {/* Breadcrumb */}
          <nav className="text-sm text-muted-foreground mb-4 flex items-center gap-1">
            <Link to={`/doctors/${doctor.id}`} className="hover:text-primary">اختيار الطبيب</Link>
            <ChevronLeft className="w-3.5 h-3.5" />
            <span className="text-foreground font-medium">بيانات المريض</span>
          </nav>

          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold">حجز موعد - بيانات المريض</h1>
            <p className="text-sm text-muted-foreground mt-2">الرجاء إدخال تفاصيل المريض لإتمام عملية الحجز</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {/* Patient Form */}
            <div className="card-base p-6 border-2 border-primary/20">
              <h2 className="font-bold text-lg mb-5 flex items-center gap-2">
                <User className="w-5 h-5 text-primary" /> تفاصيل المريض
              </h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1.5 text-right">الاسم الكامل</label>
                    <div className="relative">
                      <input className="input-field pr-10" placeholder="أدخل اسم المريض الثلاثي" value={form.name} onChange={(e) => update("name", e.target.value)} required />
                      <User className="absolute top-1/2 -translate-y-1/2 right-3 w-4 h-4 text-muted-foreground" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1.5 text-right">رقم الهاتف</label>
                    <div className="relative">
                      <input className="input-field pr-10" placeholder="05xxxxxxxx" value={form.phone} onChange={(e) => update("phone", e.target.value)} required />
                      <Phone className="absolute top-1/2 -translate-y-1/2 right-3 w-4 h-4 text-muted-foreground" />
                    </div>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1.5 text-right">البريد الإلكتروني</label>
                  <div className="relative">
                    <input type="email" className="input-field pr-10" placeholder="example@domain.com" value={form.email} onChange={(e) => update("email", e.target.value)} />
                    <Mail className="absolute top-1/2 -translate-y-1/2 right-3 w-4 h-4 text-muted-foreground" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1.5 text-right">سبب الزيارة</label>
                  <div className="relative">
                    <textarea className="input-field pr-10 min-h-[100px] resize-y" placeholder="اشرح باختصار الأعراض أو سبب المراجعة" value={form.reason} onChange={(e) => update("reason", e.target.value)} />
                    <FileText className="absolute top-3 right-3 w-4 h-4 text-muted-foreground" />
                  </div>
                </div>
                <button type="submit" className="btn-primary w-full py-3.5 text-base">
                  تأكيد بيانات الحجز ←
                </button>
              </form>
            </div>

            {/* Booking Summary */}
            <div className="space-y-4">
              <div className="card-base p-6">
                <h2 className="font-bold text-lg mb-5">ملخص الحجز</h2>
                <div className="flex items-center gap-3 mb-5">
                  <DoctorAvatar initials={doctor.initials} color={doctor.avatarColor} size="sm" />
                  <div>
                    <h3 className="font-bold text-sm">{doctor.name}</h3>
                    <p className="text-xs text-primary">{doctor.specialty}</p>
                  </div>
                </div>
                <div className="space-y-3 text-sm">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-primary" />
                    <span className="text-muted-foreground">التاريخ</span>
                    <span className="mr-auto font-medium">{selectedDate?.day}، {selectedDate?.date}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-primary" />
                    <span className="text-muted-foreground">الوقت</span>
                    <span className="mr-auto font-medium">{selectedTime}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-primary" />
                    <span className="text-muted-foreground">الموقع</span>
                    <span className="mr-auto font-medium text-xs">{doctor.area}، {doctor.city}</span>
                  </div>
                </div>
                <hr className="my-4 border-dashed" />
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between"><span className="text-muted-foreground">قيمة الكشفية</span><span className="font-medium">{formatPrice(price)}</span></div>
                  <div className="flex justify-between"><span className="text-muted-foreground">ضريبة القيمة المضافة (15%)</span><span className="font-medium">{formatPrice(vat)}</span></div>
                  <hr className="border-dashed" />
                  <div className="flex justify-between text-base"><span className="font-bold">الإجمالي</span><span className="font-bold text-primary">{formatPrice(total)}</span></div>
                </div>
              </div>

              <div className="card-base p-4 bg-accent/30 border-primary/10">
                <div className="flex items-start gap-2">
                  <span className="text-primary text-lg">❓</span>
                  <div>
                    <h4 className="font-semibold text-sm">تحتاج مساعدة؟</h4>
                    <p className="text-xs text-muted-foreground">فريق الدعم الفني متاح لمساعدتك في أي وقت لإكمال الحجز.</p>
                    <a href="#" className="text-xs text-primary font-medium hover:underline mt-1 inline-block">تواصل معنا الآن ↗</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
