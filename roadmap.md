# Valorant Platform - Roadmap Development

## 📋 Faza 1: WIKI Platform (Podstawa)
Celem: Prezentacja danych z Valorant API - przeglądanie agentów i informacji

### 1.1 Frontend - Strony Wiki
- [ ] **Strona główna** (`app/page.tsx`)
  - Hero section z opisem platformy
  - Linki do sekcji (Agenci, Broń, Mapy)
  - Search bar do szybkiego wyszukiwania

- [ ] **Strona Agentów** (`app/(public)/agents/page.tsx`)
  - Grid/Lista wszystkich agentów
  - Filtry (po roli: Duelist, Sentinel, Controller, Initiator)
  - Click → szczegóły agenta

- [ ] **Szczegóły Agenta** (`app/(public)/agents/[id]/page.tsx`)
  - Zdjęcie/Portrait
  - Nazwa, rola, opis
  - Umiejętności (Q, E, X, Ultimate) - pobrać z API
  - Tipy do grania

- [ ] **Strona Broni** (`app/(public)/weapons/page.tsx`)
  - Katalog broni z cenom kredytów
  - Filtry (karabiny, pistolety, shotguny, itp)

- [ ] **Strona Map** (`app/(public)/maps/page.tsx`)
  - Wszystkie mapy gry
  - Minimapy, info o map pool

### 1.2 UI Components (Base)
- [ ] `Button.tsx` - przycisk ze stanami (primary, secondary, danger)
- [ ] `Card.tsx` - kontener dla sekcji
- [ ] `Input.tsx` - pole tekstowe z labelką
- [ ] `Badge.tsx` - etykiety (rola agenta, tier, rank)
- [ ] `Navbar.tsx` - nawigacja górna
- [ ] `Footer.tsx` - stopka
- [ ] `Modal.tsx` - modalne okna
- [ ] `Spinner.tsx` - loading state
- [ ] `Dropdown.tsx` - menu rozwijane do filtrów

### 1.3 Backend - API Endpoints (Wiki)
- [ ] **GET /api/agents** ✅ (już jest)
  - Rozszerzyć: zwracać też umiejętności z API

- [ ] **GET /api/agents/[id]**
  - Szczegóły agenta

- [ ] **GET /api/weapons**
  - Pobrać z zewnętrznego API

- [ ] **GET /api/maps**
  - Pobrać z zewnętrznego API

### 1.4 Styling & Layout
- [ ] Setup Tailwind CSS (obsługuje się już)
- [ ] Globals styles (dark theme dla Valoranta)
- [ ] Root layout z Navbar + Footer
- [ ] Responsive design

---

## 📋 Faza 2: User System (Logowanie + Profile)
Celem: Użytkownicy mogą się rejestrować i tworzyć swoje profile

### 2.1 Database Schema
- [ ] **Rozszerzyć Prisma schema**
  ```prisma
  model User {
    id String @id @default(cuid())
    email String @unique
    username String @unique
    password String
    createdAt DateTime @default(now())
    updatedAt DateTime
    profile Profile?
    matches Match[]
  }

  model Profile {
    id String @id @default(cuid())
    userId String @unique
    user User @relation(fields: [userId], references: [id])
    riotId String?
    rank String?
    tier Int?
    avatar String?
  }

  model Match {
    id String @id @default(cuid())
    userId String
    user User @relation(fields: [userId], references: [id])
    date DateTime
    agentId String
    result String (WIN/LOSS/DRAW)
    kills Int
    deaths Int
    assists Int
    createdAt DateTime @default(now())
  }
  ```

### 2.2 Auth System
- [ ] **Zainstalować bibliotekę auth** (NextAuth.js lub similar)
- [ ] **Backend endpoints**
  - [ ] POST /api/auth/register
  - [ ] POST /api/auth/login
  - [ ] POST /api/auth/logout
  - [ ] GET /api/auth/me (current user)

- [ ] **Frontend - Auth Pages**
  - [ ] `app/(auth)/login/page.tsx`
  - [ ] `app/(auth)/register/page.tsx`
  - [ ] Middleware do chronienia tras

### 2.3 User Profile
- [ ] **Strona Profilu** (`app/(dashboard)/profile/page.tsx`)
  - Avatar, username, email
  - Riot ID linking
  - Statystyki użytkownika
  - Przycisk edytowania profilu

