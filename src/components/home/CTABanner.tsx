import { Link } from "react-router-dom";

export default function CTABanner() {
  return (
    <section className="py-12 lg:py-16">
      <div className="container-app">
        <div className="bg-primary rounded-2xl p-8 lg:p-12 text-center text-primary-foreground">
          <h2 className="text-2xl lg:text-3xl font-bold mb-3">
            ابدأ رحلتك نحو حياة صحية أفضل اليوم
          </h2>
          <p className="text-sm lg:text-base opacity-80 mb-8 max-w-lg mx-auto">
            انضم إلى أكثر من مليون مستخدم يثقون في "صحتك" لرعايتهم الطبية.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              to="/doctors"
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-primary-foreground px-6 py-3 text-sm font-semibold text-primary transition-opacity hover:opacity-90"
            >
              احجز موعدك الآن
            </Link>
            <Link
              to="/register"
              className="inline-flex items-center justify-center gap-2 rounded-lg border-2 border-primary-foreground/50 px-6 py-3 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary-foreground/10"
            >
              تحميل التطبيق
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
