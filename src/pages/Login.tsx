import { useState } from "react";
import { Link } from "react-router-dom";
import { Mail, Lock, Eye, EyeOff } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Placeholder: connect to authApi.login({ email, password })
    console.log("Login:", { email, password, rememberMe });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 bg-background py-10 lg:py-16">
        <div className="container-app">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center max-w-5xl mx-auto">
            {/* Form */}
            <div className="card-base p-8 lg:p-10 order-1">
              <div className="text-center mb-8">
                <h1 className="text-2xl font-bold text-foreground">تسجيل الدخول</h1>
                <p className="text-sm text-muted-foreground mt-2">مرحباً بك مجدداً في منصة صحتك الرقمية</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1.5 text-right">
                    البريد الإلكتروني أو رقم الهاتف
                  </label>
                  <div className="relative">
                    <input
                      type="email"
                      className="input-field pr-10"
                      placeholder="example@mail.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                    <Mail className="absolute top-1/2 -translate-y-1/2 right-3 w-4 h-4 text-muted-foreground" />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-1.5 text-right">
                    كلمة المرور
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      className="input-field pr-10 pl-10"
                      placeholder="********"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                    <Lock className="absolute top-1/2 -translate-y-1/2 right-3 w-4 h-4 text-muted-foreground" />
                    <button
                      type="button"
                      className="absolute top-1/2 -translate-y-1/2 left-3"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <EyeOff className="w-4 h-4 text-muted-foreground" /> : <Eye className="w-4 h-4 text-muted-foreground" />}
                    </button>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <label className="filter-checkbox text-xs">
                    <input type="checkbox" className="rounded" checked={rememberMe} onChange={(e) => setRememberMe(e.target.checked)} />
                    تذكرني
                  </label>
                  <Link to="/forgot-password" className="text-xs text-primary font-medium hover:underline">
                    نسيت كلمة المرور؟
                  </Link>
                </div>

                <button type="submit" className="btn-primary w-full py-3.5 text-base">
                  تسجيل الدخول
                </button>

                <div className="relative my-6">
                  <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-border" /></div>
                  <div className="relative flex justify-center text-xs text-muted-foreground">
                    <span className="bg-card px-3">أو سجل عبر</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <button type="button" className="btn-ghost border border-border py-2.5 text-sm font-medium">
                    جوجل <span className="text-lg">G</span>
                  </button>
                  <button type="button" className="btn-ghost border border-border py-2.5 text-sm font-medium">
                    آبل <span className="text-lg"></span>
                  </button>
                </div>

                <p className="text-center text-sm text-muted-foreground mt-4">
                  ليس لديك حساب؟{" "}
                  <Link to="/register" className="text-primary font-semibold hover:underline">
                    سجل الآن مجاناً
                  </Link>
                </p>
              </form>
            </div>

            {/* Side content */}
            <div className="hidden lg:flex flex-col items-center text-center gap-6 order-2">
              <div className="w-full max-w-sm rounded-2xl overflow-hidden bg-accent aspect-[4/3] flex items-center justify-center">
                <div className="text-primary text-6xl">🏥</div>
              </div>
              <h2 className="text-xl font-bold text-foreground">رعايتكم هي أولويتنا</h2>
              <p className="text-sm text-muted-foreground max-w-sm">
                انضم إلى آلاف المستخدمين الذين يثقون في منصة صحتك لإدارة سجلاتهم الطبية ومواعيدهم بكل سهولة وأمان.
              </p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
