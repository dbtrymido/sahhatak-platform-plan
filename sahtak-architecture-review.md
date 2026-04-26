# 🏛️ Sahtak — Backend Architecture Review

> **Your instinct is correct.** Jumping straight to Controllers is a classic junior mistake. Here's the honest review + the right order to build, explained step by step.

---

## 1. Verdict on Your Reasoning

| Your point | Verdict | Note |
|---|---|---|
| Don't start with Controllers | ✅ **Correct** | Controllers are the *thinnest* layer. They're the last thing you write, not the first. |
| EF Core setup must come first | ✅ **Correct** | Without DbContext + entities, Controllers have nothing to call. |
| Need a Service layer between Controller and DbContext | ✅ **Correct** | This is the single biggest difference between a junior and a mid-level .NET project. |
| `Controller → Service → DbContext → Database` | ✅ **Correct flow** | This is textbook layered architecture. |
| Skipping Services causes tight coupling & hard maintenance | ✅ **Correct** | Especially painful in team projects and grading. |

**You are not "just assuming" — you are describing standard N-Tier / Clean-ish architecture.** Trust this instinct.

The only nuance: the `sahtak-controllers-plan.md` file I gave you earlier is still valid — it's the **API surface** (what endpoints exist). It just isn't the **build order**. Endpoints are designed early, implemented last.

---

## 2. Database First vs Code First — Pick One (Important)

Since the database **already exists**, you have two valid choices:

### Option A — Database First (Scaffold) ✅ Recommended for you
You already have the SQL script. Run **one command** and EF Core generates entities + DbContext for you:

```bash
dotnet ef dbcontext scaffold "Server=.;Database=Sahtak;Trusted_Connection=True;TrustServerCertificate=True" \
  Microsoft.EntityFrameworkCore.SqlServer \
  -o Models/Entities \
  --context-dir Data \
  --context SahtakDbContext \
  --use-database-names \
  --no-onconfiguring
```

**Pros:** Zero risk of mismatch with the real DB. Fast. Matches your situation exactly.
**Cons:** If you change the DB later, you re-scaffold (use `--force`). Generated code is a bit verbose.

### Option B — Code First with existing DB
Hand-write entity classes + DbContext, then tell EF "the DB already exists, don't create migrations from scratch."

**Pros:** Cleaner code, full control, easier to evolve.
**Cons:** More work upfront, easy to drift from the real schema.

> **My recommendation: Option A (Scaffold) for the graduation project.** It's faster, safer, and the examiner can't argue with "EF generated it from your real schema."

---

## 3. The Correct Build Order (7 Layers)

```
1. Database               ✅ Already done
2. EF Core + DbContext    ← START HERE
3. DTOs (Request/Response)
4. Repositories (optional but recommended)
5. Services (business logic)
6. Controllers (HTTP only)
7. Middleware (Auth, Errors, CORS, Swagger)
```

### Why this order?
Each layer **depends only on the layer below it**. You can compile, test, and even unit-test each layer before writing the next. Reverse the order and nothing works until everything works — debugging hell.

---

## 4. Recommended Project Structure

```
Sahtak.Api/
├── Sahtak.Api.csproj
│
├── Data/
│   └── SahtakDbContext.cs              ← scaffolded
│
├── Models/
│   ├── Entities/                        ← scaffolded from DB
│   │   ├── User.cs, DoctorProfile.cs, Appointment.cs ...
│   └── Enums/
│       └── AppRole.cs
│
├── DTOs/
│   ├── Auth/   (LoginRequest, RegisterRequest, AuthResponse)
│   ├── Doctors/ (DoctorSearchDto, DoctorDetailsDto, SlotDto)
│   ├── Appointments/ (BookAppointmentRequest, AppointmentDto)
│   └── Common/ (PagedResult<T>, ApiError)
│
├── Repositories/                        ← optional, but clean
│   ├── IDoctorRepository.cs
│   └── DoctorRepository.cs
│
├── Services/                            ← BUSINESS LOGIC LIVES HERE
│   ├── Interfaces/
│   │   ├── IAuthService.cs
│   │   ├── IDoctorService.cs
│   │   ├── IAppointmentService.cs
│   │   └── IPaymentService.cs
│   └── Implementations/
│       ├── AuthService.cs
│       ├── DoctorService.cs
│       ├── AppointmentService.cs
│       └── PaymentService.cs
│
├── Controllers/                         ← THIN — only HTTP
│   ├── AuthController.cs
│   ├── DoctorsController.cs
│   ├── AppointmentsController.cs
│   └── ...
│
├── Middleware/
│   ├── ExceptionMiddleware.cs
│   └── JwtMiddleware.cs (or use built-in)
│
├── Mappings/
│   └── MappingProfile.cs               ← AutoMapper
│
├── Helpers/
│   ├── PasswordHasher.cs
│   └── JwtTokenGenerator.cs
│
├── appsettings.json
└── Program.cs                           ← DI registration
```

