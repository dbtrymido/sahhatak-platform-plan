/**
 * Mock doctor data matching the ASP.NET backend DoctorProfile entity.
 * Replace with real API calls via doctorApi when backend is ready.
 */

import type { DoctorProfile } from "@/types/domain";

/** UI-only time slot (flattened from AvailabilitySlot for mock purposes) */
export interface MockTimeSlot {
  time: string;
  available: boolean;
  period: "morning" | "evening";
}

/** UI-only review (flattened from Review for mock purposes) */
export interface MockReview {
  name: string;
  rating: number;
  text: string;
  date: string;
}

/** Full mock doctor — DoctorProfile + UI helpers */
export interface Doctor extends DoctorProfile {
  timeSlots: MockTimeSlot[];
  reviews: MockReview[];
}

export const doctors: Doctor[] = [
  {
    id: "1",
    userId: "u1",
    specialtyId: "heart",
    fullName: "د. أحمد محمد",
    specialty: "أخصائي أمراض القلب والقسطرة التداخلية",
    title: "استشاري جراحة القلب والأوعية الدموية",
    rating: 4.9,
    reviewCount: 120,
    price: 400,
    city: "القاهرة",
    area: "مدينة نصر",
    yearsOfExperience: 15,
    bio: "د. أحمد محمد هو استشاري متميز في جراحة القلب مع خبرة تزيد عن 15 عاماً في علاج الحالات المعقدة وجراحة المناظير. حصل على زمالة جراحة القلب من الكلية الملكية للجراحين.",
    gender: "male",
    available: true,
    nextAvailableSlot: "05:00 م",
    avatarColor: "#1B5A8A",
    initials: "أ.م",
    tags: ["قسطرة قلبية", "تخطيط قلب", "جهد قلب", "أمراض الشرايين"],
    qualifications: [
      { title: "دكتوراه في جراحة القلب والأوعية الدموية", institution: "جامعة القاهرة", year: "2008" },
      { title: "رئيس قسم جراحة القلب", institution: "مستشفى دار الفؤاد", year: "2015 - الحالي" },
    ],
    timeSlots: [
      { time: "09:00 ص", available: true, period: "morning" },
      { time: "09:30 ص", available: true, period: "morning" },
      { time: "10:00 ص", available: true, period: "morning" },
      { time: "10:30 ص", available: true, period: "morning" },
      { time: "11:00 ص", available: false, period: "morning" },
      { time: "01:00 م", available: true, period: "evening" },
      { time: "01:30 م", available: true, period: "evening" },
      { time: "02:00 م", available: true, period: "evening" },
      { time: "02:30 م", available: false, period: "evening" },
      { time: "03:00 م", available: true, period: "evening" },
      { time: "05:00 م", available: true, period: "evening" },
    ],
    reviews: [
      { name: "مريم حسن", rating: 5, text: "طبيب ممتاز جداً وشاطر في تشخيصه. عملية ناجحة بكل المقاييس.", date: "قبل أسبوع" },
      { name: "عبدالرحمن خالد", rating: 5, text: "التعامل راقي جداً والعيادة مجهزة بأحدث الأجهزة.", date: "قبل شهر" },
    ],
  },
  {
    id: "2",
    userId: "u2",
    specialtyId: "heart",
    fullName: "د. سارة علي",
    specialty: "استشاري جراحة القلب والأوعية الدموية",
    title: "استشارية جراحة القلب",
    rating: 4.9,
    reviewCount: 850,
    price: 550,
    city: "القاهرة",
    area: "المعادي",
    yearsOfExperience: 12,
    bio: "متخصصة في جراحات القلب المفتوح وتغيير الصمامات، حاصلة على الزمالة الكندية في جراحة القلب.",
    gender: "female",
    available: true,
    nextAvailableSlot: "09:00 ص",
    avatarColor: "#2D8B6F",
    initials: "س.ع",
    tags: ["جراحة مناظير", "أمراض الصمامات"],
    qualifications: [
      { title: "زمالة كندية في جراحة القلب", institution: "جامعة تورنتو", year: "2012" },
    ],
    timeSlots: [
      { time: "09:00 ص", available: true, period: "morning" },
      { time: "10:00 ص", available: true, period: "morning" },
      { time: "11:00 ص", available: true, period: "morning" },
      { time: "02:00 م", available: true, period: "evening" },
      { time: "03:00 م", available: false, period: "evening" },
    ],
    reviews: [
      { name: "نورا إبراهيم", rating: 5, text: "دكتورة ممتازة جداً ومتعاونة. بتشرح كل حاجة بالتفصيل.", date: "قبل 3 أيام" },
    ],
  },
  {
    id: "3",
    userId: "u3",
    specialtyId: "bones",
    fullName: "د. محمد حسن",
    specialty: "جراحة العظام",
    title: "استشاري جراحة العظام",
    rating: 4.7,
    reviewCount: 95,
    price: 350,
    city: "الجيزة",
    area: "الدقي",
    yearsOfExperience: 18,
    bio: "خبرة واسعة في جراحة العظام والمفاصل الصناعية.",
    gender: "male",
    available: true,
    nextAvailableSlot: "10:30 ص",
    avatarColor: "#8B5A2D",
    initials: "م.ح",
    tags: ["مفاصل صناعية", "جراحة العمود الفقري"],
    qualifications: [],
    timeSlots: [
      { time: "10:00 ص", available: true, period: "morning" },
      { time: "10:30 ص", available: true, period: "morning" },
      { time: "11:00 ص", available: true, period: "morning" },
    ],
    reviews: [],
  },
  {
    id: "4",
    userId: "u4",
    specialtyId: "children",
    fullName: "د. كريم محمود",
    specialty: "أخصائي طب الأطفال",
    title: "استشاري طب الأطفال",
    rating: 4.8,
    reviewCount: 210,
    price: 200,
    city: "الإسكندرية",
    area: "سموحة",
    yearsOfExperience: 10,
    bio: "طبيب أطفال متخصص في الأمراض المعدية والتطعيمات.",
    gender: "male",
    available: true,
    nextAvailableSlot: "11:00 ص",
    avatarColor: "#6B4C8A",
    initials: "ك.م",
    tags: ["أمراض معدية", "تطعيمات"],
    qualifications: [],
    timeSlots: [
      { time: "09:00 ص", available: true, period: "morning" },
      { time: "11:00 ص", available: true, period: "morning" },
      { time: "01:00 م", available: true, period: "evening" },
    ],
    reviews: [],
  },
  {
    id: "5",
    userId: "u5",
    specialtyId: "teeth",
    fullName: "د. محمود عبد الرحمن",
    specialty: "استشاري طب الأسنان",
    title: "استشاري طب الأسنان",
    rating: 4.9,
    reviewCount: 173,
    price: 250,
    city: "القاهرة",
    area: "مصر الجديدة",
    yearsOfExperience: 8,
    bio: "متخصص في تجميل الأسنان والتقويم.",
    gender: "male",
    available: true,
    nextAvailableSlot: "02:00 م",
    avatarColor: "#2D6B8B",
    initials: "م.ع",
    tags: ["تجميل أسنان", "تقويم"],
    qualifications: [],
    timeSlots: [
      { time: "10:00 ص", available: true, period: "morning" },
      { time: "02:00 م", available: true, period: "evening" },
      { time: "03:00 م", available: true, period: "evening" },
    ],
    reviews: [],
  },
  {
    id: "6",
    userId: "u6",
    specialtyId: "bones",
    fullName: "د. حسام الدين فاروق",
    specialty: "جراحة العظام",
    title: "استشاري جراحة العظام",
    rating: 4.8,
    reviewCount: 156,
    price: 300,
    city: "المنصورة",
    area: "شارع الجمهورية",
    yearsOfExperience: 14,
    bio: "متخصص في جراحة المفاصل والكسور المعقدة.",
    gender: "male",
    available: true,
    nextAvailableSlot: "04:30 م",
    avatarColor: "#5A7B2D",
    initials: "ح.ف",
    tags: ["مفاصل", "كسور"],
    qualifications: [],
    timeSlots: [
      { time: "09:00 ص", available: true, period: "morning" },
      { time: "04:30 م", available: true, period: "evening" },
    ],
    reviews: [],
  },
];
