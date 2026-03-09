/**
 * Mock pharmacy / medicine data matching the ASP.NET backend entities.
 * Replace with real API calls via pharmacyApi / medicineApi when backend is ready.
 */

import type { Pharmacy, Medicine, PharmacyInventory, Review } from "@/types/domain";

export const medicines: Medicine[] = [
  {
    id: "m1",
    name: "بنادول أدفانس",
    brand: "Panadol",
    scientificName: "باراسيتامول 500 ملجم",
    category: "مسكنات الألم",
    description: "مسكن للآلام وخافض للحرارة",
    requiresPrescription: false,
    imageColor: "#E8A834",
  },
  {
    id: "m2",
    name: "فولتارين جل",
    brand: "Voltaren",
    scientificName: "ديكلوفيناك الصوديوم",
    category: "مسكنات الألم",
    description: "مسكن موضعي للآلام",
    requiresPrescription: false,
    imageColor: "#2D8B6F",
  },
  {
    id: "m3",
    name: "بنادول إكسترا",
    brand: "Panadol",
    scientificName: "باراسيتامول + كافيين",
    category: "مسكنات الألم",
    description: "مسكن للآلام وخافض للحرارة - 24 قرص",
    requiresPrescription: false,
    imageColor: "#C44D4D",
  },
  {
    id: "m4",
    name: "فيتامين سي 1000 ملجم",
    brand: "Vitamin C",
    scientificName: "حمض الأسكوربيك",
    category: "الفيتامينات",
    description: "أقراص فوارة - 20 قرص",
    requiresPrescription: false,
    imageColor: "#E8A834",
  },
  {
    id: "m5",
    name: "بيتادين",
    brand: "Betadine",
    scientificName: "بوفيدون أيودين",
    category: "المطهرات",
    description: "مطهر للجروح - 50 مل",
    requiresPrescription: false,
    imageColor: "#4A8B8B",
  },
  {
    id: "m6",
    name: "واقي شمس لاروش بوزيه",
    brand: "La Roche-Posay",
    scientificName: "عامل حماية 50+",
    category: "العناية بالبشرة",
    description: "للبشرة الحساسة",
    requiresPrescription: false,
    imageColor: "#2D6B8B",
  },
];

export const pharmacies: Pharmacy[] = [
  {
    id: "p1",
    name: "صيدلية العزبي",
    nameEn: "El Ezaby Pharmacy",
    city: "القاهرة",
    location: "شارع عباس العقاد، مدينة نصر",
    area: "مدينة نصر",
    rating: 4.8,
    reviewCount: 200,
    distance: 1.2,
    isOpen: true,
    openHours: "السبت - الخميس: 08:00 ص - 12:00 م",
    fridayHours: "الجمعة: 10:00 ص - 12:00 م",
    description: "تعتبر صيدلية العزبي واحدة من أكبر سلاسل الصيدليات في مصر، توفر مجموعة واسعة من الأدوية، منتجات العناية بالبشرة، والمستلزمات الطبية مع خدمة الاستشارة الصيدلانية المجانية.",
    phone: "19600",
  },
  {
    id: "p2",
    name: "صيدلية سيف",
    nameEn: "Seif Pharmacy",
    city: "القاهرة",
    location: "شارع التحرير، المعادي",
    area: "المعادي",
    rating: 4.6,
    reviewCount: 85,
    distance: 2.5,
    isOpen: true,
    openHours: "على مدار الساعة",
    fridayHours: "على مدار الساعة",
    description: "صيدلية متكاملة توفر جميع الأدوية والمستلزمات الطبية بأسعار مناسبة.",
    phone: "19199",
  },
  {
    id: "p3",
    name: "صيدلية رشدي",
    nameEn: "Rushdi Pharmacy",
    city: "الجيزة",
    location: "شارع التحرير، الدقي",
    area: "الدقي",
    rating: 4.5,
    reviewCount: 62,
    distance: 3.0,
    isOpen: false,
    openHours: "08:00 ص - 11:00 م",
    fridayHours: "10:00 ص - 11:00 م",
    description: "صيدلية عائلية توفر أدوية بأسعار مناسبة وخدمة توصيل.",
    phone: "0233456789",
  },
  {
    id: "p4",
    name: "صيدلية العابد",
    nameEn: "El Abed Pharmacy",
    city: "القاهرة",
    location: "شارع الثورة، مصر الجديدة",
    area: "مصر الجديدة",
    rating: 4.3,
    reviewCount: 45,
    distance: 4.1,
    isOpen: true,
    openHours: "08:00 ص - 10:00 م",
    fridayHours: "10:00 ص - 10:00 م",
    description: "صيدلية متخصصة في الأدوية والمكملات الغذائية.",
    phone: "0224567890",
  },
];

