/**
 * API Service Layer — typed fetch wrappers for the ASP.NET Web API backend.
 *
 * In development (VITE_API_URL unset) the module falls back to local mock data
 * so the frontend works standalone.  When the real backend is deployed, set:
 *   VITE_API_URL=https://api.example.com
 * in your environment and the mock shim is bypassed.
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

// ── Base URL ────────────────────────────────────────────────────────────
// Set VITE_API_URL in .env to point at the real backend.
const API_BASE_URL = (import.meta.env.VITE_API_URL as string | undefined) ?? "";
const USE_MOCK = !API_BASE_URL;

// ── Generic fetch wrapper ───────────────────────────────────────────────
async function apiFetch<T>(endpoint: string, options?: RequestInit): Promise<T> {
  const token = typeof localStorage !== "undefined" ? localStorage.getItem("auth_token") : null;

  const response = await fetch(`${API_BASE_URL}/api${endpoint}`, {
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...options?.headers,
    },
    ...options,
  });

  if (!response.ok) {
    const msg = await response.text().catch(() => `HTTP ${response.status}`);
    throw new Error(msg || `API Error ${response.status}`);
  }

  return response.json() as Promise<T>;
}

// ── Mock shim (used when VITE_API_URL is not configured) ────────────────
// Each function lazy-imports the local data file so tree-shaking removes it
// from production bundles when USE_MOCK is false.
async function mockOrFetch<T>(
  mockFn: () => Promise<T>,
  endpoint: string,
  options?: RequestInit
): Promise<T> {
  if (USE_MOCK) return mockFn();
  return apiFetch<T>(endpoint, options);
}

// ── Auth ────────────────────────────────────────────────────────────────
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

// ── Specialties — GET /api/specialties ─────────────────────────────────
export const specialtyApi = {
  getAll: () =>
    mockOrFetch<Specialty[]>(
      async () => (await import("@/data/specialties")).specialties,
      "/specialties"
    ),
};

// ── Doctors — GET /api/doctors, GET /api/doctors/{id} ──────────────────
export const doctorApi = {
  /** GET /api/doctors?specialtyId=…&city=…&minRating=…&maxPrice=… */
  search: (params: Record<string, string>) => {
    const query = new URLSearchParams(params).toString();
    return mockOrFetch<DoctorProfile[]>(
      async () => (await import("@/data/doctors")).doctors,
      `/doctors${query ? `?${query}` : ""}`
    );
  },

  /** GET /api/doctors/{id} */
  getById: (id: string) =>
    mockOrFetch<DoctorProfile>(
      async () => {
        const { doctors } = await import("@/data/doctors");
        const doc = doctors.find((d) => d.id === id);
        if (!doc) throw new Error("Doctor not found");
        return doc;
      },
      `/doctors/${id}`
    ),

  /** GET /api/doctors/{id}/slots?date=2026-03-15 */
  getSlots: (doctorId: string, date?: string) => {
    const q = date ? `?date=${date}` : "";
    return mockOrFetch<AvailabilitySlot[]>(
      async () => {
        const { doctors } = await import("@/data/doctors");
        const doc = doctors.find((d) => d.id === doctorId);
        // Convert mock time slots → AvailabilitySlot shape
        return (
          doc?.timeSlots.map((s, i) => ({
            id: `slot-${doctorId}-${i}`,
            doctorId,
            dayOfWeek: 0,
            startTime: s.time,
            endTime: s.time,
            isBooked: !s.available,
          })) ?? []
        );
      },
      `/doctors/${doctorId}/slots${q}`
    );
  },

  /** GET /api/doctors/{id}/reviews */
  getReviews: (doctorId: string) =>
    mockOrFetch<Review[]>(
      async () => {
        const { doctors } = await import("@/data/doctors");
        const doc = doctors.find((d) => d.id === doctorId);
        return (
          doc?.reviews.map((r, i) => ({
            id: `rev-${doctorId}-${i}`,
            patientId: `u-${i}`,
            doctorId,
            rating: r.rating,
            comment: r.text,
            createdAt: r.date,
            patientName: r.name,
          })) ?? []
        );
      },
      `/doctors/${doctorId}/reviews`
    ),
};

