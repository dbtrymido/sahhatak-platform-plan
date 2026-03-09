import { Search, CalendarCheck, HeartPulse } from "lucide-react";

const steps = [
  {
    icon: Search,
    number: "١",
    title: "ابحث عن طبيبك",
    description: "اختر من بين آلاف الأطباء في مختلف التخصصات والمدن.",
  },
  {
    icon: CalendarCheck,
    number: "٢",
    title: "احجز الموعد",
    description: "اختر الوقت المناسب لك وأكد حجزك بسهولة بزر واحد.",
  },
  {
    icon: HeartPulse,
    number: "٣",
    title: "حافظ على صحتك",
    description: "احصل على الرعاية الطبية التي تستحقها ونتابع ملفك الصحي.",
  },
];

export default function HowItWorks() {
  return (
    <section className="py-16 lg:py-20 bg-card">
      <div className="container-app text-center">
        <h2 className="section-title mb-3">كيف يعمل صحتك؟</h2>
        <p className="section-subtitle mb-12 mx-auto max-w-md">ثلاث خطوات بسيطة للحصول على أفضل رعاية طبية</p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step, i) => (
            <div key={step.number} className="flex flex-col items-center gap-5">
              <div className="relative">
                <div className="w-20 h-20 rounded-3xl bg-primary/8 flex items-center justify-center">
                  <step.icon className="w-9 h-9 text-primary" />
                </div>
                <span className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-primary text-primary-foreground text-sm font-bold flex items-center justify-center shadow-medium">
                  {step.number}
                </span>
              </div>
              <h3 className="text-lg font-bold text-foreground">{step.title}</h3>
              <p className="text-sm text-muted-foreground max-w-xs leading-relaxed">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