---

## 5. Layer-by-Layer: What Each One Does

### Layer 2 — DbContext (the EF Core bridge)
**Job:** Talk to SQL Server. Nothing else.
```csharp
public class SahtakDbContext : DbContext
{
    public DbSet<User> Users => Set<User>();
    public DbSet<DoctorProfile> DoctorProfiles => Set<DoctorProfile>();
    public DbSet<Appointment> Appointments => Set<Appointment>();
    // ...
}
```
**Rule:** *Never* injected into Controllers directly.

### Layer 3 — DTOs
**Job:** Define what goes IN and OUT of the API. Never expose entities directly (security + over-fetching risk).
```csharp
public record DoctorSearchDto(Guid Id, string FullName, string Specialty, decimal Price, double Rating);
```

### Layer 4 — Repository (optional, recommended)
**Job:** Encapsulate EF queries. Lets you swap data source or mock for testing.
```csharp
public interface IDoctorRepository {
    Task<List<DoctorProfile>> SearchAsync(Guid? specialtyId, Guid? cityId, ...);
    Task<DoctorProfile?> GetByIdAsync(Guid id);
}
```
> If your team is small and time is short, **skip repositories** and let Services use DbContext directly. That's acceptable for a graduation project.

### Layer 5 — Services (THE BRAIN)
**Job:** All business rules live here.
- Validation beyond model attributes
- Transactions
- Cross-entity logic (e.g., "booking an appointment locks a slot AND creates a Pending payment")
- Calling external APIs (Stripe, email)

```csharp
public class AppointmentService : IAppointmentService
{
    private readonly SahtakDbContext _db;
    public async Task<AppointmentDto> BookAsync(Guid patientId, BookAppointmentRequest req)
    {
        using var tx = await _db.Database.BeginTransactionAsync();
        // 1. Lock the slot (UPDLOCK)
        // 2. Verify it's not already booked
        // 3. Insert appointment with Status=Pending
        // 4. Commit
    }
}
```

### Layer 6 — Controllers (THIN!)
**Job:** Translate HTTP ↔ Service calls. **No business logic. No EF queries.**
```csharp
[ApiController, Route("api/appointments")]
public class AppointmentsController : ControllerBase
{
    private readonly IAppointmentService _svc;
    public AppointmentsController(IAppointmentService svc) => _svc = svc;

    [HttpPost, Authorize(Roles = "Patient")]
    public async Task<ActionResult<AppointmentDto>> Book(BookAppointmentRequest req)
        => Ok(await _svc.BookAsync(User.GetId(), req));
}
```
A healthy controller method is **1–3 lines**. If yours grows, the logic belongs in a Service.

### Layer 7 — Middleware & DI (`Program.cs`)
```csharp
builder.Services.AddDbContext<SahtakDbContext>(o =>
    o.UseSqlServer(builder.Configuration.GetConnectionString("Default")));

builder.Services.AddScoped<IAuthService, AuthService>();
builder.Services.AddScoped<IDoctorService, DoctorService>();
builder.Services.AddScoped<IAppointmentService, AppointmentService>();
// ...

builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(/* config */);

builder.Services.AddCors(o => o.AddDefaultPolicy(p =>
    p.WithOrigins("http://localhost:5173", "https://your-lovable-url")
     .AllowAnyHeader().AllowAnyMethod()));
```