- [ ] **Edit Profile** (`app/(dashboard)/profile/edit/page.tsx`)
  - Zmiana danych
  - Upload avatara
  - Zmiana hasła

### 2.4 Context/State Management
- [ ] React Context do przechowywania current user
- [ ] Hooks: `useAuth()`, `useCurrentUser()`

---

## 📋 Faza 3: Progress Tracking (Śledzenie Postępu)
Celem: Użytkownicy mogą śledzić swoje mecze i postęp

### 3.1 Match Logging
- [ ] **Backend API**
  - [ ] POST /api/matches - dodanie meczu
  - [ ] GET /api/matches - wszystkie mecze użytkownika
  - [ ] GET /api/matches/[id] - szczegóły meczu
  - [ ] PUT /api/matches/[id] - edycja meczu
  - [ ] DELETE /api/matches/[id] - usunięcie meczu

- [ ] **Frontend - Pages**
  - [ ] `app/(dashboard)/matches/page.tsx` - lista moich meczów
    - Filtry: agent, data, wynik
    - Sortowanie: najnowsze, najstarsze, best performance
  
  - [ ] `app/(dashboard)/matches/new/page.tsx` - dodaj mecz
    - Form: data, agent (select), kill/death/assist, wynik
  
  - [ ] `app/(dashboard)/matches/[id]/page.tsx` - szczegóły meczu

### 3.2 Statistics & Analytics
- [ ] **Backend endpoint**
  - [ ] GET /api/stats - agregowane statystyki użytkownika
    - Total matches, WR %, K/D ratio, favorite agent

- [ ] **Frontend - Stats Page** (`app/(dashboard)/stats/page.tsx`)
  - [ ] Overview cards: Total matches, WR%, K/D
  - [ ] Agent stats chart (najbardziej grany agent, WR na agentach)
  - [ ] Timeline: progres rankingu w czasie
  - [ ] Heatmapa: godziny grania

### 3.3 Components
- [ ] `MatchCard.tsx` - wyświetlenie pojedynczego meczu
- [ ] `StatsChart.tsx` - wykresy (Chart.js lub Recharts)
- [ ] `AgentStats.tsx` - statystyki per agent
- [ ] `RankProgress.tsx` - postęp rankingu

---

## 📋 Faza 4: Social & Competitive (Turnaje, Leaderboards)
Celem: Społeczność, rywalizacja, turnieje

### 4.1 Leaderboards
- [ ] **Database**
  ```prisma
  model Leaderboard {
    id String @id @default(cuid())
    userId String
    user User @relation(fields: [userId], references: [id])
    rank Int
    points Int
    createdAt DateTime @default(now())
  }
  ```

- [ ] **Backend API**
  - [ ] GET /api/leaderboard - top 100 graczy
  - [ ] GET /api/leaderboard/[userId] - pozycja gracza

- [ ] **Frontend**
  - [ ] `app/(public)/leaderboard/page.tsx`
    - Ranking top 100
    - Search gracz
    - Filter: region, rank

### 4.2 Tournaments
- [ ] **Database**
  ```prisma
  model Tournament {
    id String @id @default(cuid())
    name String
    description String
    startDate DateTime
    endDate DateTime
    maxTeams Int
    teams TournamentTeam[]
    matches TournamentMatch[]
  }

  model TournamentTeam {
    id String @id @default(cuid())
    tournamentId String
    tournament Tournament @relation(fields: [tournamentId], references: [id])
    name String
    players User[]
    wins Int @default(0)
  }

  model TournamentMatch {
    id String @id @default(cuid())
    tournamentId String
    tournament Tournament @relation(fields: [tournamentId], references: [id])
    team1Id String
    team2Id String
    winner String?
    score String
    date DateTime
  }
  ```

- [ ] **Backend API**
  - [ ] CRUD endpoints dla turniejów
  - [ ] GET /api/tournaments - lista turniejów
  - [ ] POST /api/tournaments/[id]/register - rejestracja
  - [ ] POST /api/tournaments/[id]/results - dodaj wyniki

