import { Search, CalendarCheck, HeartPulse, ArrowLeft } from "lucide-react";

const steps = [
  {
    icon: Search,
    number: "١",
    title: "ابحث عن الطبيب",
    description: "استخدم الفلاتر حسب التخصص والمدينة والتقييم.",
  },
  {
    icon: CalendarCheck,
    number: "٢",
    title: "اختر الموعد",
    description: "شاهد المواعيد المتاحة واحجز في دقيقة.",
  },
  {
    icon: HeartPulse,
    number: "٣",
    title: "تابع صحتك",
    description: "إدارة مواعيدك وسجلك من لوحة تحكم واحدة.",
  },
];

export default function HowItWorks() {
  return (
    <section className="py-8 sm:py-10 lg:py-12 bg-muted/30">
      <div className="container-app">
        <div className="text-center mb-6 lg:mb-10">
          <h2 className="text-lg sm:text-xl lg:text-2xl font-bold mb-1 lg:mb-2">كيف تعمل صحتك؟</h2>
          <p className="text-sm lg:text-base text-muted-foreground">٣ خطوات بسيطة للحجز</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 lg:gap-6">
          {steps.map((step, i) => (
            <div key={step.number} className="card-interactive p-4 sm:p-5 lg:p-8 text-center relative">
              <div className="w-12 h-12 lg:w-16 lg:h-16 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-3 lg:mb-4">
                <step.icon className="w-6 h-6 lg:w-8 lg:h-8 text-primary" />
              </div>
              <span className="inline-flex w-6 h-6 lg:w-8 lg:h-8 rounded-full bg-primary text-primary-foreground text-xs lg:text-sm font-bold items-center justify-center mb-2">
                {step.number}
              </span>
              <h3 className="font-bold text-sm lg:text-base mb-1 lg:mb-2">{step.title}</h3>
              <p className="text-xs lg:text-sm text-muted-foreground leading-relaxed">{step.description}</p>

              {i < steps.length - 1 && (
                <ArrowLeft className="hidden sm:block absolute -left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-border" />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