---

## 6. Updated Build Order (concrete & step-by-step)

| Step | What | Time estimate | Verifies |
|---|---|---|---|
| 1 | Create solution: `Sahtak.Api` (Web API project) | 10 min | `dotnet run` shows Swagger |
| 2 | Add NuGet: `EFCore.SqlServer`, `EFCore.Design`, `EFCore.Tools`, `JwtBearer`, `BCrypt.Net-Next`, `AutoMapper` | 5 min | builds clean |
| 3 | **Scaffold** entities + DbContext from existing DB (Option A above) | 15 min | `dotnet build` succeeds, all entities generated |
| 4 | Wire `DbContext` into DI in `Program.cs` + connection string in `appsettings.json` | 10 min | App starts, can inject `SahtakDbContext` |
| 5 | Build **LookupsService + LookupsController** first (simplest, no auth) | 30 min | `GET /api/lookups/specialties` returns real data |
| 6 | Build **AuthService + AuthController** (register/login + JWT) | 2–3 hrs | Can register, login, get token |
| 7 | Add `[Authorize]` middleware globally | 30 min | Protected endpoints return 401 without token |
| 8 | Build **DoctorService + DoctorsController** (search + slots) | 2 hrs | Frontend search page can call real API |
| 9 | Build **AppointmentService + AppointmentsController** (the booking transaction) | 3 hrs | Can book end-to-end |
| 10 | Patients, Payments, Pharmacies, Medicines, Admin… | iterate | — |

> **Milestone after Step 8:** your Lovable frontend can replace the mock `src/data/doctors.ts` with real `fetch('/api/doctors')`. That's the moment the project becomes "real".

---

## 7. Connecting the Frontend (Lovable React app)

In `src/lib/api.ts` (already exists):
```ts
const API_BASE = import.meta.env.VITE_API_BASE_URL ?? "http://localhost:5000";

export async function api<T>(path: string, init?: RequestInit): Promise<T> {
  const token = localStorage.getItem("token");
  const res = await fetch(`${API_BASE}${path}`, {
    ...init,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...init?.headers,
    },
  });
  if (!res.ok) throw new Error(await res.text());
  return res.json();
}
```
Then swap mock data file by file as each backend endpoint goes live.

---

## 8. Mistakes to Avoid (the team-killers)

1. ❌ **Injecting `DbContext` directly into Controllers.** Always go through a Service.
2. ❌ **Returning EF entities from Controllers.** Always return DTOs (avoids circular references + leaks).
3. ❌ **Putting business logic in Controllers** ("just this once" — it's never just once).
4. ❌ **Forgetting `[Authorize]`** on private endpoints — biggest security hole in student projects.
5. ❌ **Storing passwords plain or with weak hash.** Use `BCrypt.Net-Next` (`BCrypt.HashPassword(pwd)`).
6. ❌ **Catching all exceptions in every method.** Use one `ExceptionMiddleware` instead.
7. ❌ **Skipping CORS config.** Frontend will fail silently in browser.
8. ❌ **Hard-coding the connection string** in `DbContext.OnConfiguring`. Use `appsettings.json` + `--no-onconfiguring` when scaffolding.
9. ❌ **Booking without a transaction.** Race conditions = double-booked slots = failed demo.
10. ❌ **Re-scaffolding over your custom changes** without `--force` awareness — keep scaffolded entities in their own folder, never edit them; extend via partial classes if needed.

---

## 9. Final Answer to Your Question

> *"Should we start with Controllers, or scaffold the DB into the project first?"*

**Scaffold first.** Always. Your teammate's suggestion (Controllers first) would force you to either:
- Hard-code fake data in controllers (= same problem as the current Lovable mockup), or
- Write raw SQL in controllers (= unmaintainable).

Build order is non-negotiable:
**`DB → DbContext (scaffold) → DTOs → Services → Controllers → Auth → Frontend wiring`**

You're thinking like a backend engineer already. Trust it. 🚀
