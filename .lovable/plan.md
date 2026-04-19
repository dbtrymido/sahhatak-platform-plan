
The user wants a controller architecture review. This is research/advisory — no code changes needed. I'll review their proposed 7 controllers against the schema, suggest refinements, and list endpoints per controller. Output as a markdown guide file plan.

Key observations from schema:
- Schema has split Doctor/Patient profiles + Specialties + Qualifications → "Profiles" controller is too broad
- Doctors are heavy (search, slots, qualifications, approval) → deserve own controller
- Pharmacy domain has 4 tables (Pharmacies, Medicines, Inventory, PharmacyReviews) → split needed
- Reviews are split: Reviews (doctor via Appointment) + PharmacyReviews → keep with their domain, not standalone
- Lookups (Governorates, Cities, Specialties, Statuses) → one Lookups controller
- Admin operations (approve doctor, manage lookups) → separate Admin controller

Recommended 8 controllers:
1. Auth
2. Users (me/profile)
3. Doctors (search + slots + qualifications)
4. Patients
5. Appointments (+ Payments + Reviews as sub-resources OR split)
6. Payments
7. Pharmacies (+ Inventory + Reviews as sub-resources)
8. Medicines
9. Lookups
10. Admin

I'll merge to keep it lean: 8 controllers. Suggest deliverable as updated `sahtak-backend-guide.md` (append section) — but READ-ONLY mode. Present plan instead.
