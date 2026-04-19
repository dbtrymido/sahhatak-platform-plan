# 🧭 Sahtak — API Controllers Architecture Plan

A focused review of the proposed controller layout against the SQL Server schema, with a recommended structure and full endpoint list per controller.

---

## 1. Verdict on the Proposed 7 Controllers

The proposed structure (Auth, Profiles, Appointments, Payments, Pharmacy, Reviews, Locations & Lookup) is **directionally correct but too coarse**. Four issues:

1. **"Profiles Controller"** lumps Doctors + Patients together — they have very different access patterns (doctors are publicly searchable, patients are private). They must split.
2. **"Pharmacy Controller"** would balloon — the schema has 4 pharmacy-domain tables. Medicines are searched independently of any single pharmacy (the frontend has a global medicine search).
3. **"Reviews Controller"** is a false grouping — `Reviews` are 1:1 with Appointments, `PharmacyReviews` belong to Pharmacies. A standalone reviews controller produces awkward routes.
4. **Missing**: an **Admin** controller for the `IsApproved` doctor workflow and lookup CRUD.

---

## 2. Recommended 9-Controller Structure (+ optional Admin)

| # | Controller | Owns Tables | Why separate |
|---|---|---|---|
| 1 | **Auth** | `Users`, `UserRoles` (read) | Stateless login/register/refresh |
| 2 | **Users** | `Users` (self) | "Me" endpoints, avatar, password change |
| 3 | **Doctors** | `DoctorProfiles`, `DoctorQualifications`, `AvailabilitySlots` | Public search + private doctor self-service |
| 4 | **Patients** | `PatientProfiles` | Private — patient self-management |
| 5 | **Appointments** | `Appointments`, `Reviews` | Reviews are 1:1 with appointments — keep together |
| 6 | **Payments** | `Payments`, `PaymentStatuses` | Independent payment lifecycle |
| 7 | **Pharmacies** | `Pharmacies`, `PharmacyInventory`, `PharmacyReviews` | Inventory & reviews are sub-resources |
| 8 | **Medicines** | `Medicines` | Frontend searches medicines globally |
| 9 | **Lookups** | `Governorates`, `Cities`, `Specialties`, `AppointmentStatuses`, `PaymentStatuses` | Cacheable reference data |
| 10 | **Admin** *(phase 2)* | Cross-cutting | Doctor approval, lookup CRUD, moderation |

---

## 3. Endpoints per Controller

### 1. AuthController — `/api/auth`
- `POST /register` — patient signup (creates `Users` + `PatientProfiles`)
- `POST /register/doctor` — doctor signup (creates `Users` + `DoctorProfiles`, `IsApproved=0`)
- `POST /login` — returns JWT
- `POST /refresh`
- `POST /forgot-password`
- `POST /reset-password`

### 2. UsersController — `/api/users`
- `GET /me` — current user (joined with role-specific profile)
- `PUT /me` — update FullName, Phone, Gender, AvatarUrl
- `PUT /me/password`
- `POST /me/avatar`

### 3. DoctorsController — `/api/doctors`
- `GET /` — search (`specialtyId`, `cityId`, `minRating`, `maxPrice`, `search`)
- `GET /{id}` — public profile (User + Specialty + City + Qualifications + avg rating)
- `GET /{id}/slots?from=&to=` — available slots (exclude booked via `Appointments.SlotId`)
- `GET /{id}/reviews` — paginated via `Appointments → Reviews`
- `GET /{id}/qualifications`
- **Doctor self-service** (auth=Doctor):
  - `PUT /me` — bio, price, clinic address, location
  - `POST /me/slots` / `DELETE /me/slots/{slotId}`
  - `POST /me/qualifications` / `DELETE /me/qualifications/{id}`
  - `GET /me/appointments`

### 4. PatientsController — `/api/patients` (auth=Patient)
- `GET /me`
- `PUT /me` — DOB, gender, blood type, emergency phone, address
- `GET /me/appointments?status=`

### 5. AppointmentsController — `/api/appointments`
- `POST /` — book (transactional: lock slot, insert, status=Pending)
- `GET /{id}` — owner patient or assigned doctor
- `PUT /{id}/cancel`
- `PUT /{id}/confirm` — doctor only
- `PUT /{id}/complete` — doctor only
- `POST /{id}/review` — patient reviews completed appointment (1:1)
- `GET /{id}/review`

### 6. PaymentsController — `/api/payments`
- `POST /` — initiate for appointment (returns Stripe/Fawry intent)
- `POST /webhook` — provider callback updates `StatusId` + `PaidAt`
- `GET /me`
- `GET /{id}`

### 7. PharmaciesController — `/api/pharmacies`
- `GET /` — search (`cityId`, `isOpen24h`, `lat`, `lng`, `radiusKm`)
- `GET /{id}`
- `GET /{id}/inventory`
- `GET /{id}/reviews`
- `POST /{id}/reviews` — auth=Patient (UQ enforces 1 review/patient)

### 8. MedicinesController — `/api/medicines`
- `GET /` — search by name/scientific name/category (returns medicine + stocking pharmacies + lowest price)
- `GET /{id}` — details + all pharmacies carrying it
- `GET /{id}/availability?cityId=` — filtered by city

### 9. LookupsController — `/api/lookups` *(public, cacheable)*
- `GET /governorates`
- `GET /governorates/{id}/cities`
- `GET /cities`
- `GET /specialties`
- `GET /appointment-statuses`
- `GET /payment-statuses`

### 10. AdminController — `/api/admin` *(phase 2, auth=Admin)*
- `GET /doctors/pending`
- `PUT /doctors/{id}/approve` / `PUT /doctors/{id}/reject`
- `POST|PUT|DELETE /lookups/specialties`
- `POST|PUT|DELETE /lookups/cities`
- `GET /users` — moderation list

---

## 4. Architectural Rules

1. **Sub-resources stay nested**: `Reviews` under `Appointments`; `Inventory` & `Reviews` under `Pharmacies`. No top-level `/reviews`.
2. **Public vs Self**: `/doctors/{id}` is public read; `/doctors/me/...` is doctor self-edit. Same pattern for patients via `/users/me` + `/patients/me`.
3. **Lookups read-only for end users** — only Admin mutates.
4. **Booking transaction lives in `AppointmentsController.POST /`** — uses `UPDLOCK` on slot; the `UQ Appointments.SlotId` constraint already in your schema is the safety net.
5. **Medicine search is global** — must live in `MedicinesController`, not nested under a pharmacy.

---

## 5. Build Order (matches existing frontend pages)

```
Phase 1 (make app real):     Lookups → Auth → Users → Doctors (search + slots) → Appointments (book)
Phase 2 (complete core):     Patients → Payments → Reviews
Phase 3 (pharmacy module):   Pharmacies → Medicines → PharmacyReviews
Phase 4:                     Admin
```
