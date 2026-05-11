# Zaimplementowane Funkcjonalności

## Status: W trakcie rozwoju

### Baza Funkcji (MVP)
- [x] Koło emocji (8 podstawowych + 24 warianty) — `emotion-wheel-component-2026-04-20.md`
- [x] 6 Journeys (7 dni każdy, 42 pytania łącznie) — `journeys.md`, `questions.md`
- [x] System atmosfer (8 motywów wizualnych) — `static-data-emotions-journeys-themes-2026-04-20.md`
- [x] Rejestracja i autoryzacja użytkowników (Supabase Auth) — brak dedykowanego planu
- [x] Strona główna (Hero, Koło emocji, Journeys) — `home-page-component-2026-04-20.md`
- [x] Onboarding (3-krokowy wizard) — brak dedykowanego planu (tylko `OnboardingLayout`)
- [x] Routing i nawigacja (React Router v6) — brak dedykowanego planu
- [x] Typy TypeScript (emotion, journey, question, reflection, user) — `typescript-types-2026-04-20.md`
- [x] Dane statyczne (emotions, journeys, themes) — `static-data-emotions-journeys-themes-2026-04-20.md`

### Komponenty UI
- [x] Komponenty podstawowe (Shadcn UI: button, card, input, dialog...) — brak dedykowanych planów
- [x] MainLayout — brak dedykowanego planu
- [x] AuthLayout — `auth-layout-component-2026-04-20.md`
- [x] OnboardingLayout — `onboarding-layout-component-2026-04-20.md`
- [x] Komponenty koła emocji:
  - EmotionWheel — `emotion-wheel-component-2026-04-20.md` (SVG 8 sektorów + logika kliknięcia)
  - EmotionDetails — `emotion-details-component-2026-04-20.md` (modal wyboru podspektra)
  - *(EmotionNode zintegrowany w EmotionWheel, nie istnieje jako osobny plik)*
- [x] Komponenty kalendarza:
  - MoodCalendar — `mood-calendar-component-2026-04-20.md`
  - CalendarEntry — `calendar-entry-component-2026-04-20.md`
  - *(CalendarDay zintegrowany w MoodCalendar, nie istnieje jako osobny plik)*
- [x] Komponenty journeys:
  - JourneyCard — `journey-card-component-2026-04-20.md`
  - JourneyProgress — `journey-progress-component-2026-04-20.md`
  - DayView — `day-view-component-2026-04-20.md` (pełna strona; DayQuestion nie istnieje jako osobny komponent)
- [x] Komponenty wspólne:
  - LoadingSpinner — `loading-spinner-component-2026-04-20.md`
  - EmptyState — `empty-state-component-2026-04-20.md`

### Strony
- [x] Landing / Home — `home-page-component-2026-04-20.md`
- [x] Onboarding — brak dedykowanego planu
- [x] Auth — brak dedykowanego planu (tylko `AuthLayout`)
- [x] Journey — `journey-page-expansion-2026-04-20.md`
- [x] Session — `session-page-2026-04-20.md`
- [x] Calendar — `calendar-page-2026-04-20.md`
- [x] History — `history-page-2026-04-20.md`
- [x] Settings — `settings-page-2026-04-20.md`
- [x] HowItWorks — brak dedykowanego planu
- [x] Quick Entry (New Entry - clear) — `quick-entry-form-component-2026-05-08.md` (częściowo zaimplementowane; patrz sekcja "Częściowo Zaimplementowane")

### Architektura
- [x] React 18 + Vite — brak dedykowanego planu (konfiguracja projektu)
- [x] TypeScript strict mode — brak dedykowanego planu
- [x] Zustand stores (authStore, themeStore, journeyStore, sessionStore) — brak dedykowanych planów
  - authStore: user, session, loading, initialized + signIn/signUp/signOut
  - themeStore: atmosphere, isDark (persist localStorage)
  - journeyStore: completedDays map + syncFromDatabase() (persist localStorage)
  - sessionStore: tylko entryDeletedCount (lightweight, brak persist)
- [x] Custom hooks (useAuth, useCalendar, useHomeStats, useHistory) — brak dedykowanych planów
  - *(useJourney, useEmotions, useSession nie istnieją – ich logika w stores/komponentach)*
- [x] Tailwind CSS + Shadcn UI — brak dedykowanych planów
- [x] Supabase integracja (PostgreSQL + Auth) — brak dedykowanego planu
- [x] Baza danych PostgreSQL — `supabase/supabase_tables`

### Poprawki Błędów (Bugfixes)
- [x] Fix Continue Button Navigation — `fix-continue-button-navigation-2026-04-28.md`
- [x] Fix Calendar Month Display — `fix-calendar-month-display-2026-05-01.md`

### Funkcje Danych i Logiki
- [x] Persistence of Completed Days — `persistence-completed-days-2026-04-28.md` (Zustand persist + localStorage)
- [x] Delete Entry (Data Layer) — `delete-entry-data-layer-2026-05-08.md`
- [x] Delete Entry (GUI) — `delete-entry-gui-2026-05-08.md`
- [x] Reflections Filter (State + Logic) — `reflections-filter-state-logic-2026-05-08.md`
- [x] Reflections Filter (UI Component) — `reflections-filter-ui-component-2026-05-08.md`
- [x] New Entry (Data Layer) — `new-entry-data-layer-2026-05-08.md`

### Częściowo Zaimplementowane
- [ ] Quick Entry — end-to-end flow niekompletny:
  - [x] Przycisk "Quick Entry" na stronie głównej — `home-page-quick-action-button-2026-05-08.md`
  - [x] Formularz `/quick-entry` — `quick-entry-form-component-2026-05-08.md`
  - [x] Warstwa danych (insert z `null` emotion_id) — `new-entry-data-layer-2026-05-08.md`
  - [ ] Wyświetlanie quick entries w kalendarzu i historii — **NIEZROBIONE** (każdy plan oznacza to jako "OUT OF SCOPE")

### Kolejne Etapy
- [ ] Full mood calendar with history (rozszerzenie kalendarza o pełną historię nastrojów)
- [ ] PDF export of journals
- [ ] Push notifications
- [ ] Advanced emotional pattern analysis
- [ ] Statistics and reports panel
- [ ] Offline mode / synchronization
- [ ] Multiple languages
- [ ] Social features (anonymous support)

## Zgodność ze Spec Driven Development
Każda funkcjonalności ma swój wpis w `docs/zaimimplementowane-plany/` z datą wersji (gdzie dotyczy). Brakujące lub niejawnie zaimplementowane funkcje zostały oznaczone i wyjaśnione powyżej.