// ── Appointments — POST /api/appointments ──────────────────────────────
export const appointmentApi = {
  /** POST /api/appointments */
  create: (data: {
    doctorId: string;
    patientId: string;
    slotId: string;
    date: string;
    reason?: string;
  }) =>
    apiFetch<Appointment>("/appointments", {
      method: "POST",
      body: JSON.stringify(data),
    }),

  /** GET /api/appointments/me */
  getMine: () => apiFetch<Appointment[]>("/appointments/me"),

  /** PUT /api/appointments/{id}/cancel */
  cancel: (id: string) =>
    apiFetch<Appointment>(`/appointments/${id}/cancel`, { method: "PUT" }),
};

// ── Payments — POST /api/payments ──────────────────────────────────────
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

// ── Reviews — GET /api/reviews ──────────────────────────────────────────
export const reviewApi = {
  /** GET /api/reviews?doctorId=…|pharmacyId=… */
  getAll: (params?: { doctorId?: string; pharmacyId?: string }) => {
    const q = params ? new URLSearchParams(params as Record<string, string>).toString() : "";
    return apiFetch<Review[]>(`/reviews${q ? `?${q}` : ""}`);
  },

  /** POST /api/reviews */
  create: (data: { doctorId?: string; pharmacyId?: string; rating: number; comment: string }) =>
    apiFetch<Review>("/reviews", {
      method: "POST",
      body: JSON.stringify(data),
    }),
};

// ── Pharmacies — GET /api/pharmacies, GET /api/pharmacies/{id} ─────────
export const pharmacyApi = {
  /** GET /api/pharmacies */
  getAll: () =>
    mockOrFetch<Pharmacy[]>(
      async () => (await import("@/data/pharmacies")).pharmacies,
      "/pharmacies"
    ),

  /** GET /api/pharmacies/{id} */
  getById: (id: string) =>
    mockOrFetch<Pharmacy>(
      async () => {
        const { pharmacies } = await import("@/data/pharmacies");
        const p = pharmacies.find((ph) => ph.id === id);
        if (!p) throw new Error("Pharmacy not found");
        return p;
      },
      `/pharmacies/${id}`
    ),

  /** GET /api/pharmacies/{id}/inventory */
  getInventory: (pharmacyId: string) =>
    mockOrFetch<PharmacyInventory[]>(
      async () => {
        const { getPharmacyInventory } = await import("@/data/pharmacies");
        return getPharmacyInventory(pharmacyId);
      },
      `/pharmacies/${pharmacyId}/inventory`
    ),

  /** GET /api/pharmacies/{id}/reviews */
  getReviews: (pharmacyId: string) =>
    mockOrFetch<Review[]>(
      async () => {
        const { getPharmacyReviews } = await import("@/data/pharmacies");
        return getPharmacyReviews(pharmacyId);
      },
      `/pharmacies/${pharmacyId}/reviews`
    ),
};

// ── Medicines — GET /api/medicines ─────────────────────────────────────
export const medicineApi = {
  /** GET /api/medicines?q=بنادول */
  search: (query: string) =>
    mockOrFetch<(PharmacyInventory & { pharmacy: Pharmacy })[]>(
      async () => {
        const { medicines, pharmacyInventory, pharmacies } = await import("@/data/pharmacies");
        const lower = query.toLowerCase();
        const matchedIds = query
          ? medicines
              .filter(
                (m) =>
                  m.name.includes(query) ||
                  m.scientificName.includes(query) ||
                  m.brand.toLowerCase().includes(lower) ||
                  m.category.includes(query)
              )
              .map((m) => m.id)
          : medicines.map((m) => m.id);

        return pharmacyInventory
          .filter((inv) => matchedIds.includes(inv.medicineId))
          .map((inv) => ({
            ...inv,
            pharmacy: pharmacies.find((p) => p.id === inv.pharmacyId)!,
          }));
      },
      `/medicines?q=${encodeURIComponent(query)}`
    ),

  /** GET /api/medicines */
  getAll: () =>
    mockOrFetch<Medicine[]>(
      async () => (await import("@/data/pharmacies")).medicines,
      "/medicines"
    ),
};

export { API_BASE_URL };
