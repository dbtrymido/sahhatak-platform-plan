import { useState } from "react";
import { Link } from "react-router-dom";
import { LayoutDashboard, Calendar, Heart, CreditCard, Settings, LogOut, Star, Clock, MapPin, ChevronLeft, Lightbulb, CheckCircle2, CalendarClock } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import DoctorAvatar from "@/components/shared/DoctorAvatar";
import { doctors } from "@/data/doctors";
import { formatPrice } from "@/lib/formatters";

const sidebarItems = [
  { icon: LayoutDashboard, label: "لوحة التحكم", id: "dashboard" },
  { icon: Calendar, label: "مواعيدي", id: "appointments" },
  { icon: Heart, label: "الأطباء المحفوظون", id: "saved" },
  { icon: CreditCard, label: "المدفوعات", id: "payments" },
  { icon: Settings, label: "الإعدادات", id: "settings" },
];

const upcomingAppointments = [
  { doctor: doctors[1], date: "15 أكتوبر 2023", time: "10:30 ص", status: "upcoming" },
  { doctor: doctors[5], date: "22 أكتوبر 2023", time: "04:00 م", status: "upcoming" },
];

const pastAppointments = [
  { doctorName: "د. منى سعيد", specialty: "طب الأطفال", date: "01 سبتمبر 2023", status: "completed" },
  { doctorName: "د. علي حسن", specialty: "عظام", date: "12 أغسطس 2023", status: "completed" },
];

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("dashboard");

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 bg-background">
        <div className="container-app py-6 lg:py-10">
          <div className="flex flex-col lg:flex-row gap-6">
            <aside className="lg:w-64 shrink-0">
              <nav className="card-base p-3 lg:sticky lg:top-20 space-y-1">
                {sidebarItems.map((item) => (
                  <button
                    key={item.id}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all text-right ${
                      activeTab === item.id ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:bg-muted hover:text-foreground"
                    }`}
                    onClick={() => setActiveTab(item.id)}
                  >
                    <item.icon className="w-4 h-4 shrink-0" />
                    <span>{item.label}</span>
                  </button>
                ))}
                <hr className="border-border my-2" />
                <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-destructive hover:bg-destructive/10 transition-colors text-right">
                  <LogOut className="w-4 h-4" />
                  تسجيل الخروج
                </button>
              </nav>
            </aside>

            <div className="flex-1 space-y-6">
              <div className="text-right">
                <h1 className="text-3xl font-bold mb-2">أهلاً بك، أحمد محمد 👋</h1>
                <p className="text-sm text-muted-foreground">نظرة عامة على نشاطك الطبي وجدول مواعيدك القادمة.</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="stat-card">
                  <div className="stat-icon bg-primary/10"><Calendar className="w-6 h-6 text-primary" /></div>
                  <div>
                    <p className="stat-value">12</p>
                    <p className="stat-label">إجمالي المواعيد</p>
                  </div>
                </div>
                <div className="stat-card">
                  <div className="stat-icon bg-success/10"><CheckCircle2 className="w-6 h-6 text-success" /></div>
                  <div>
                    <p className="stat-value">10</p>
                    <p className="stat-label">زيارات مكتملة</p>
                  </div>
                </div>
                <div className="stat-card">
                  <div className="stat-icon bg-warning/10"><Star className="w-6 h-6 text-warning" /></div>
                  <div>
                    <p className="stat-value">8</p>
                    <p className="stat-label">أطباء محفوظون</p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 space-y-5">
                  <div className="flex items-center justify-between">
                    <h2 className="font-bold text-xl">المواعيد القادمة</h2>
                    <Link to="#" className="text-sm text-primary hover:underline">عرض الكل</Link>
                  </div>

                  {upcomingAppointments.length === 0 ? (
                    <div className="card-base p-8 empty-state">
                      <div className="empty-state-icon"><CalendarClock className="w-8 h-8 text-muted-foreground" /></div>
                      <p className="empty-state-title">لا توجد مواعيد قادمة</p>
                      <p className="empty-state-description">احجز موعدك الأول واحصل على رعاية طبية متميزة</p>
                    </div>
                  ) : (
                    upcomingAppointments.map((apt, i) => (
                      <article key={i} className="card-interactive p-5 flex items-center gap-4">
                        <DoctorAvatar initials={apt.doctor.initials} color={apt.doctor.avatarColor} size="md" />
                        <div className="flex-1 min-w-0">
                          <h3 className="font-bold text-sm truncate">{apt.doctor.fullName}</h3>
                          <p className="text-xs text-primary">{apt.doctor.specialty}</p>
                          <div className="flex items-center gap-3 mt-2 text-xs text-muted-foreground flex-wrap">
                            <span className="flex items-center gap-1"><Calendar className="w-3 h-3" />{apt.date}</span>
                            <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{apt.time}</span>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <button className="btn-ghost text-xs px-3 py-2 border border-border rounded-xl">إعادة جدولة</button>
                          <Link to={`/doctors/${apt.doctor.id}`} className="btn-primary text-xs px-4 py-2">عرض</Link>
                        </div>
                      </article>
                    ))
                  )}

                  <div className="flex items-center justify-between mt-8">
                    <h2 className="font-bold text-xl">المواعيد السابقة</h2>
                    <Link to="#" className="text-sm text-primary hover:underline">السجل الكامل</Link>
                  </div>

                  <div className="card-base overflow-hidden">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b border-border bg-muted/30">
                          <th className="text-right p-4 font-semibold text-muted-foreground">الطبيب</th>
                          <th className="text-right p-4 font-semibold text-muted-foreground">التخصص</th>
                          <th className="text-right p-4 font-semibold text-muted-foreground">التاريخ</th>
                          <th className="text-right p-4 font-semibold text-muted-foreground">الحالة</th>
                        </tr>
                      </thead>
                      <tbody>
                        {pastAppointments.map((apt, i) => (
                          <tr key={i} className="border-b border-border last:border-0 hover:bg-muted/20 transition-colors">
                            <td className="p-4 font-medium">{apt.doctorName}</td>
                            <td className="p-4 text-muted-foreground">{apt.specialty}</td>
                            <td className="p-4 text-muted-foreground">{apt.date}</td>
                            <td className="p-4"><span className="badge-available">مكتمل</span></td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                <div className="space-y-5">
                  <h2 className="font-bold text-xl">الأطباء المفضلون</h2>
                  {doctors.slice(0, 3).map((doc) => (
                    <div key={doc.id} className="flex items-center gap-3 p-3 rounded-xl hover:bg-muted/50 transition-colors">
                      <DoctorAvatar initials={doc.initials} color={doc.avatarColor} size="sm" />
                      <div className="flex-1 min-w-0">
                        <h4 className="font-semibold text-sm truncate">{doc.fullName}</h4>
                        <p className="text-xs text-muted-foreground truncate">{doc.specialty}</p>
                      </div>
                      <button className="text-destructive/60 hover:text-destructive transition-colors">
                        <Heart className="w-4 h-4 fill-current" />
                      </button>
                    </div>
                  ))}
                  <Link to="/doctors" className="btn-outline w-full text-xs text-center py-2.5">تصفح المزيد من الأطباء</Link>

                  <div className="rounded-2xl bg-gradient-to-br from-primary to-primary-dark p-6 text-primary-foreground">
                    <Lightbulb className="w-10 h-10 mb-3 opacity-90" />
                    <h3 className="font-bold mb-2 text-lg">نصيحة صحية اليوم</h3>
                    <p className="text-sm opacity-90 leading-relaxed">تأكد من شرب 8 أكواب من الماء يومياً للحفاظ على رطوبة جسمك وتعزيز طاقتك.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
