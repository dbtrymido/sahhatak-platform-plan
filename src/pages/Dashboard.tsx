import { useState } from "react";
import { Link } from "react-router-dom";
import {
  LayoutDashboard, Calendar, Heart, CreditCard, Settings, LogOut,
  Star, Clock, MapPin, ChevronLeft, Lightbulb
} from "lucide-react";
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
  { doctor: doctors[1], date: "15 أكتوبر 2023", time: "10:30 صباحاً", status: "upcoming" },
  { doctor: doctors[5], date: "22 أكتوبر 2023", time: "04:00 مساءً", status: "upcoming" },
];

const pastAppointments = [
  { doctorName: "د. منى سعيد", specialty: "طب الأطفال", date: "01 سبتمبر 2023", status: "مكتمل" },
  { doctorName: "د. علي حسن", specialty: "عظام", date: "12 أغسطس 2023", status: "مكتمل" },
];

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("dashboard");

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 bg-background">
        <div className="container-app py-6 lg:py-10">
          <div className="flex flex-col lg:flex-row gap-6">
            {/* Sidebar */}
            <aside className="lg:w-56 shrink-0">
              <nav className="card-base p-3 lg:sticky lg:top-20 space-y-1">
                {sidebarItems.map((item) => (
                  <button
                    key={item.id}
                    className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-colors text-right ${activeTab === item.id ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:bg-accent hover:text-foreground"}`}
                    onClick={() => setActiveTab(item.id)}
                  >
                    <item.icon className="w-4 h-4" />
                    {item.label}
                  </button>
                ))}
                <hr className="border-border my-2" />
                <button className="w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium text-destructive hover:bg-destructive/10 transition-colors text-right">
                  <LogOut className="w-4 h-4" />
                  تسجيل الخروج
                </button>
              </nav>
            </aside>

            {/* Content */}
            <div className="flex-1 space-y-6">
              {/* Welcome */}
              <div className="text-center lg:text-right">
                <h1 className="text-2xl font-bold">أهلاً بك، أحمد محمد 👋</h1>
                <p className="text-sm text-muted-foreground mt-1">نظرة عامة على نشاطك الطبي وجدول مواعيدك.</p>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="stat-card">
                  <div className="w-12 h-12 rounded-xl bg-accent flex items-center justify-center"><Calendar className="w-6 h-6 text-primary" /></div>
                  <div>
                    <p className="text-2xl font-bold">12</p>
                    <p className="text-xs text-muted-foreground">إجمالي المواعيد</p>
                  </div>
                </div>
                <div className="stat-card">
                  <div className="w-12 h-12 rounded-xl bg-success/10 flex items-center justify-center"><CreditCard className="w-6 h-6 text-success" /></div>
                  <div>
                    <p className="text-2xl font-bold">4,500 ريال</p>
                    <p className="text-xs text-muted-foreground">إجمالي المدفوعات</p>
                  </div>
                </div>
                <div className="stat-card">
                  <div className="w-12 h-12 rounded-xl bg-warning/10 flex items-center justify-center"><Star className="w-6 h-6 text-warning" /></div>
                  <div>
                    <p className="text-2xl font-bold">8</p>
                    <p className="text-xs text-muted-foreground">الأطباء المحفوظون</p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Upcoming */}
                <div className="lg:col-span-2 space-y-4">
                  <div className="flex items-center justify-between">
                    <h2 className="font-bold text-lg">المواعيد القادمة</h2>
                    <Link to="#" className="text-sm text-primary hover:underline">عرض الكل</Link>
                  </div>
                  {upcomingAppointments.map((apt, i) => (
                    <div key={i} className="card-base p-4 flex items-center gap-4">
                      <DoctorAvatar initials={apt.doctor.initials} color={apt.doctor.avatarColor} size="sm" />
                      <div className="flex-1">
                        <h3 className="font-bold text-sm">{apt.doctor.fullName}</h3>
                        <p className="text-xs text-primary">{apt.doctor.specialty}</p>
                        <div className="flex items-center gap-3 mt-1 text-xs text-muted-foreground">
                          <span className="flex items-center gap-1"><Calendar className="w-3 h-3" /> {apt.date}</span>
                          <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {apt.time}</span>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <button className="text-xs px-3 py-1.5 rounded-lg border border-border text-muted-foreground hover:border-primary hover:text-primary transition-colors">إعادة جدولة</button>
                        <button className="btn-primary text-xs px-3 py-1.5">دخول الموعد</button>
                      </div>
                    </div>
                  ))}

                  {/* Past */}
                  <div className="flex items-center justify-between mt-6">
                    <h2 className="font-bold text-lg">المواعيد السابقة</h2>
                    <Link to="#" className="text-sm text-primary hover:underline">السجل الكامل</Link>
                  </div>
                  <div className="card-base overflow-hidden">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b border-border">
                          <th className="text-right p-3 font-medium text-muted-foreground">الطبيب</th>
                          <th className="text-right p-3 font-medium text-muted-foreground">التخصص</th>
                          <th className="text-right p-3 font-medium text-muted-foreground">التاريخ</th>
                          <th className="text-right p-3 font-medium text-muted-foreground">الحالة</th>
                          <th className="p-3"></th>
                        </tr>
                      </thead>
                      <tbody>
                        {pastAppointments.map((apt, i) => (
                          <tr key={i} className="border-b border-border last:border-0">
                            <td className="p-3 font-medium">{apt.doctorName}</td>
                            <td className="p-3 text-muted-foreground">{apt.specialty}</td>
                            <td className="p-3 text-muted-foreground">{apt.date}</td>
                            <td className="p-3"><span className="badge-available">{apt.status}</span></td>
                            <td className="p-3"><Link to="#" className="text-xs text-primary hover:underline">عرض التقرير</Link></td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Saved Doctors */}
                <div className="space-y-4">
                  <h2 className="font-bold text-lg">الأطباء المفضلون</h2>
                  {doctors.slice(0, 3).map((doc) => (
                    <div key={doc.id} className="flex items-center gap-3">
                      <DoctorAvatar initials={doc.initials} color={doc.avatarColor} size="sm" />
                      <div className="flex-1 min-w-0">
                        <h4 className="font-semibold text-sm truncate">{doc.name}</h4>
                        <p className="text-xs text-muted-foreground">{doc.specialty}</p>
                      </div>
                      <button className="text-destructive/50 hover:text-destructive"><Heart className="w-4 h-4 fill-current" /></button>
                    </div>
                  ))}
                  <Link to="/doctors" className="btn-outline w-full text-xs text-center">تصفح المزيد من الأطباء</Link>

                  {/* Health Tip */}
                  <div className="rounded-xl bg-primary p-5 text-primary-foreground">
                    <Lightbulb className="w-8 h-8 mb-2 opacity-80" />
                    <h3 className="font-bold mb-1">نصيحة صحية اليوم</h3>
                    <p className="text-xs opacity-80 leading-relaxed">تأكد من شرب 8 أكواب من الماء يومياً للحفاظ على رطوبة جسمك وتعزيز طاقتك.</p>
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