export const pharmacyInventory: PharmacyInventory[] = [
  { id: "inv1",  pharmacyId: "p1", medicineId: "m1", price: 25,  stockQuantity: 50, inStock: true,  medicine: medicines[0] },
  { id: "inv2",  pharmacyId: "p1", medicineId: "m3", price: 35,  stockQuantity: 30, inStock: true,  medicine: medicines[2] },
  { id: "inv3",  pharmacyId: "p1", medicineId: "m4", price: 45,  stockQuantity: 20, inStock: true,  medicine: medicines[3] },
  { id: "inv4",  pharmacyId: "p1", medicineId: "m5", price: 22,  stockQuantity: 15, inStock: true,  medicine: medicines[4] },
  { id: "inv5",  pharmacyId: "p1", medicineId: "m6", price: 350, stockQuantity: 8,  inStock: true,  medicine: medicines[5] },
  { id: "inv6",  pharmacyId: "p2", medicineId: "m1", price: 27,  stockQuantity: 40, inStock: true,  medicine: medicines[0] },
  { id: "inv7",  pharmacyId: "p2", medicineId: "m2", price: 55,  stockQuantity: 12, inStock: true,  medicine: medicines[1] },
  { id: "inv8",  pharmacyId: "p2", medicineId: "m5", price: 20,  stockQuantity: 25, inStock: true,  medicine: medicines[4] },
  { id: "inv9",  pharmacyId: "p3", medicineId: "m2", price: 52,  stockQuantity: 5,  inStock: true,  medicine: medicines[1] },
  { id: "inv10", pharmacyId: "p3", medicineId: "m3", price: 33,  stockQuantity: 0,  inStock: false, medicine: medicines[2] },
  { id: "inv11", pharmacyId: "p3", medicineId: "m4", price: 42,  stockQuantity: 18, inStock: true,  medicine: medicines[3] },
  { id: "inv12", pharmacyId: "p4", medicineId: "m1", price: 23,  stockQuantity: 60, inStock: true,  medicine: medicines[0] },
  { id: "inv13", pharmacyId: "p4", medicineId: "m6", price: 340, stockQuantity: 3,  inStock: true,  medicine: medicines[5] },
];

export const pharmacyReviews: Review[] = [
  { id: "r1", patientId: "u1", pharmacyId: "p1", rating: 5, comment: "خدمة ممتازة وسريعة جداً. الصيدلي كان متعاون جداً في شرح طريقة استخدام الدواء.", createdAt: "2026-03-07", patientName: "أحمد الشاذلي" },
  { id: "r2", patientId: "u2", pharmacyId: "p1", rating: 4, comment: "عندهم معظم منتجات العناية بالبشرة اللي كنت بدور عليها. السعر مناسب.", createdAt: "2026-03-02", patientName: "سارة القاضي" },
];

export function getPharmacyInventory(pharmacyId: string): PharmacyInventory[] {
  return pharmacyInventory.filter((inv) => inv.pharmacyId === pharmacyId);
}

export function getPharmacyReviews(pharmacyId: string): Review[] {
  return pharmacyReviews.filter((r) => r.pharmacyId === pharmacyId);
}
