import { useState } from "react";
import { Link } from "react-router-dom";
import {
  LayoutDashboard, Calendar, Heart, CreditCard, Settings, LogOut,
  Star, Clock, CheckCircle2, CalendarClock, ArrowLeft
} from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import DoctorAvatar from "@/components/shared/DoctorAvatar";
import { doctors } from "@/data/doctors";

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
        <div className="container-app section-padding-sm">
          <div className="flex flex-col lg:flex-row gap-6">
            {/* Sidebar - Mobile Bottom Sheet Style */}
            <aside className="lg:w-64 shrink-0">
              <nav className="card-base p-4 lg:sticky lg:top-20 space-y-1">
                {sidebarItems.map((item) => (
                  <button
                    key={item.id}
                    className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-xl text-sm font-medium transition-all text-right ${
                      activeTab === item.id
                        ? "bg-primary text-primary-foreground shadow-button"
                        : "text-muted-foreground hover:bg-muted hover:text-foreground"
                    }`}
                    onClick={() => setActiveTab(item.id)}
                  >
                    <item.icon className="w-5 h-5 shrink-0" />
                    <span>{item.label}</span>
                  </button>
                ))}
                <hr className="border-border my-3" />
                <button className="w-full flex items-center gap-3 px-4 py-3.5 rounded-xl text-sm font-medium text-destructive hover:bg-destructive/10 transition-colors text-right">
                  <LogOut className="w-5 h-5" />
                  تسجيل الخروج
                </button>
              </nav>
            </aside>

            {/* Main Content */}
            <div className="flex-1 space-y-6">
              {/* Welcome Header */}
              <div className="text-right">
                <h1 className="page-title">أهلاً بك، أحمد محمد 👋</h1>
                <p className="page-subtitle">نظرة عامة على نشاطك الطبي وجدول مواعيدك القادمة.</p>
              </div>

              {/* Stats Grid - Mobile Responsive */}
              <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
                <div className="stat-card">
                  <div className="stat-icon bg-primary/10">
                    <Calendar className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <p className="stat-value">12</p>
                    <p className="stat-label">إجمالي المواعيد</p>
                  </div>
                </div>
                <div className="stat-card">
                  <div className="stat-icon bg-success/10">
                    <CheckCircle2 className="w-6 h-6 text-success" />
                  </div>
                  <div>
                    <p className="stat-value">10</p>
                    <p className="stat-label">زيارات مكتملة</p>
                  </div>
                </div>
                <div className="stat-card col-span-2 lg:col-span-1">
                  <div className="stat-icon bg-warning/10">
                    <Star className="w-6 h-6 text-warning" />
                  </div>
                  <div>
                    <p className="stat-value">8</p>
                    <p className="stat-label">أطباء محفوظون</p>
                  </div>
                </div>
              </div>

              {/* Main Content Grid */}
              <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
                {/* Appointments Section */}
                <div className="xl:col-span-2 space-y-5">
                  {/* Upcoming Appointments */}
                  <div className="flex items-center justify-between">
                    <h2 className="card-title flex items-center gap-2">
                      <CalendarClock className="w-5 h-5 text-primary" />
                      المواعيد القادمة
                    </h2>
                    <Link to="#" className="btn-soft text-xs">عرض الكل</Link>
                  </div>

                  {upcomingAppointments.length === 0 ? (
                    <div className="card-base p-8 empty-state">
                      <div className="empty-state-icon">
                        <CalendarClock className="w-8 h-8 text-muted-foreground" />
                      </div>
                      <p className="empty-state-title">لا توجد مواعيد قادمة</p>
                      <p className="empty-state-description">احجز موعدك الأول واحصل على رعاية طبية متميزة</p>
                      <Link to="/doctors" className="btn-primary text-sm mt-4">احجز موعداً الآن</Link>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {upcomingAppointments.map((apt, i) => (
                        <article key={i} className="card-interactive p-5 flex flex-col sm:flex-row sm:items-center gap-4 animate-in">
                          <DoctorAvatar initials={apt.doctor.initials} color={apt.doctor.avatarColor} size="sm" />
                          <div className="flex-1 min-w-0">
                            <h3 className="font-bold text-sm truncate">{apt.doctor.fullName}</h3>
                            <p className="text-xs text-primary font-medium">{apt.doctor.specialty}</p>
                            <div className="flex flex-wrap items-center gap-3 mt-2 text-xs text-muted-foreground">
                              <span className="flex items-center gap-1.5">
                                <Calendar className="w-3.5 h-3.5" />
                                {apt.date}
                              </span>
                              <span className="flex items-center gap-1.5">
                                <Clock className="w-3.5 h-3.5" />
                                {apt.time}
                              </span>
                            </div>
                          </div>
                          <div className="flex gap-2 shrink-0">
                            <button className="btn-ghost text-xs px-4 py-2.5 border border-border rounded-xl">
                              إعادة جدولة
                            </button>
                            <Link to={`/doctors/${apt.doctor.id}`} className="btn-primary text-xs px-4">
                              عرض <ArrowLeft className="w-3.5 h-3.5" />
                            </Link>
                          </div>
                        </article>
                      ))}
                    </div>
                  )}

                  {/* Past Appointments Table */}
                  <div className="flex items-center justify-between mt-8">
                    <h2 className="card-title">المواعيد السابقة</h2>
                    <Link to="#" className="btn-soft text-xs">السجل الكامل</Link>
                  </div>

                  <div className="card-base overflow-hidden">
                    <div className="overflow-x-auto">
                      <table className="w-full text-sm min-w-[500px]">
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
                            <tr key={i} className="border-b border-border/60 last:border-0 hover:bg-muted/20 transition-colors">
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
                </div>

                {/* Saved Doctors Sidebar */}
                <div className="space-y-5">
                  <h2 className="card-title flex items-center gap-2">
                    <Heart className="w-5 h-5 text-destructive" />
                    الأطباء المفضلون
                  </h2>

                  <div className="card-base divide-y divide-border/60">
                    {doctors.slice(0, 3).map((doc) => (
                      <div key={doc.id} className="flex items-center gap-3 p-4 hover:bg-muted/30 transition-colors">
                        <DoctorAvatar initials={doc.initials} color={doc.avatarColor} size="xs" />
                        <div className="flex-1 min-w-0">
                          <h4 className="font-semibold text-sm truncate">{doc.fullName}</h4>
                          <p className="text-xs text-muted-foreground truncate">{doc.specialty}</p>
                        </div>
                        <button className="text-destructive hover:text-destructive/70 transition-colors touch-target p-2">
                          <Heart className="w-4 h-4 fill-current" />
                        </button>
                      </div>
                    ))}
                  </div>

                  <Link to="/doctors" className="btn-outline w-full text-sm">
                    تصفح المزيد من الأطباء
                  </Link>

                  {/* Health Tip Card */}
                  <div className="rounded-2xl bg-gradient-to-br from-primary to-primary-dark p-6 text-primary-foreground">
                    <div className="w-12 h-12 rounded-xl bg-card/10 flex items-center justify-center mb-4">
                      <Star className="w-6 h-6" />
                    </div>
                    <h3 className="font-bold text-lg mb-2">نصيحة صحية اليوم</h3>
                    <p className="text-sm opacity-90 leading-relaxed">
                      تأكد من شرب 8 أكواب من الماء يومياً للحفاظ على رطوبة جسمك وتعزيز طاقتك ونشاطك الذهني.
                    </p>
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
