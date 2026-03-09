import type { Specialty } from "@/types/domain";

export const specialties: Specialty[] = [
  { id: "teeth", name: "الأسنان", icon: "Smile", doctorCount: 245 },
  { id: "skin", name: "الجلدية", icon: "Fingerprint", doctorCount: 189 },
  { id: "children", name: "الأطفال", icon: "Baby", doctorCount: 312 },
  { id: "heart", name: "القلب", icon: "Heart", doctorCount: 156 },
  { id: "eyes", name: "العيون", icon: "Eye", doctorCount: 178 },
  { id: "mental", name: "النفسية", icon: "Brain", doctorCount: 134 },
  { id: "bones", name: "العظام", icon: "Bone", doctorCount: 201 },
  { id: "internal", name: "الباطنية", icon: "Stethoscope", doctorCount: 267 },
];

export const cities = [
  "الرياض",
  "جدة",
  "مكة المكرمة",
  "المدينة المنورة",
  "الدمام",
  "الخبر",
  "تبوك",
  "أبها",
];
