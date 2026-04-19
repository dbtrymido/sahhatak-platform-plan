# 🚀 How to Start Backend + Connect Frontend — Sahtak Platform

## 1. What Exists Now (Frontend Reality)

Your React/Vite frontend has **12 pages** and an `api.ts` layer already designed to talk to an ASP.NET backend. But today:

| Area | Status |
|------|--------|
| Auth (Login/Register) | `console.log` — no real auth |
| Doctor Search | Reads from `src/data/doctors.ts` mock array |
| Doctor Profile | Same mock array, `.find()` by ID |
| Booking Page | Fake `setTimeout`, random booking ref |
| Dashboard | Hardcoded 2023 appointments |
| Pharmacy Search/Profile | Reads from `src/data/pharmacies.ts` |
| Payments | Never called — dead code |
| Reviews | Mock array nested inside doctor objects |

**Good news:** Your `src/lib/api.ts` already has a `mockOrFetch` pattern — when you set `VITE_API_URL`, it automatically switches to real API calls. The wiring is done. You just need a backend to answer.

---

## 2. Frontend → Backend Mapping

Every page mapped to exact API endpoints and DB tables:

### Identity & Auth
| Frontend | API Endpoint | DB Tables | Notes |
|----------|-------------|-----------|-------|
| Login page | `POST /api/auth/login` | Users, UserRoles | Return JWT + user object |
| Register page | `POST /api/auth/register` | Users, PatientProfiles, UserRoles | Auto-create PatientProfile |
| Forgot Password | `POST /api/auth/forgot-password` | Users | Email token flow |

### Doctor Flow
| Frontend | API Endpoint | DB Tables | Notes |
|----------|-------------|-----------|-------|
| Hero search | `GET /api/specialties` | Specialties | Dropdown data |
| Hero search | `GET /api/cities` | Cities, Governorates | **New endpoint needed** |
| Doctor Search | `GET /api/doctors?specialtyId=&cityId=&minRating=&maxPrice=` | DoctorProfiles + Users + Specialties + Cities | Join 4 tables |
| Doctor Profile | `GET /api/doctors/{id}` | DoctorProfiles + Users + Specialties + Cities | Single doctor detail |
| Doctor Profile | `GET /api/doctors/{id}/reviews` | Reviews + Appointments + PatientProfiles + Users | Via appointment chain |
| Booking Page | `GET /api/doctors/{id}/slots?date=` | AvailabilitySlots | Filter unbooked slots |
| Booking Page | `POST /api/appointments` | Appointments, AvailabilitySlots | **Core transaction** |
| Booking Confirm | `POST /api/payments` | Payments, PaymentStatuses | After appointment created |

### Dashboard
| Frontend | API Endpoint | DB Tables | Notes |
|----------|-------------|-----------|-------|
| My Appointments | `GET /api/appointments/me` | Appointments + DoctorProfiles + Users + Specialties | Filter by JWT user |
| Cancel | `PUT /api/appointments/{id}/cancel` | Appointments, AppointmentStatuses | Status → Cancelled |

### Pharmacy Flow
| Frontend | API Endpoint | DB Tables | Notes |
|----------|-------------|-----------|-------|
| Pharmacy Search | `GET /api/pharmacies` | Pharmacies + Cities | List all |
| Pharmacy Profile | `GET /api/pharmacies/{id}` | Pharmacies + Cities | Single pharmacy |
| Pharmacy Inventory | `GET /api/pharmacies/{id}/inventory` | PharmacyInventory + Medicines | Join |
| Pharmacy Reviews | `GET /api/pharmacies/{id}/reviews` | PharmacyReviews + PatientProfiles + Users | Join |
| Medicine Search | `GET /api/medicines?q=` | Medicines + PharmacyInventory + Pharmacies | Cross-table search |

---

## 3. Minimum Viable Backend (Build Order)

Do NOT build everything at once. Here is the exact order, each phase making something real:

### Phase 1: Foundation (Day 1-2)
1. **Project scaffold** — ASP.NET Core Web API + EF Core
2. **DB connection** — EF Core → SQL Server
3. **Entity models** — map your 15 tables
4. **Seed data** — UserRoles, AppointmentStatuses, PaymentStatuses, Specialties, Governorates, Cities

