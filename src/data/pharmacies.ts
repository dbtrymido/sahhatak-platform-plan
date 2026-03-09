import type { Pharmacy, Medicine, PharmacyInventory, Review } from "@/types/domain";

// ── Medicines (GET /api/medicines) ───────────────────────────────────

export const medicines: Medicine[] = [
  { id: "m1", name: "بنادول أدفانس", scientificName: "باراسيتامول 500 ملجم", description: "مسكن للآلام وخافض للحرارة", imageColor: "#E8A834" },
  { id: "m2", name: "فولتارين جل", scientificName: "ديكلوفيناك الصوديوم", description: "مسكن موضعي للآلام", imageColor: "#2D8B6F" },
  { id: "m3", name: "بنادول إكسترا", scientificName: "باراسيتامول + كافيين", description: "مسكن للآلام وخافض للحرارة - 24 قرص", imageColor: "#C44D4D" },
  { id: "m4", name: "فيتامين سي 1000 ملجم", scientificName: "حمض الأسكوربيك", description: "أقراص فوارة - 20 قرص", imageColor: "#E8A834" },
  { id: "m5", name: "معقم بيتول", scientificName: "بوفيدون أيودين", description: "حماية من الجراثيم والبكتيريا - 50 مل", imageColor: "#4A8B8B" },
  { id: "m6", name: "واقي شمس لاروش بوزيه", scientificName: "عامل حماية 50+", description: "للبشرة الحساسة", imageColor: "#2D6B8B" },
];

// ── Pharmacies (GET /api/pharmacies) ─────────────────────────────────

export const pharmacies: Pharmacy[] = [
  {
    id: "p1",
    name: "صيدلية النهدي",
    nameEn: "Al Nahdi Pharmacy",
    area: "حي العليا، الرياض - شارع التحلية",
    city: "الرياض",
    rating: 4.8,
    reviewCount: 200,
    distance: 1.2,
    isOpen: true,
    openHours: "السبت - الخميس: 08:00 ص - 12:00 م",
    fridayHours: "الجمعة: 04:00 م - 12:00 م",
    description: "تعتبر صيدلية النهدي واحدة من أكبر سلاسل الصيدليات في المملكة، توفر مجموعة واسعة من الأدوية، منتجات العناية بالبشرة، والمستلزمات الطبية مع خدمة الاستشارة الصيدلانية المجانية.",
    phone: "920001111",
  },
  {
    id: "p2",
    name: "صيدلية الدواء",
    nameEn: "Al Dawaa Pharmacy",
    area: "حي الملقا، الرياض",
    city: "الرياض",
    rating: 4.6,
    reviewCount: 85,
    distance: 2.5,
    isOpen: true,
    openHours: "على مدار الساعة",
    fridayHours: "على مدار الساعة",
    description: "صيدلية متكاملة توفر جميع الأدوية والمستلزمات الطبية.",
    phone: "920002222",
  },
  {
    id: "p3",
    name: "صيدلية الشفاء",
    nameEn: "Al Shifaa Pharmacy",
    area: "حي الروضة، الرياض",
    city: "الرياض",
    rating: 4.5,
    reviewCount: 62,
    distance: 3.0,
    isOpen: false,
    openHours: "08:00 ص - 11:00 م",
    fridayHours: "04:00 م - 11:00 م",
    description: "صيدلية عائلية توفر أدوية بأسعار مناسبة.",
    phone: "920003333",
  },
  {
    id: "p4",
    name: "صيدلية الرعاية",
    nameEn: "Al Reaya Pharmacy",
    area: "حي النزهة، الرياض",
    city: "الرياض",
    rating: 4.3,
    reviewCount: 45,
    distance: 4.1,
    isOpen: true,
    openHours: "08:00 ص - 10:00 م",
    fridayHours: "مغلق",
    description: "صيدلية متخصصة في الأدوية والمكملات الغذائية.",
    phone: "920004444",
  },
];

// ── Pharmacy Inventory (GET /api/pharmacies/:id/inventory) ───────────
// Junction table linking pharmacies → medicines with price & stock

export const pharmacyInventory: PharmacyInventory[] = [
  { id: "inv1", pharmacyId: "p1", medicineId: "m1", price: 12.5, inStock: true, medicine: medicines[0] },
  { id: "inv2", pharmacyId: "p1", medicineId: "m3", price: 18.5, inStock: true, medicine: medicines[2] },
  { id: "inv3", pharmacyId: "p1", medicineId: "m4", price: 25.0, inStock: true, medicine: medicines[3] },
  { id: "inv4", pharmacyId: "p1", medicineId: "m5", price: 12.75, inStock: true, medicine: medicines[4] },
  { id: "inv5", pharmacyId: "p1", medicineId: "m6", price: 145.0, inStock: true, medicine: medicines[5] },
  { id: "inv6", pharmacyId: "p2", medicineId: "m1", price: 13.0, inStock: true, medicine: medicines[0] },
  { id: "inv7", pharmacyId: "p2", medicineId: "m2", price: 28.0, inStock: true, medicine: medicines[1] },
  { id: "inv8", pharmacyId: "p2", medicineId: "m5", price: 11.5, inStock: true, medicine: medicines[4] },
  { id: "inv9", pharmacyId: "p3", medicineId: "m2", price: 27.0, inStock: true, medicine: medicines[1] },
  { id: "inv10", pharmacyId: "p3", medicineId: "m3", price: 17.5, inStock: false, medicine: medicines[2] },
  { id: "inv11", pharmacyId: "p3", medicineId: "m4", price: 23.0, inStock: true, medicine: medicines[3] },
  { id: "inv12", pharmacyId: "p4", medicineId: "m1", price: 11.0, inStock: true, medicine: medicines[0] },
  { id: "inv13", pharmacyId: "p4", medicineId: "m6", price: 140.0, inStock: true, medicine: medicines[5] },
];

// ── Pharmacy Reviews (GET /api/pharmacies/:id/reviews) ───────────────

export const pharmacyReviews: Review[] = [
  { id: "r1", patientId: "u1", pharmacyId: "p1", rating: 5, comment: "خدمة ممتازة وسريعة جداً. الصيدلي كان متعاوناً للغاية في شرح طريقة استخدام الدواء. المكان نظيف ومنظم.", createdAt: "2026-03-07", patientName: "أحمد الشمري" },
  { id: "r2", patientId: "u2", pharmacyId: "p1", rating: 4, comment: "تتوفر لديهم معظم منتجات العناية بالبشرة التي كنت أبحث عنها. السعر كان مناسباً لكن كان هناك قليل من الازدحام عند الكاشير.", createdAt: "2026-03-02", patientName: "سارة القحطاني" },
];

// ── Helper: get inventory for a pharmacy ─────────────────────────────

export function getPharmacyInventory(pharmacyId: string): PharmacyInventory[] {
  return pharmacyInventory.filter((inv) => inv.pharmacyId === pharmacyId);
}

export function getPharmacyReviews(pharmacyId: string): Review[] {
  return pharmacyReviews.filter((r) => r.pharmacyId === pharmacyId);
}
