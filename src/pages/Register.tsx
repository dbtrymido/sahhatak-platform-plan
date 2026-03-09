import { useState } from "react";
import { Link } from "react-router-dom";
import { User, Phone, Mail, Lock, Eye, EyeOff, Shield, Headphones } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export default function Register() {
  const [showPass, setShowPass] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [form, setForm] = useState({ name: "", phone: "", email: "", password: "", confirmPassword: "", terms: false });

  const update = (field: string, value: string | boolean) => setForm((f) => ({ ...f, [field]: value }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Placeholder: connect to authApi.register(form)
    console.log("Register:", form);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 bg-background py-10 lg:py-16">
        <div className="container-app">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start max-w-5xl mx-auto">
            {/* Side */}
            <div className="hidden lg:block order-2 lg:order-1 space-y-6">
              <div className="rounded-2xl overflow-hidden bg-primary/90 text-primary-foreground p-8 relative">
                <div className="text-6xl mb-4">👨‍⚕️</div>
                <div className="flex items-center gap-1 mb-3">
                  {[1,2,3,4,5].map(i => <span key={i} className="text-warning text-lg">★</span>)}
                </div>
                <p className="text-sm leading-relaxed opacity-90">
                  "أفضل تجربة رعاية صحية حصلت عليها، التنظيم والمتابعة في صحتك مذهلة."
                </p>
                <p className="text-xs opacity-60 mt-3">— د. أحمد خالد، مستخدم للمنصة</p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="card-base p-5 text-center">
                  <Shield className="w-8 h-8 text-primary mx-auto mb-2" />
                  <h4 className="font-semibold text-sm">أمان تام</h4>
                  <p className="text-xs text-muted-foreground mt-1">بياناتك محمية بأعلى معايير التشفير</p>
                </div>
                <div className="card-base p-5 text-center">
                  <Headphones className="w-8 h-8 text-primary mx-auto mb-2" />
                  <h4 className="font-semibold text-sm">دعم 24/7</h4>
                  <p className="text-xs text-muted-foreground mt-1">فريقنا متاح لمساعدتك في أي وقت</p>
                </div>
              </div>
            </div>

            {/* Form */}
            <div className="card-base p-8 lg:p-10 order-1 lg:order-2">
              <div className="text-center mb-8">
                <h1 className="text-2xl font-bold text-foreground">إنشاء حساب جديد</h1>
                <p className="text-sm text-muted-foreground mt-2">انضم إلى منصة صحتك للحصول على أفضل رعاية طبية رقمية متكاملة</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1.5 text-right">الاسم الكامل</label>
                    <div className="relative">
                      <input className="input-field pr-10" placeholder="أدخل اسمك بالكامل" value={form.name} onChange={(e) => update("name", e.target.value)} required />
                      <User className="absolute top-1/2 -translate-y-1/2 right-3 w-4 h-4 text-muted-foreground" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1.5 text-right">رقم الهاتف</label>
                    <div className="relative">
                      <input className="input-field pr-10" placeholder="05xxxxxxxx" value={form.phone} onChange={(e) => update("phone", e.target.value)} required />
                      <Phone className="absolute top-1/2 -translate-y-1/2 right-3 w-4 h-4 text-muted-foreground" />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-1.5 text-right">البريد الإلكتروني</label>
                  <div className="relative">
                    <input type="email" className="input-field pr-10" placeholder="example@mail.com" value={form.email} onChange={(e) => update("email", e.target.value)} required />
                    <Mail className="absolute top-1/2 -translate-y-1/2 right-3 w-4 h-4 text-muted-foreground" />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1.5 text-right">كلمة المرور</label>
                    <div className="relative">
                      <input type={showPass ? "text" : "password"} className="input-field pr-10 pl-10" placeholder="••••••••" value={form.password} onChange={(e) => update("password", e.target.value)} required />
                      <Lock className="absolute top-1/2 -translate-y-1/2 right-3 w-4 h-4 text-muted-foreground" />
                      <button type="button" className="absolute top-1/2 -translate-y-1/2 left-3" onClick={() => setShowPass(!showPass)}>
                        {showPass ? <EyeOff className="w-4 h-4 text-muted-foreground" /> : <Eye className="w-4 h-4 text-muted-foreground" />}
                      </button>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1.5 text-right">تأكيد كلمة المرور</label>
                    <div className="relative">
                      <input type={showConfirm ? "text" : "password"} className="input-field pr-10 pl-10" placeholder="••••••••" value={form.confirmPassword} onChange={(e) => update("confirmPassword", e.target.value)} required />
                      <Lock className="absolute top-1/2 -translate-y-1/2 right-3 w-4 h-4 text-muted-foreground" />
                      <button type="button" className="absolute top-1/2 -translate-y-1/2 left-3" onClick={() => setShowConfirm(!showConfirm)}>
                        {showConfirm ? <EyeOff className="w-4 h-4 text-muted-foreground" /> : <Eye className="w-4 h-4 text-muted-foreground" />}
                      </button>
                    </div>
                  </div>
                </div>

                <label className="filter-checkbox text-xs mt-2">
                  <input type="checkbox" className="rounded" checked={form.terms} onChange={(e) => update("terms", e.target.checked)} required />
                  أوافق على <Link to="#" className="text-primary hover:underline">الشروط والأحكام</Link> و <Link to="#" className="text-primary hover:underline">سياسة الخصوصية</Link> الخاصة بمنصة صحتك.
                </label>

                <button type="submit" className="btn-primary w-full py-3.5 text-base mt-2">
                  إنشاء حساب ←
                </button>

                <p className="text-center text-sm text-muted-foreground">
                  هل لديك حساب بالفعل؟{" "}
                  <Link to="/login" className="text-primary font-semibold hover:underline">تسجيل الدخول من هنا</Link>
                </p>
              </form>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
