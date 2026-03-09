/**
 * Domain Types — mirrors the ASP.NET Web API / SQL Server schema.
 * Field names match the JSON the backend exposes so no mapping is needed.
 * PascalCase mirrors C# convention; camelCase aliases are noted where the
 * serializer will automatically camel-case them.
 */

// ─── Users & Auth ─────────────────────────────────────────────────────

export interface User {
  id: string;          // GUID
  email: string;
  fullName: string;
  phone: string;
  role: "patient" | "doctor" | "admin";
  avatarUrl?: string;
  createdAt: string;   // ISO-8601
}

export interface PatientProfile {
  id: string;
  userId: string;
  dateOfBirth?: string;
  gender?: "male" | "female";
  bloodType?: string;
  allergies?: string;
  address?: string;
}

// ─── Doctors ──────────────────────────────────────────────────────────

export interface DoctorProfile {
  id: string;
  userId: string;
  specialtyId: string;
  fullName: string;       // from joined User
  title: string;          // e.g. "استشاري جراحة القلب"
  specialty: string;      // specialty name, joined
  bio: string;
  yearsOfExperience: number;
  price: number;          // consultation fee (EGP)
  city: string;
  area: string;
  rating: number;
  reviewCount: number;
  gender: "male" | "female";
  available: boolean;
  nextAvailableSlot?: string;  // e.g. "09:00 ص"
  tags: string[];
  qualifications: Qualification[];
  avatarColor: string;    // UI-only fallback color
  initials: string;       // UI-only derived initials
}

export interface Qualification {
  title: string;
  institution: string;
  year: string;
}

// ─── Specialties ──────────────────────────────────────────────────────

export interface Specialty {
  id: string;
  name: string;
  icon: string;           // lucide icon name
  doctorCount: number;
}

// ─── Availability & Appointments ──────────────────────────────────────

export interface AvailabilitySlot {
  id: string;
  doctorId: string;
  dayOfWeek: number;      // 0 = Saturday … 6 = Friday (Egyptian convention)
  startTime: string;      // "09:00"
  endTime: string;        // "09:30"
  isBooked: boolean;
}

export type AppointmentStatus = "pending" | "confirmed" | "completed" | "cancelled";

export interface Appointment {
  id: string;
  doctorId: string;
  patientId: string;
  slotId: string;
  date: string;           // ISO date "2026-03-15"
  startTime: string;
  endTime: string;
  status: AppointmentStatus;
  reason?: string;
  createdAt: string;      // ISO-8601
  // Joined / expanded
  doctor?: DoctorProfile;
  patient?: PatientProfile;
}

// ─── Payments ─────────────────────────────────────────────────────────

export type PaymentStatus = "pending" | "paid" | "refunded" | "failed";
export type PaymentMethod = "card" | "apple_pay" | "cash";

export interface Payment {
  id: string;
  appointmentId: string;
  amount: number;
  vat: number;
  total: number;
  method: PaymentMethod;
  status: PaymentStatus;
  paidAt?: string;
}

// ─── Reviews ──────────────────────────────────────────────────────────

export interface Review {
  id: string;
  patientId: string;
  doctorId?: string;
  pharmacyId?: string;
  rating: number;         // 1-5
  comment: string;
  createdAt: string;
  patientName?: string;   // joined
}

// ─── Pharmacies ───────────────────────────────────────────────────────

export interface Pharmacy {
  id: string;
  name: string;
  nameEn: string;
  city: string;
  location: string;       // human-readable address / area
  area: string;           // district
  rating: number;
  reviewCount: number;
  distance?: number;      // km, client-calculated
  isOpen: boolean;
  openHours: string;
  fridayHours: string;
  description: string;
  phone: string;
}

// ─── Medicines ────────────────────────────────────────────────────────

export interface Medicine {
  id: string;
  name: string;
  brand: string;                        // e.g. "Panadol"
  scientificName: string;               // generic / INN name
  category: string;                     // e.g. "مسكنات الألم"
  description: string;
  requiresPrescription: boolean;
  imageColor: string;                   // fallback swatch colour
  imageUrl?: string;
}

/** Junction table — links pharmacies to medicines with price & stock */
export interface PharmacyInventory {
  id: string;
  pharmacyId: string;
  medicineId: string;
  price: number;          // EGP
  stockQuantity: number;  // 0 = out of stock
  inStock: boolean;       // derived: stockQuantity > 0
  medicine?: Medicine;    // joined
  pharmacy?: Pharmacy;    // joined
}