### Phase 2: Auth (Day 3-4)
5. **Register** — create User + PatientProfile, hash password, return JWT
6. **Login** — validate credentials, return JWT
7. **JWT middleware** — protect endpoints

### Phase 3: Doctors (Day 5-6)
8. **GET /api/specialties** — simple list
9. **GET /api/cities** — simple list (new, needed by hero search)
10. **GET /api/doctors** — search with filters (specialty, city, price, rating)
11. **GET /api/doctors/{id}** — single doctor with joined data

### Phase 4: Booking (Day 7-8)
12. **GET /api/doctors/{id}/slots?date=** — available slots for a date
13. **POST /api/appointments** — THE critical transaction
14. **GET /api/appointments/me** — patient's appointments
15. **PUT /api/appointments/{id}/cancel** — cancel

### Phase 5: Payments & Reviews (Day 9-10)
16. **POST /api/payments** — record payment
17. **GET /api/doctors/{id}/reviews** — doctor reviews
18. **POST /api/reviews** — create review (after completed appointment)

### Phase 6: Pharmacy (Day 11-12)
19. **GET /api/pharmacies** — list
20. **GET /api/pharmacies/{id}** — detail
21. **GET /api/pharmacies/{id}/inventory** — medicines in stock
22. **GET /api/medicines?q=** — search across pharmacies

---

## 4. Step-by-Step: Create the Backend

### 4.1 Create the Project

```bash
# Create solution
dotnet new sln -n Sahtak

# Create Web API project
dotnet new webapi -n Sahtak.Api -controllers
dotnet sln add Sahtak.Api

# Add EF Core packages
cd Sahtak.Api
dotnet add package Microsoft.EntityFrameworkCore.SqlServer
dotnet add package Microsoft.EntityFrameworkCore.Tools
dotnet add package Microsoft.AspNetCore.Authentication.JwtBearer
dotnet add package BCrypt.Net-Next
```

### 4.2 Project Structure

```text
Sahtak.Api/
├── Controllers/
│   ├── AuthController.cs
│   ├── DoctorsController.cs
│   ├── AppointmentsController.cs
│   ├── PharmaciesController.cs
│   └── MedicinesController.cs
├── Models/
│   ├── User.cs
│   ├── UserRole.cs
│   ├── Governorate.cs
│   ├── City.cs
│   ├── Specialty.cs
│   ├── PatientProfile.cs
│   ├── DoctorProfile.cs
│   ├── AvailabilitySlot.cs
│   ├── AppointmentStatus.cs
│   ├── Appointment.cs
│   ├── PaymentStatus.cs
│   ├── Payment.cs
│   ├── Review.cs
│   ├── Pharmacy.cs
│   ├── Medicine.cs
│   ├── PharmacyInventory.cs
│   └── PharmacyReview.cs
├── DTOs/
│   ├── Auth/
│   │   ├── LoginRequest.cs
│   │   ├── RegisterRequest.cs
│   │   └── AuthResponse.cs
│   ├── DoctorDto.cs
│   ├── AppointmentDto.cs
│   └── PharmacyDto.cs
├── Data/
│   ├── AppDbContext.cs
│   └── SeedData.cs
├── Services/
│   ├── JwtService.cs
│   └── BookingService.cs
└── Program.cs
```

### 4.3 Key Entity Models

