/**
 * API Service Layer
 * Typed fetch wrappers ready to connect to ASP.NET Web API.
 * Currently returns mock data from local files.
 */

import type {
  DoctorProfile,
  Specialty,
  Pharmacy,
  Medicine,
  PharmacyInventory,
  Appointment,
  Payment,
  Review,
  AvailabilitySlot,
  User,
} from "@/types/domain";

// ── Change this to your ASP.NET Web API base URL ─────────────────────
const API_BASE_URL = "/api";

// ── Generic fetch wrapper ────────────────────────────────────────────
async function apiFetch<T>(endpoint: string, options?: RequestInit): Promise<T> {
  // When backend is ready, uncomment:
  // const token = localStorage.getItem("auth_token");
  // const response = await fetch(`${API_BASE_URL}${endpoint}`, {
  //   headers: {
  //     "Content-Type": "application/json",
  //     ...(token ? { Authorization: `Bearer ${token}` } : {}),
  //     ...options?.headers,
  //   },
  //   ...options,
  // });
  // if (!response.ok) throw new Error(`API Error: ${response.status}`);
  // return response.json();

  // Simulate network latency during frontend-only development
  await new Promise((r) => setTimeout(r, 300));
  throw new Error("Not implemented – using mock data");
}

// ── Auth ─────────────────────────────────────────────────────────────
export const authApi = {
  /** POST /api/auth/login */
  login: (data: { email: string; password: string }) =>
    apiFetch<{ token: string; user: User }>("/auth/login", {
      method: "POST",
      body: JSON.stringify(data),
    }),
  /** POST /api/auth/register */
  register: (data: { fullName: string; email: string; phone: string; password: string }) =>
    apiFetch<{ token: string; user: User }>("/auth/register", {
      method: "POST",
      body: JSON.stringify(data),
    }),
  /** POST /api/auth/forgot-password */
  forgotPassword: (email: string) =>
    apiFetch<{ message: string }>("/auth/forgot-password", {
      method: "POST",
      body: JSON.stringify({ email }),
    }),
};

// ── Specialties ──────────────────────────────────────────────────────
export const specialtyApi = {
  /** GET /api/specialties */
  getAll: () => apiFetch<Specialty[]>("/specialties"),
};

// ── Doctors ──────────────────────────────────────────────────────────
export const doctorApi = {
  /** GET /api/doctors?specialtyId=...&city=...&minRating=...&maxPrice=... */
  search: (params: Record<string, string>) => {
    const query = new URLSearchParams(params).toString();
    return apiFetch<DoctorProfile[]>(`/doctors?${query}`);
  },
  /** GET /api/doctors/:id */
  getById: (id: string) => apiFetch<DoctorProfile>(`/doctors/${id}`),
  /** GET /api/doctors/:id/slots?date=2026-03-15 */
  getSlots: (doctorId: string, date?: string) => {
    const q = date ? `?date=${date}` : "";
    return apiFetch<AvailabilitySlot[]>(`/doctors/${doctorId}/slots${q}`);
  },
  /** GET /api/doctors/:id/reviews */
  getReviews: (doctorId: string) =>
    apiFetch<Review[]>(`/doctors/${doctorId}/reviews`),
};

// ── Appointments ─────────────────────────────────────────────────────
export const appointmentApi = {
  /** POST /api/appointments */
  create: (data: {
    doctorId: string;
    slotId: string;
    date: string;
    reason?: string;
    patientName: string;
    patientPhone: string;
    patientEmail?: string;
  }) =>
    apiFetch<Appointment>("/appointments", {
      method: "POST",
      body: JSON.stringify(data),
    }),
  /** GET /api/appointments/me */
  getMine: () => apiFetch<Appointment[]>("/appointments/me"),
  /** PUT /api/appointments/:id/cancel */
  cancel: (id: string) =>
    apiFetch<Appointment>(`/appointments/${id}/cancel`, { method: "PUT" }),
};

// ── Payments ─────────────────────────────────────────────────────────
export const paymentApi = {
  /** POST /api/payments */
  create: (data: { appointmentId: string; method: string }) =>
    apiFetch<Payment>("/payments", {
      method: "POST",
      body: JSON.stringify(data),
    }),
  /** GET /api/payments/me */
  getMine: () => apiFetch<Payment[]>("/payments/me"),
};

// ── Reviews ──────────────────────────────────────────────────────────
export const reviewApi = {
  /** POST /api/reviews */
  create: (data: { doctorId?: string; pharmacyId?: string; rating: number; comment: string }) =>
    apiFetch<Review>("/reviews", {
      method: "POST",
      body: JSON.stringify(data),
    }),
};

// ── Pharmacies ───────────────────────────────────────────────────────
export const pharmacyApi = {
  /** GET /api/pharmacies */
  getAll: () => apiFetch<Pharmacy[]>("/pharmacies"),
  /** GET /api/pharmacies/:id */
  getById: (id: string) => apiFetch<Pharmacy>(`/pharmacies/${id}`),
  /** GET /api/pharmacies/:id/inventory */
  getInventory: (pharmacyId: string) =>
    apiFetch<PharmacyInventory[]>(`/pharmacies/${pharmacyId}/inventory`),
  /** GET /api/pharmacies/:id/reviews */
  getReviews: (pharmacyId: string) =>
    apiFetch<Review[]>(`/pharmacies/${pharmacyId}/reviews`),
};

// ── Medicines ────────────────────────────────────────────────────────
export const medicineApi = {
  /** GET /api/medicines?q=بنادول */
  search: (query: string) =>
    apiFetch<(PharmacyInventory & { pharmacy: Pharmacy })[]>(
      `/medicines?q=${encodeURIComponent(query)}`
    ),
  /** GET /api/medicines/:id */
  getById: (id: string) => apiFetch<Medicine>(`/medicines/${id}`),
};

export { API_BASE_URL };
