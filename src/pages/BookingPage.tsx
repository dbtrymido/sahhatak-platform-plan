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
  const [isSubmitting, setIsSubmitting] = useState(false);
  
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate booking process
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setIsSubmitting(false);
    navigate(`/booking/confirmation?doctor=${doctor.id}&time=${selectedTime}`);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 bg-background section-padding-sm">
        <div className="container-app max-w-6xl">
          {/* Mobile-Friendly Breadcrumb */}
          <nav className="text-sm text-muted-foreground mb-6 flex items-center gap-2">
            <Link to={`/doctors/${doctor.id}`} className="hover:text-primary transition-colors">اختيار الطبيب</Link>
            <ChevronLeft className="w-4 h-4" />
            <span className="text-foreground font-medium">بيانات المريض</span>
          </nav>

          {/* Enhanced Step Indicator for Mobile */}
          <div className="text-center mb-8">
            <div className="step-indicator mb-4">
              <div className="step-dot completed"><CheckCircle2 className="w-4 h-4" /></div>
              <div className="step-line active"></div>
              <div className="step-dot active">٢</div>
              <div className="step-line"></div>
              <div className="step-dot pending">٣</div>
            </div>
            <h1 className="page-title">تأكيد بيانات المريض</h1>
            <p className="page-subtitle">أدخل بياناتك لإتمام حجز الموعد بأمان</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
            {/* Enhanced Patient Form - Mobile First */}
            <div className="card-base border-2 border-primary/20 card-padding">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                  <User className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h2 className="card-title">تفاصيل المريض</h2>
                  <p className="text-xs text-muted-foreground">معلومات مطلوبة للحجز</p>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold mb-2 text-right">الاسم الكامل *</label>
                    <div className="relative">
                      <input 
                        className="input-field pr-12" 
                        placeholder="الاسم الثلاثي" 
                        value={form.name} 
                        onChange={(e) => update("name", e.target.value)} 
                        required 
                      />
                      <User className="absolute top-1/2 -translate-y-1/2 right-4 w-5 h-5 text-muted-foreground" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold mb-2 text-right">رقم الهاتف *</label>
                    <div className="relative">
                      <input 
                        className="input-field pr-12" 
                        placeholder="01xxxxxxxxx" 
                        type="tel"
                        value={form.phone} 
                        onChange={(e) => update("phone", e.target.value)} 
                        required 
                      />
                      <Phone className="absolute top-1/2 -translate-y-1/2 right-4 w-5 h-5 text-muted-foreground" />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2 text-right">البريد الإلكتروني</label>
                  <div className="relative">
                    <input 
                      type="email" 
                      className="input-field pr-12" 
                      placeholder="example@domain.com" 
                      value={form.email} 
                      onChange={(e) => update("email", e.target.value)} 
                    />
                    <Mail className="absolute top-1/2 -translate-y-1/2 right-4 w-5 h-5 text-muted-foreground" />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2 text-right">سبب الزيارة</label>
                  <div className="relative">
                    <textarea 
                      className="textarea-field pr-12" 
                      placeholder="اشرح باختصار الأعراض أو سبب المراجعة..." 
                      value={form.reason} 
                      onChange={(e) => update("reason", e.target.value)} 
                    />
                    <FileText className="absolute top-4 right-4 w-5 h-5 text-muted-foreground" />
                  </div>
                </div>

                <button 
                  type="submit" 
                  className="btn-cta w-full gap-3 mt-6"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <div className="loading-spinner w-5 h-5" />
                      جاري التأكيد...
                    </>
                  ) : (
                    <>
                      تأكيد الحجز
                      <ChevronLeft className="w-5 h-5" />
                    </>
                  )}
                </button>
              </form>
            </div>

            {/* Enhanced Booking Summary - Mobile Optimized */}
            <div className="space-y-6">
              <div className="card-base card-padding">
                <h2 className="card-title mb-6">ملخص الحجز</h2>

                {/* Doctor Info Card */}
                <div className="flex items-center gap-4 mb-6 p-4 rounded-2xl bg-primary/5 border border-primary/10">
                  <DoctorAvatar initials={doctor.initials} color={doctor.avatarColor} size="md" />
                  <div className="flex-1 min-w-0">
                    <h3 className="font-bold text-base truncate">{doctor.fullName}</h3>
                    <p className="text-sm text-primary truncate">{doctor.specialty}</p>
                  </div>
                  <div className="shrink-0">
                    <CheckCircle2 className="w-6 h-6 text-success" />
                  </div>
                </div>

                {/* Appointment Details */}
                <div className="space-y-4 mb-6">
                  <div className="flex items-center gap-3 text-sm">
                    <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                      <Calendar className="w-5 h-5 text-primary" />
                    </div>
                    <div className="flex-1">
                      <span className="text-muted-foreground text-xs block">التاريخ</span>
                      <span className="font-semibold">{selectedDate?.day}، {selectedDate?.date}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                      <Clock className="w-5 h-5 text-primary" />
                    </div>
                    <div className="flex-1">
                      <span className="text-muted-foreground text-xs block">الوقت</span>
                      <span className="font-semibold">{selectedTime}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                      <MapPin className="w-5 h-5 text-primary" />
                    </div>
                    <div className="flex-1">
                      <span className="text-muted-foreground text-xs block">الموقع</span>
                      <span className="font-medium text-xs">{doctor.area}، {doctor.city}</span>
                    </div>
                  </div>
                </div>

                <div className="divider-dashed"></div>

                {/* Enhanced Price Breakdown */}
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">رسوم الكشف</span>
                    <span className="font-semibold">{formatPrice(price)}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">ضريبة القيمة المضافة (15%)</span>
                    <span className="font-semibold">{formatPrice(vat)}</span>
                  </div>
                  <div className="divider-dashed"></div>
                  <div className="flex justify-between items-center text-base">
                    <span className="font-bold">الإجمالي</span>
                    <span className="font-bold text-lg text-primary">{formatPrice(total)}</span>
                  </div>
                </div>
              </div>

              {/* Important Notice */}
              <div className="card-base p-4 bg-info-light border-info/20">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-info/20 flex items-center justify-center shrink-0">
                    <AlertCircle className="w-5 h-5 text-info" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-sm mb-1">معلومة مهمة</h4>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      سيتم إرسال رسالة تأكيد على البريد الإلكتروني ورقم الهاتف بعد إتمام الحجز. 
                      الدفع يتم في العيادة بعد الانتهاء من الكشف.
                    </p>
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