```csharp
// Models/User.cs
public class User
{
    public Guid Id { get; set; }
    public string FullName { get; set; } = null!;
    public string Email { get; set; } = null!;
    public string PasswordHash { get; set; } = null!;
    public string? Phone { get; set; }
    public int RoleId { get; set; }
    public bool IsActive { get; set; } = true;
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    public DateTime? UpdatedAt { get; set; }

    // Navigation
    public UserRole Role { get; set; } = null!;
    public PatientProfile? PatientProfile { get; set; }
    public DoctorProfile? DoctorProfile { get; set; }
}

// Models/DoctorProfile.cs
public class DoctorProfile
{
    public Guid Id { get; set; }           // Shared PK with Users
    public int SpecialtyId { get; set; }
    public string? Bio { get; set; }
    public decimal Price { get; set; }
    public int YearsOfExperience { get; set; }
    public string? ClinicAddress { get; set; }
    public int? CityId { get; set; }
    public decimal? Latitude { get; set; }
    public decimal? Longitude { get; set; }
    public bool IsApproved { get; set; }

    // Navigation
    public User User { get; set; } = null!;
    public Specialty Specialty { get; set; } = null!;
    public City? City { get; set; }
    public ICollection<AvailabilitySlot> Slots { get; set; } = [];
    public ICollection<Appointment> Appointments { get; set; } = [];
}

// Models/Appointment.cs
public class Appointment
{
    public Guid Id { get; set; }
    public Guid PatientId { get; set; }
    public Guid DoctorId { get; set; }
    public Guid SlotId { get; set; }
    public int StatusId { get; set; }
    public string? Notes { get; set; }
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

    // Navigation
    public PatientProfile Patient { get; set; } = null!;
    public DoctorProfile Doctor { get; set; } = null!;
    public AvailabilitySlot Slot { get; set; } = null!;
    public AppointmentStatus Status { get; set; } = null!;
    public Payment? Payment { get; set; }
    public Review? Review { get; set; }
}
```

### 4.4 DbContext — Handle Shared PKs

```csharp
// Data/AppDbContext.cs
public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

    public DbSet<User> Users => Set<User>();
    public DbSet<UserRole> UserRoles => Set<UserRole>();
    public DbSet<Governorate> Governorates => Set<Governorate>();
    public DbSet<City> Cities => Set<City>();
    public DbSet<Specialty> Specialties => Set<Specialty>();
    public DbSet<PatientProfile> PatientProfiles => Set<PatientProfile>();
    public DbSet<DoctorProfile> DoctorProfiles => Set<DoctorProfile>();
    public DbSet<AvailabilitySlot> AvailabilitySlots => Set<AvailabilitySlot>();
    public DbSet<AppointmentStatus> AppointmentStatuses => Set<AppointmentStatus>();
    public DbSet<Appointment> Appointments => Set<Appointment>();
    public DbSet<PaymentStatus> PaymentStatuses => Set<PaymentStatus>();
    public DbSet<Payment> Payments => Set<Payment>();
    public DbSet<Review> Reviews => Set<Review>();
    public DbSet<Pharmacy> Pharmacies => Set<Pharmacy>();
    public DbSet<Medicine> Medicines => Set<Medicine>();
    public DbSet<PharmacyInventory> PharmacyInventory => Set<PharmacyInventory>();
    public DbSet<PharmacyReview> PharmacyReviews => Set<PharmacyReview>();

    protected override void OnModelCreating(ModelBuilder mb)
    {
        // ── Shared Primary Key pattern ──
        mb.Entity<PatientProfile>()
            .HasOne(p => p.User)
            .WithOne(u => u.PatientProfile)
            .HasForeignKey<PatientProfile>(p => p.Id)
            .OnDelete(DeleteBehavior.Cascade);

        mb.Entity<DoctorProfile>()
            .HasOne(d => d.User)
            .WithOne(u => u.DoctorProfile)
            .HasForeignKey<DoctorProfile>(d => d.Id)
            .OnDelete(DeleteBehavior.Cascade);

        // ── Unique constraints ──
        mb.Entity<User>().HasIndex(u => u.Email).IsUnique();
        mb.Entity<AvailabilitySlot>()
            .HasIndex(s => new { s.DoctorId, s.StartTime }).IsUnique();
        mb.Entity<Appointment>().HasIndex(a => a.SlotId).IsUnique();
        mb.Entity<Payment>().HasIndex(p => p.AppointmentId).IsUnique();
        mb.Entity<Review>().HasIndex(r => r.AppointmentId).IsUnique();
        mb.Entity<PharmacyInventory>()
            .HasIndex(i => new { i.PharmacyId, i.MedicineId }).IsUnique();
        mb.Entity<PharmacyReview>()
            .HasIndex(r => new { r.PatientId, r.PharmacyId }).IsUnique();

        // ── Check constraints ──
        mb.Entity<DoctorProfile>()
            .ToTable(t => {
                t.HasCheckConstraint("CHK_Price", "[Price] >= 0");
                t.HasCheckConstraint("CHK_Experience", "[YearsOfExperience] >= 0");
            });

        mb.Entity<AvailabilitySlot>()
            .ToTable(t => t.HasCheckConstraint("CHK_Slot_Time", "[EndTime] > [StartTime]"));

        mb.Entity<Review>()
            .ToTable(t => t.HasCheckConstraint("CHK_Rating", "[Rating] BETWEEN 1 AND 5"));
    }
}
```

