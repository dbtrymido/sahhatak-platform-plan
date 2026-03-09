import { useState } from "react";
import { Link } from "react-router-dom";
import { Mail, Lock, ArrowRight } from "lucide-react";
import Navbar from "@/components/layout/Navbar";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Placeholder: authApi.forgotPassword(email)
    setSent(true);
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      <main className="flex-1 flex items-center justify-center py-16">
        <div className="card-base p-8 lg:p-10 w-full max-w-md mx-4">
          <div className="text-center mb-8">
            <div className="w-16 h-16 rounded-full bg-accent flex items-center justify-center mx-auto mb-4">
              <Lock className="w-7 h-7 text-primary" />
            </div>
            <h1 className="text-2xl font-bold text-foreground">استعادة كلمة المرور</h1>
            <p className="text-sm text-muted-foreground mt-2">
              أدخل بريدك الإلكتروني أو رقم هاتفك لإرسال رابط استعادة الوصول إلى حسابك الطبي.
            </p>
          </div>

          {sent ? (
            <div className="text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-success/10 flex items-center justify-center mx-auto">
                <Mail className="w-7 h-7 text-success" />
              </div>
              <p className="text-sm text-foreground font-medium">تم إرسال رابط الاستعادة إلى بريدك الإلكتروني</p>
              <p className="text-xs text-muted-foreground">تحقق من صندوق الوارد أو مجلد الرسائل غير المرغوب فيها</p>
              <Link to="/login" className="btn-outline text-sm mt-4 inline-flex">
                <ArrowRight className="w-4 h-4" />
                العودة إلى تسجيل الدخول
              </Link>
            </div>
          ) : (
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

              <button type="submit" className="btn-primary w-full py-3.5 text-base">
                إرسال رابط الاستعادة
              </button>

              <p className="text-center text-sm">
                <Link to="/login" className="text-primary font-medium hover:underline flex items-center justify-center gap-1">
                  <ArrowRight className="w-4 h-4" />
                  العودة إلى تسجيل الدخول
                </Link>
              </p>
            </form>
          )}

          <p className="text-center text-xs text-muted-foreground mt-8 flex items-center justify-center gap-1">
            <Shield className="w-3.5 h-3.5" />
            نظام آمن ومشفر لحماية بياناتك الصحية
          </p>
        </div>
      </main>
    </div>
  );
}

function Shield(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  );
}
