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
    <section className="py-12 lg:py-16 bg-card">
      <div className="container-app text-center">
        <h2 className="section-title mb-3">كيف يعمل صحتك؟</h2>
        <p className="section-subtitle mb-10 mx-auto max-w-md">ثلاث خطوات بسيطة للحصول على أفضل رعاية طبية</p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step) => (
            <div key={step.number} className="flex flex-col items-center gap-4">
              <div className="relative">
                <div className="w-16 h-16 rounded-full bg-accent flex items-center justify-center">
                  <step.icon className="w-7 h-7 text-primary" />
                </div>
                <span className="absolute -top-1 -right-1 w-6 h-6 rounded-full bg-primary text-primary-foreground text-xs font-bold flex items-center justify-center">
                  {step.number}
                </span>
              </div>
              <h3 className="text-lg font-bold text-foreground">{step.title}</h3>
              <p className="text-sm text-muted-foreground max-w-xs">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