### 4.5 Run First Migration

```bash
# From Sahtak.Api directory
dotnet ef migrations add InitialCreate
dotnet ef database update
```

---

## 5. First APIs to Implement

### 5.1 GET /api/specialties
```
Returns: [{ id, nameAr, nameEn }]
Tables:  Specialties
Query:   SELECT * FROM Specialties
```
**Why first:** Hero section dropdown needs this immediately.

### 5.2 GET /api/doctors?specialtyId=&cityId=&maxPrice=
```
Returns: [{
  id, fullName, specialty, bio, price, yearsOfExperience,
  city, rating, reviewCount, available, nextAvailableSlot
}]
Tables:  DoctorProfiles JOIN Users JOIN Specialties JOIN Cities
         LEFT JOIN (subquery for avg rating from Reviews)
         LEFT JOIN (subquery for next available slot)
```
**Critical DTO mapping** — your frontend expects these computed fields:
- `fullName` → from `Users.FullName`
- `specialty` → from `Specialties.NameAr`
- `city` → from `Cities.NameAr`
- `rating` → `AVG(Reviews.Rating)` via Appointments
- `reviewCount` → `COUNT(Reviews.Id)` via Appointments
- `available` → `EXISTS(unbooked future slots)`
- `nextAvailableSlot` → `MIN(AvailabilitySlots.StartTime)` where unbooked
- `gender` → from `Users` (NOTE: your DB doesn't have gender on Users — **add it or derive from DoctorProfiles**)

### 5.3 GET /api/doctors/{id}
Same as above but single record. Include qualifications if you add that table (your DB schema doesn't have it — **frontend expects `qualifications[]`**, consider adding a `DoctorQualifications` table).

### 5.4 GET /api/doctors/{id}/slots?date=2026-03-15
```
Returns: [{ id, doctorId, startTime, endTime, isBooked }]
Tables:  AvailabilitySlots LEFT JOIN Appointments
Query:   WHERE DoctorId = @id
         AND CAST(StartTime AS DATE) = @date
         isBooked = (Appointment EXISTS for this slot)
```

### 5.5 POST /api/appointments
```
Receives: { slotId, reason }
          (doctorId and patientId derived server-side)
Tables:   Appointments, AvailabilitySlots
```
See Section 6 for full flow.

### 5.6 GET /api/appointments/me
```
Returns: [{ id, doctor: { fullName, specialty }, date, startTime, status }]
Tables:  Appointments JOIN DoctorProfiles JOIN Users JOIN Specialties
         JOIN AvailabilitySlots (for times)
Filter:  WHERE PatientId = @currentUserId
```

---

## 6. Booking Flow (Step-by-Step)

This is the most critical transaction in your system:

```text
┌──────────┐         ┌──────────┐         ┌──────────┐
│ Frontend │         │   API    │         │    DB    │
└────┬─────┘         └────┬─────┘         └────┬─────┘
     │                    │                    │
     │ 1. User picks slot │                    │
     │ POST /appointments │                    │
     │ { slotId, reason } │                    │
     │───────────────────>│                    │
     │                    │ 2. Extract userId  │
     │                    │    from JWT        │
     │                    │                    │
     │                    │ 3. BEGIN TRANSACTION│
     │                    │───────────────────>│
     │                    │                    │
     │                    │ 4. SELECT slot     │
     │                    │    WITH (UPDLOCK)  │
     │                    │    Check: no       │
     │                    │    existing appt   │
     │                    │───────────────────>│
     │                    │                    │
     │                    │ 5. INSERT INTO     │
     │                    │    Appointments    │
     │                    │    StatusId = 1    │
     │                    │    (Pending)       │
     │                    │───────────────────>│
     │                    │                    │
     │                    │ 6. COMMIT          │
     │                    │───────────────────>│
     │                    │                    │
     │ 7. Return appt    │                    │
     │<───────────────────│                    │
     │                    │                    │
     │ 8. Redirect to     │                    │
     │    /booking/confirm│                    │
```

### Backend Implementation (BookingService.cs)

```csharp
public async Task<Appointment> CreateAppointment(Guid patientId, Guid slotId, string? reason)
{
    // Use a transaction with row-level locking
    using var tx = await _db.Database.BeginTransactionAsync();

    // 1. Lock the slot row to prevent double-booking
    var slot = await _db.AvailabilitySlots
        .FromSqlRaw("SELECT * FROM AvailabilitySlots WITH (UPDLOCK) WHERE Id = {0}", slotId)
        .FirstOrDefaultAsync()
        ?? throw new InvalidOperationException("Slot not found");

    // 2. Check if slot is already booked
    var alreadyBooked = await _db.Appointments
        .AnyAsync(a => a.SlotId == slotId && a.StatusId != 4); // 4 = Cancelled
    if (alreadyBooked)
        throw new InvalidOperationException("Slot already booked");

    // 3. Verify patient exists
    var patientExists = await _db.PatientProfiles.AnyAsync(p => p.Id == patientId);
    if (!patientExists)
        throw new InvalidOperationException("Patient profile not found");

    // 4. Create appointment (DoctorId from slot — trigger will also validate)
    var appointment = new Appointment
    {
        PatientId = patientId,
        DoctorId = slot.DoctorId,
        SlotId = slotId,
        StatusId = 1,  // Pending
        Notes = reason
    };

    _db.Appointments.Add(appointment);
    await _db.SaveChangesAsync();
    await tx.CommitAsync();

    return appointment;
}
```

**Key protections:**
- `UPDLOCK` prevents two users from booking the same slot simultaneously
- `UNIQUE(SlotId)` on Appointments table is the final safety net
- `TRG_ValidateDoctorSlot` trigger ensures DoctorId consistency
- StatusId != 4 check allows rebooking of cancelled slots

---

## 7. Frontend Integration Plan

Your frontend is already 90% wired. Here's what to do:

### 7.1 Set the Environment Variable
```bash
# In your .env or deployment config
VITE_API_URL=https://localhost:7001   # dev
VITE_API_URL=https://api.sahtak.com  # prod
```
That's it. `api.ts` already checks `USE_MOCK = !API_BASE_URL`.

### 7.2 Enable CORS on Backend
```csharp
// Program.cs
builder.Services.AddCors(options =>
{
    options.AddPolicy("Frontend", policy =>
        policy.WithOrigins("http://localhost:5173", "https://sahtak.com")
              .AllowAnyHeader()
              .AllowAnyMethod()
              .AllowCredentials());
});
app.UseCors("Frontend");
```

### 7.3 Fix Frontend Type Mismatches

Your `domain.ts` has fields the DB doesn't have. You need to decide:

| Frontend Field | DB Reality | Action |
|---------------|------------|--------|
| `DoctorProfile.title` | Not in DB | Compute from specialty: `"استشاري " + specialty.nameAr` |
| `DoctorProfile.tags` | Not in DB | Add `DoctorTags` table OR remove from frontend |
| `DoctorProfile.qualifications` | Not in DB | Add `DoctorQualifications` table OR remove |
| `DoctorProfile.avatarColor` | Not in DB | Generate on backend from name hash |
| `DoctorProfile.initials` | Not in DB | Compute: `fullName.split(' ').map(w => w[0])` |
| `User.role` | DB has `RoleId` (int) | Backend DTO maps RoleId → "patient"/"doctor"/"admin" |
| `User.avatarUrl` | Not in DB | Add column OR generate from initials |
| `PatientProfile.userId` | DB uses shared PK (Id = UserId) | Backend DTO returns `id` as both |
| `PatientProfile.allergies` | Not in DB | Add column or remove from frontend |
| `Pharmacy.rating` | Not in DB directly | Compute: `AVG(PharmacyReviews.Rating)` |
| `Pharmacy.openHours/fridayHours` | Not in DB | Add columns or replace with `IsOpen24h` |
| `Pharmacy.nameEn` | Not in DB | Add column |
| `AvailabilitySlot.dayOfWeek` | Not in DB | Compute from `StartTime.DayOfWeek` |
| `AvailabilitySlot.isBooked` | Not in DB | Compute: `Appointments.Any(a => a.SlotId == id)` |
| `Appointment.date/startTime/endTime` | Stored on Slot | Flatten from joined AvailabilitySlot |
| `Appointment.status` | DB has `StatusId` | Map to string via AppointmentStatuses table |
| `Payment.vat/total` | Not in DB | Compute: `vat = amount * 0.14`, `total = amount + vat` |
| `Review.patientName` | Not in DB | Join: PatientProfile → User → FullName |
| `Review.doctorId` | DB links via Appointment | Join: Review → Appointment → DoctorId |

### 7.4 Replace Mock Data Usage in Pages

Some pages import mock data directly instead of using `api.ts`. Fix:

```typescript
// BEFORE (in some pages):
import { doctors } from "@/data/doctors";

// AFTER:
import { doctorApi } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";

const { data: doctors, isLoading } = useQuery({
  queryKey: ['doctors', filters],
  queryFn: () => doctorApi.search(filters),
});
```

### 7.5 Add Loading & Error States

Every page that calls the API needs:
```tsx
if (isLoading) return <LoadingSpinner />;
if (error) return <ErrorMessage message="حدث خطأ في تحميل البيانات" />;
```

### 7.6 Store JWT Token

On login success:
```typescript
const { token, user } = await authApi.login({ email, password });
localStorage.setItem("auth_token", token);  // api.ts already reads this
```

---

## 8. Database → EF Core: Scaffold vs Code First

### Recommendation: **Code First**

Why:
- You already have the SQL script — translate it to C# models manually
- Code First gives you full control over naming, navigation properties, and DTOs
- Scaffold-DbContext generates ugly code that you'll rewrite anyway
- Your schema is clean enough (15 tables) that manual mapping takes ~2 hours

### Handling the Shared PK Pattern
```csharp
// PatientProfile.Id IS User.Id — this is a 1:1 with shared PK
mb.Entity<PatientProfile>()
    .HasOne(p => p.User)
    .WithOne(u => u.PatientProfile)
    .HasForeignKey<PatientProfile>(p => p.Id);
```
EF Core handles this natively. Do NOT create a separate `UserId` column.

### Handling the Trigger
EF Core cannot create triggers via migrations. Run the trigger SQL separately:
```bash
dotnet ef migrations add AddDoctorSlotTrigger
```
Then in the migration's `Up()` method:
```csharp
migrationBuilder.Sql(@"
    CREATE TRIGGER TRG_ValidateDoctorSlot ON Appointments
    AFTER INSERT, UPDATE AS
    BEGIN
        IF EXISTS (
            SELECT 1 FROM inserted i
            JOIN AvailabilitySlots s ON i.SlotId = s.Id
            WHERE i.DoctorId <> s.DoctorId
        )
        BEGIN
            RAISERROR('DoctorId must match Slot DoctorId', 16, 1);
            ROLLBACK TRANSACTION;
        END
    END");
```

---

## 9. Common Mistakes to Avoid

Based on my previous audit of your frontend, here's what will break if done wrong:

### 1. Don't Return DB Models Directly
Your frontend expects flattened DTOs with computed fields (rating, reviewCount, fullName). If you return raw EF entities, the frontend will crash because `doctor.specialty` will be `null` instead of `"قلب"`.

### 2. Don't Forget camelCase Serialization
ASP.NET defaults to camelCase JSON — good, that matches your TypeScript interfaces. But verify:
```csharp
builder.Services.AddControllers()
    .AddJsonOptions(o => o.JsonSerializerOptions.PropertyNamingPolicy = JsonNamingPolicy.CamelCase);
```

### 3. Don't Skip CORS
Your frontend runs on `localhost:5173`, backend on `localhost:7001`. Without CORS config, every request fails silently.

### 4. Don't Trust Frontend IDs
Your booking page currently sends `patientId` from the client. **Never do this.** Extract the user ID from the JWT on the server:
```csharp
var userId = Guid.Parse(User.FindFirst(ClaimTypes.NameIdentifier)!.Value);
```

### 5. Don't Compute VAT on Frontend
Your `BookingPage.tsx` hardcodes 15% VAT (wrong — Egypt is 14%). Move this to the backend:
```csharp
var vat = amount * 0.14m;
var total = amount + vat;
```

### 6. Don't Forget Seed Data
Without seeding UserRoles, AppointmentStatuses, PaymentStatuses, and Specialties, every INSERT will fail due to FK constraints.

```csharp
// SeedData.cs — run on startup
if (!context.UserRoles.Any())
{
    context.UserRoles.AddRange(
        new UserRole { Name = "Admin" },
        new UserRole { Name = "Patient" },
        new UserRole { Name = "Doctor" }
    );
}
if (!context.AppointmentStatuses.Any())
{
    context.AppointmentStatuses.AddRange(
        new AppointmentStatus { Name = "Pending" },
        new AppointmentStatus { Name = "Confirmed" },
        new AppointmentStatus { Name = "Completed" },
        new AppointmentStatus { Name = "Cancelled" }
    );
}
```

### 7. Don't Forget: Schema Gaps
Your DB schema is missing things the frontend expects:
- **No `DoctorQualifications` table** — frontend renders qualifications
- **No `gender` on Users** — frontend shows doctor gender
- **No `openHours`/`fridayHours` on Pharmacies** — frontend displays them
- **No `description` on Pharmacies** — frontend renders it

Either add these columns/tables to your schema, or remove them from the frontend. Don't leave phantom fields.

### 8. Don't Build Admin Panel First
Your frontend has no admin UI. Build patient-facing APIs first. Admin comes later.

---

## 10. Quick Reference: Schema Gaps to Fix

| Missing in DB | Frontend Expects | Recommendation |
|--------------|-----------------|----------------|
| `DoctorQualifications` table | `qualifications[]` on doctor profile | Add table: `(Id, DoctorId FK, Title, Institution, Year)` |
| `Users.Gender` column | Doctor gender filter/display | Add `Gender NVARCHAR(10)` to Users |
| `Users.AvatarUrl` column | Profile pictures | Add `AvatarUrl NVARCHAR(MAX)` to Users |
| `Pharmacies.Description` | Pharmacy profile page | Add `Description NVARCHAR(MAX)` |
| `Pharmacies.NameEn` | Bilingual display | Add `NameEn NVARCHAR(200)` |
| `Pharmacies.OpenHours` | Operating hours display | Add `OpenHours NVARCHAR(50)`, `FridayHours NVARCHAR(50)` |
| `Medicines.ScientificName` | Medicine search | Add `ScientificName NVARCHAR(200)` |
| `Medicines.Description` | Medicine details | Add `Description NVARCHAR(MAX)` |

---

**Start with Phase 1 + 2 (scaffold + auth). Get login working end-to-end. Everything else builds on that.**

---

## 8. Controller Architecture (API Surface)

### Verdict on the Proposed 7 Controllers

The proposed structure is **directionally correct but too coarse**. Four issues:

1. **"Profiles Controller"** lumps Doctors + Patients together — they have very different access patterns (doctors are publicly searchable, patients are private). They must split.
2. **"Pharmacy Controller"** would balloon — the schema has 4 pharmacy-domain tables. Medicines are searched independently of any single pharmacy (the frontend has a global medicine search).
3. **"Reviews Controller"** is a false grouping — `Reviews` are 1:1 with Appointments, `PharmacyReviews` belong to Pharmacies. A standalone reviews controller produces awkward routes.
4. **Missing**: an **Admin** controller for the `IsApproved` doctor workflow and lookup CRUD.

### Recommended 9-Controller Structure (+ optional Admin)

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

### Endpoints per Controller

**1. AuthController — `/api/auth`**
- `POST /register` — patient signup (creates `Users` + `PatientProfiles`)
- `POST /register/doctor` — doctor signup (creates `Users` + `DoctorProfiles`, `IsApproved=0`)
- `POST /login` — returns JWT
- `POST /refresh`
- `POST /forgot-password`
- `POST /reset-password`

**2. UsersController — `/api/users`**
- `GET /me` — current user (joined with role-specific profile)
- `PUT /me` — update FullName, Phone, Gender, AvatarUrl
- `PUT /me/password`
- `POST /me/avatar`

**3. DoctorsController — `/api/doctors`**
- `GET /` — search (`specialtyId`, `cityId`, `minRating`, `maxPrice`, `search`)
- `GET /{id}` — public profile (User + Specialty + City + Qualifications + avg rating)
- `GET /{id}/slots?from=&to=` — available slots (exclude booked via `Appointments.SlotId`)
- `GET /{id}/reviews` — paginated via `Appointments → Reviews`
- `GET /{id}/qualifications`
- Doctor self-service (auth=Doctor):
  - `PUT /me` — bio, price, clinic address, location
  - `POST /me/slots` / `DELETE /me/slots/{slotId}`
  - `POST /me/qualifications` / `DELETE /me/qualifications/{id}`
  - `GET /me/appointments`

**4. PatientsController — `/api/patients`** (auth=Patient)
- `GET /me`
- `PUT /me` — DOB, gender, blood type, emergency phone, address
- `GET /me/appointments?status=`

**5. AppointmentsController — `/api/appointments`**
- `POST /` — book (transactional: lock slot, insert, status=Pending)
- `GET /{id}` — owner patient or assigned doctor
- `PUT /{id}/cancel`
- `PUT /{id}/confirm` — doctor only
- `PUT /{id}/complete` — doctor only
- `POST /{id}/review` — patient reviews completed appointment (1:1)
- `GET /{id}/review`

**6. PaymentsController — `/api/payments`**
- `POST /` — initiate for appointment (returns Stripe/Fawry intent)
- `POST /webhook` — provider callback updates `StatusId` + `PaidAt`
- `GET /me`
- `GET /{id}`

**7. PharmaciesController — `/api/pharmacies`**
- `GET /` — search (`cityId`, `isOpen24h`, `lat`, `lng`, `radiusKm`)
- `GET /{id}`
- `GET /{id}/inventory`
- `GET /{id}/reviews`
- `POST /{id}/reviews` — auth=Patient (UQ enforces 1 review/patient)

**8. MedicinesController — `/api/medicines`**
- `GET /` — search by name/scientific name/category (returns medicine + stocking pharmacies + lowest price)
- `GET /{id}` — details + all pharmacies carrying it
- `GET /{id}/availability?cityId=` — filtered by city

**9. LookupsController — `/api/lookups`** *(public, cacheable)*
- `GET /governorates`
- `GET /governorates/{id}/cities`
- `GET /cities`
- `GET /specialties`
- `GET /appointment-statuses`
- `GET /payment-statuses`

**10. AdminController — `/api/admin`** *(phase 2, auth=Admin)*
- `GET /doctors/pending`
- `PUT /doctors/{id}/approve` / `PUT /doctors/{id}/reject`
- `POST|PUT|DELETE /lookups/specialties`
- `POST|PUT|DELETE /lookups/cities`
- `GET /users` — moderation list

---

### Architectural Rules

1. **Sub-resources stay nested**: `Reviews` under `Appointments`; `Inventory` & `Reviews` under `Pharmacies`. No top-level `/reviews`.
2. **Public vs Self**: `/doctors/{id}` is public read; `/doctors/me/...` is doctor self-edit. Same pattern for patients via `/users/me` + `/patients/me`.
3. **Lookups read-only for end users** — only Admin mutates.
4. **Booking transaction lives in `AppointmentsController.POST /`** — uses `UPDLOCK` on slot; the `UQ Appointments.SlotId` constraint already in your schema is the safety net.
5. **Medicine search is global** — must live in `MedicinesController`, not nested under a pharmacy.

### Build Order (matches existing frontend pages)

```
Phase 1 (make app real):     Lookups → Auth → Users → Doctors (search + slots) → Appointments (book)
Phase 2 (complete core):     Patients → Payments → Reviews
Phase 3 (pharmacy module):   Pharmacies → Medicines → PharmacyReviews
Phase 4:                     Admin
```
