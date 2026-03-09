/**
 * Domain Types — mirrors the ASP.NET Web API / SQL Server schema.
 * Every entity uses the same field names the backend will expose via JSON,
 * so the frontend can consume API responses with zero mapping.
 */

// ─── Users & Profiles ────────────────────────────────────────────────

export interface User {
  id: string;               // GUID
  email: string;
  fullName: string;
  phone: string;
  role: "patient" | "doctor" | "admin";
  avatarUrl?: string;
  createdAt: string;        // ISO-8601
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

export interface DoctorProfile {
  id: string;
  userId: string;
  specialtyId: string;
  title: string;            // e.g. "استشاري جراحة القلب"
  bio: string;
  experience: number;       // years
  price: number;            // consultation fee
  city: string;
  area: string;
  rating: number;
  reviewCount: number;
  gender: "male" | "female";
  available: boolean;
  tags: string[];
  qualifications: Qualification[];
  // Derived / joined on frontend
  user?: User;
  specialty?: Specialty;
}

export interface Qualification {
  title: string;
  institution: string;
  year: string;
}

// ─── Specialties ─────────────────────────────────────────────────────

export interface Specialty {
  id: string;
  name: string;
  icon: string;             // lucide icon name used by frontend
  doctorCount: number;
}

// ─── Availability & Appointments ─────────────────────────────────────

export interface AvailabilitySlot {
  id: string;
  doctorId: string;
  dayOfWeek: number;        // 0 = Saturday … 6 = Friday
  startTime: string;        // "09:00"
  endTime: string;          // "09:30"
  isBooked: boolean;
}

export type AppointmentStatus = "pending" | "confirmed" | "completed" | "cancelled";

export interface Appointment {
  id: string;
  patientId: string;
  doctorId: string;
  slotId: string;
  date: string;             // ISO date "2026-03-15"
  startTime: string;
  endTime: string;
  status: AppointmentStatus;
  reason?: string;
  createdAt: string;
  // Joined / expanded
  doctor?: DoctorProfile;
  patient?: PatientProfile;
}

// ─── Payments ────────────────────────────────────────────────────────

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

// ─── Reviews ─────────────────────────────────────────────────────────

export interface Review {
  id: string;
  patientId: string;
  doctorId?: string;
  pharmacyId?: string;
  rating: number;           // 1-5
  comment: string;
  createdAt: string;
  // Joined
  patientName?: string;
}

// ─── Pharmacies & Medicines ──────────────────────────────────────────

export interface Pharmacy {
  id: string;
  name: string;
  nameEn: string;
  area: string;
  city: string;
  rating: number;
  reviewCount: number;
  distance?: number;        // km, calculated
  isOpen: boolean;
  openHours: string;
  fridayHours: string;
  description: string;
  phone: string;
}

export interface Medicine {
  id: string;
  name: string;
  scientificName: string;
  description: string;
  imageColor: string;       // fallback color when no image
  imageUrl?: string;
}

/** Junction table — links pharmacies to medicines with price & stock */
export interface PharmacyInventory {
  id: string;
  pharmacyId: string;
  medicineId: string;
  price: number;
  inStock: boolean;
  // Joined
  medicine?: Medicine;
  pharmacy?: Pharmacy;
}