- [ ] **Frontend**
  - [ ] `app/(dashboard)/tournaments/page.tsx` - lista turniejów
  - [ ] `app/(dashboard)/tournaments/[id]/page.tsx` - szczegóły turnieju
  - [ ] `app/(dashboard)/tournaments/[id]/bracket/page.tsx` - drabinka turnieju
  - [ ] `app/(dashboard)/my-tournaments/page.tsx` - moje turnieje

### 4.3 Team System
- [ ] **Strony zespołu**
  - [ ] `app/(dashboard)/teams/page.tsx`
  - [ ] `app/(dashboard)/teams/[id]/page.tsx`
  - [ ] `app/(dashboard)/teams/create/page.tsx`
  - [ ] Zarządzanie członkami, invites

### 4.4 Social Features
- [ ] User profiles pubiczne
- [ ] Follow system
- [ ] Comments na meczach

---

## 🔧 Setup & Configuration (Zacznij stąd!)

### Step 0: Dependencies
```bash
npm install next-auth bcryptjs
npm install chart.js recharts  # dla statystyk
npm install zod # walidacja formów
```

### Step 1: Prisma Setup
- [ ] Zaktualizować `prisma/schema.prisma`
- [ ] `npx prisma migrate dev --name init_users_matches`
- [ ] `npx prisma generate`

### Step 2: Struktura Folderów
```
app/
├── (public)/           # Strony publiczne (wiki)
│   ├── agents/
│   ├── weapons/
│   ├── maps/
│   └── leaderboard/
├── (auth)/             # Auth pages
│   ├── login/
│   ├── register/
│   └── layout.tsx
├── (dashboard)/        # Chronione strony
│   ├── profile/
│   ├── matches/
│   ├── stats/
│   ├── tournaments/
│   ├── teams/
│   └── layout.tsx (z navbar dla zalogowanych)
├── api/                # Backend
│   ├── auth/
│   ├── agents/
│   ├── matches/
│   ├── stats/
│   ├── tournaments/
│   └── users/
├── components/
│   ├── ui/             # Components bazowe
│   ├── layout/
│   ├── features/       # Biznesowe
│   └── cards/
├── hooks/
├── lib/
│   ├── api.ts          # Fetch functions
│   ├── auth.ts         # NextAuth config
│   └── utils.ts
└── context/
    └── AuthContext.tsx
```

---

## 📊 Priority & Timeline

| Faza | Opis | Spodziewany czas |
|------|------|-----------------|
| **1** | Wiki + UI Foundation | 1-2 tygodnie |
| **2** | Auth + User Profiles | 1-2 tygodnie |
| **3** | Match Tracking + Stats | 1-2 tygodnie |
| **4** | Tournaments + Social | 2-3 tygodnie |

---

## ✅ Checklisty per Phase

### Faza 1 Checklist
- [ ] Setup struktura folderów
- [ ] Stwórz UI components (Button, Card, Badge, itd)
- [ ] Stwórz layout (Navbar, Footer)
- [ ] Strona główna z searchem
- [ ] Strona agentów + szczegóły
- [ ] Poszerz backend API (weapons, maps)
- [ ] Dark theme Tailwind
- [ ] Deploy preview

### Faza 2 Checklist
- [ ] Update Prisma schema
- [ ] Setup NextAuth
- [ ] Endpoints auth
- [ ] Login/Register pages
- [ ] User Profile page
- [ ] Auth Context
- [ ] Middleware do protect routes

### Faza 3 Checklist
- [ ] Update Prisma (Match model)
- [ ] Match endpoints
- [ ] Match form + list
- [ ] Stats aggregation
- [ ] Stats page + charts
- [ ] Filters & sorting

### Faza 4 Checklist
- [ ] Tournament models
- [ ] Tournament CRUD
- [ ] Leaderboard logic
- [ ] Team system
- [ ] Bracket generator
- [ ] Social features

---

## 🚀 Quick Start Command

```bash
# 1. Zainstaluj deps
npm install

# 2. Setup bazy
npx prisma migrate dev

# 3. Uruchom dev server
npm run dev

# 4. Otwórz http://localhost:3000
```

---

## 📚 Notatki
- API Valoranta: `valorant-api.com`
- Baza: SQLite (better-sqlite3)
- Auth: NextAuth.js (lub Alternative)
- Styling: Tailwind CSS
- State: React Context
- Validation: Zod
- Charts: Recharts (lightweight)