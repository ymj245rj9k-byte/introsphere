# Product Owner – Introsphere

## Wizja Produktu

**Introsphere** to guided journaling app dla Gen Z (18–28 lat), która eliminuje barierę pustej strony. Użytkownik wybiera nastrój na kole emocji, dostaje dopasowane pytanie i odpowiada w 2 minuty.

**One-liner:** Zamiast 30 minut przed pustą stroną – wybierasz nastrój, odpowiadasz na pytanie i od razu widzisz wzorce swoich emocji.

---

## Cel Biznesowy

| Cel | Wskaźnik sukcesu |
|-----|-----------------|
| Rozwiązać problem "pustej strony" | Użytkownik odpowiada na pierwsze pytanie w < 2 min |
| Budować nawyk refleksji | Użytkownik wraca drugiego dnia (day-2 retention) |
| Monetyzacja Gen Z | Conversion free → premium lub Lifetime deal |

---

## Persona Użytkownika

**Julia, 26 lat, junior marketing**
- Prowadziła dziennik, ale przestała bo nie wiedziała o czym pisać
- Interesuje się shadow work, psychologią, self-development
- Szuka estetycznej aplikacji "dla mnie", nie korporacyjnej
- Wrażliwa na cenę – free musi dawać wartość

**Anna, 21 lat, studentka psychologii**
- Chce zacząć pracować nad sobą, ale nie wie od czego
- Headspace – za stary, Finch – za dziecinny
- Potrzebuje prowadzenia, nie kolejnego pustego notatnika

---

## Backlog Produktowy

### Zaimplementowane (MVP) ✅

| Priorytet | Funkcjonalność |
|-----------|---------------|
| P0 | Koło emocji (8 L3 + 24 podspektry) |
| P0 | Sesja emocjonalna: wybór nastroju → pytanie → odpowiedź |
| P0 | 6 Guided Journeys × 7 dni (42 pytania) |
| P0 | Rejestracja i logowanie (Supabase Auth) |
| P0 | Onboarding 3-krokowy |
| P1 | Kalendarz nastrojów (bieżący miesiąc) |
| P1 | Historia wpisów z filtrowaniem |
| P1 | 8 motywów atmosfery (dostępne dla wszystkich) |
| P1 | Quick Entry (wpis bez emocji) |
| P2 | Ustawienia konta, zmiana atmosfery |

### Do zaimplementowania (Post-MVP)

| Priorytet | Funkcjonalność |
|-----------|---------------|
| P1 | Wyświetlanie quick entries w kalendarzu i historii |
| P2 | Eksport historii do PDF (Premium) |
| P2 | Pełny kalendarz (wszystkie miesiące) (Premium) |
| P2 | Zaawansowane statystyki i analizy (Premium) |
| P3 | Push notifications (przypomnienia) |
| P3 | Tryb offline |
| P4 | Wielojęzyczność |

---

## Priorytety (MoSCoW)

**Must Have:** Koło emocji, sesja → zapis, journeys, auth, kalendarz bieżący miesiąc

**Should Have:** Historia z filtrowaniem, quick entry, atmosfery

**Could Have:** Eksport PDF, pełny kalendarz premium, statystyki

**Won't Have (MVP):** Social features, AI-generated questions, push notifications

---

## Monetyzacja

| Plan | Zawartość | Cena |
|------|-----------|------|
| Free | 3 sesje/miesiąc, kalendarz (bieżący miesiąc), 8 atmosfer | 0 PLN |
| Premium | Nieograniczone sesje, pełny kalendarz, eksport PDF, statystyki | 9.99 PLN/mc |
| Lifetime | Wszystko Premium, jednorazowo | 99 PLN |

---

## Kryteria Akceptacji (ogólne)

- Użytkownik przechodzi od "otworzył aplikację" do "zapisał wpis" w < 2 minuty
- Aplikacja działa na mobile (responsive)
- Dane użytkownika są bezpieczne (Supabase RLS)
- Brak błędów krytycznych w happy path

---

## KPI i Metryki

| Metryka | Cel |
|---------|-----|
| Day-2 retention | > 30% |
| Completion rate journey dzień 1 | > 60% |
| Time to first entry | < 2 min |
| Conversion free → paid | > 5% |
