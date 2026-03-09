import { useState } from "react";
import { useParams, useSearchParams, Link, useNavigate } from "react-router-dom";
import { ChevronLeft, User, Phone, Mail, FileText, Calendar, Clock, MapPin, CheckCircle2, AlertCircle } from "lucide-react";
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
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1 flex items-center justify-center">
          <div className="empty-state">
            <div className="empty-state-icon"><AlertCircle className="w-8 h-8 text-muted-foreground" /></div>
            <p className="empty-state-title">لم يتم العثور على الطبيب</p>
          </div>
        </main>
      </div>
    );
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
        <div className="container-app max-w-5xl">
          <nav className="text-sm text-muted-foreground mb-5 flex items-center gap-1">
            <Link to={`/doctors/${doctor.id}`} className="hover:text-primary">اختيار الطبيب</Link>
            <ChevronLeft className="w-3.5 h-3.5" />
            <span className="text-foreground font-medium">بيانات المريض</span>
          </nav>

          <div className="text-center mb-8">
            <div className="flex items-center justify-center gap-1 mb-3">
              <div className="step-dot completed"><CheckCircle2 className="w-4 h-4" /></div>
              <div className="step-line active"></div>
              <div className="step-dot active">٢</div>
              <div className="step-line"></div>
              <div className="step-dot pending">٣</div>
            </div>
            <h1 className="text-3xl font-bold mb-2">بيانات المريض</h1>
            <p className="text-sm text-muted-foreground">أدخل بياناتك لإتمام حجز الموعد</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="card-base p-6 border-2 border-primary/20">
              <h2 className="font-bold text-xl mb-5 flex items-center gap-2">
                <User className="w-5 h-5 text-primary" /> تفاصيل المريض
              </h2>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2 text-right">الاسم الكامل *</label>
                    <div className="relative">
                      <input className="input-field pr-10" placeholder="الاسم الثلاثي" value={form.name} onChange={(e) => update("name", e.target.value)} required />
                      <User className="absolute top-1/2 -translate-y-1/2 right-3.5 w-4 h-4 text-muted-foreground" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2 text-right">رقم الهاتف *</label>
                    <div className="relative">
                      <input className="input-field pr-10" placeholder="01xxxxxxxxx" value={form.phone} onChange={(e) => update("phone", e.target.value)} required />
                      <Phone className="absolute top-1/2 -translate-y-1/2 right-3.5 w-4 h-4 text-muted-foreground" />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2 text-right">البريد الإلكتروني</label>
                  <div className="relative">
                    <input type="email" className="input-field pr-10" placeholder="example@domain.com" value={form.email} onChange={(e) => update("email", e.target.value)} />
                    <Mail className="absolute top-1/2 -translate-y-1/2 right-3.5 w-4 h-4 text-muted-foreground" />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2 text-right">سبب الزيارة</label>
                  <div className="relative">
                    <textarea className="input-field pr-10 min-h-[120px] resize-y" placeholder="اشرح باختصار الأعراض أو سبب المراجعة..." value={form.reason} onChange={(e) => update("reason", e.target.value)} />
                    <FileText className="absolute top-3.5 right-3.5 w-4 h-4 text-muted-foreground" />
                  </div>
                </div>

                <button type="submit" className="btn-primary w-full py-4 text-base">
                  تأكيد الحجز
                  <ChevronLeft className="w-4 h-4" />
                </button>
              </form>
            </div>

            <div className="space-y-5">
              <div className="card-base p-6">
                <h2 className="font-bold text-xl mb-5">ملخص الحجز</h2>

                <div className="flex items-center gap-4 mb-6 p-4 rounded-xl bg-muted/30">
                  <DoctorAvatar initials={doctor.initials} color={doctor.avatarColor} size="sm" />
                  <div className="flex-1 min-w-0">
                    <h3 className="font-bold text-sm truncate">{doctor.fullName}</h3>
                    <p className="text-xs text-primary truncate">{doctor.specialty}</p>
                  </div>
                </div>

                <div className="space-y-3.5 mb-5">
                  <div className="flex items-center gap-3 text-sm">
                    <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                      <Calendar className="w-4 h-4 text-primary" />
                    </div>
                    <span className="text-muted-foreground">التاريخ:</span>
                    <span className="mr-auto font-medium">{selectedDate?.day}، {selectedDate?.date}</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                      <Clock className="w-4 h-4 text-primary" />
                    </div>
                    <span className="text-muted-foreground">الوقت:</span>
                    <span className="mr-auto font-medium">{selectedTime}</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                      <MapPin className="w-4 h-4 text-primary" />
                    </div>
                    <span className="text-muted-foreground">الموقع:</span>
                    <span className="mr-auto font-medium text-xs">{doctor.area}، {doctor.city}</span>
                  </div>
                </div>

                <div className="divider-dashed"></div>

                <div className="space-y-2.5 text-sm">
                  <div className="flex justify-between"><span className="text-muted-foreground">رسوم الكشف</span><span className="font-medium">{formatPrice(price)}</span></div>
                  <div className="flex justify-between"><span className="text-muted-foreground">ضريبة القيمة المضافة (15%)</span><span className="font-medium">{formatPrice(vat)}</span></div>
                  <div className="divider-dashed"></div>
                  <div className="flex justify-between text-base font-bold"><span>الإجمالي</span><span className="text-primary">{formatPrice(total)}</span></div>
                </div>
              </div>

              <div className="card-base p-5 bg-info-light border-info/20">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-info/20 flex items-center justify-center shrink-0">
                    <AlertCircle className="w-4 h-4 text-info" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-sm mb-1">معلومة مهمة</h4>
                    <p className="text-xs text-muted-foreground leading-relaxed">سيتم إرسال رسالة تأكيد على البريد الإلكتروني ورقم الهاتف بعد إتمام الحجز.</p>
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
