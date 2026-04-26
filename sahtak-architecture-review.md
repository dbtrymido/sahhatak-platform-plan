# 🏛️ Sahtak Backend — Clear Steps

Your instinct is **100% correct**. Don't start with Controllers. Here are the steps — no fluff.

---

## ✅ Verdict (one line each)

- Start with Controllers? **No.**
- EF Core + DbContext first? **Yes.**
- Need a Service layer? **Yes.**
- Flow `Controller → Service → DbContext → DB`? **Correct.**
- Use Database First (Scaffold) since DB exists? **Yes.**

---

## 📋 Build Order — Do These In Order

### Step 1 — Create the project
```bash
dotnet new sln -n Sahtak
dotnet new webapi -n Sahtak.Api --use-controllers
dotnet sln add Sahtak.Api
cd Sahtak.Api
```

### Step 2 — Install packages
```bash
dotnet add package Microsoft.EntityFrameworkCore.SqlServer
dotnet add package Microsoft.EntityFrameworkCore.Design
dotnet add package Microsoft.EntityFrameworkCore.Tools
dotnet add package Microsoft.AspNetCore.Authentication.JwtBearer
dotnet add package BCrypt.Net-Next
dotnet add package AutoMapper.Extensions.Microsoft.DependencyInjection
```

### Step 3 — Scaffold entities + DbContext from existing DB
```bash
dotnet ef dbcontext scaffold "Server=.;Database=Sahtak;Trusted_Connection=True;TrustServerCertificate=True" ^
  Microsoft.EntityFrameworkCore.SqlServer ^
  -o Models/Entities ^
  --context-dir Data ^
  --context SahtakDbContext ^
  --no-onconfiguring ^
  --force
```
✔ This auto-creates all entity classes + `SahtakDbContext`. **Do not edit the generated files** — re-scaffold instead.

### Step 4 — Add connection string + register DbContext
**`appsettings.json`:**
```json
"ConnectionStrings": {
  "Default": "Server=.;Database=Sahtak;Trusted_Connection=True;TrustServerCertificate=True"
}
```
**`Program.cs`:**
```csharp
builder.Services.AddDbContext<SahtakDbContext>(o =>
    o.UseSqlServer(builder.Configuration.GetConnectionString("Default")));
```
✔ Run `dotnet run` → Swagger opens → DbContext is wired.

### Step 5 — Create folders
```
DTOs/        Services/Interfaces/   Services/Implementations/
Controllers/ Middleware/            Helpers/   Mappings/
```

### Step 6 — Build the layers in this order, one feature at a time

For **each feature** (start with Lookups, then Auth, then Doctors, then Appointments):

1. Write the **DTO** (request + response shape)
2. Write the **Service interface** (`IDoctorService`)
3. Write the **Service implementation** (all logic + DbContext queries)
4. Register service in `Program.cs`: `builder.Services.AddScoped<IDoctorService, DoctorService>();`
5. Write the **Controller** (1–3 lines per method, just calls the service)
6. Test in Swagger

### Step 7 — Add Auth (JWT)
- `AuthService` → register/login, hash with BCrypt, generate JWT
- Add `AddAuthentication().AddJwtBearer(...)` in `Program.cs`
- Add `[Authorize]` on protected endpoints

### Step 8 — Cross-cutting
- `ExceptionMiddleware` → one global try/catch
- CORS for the React frontend URL
- AutoMapper profile (Entity ↔ DTO)

---

## 📁 Final Folder Structure

```
Sahtak.Api/
├── Data/                  SahtakDbContext.cs            (scaffolded)
├── Models/Entities/       User.cs, Doctor.cs, ...       (scaffolded — don't edit)
├── DTOs/                  per-feature folders
├── Services/
│   ├── Interfaces/        IAuthService, IDoctorService, ...
│   └── Implementations/   AuthService, DoctorService, ...
├── Controllers/           thin — only HTTP
├── Middleware/            ExceptionMiddleware
├── Helpers/               JwtTokenGenerator, PasswordHasher
├── Mappings/              AutoMapper profile
├── appsettings.json
└── Program.cs
```

---

## 🚦 Feature Build Order (matches your frontend)

| # | Feature | Why this order |
|---|---|---|
| 1 | **Lookups** (specialties, cities) | Simplest, no auth, frontend dropdowns need it |
| 2 | **Auth** (register/login + JWT) | Everything else depends on it |
| 3 | **Doctors** (search + slots) | Frontend search page goes live |
| 4 | **Appointments** (booking transaction) | Core flow — needs UPDLOCK on slot |
| 5 | **Patients / Payments / Reviews** | Complete the patient journey |
| 6 | **Pharmacies / Medicines** | Second module |
| 7 | **Admin** | Last (doctor approval, lookup CRUD) |

---

## ❌ Top Mistakes To Avoid

1. Injecting `DbContext` directly into a Controller
2. Returning EF entities from Controllers (always return DTOs)
3. Business logic inside a Controller method
4. Plain-text passwords (use `BCrypt.HashPassword`)
5. Forgetting `[Authorize]` on private endpoints
6. Booking without a DB transaction (causes double-booking)
7. Editing scaffolded entity files (re-scaffold breaks your changes)
8. Forgetting CORS (frontend silently fails)

---

## 🎯 Bottom Line

```
DB (done) → Scaffold DbContext → DTOs → Services → Controllers → Auth → Frontend
```

Don't skip layers. Don't reorder. Each layer is testable on its own.
