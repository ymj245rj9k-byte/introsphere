# Analiza Zasobów – Introsphere

---

## Przegląd Projektu

> "Jeden developer. Ograniczony czas. Nisza do zdobycia."

Introsphere to projekt dla solo developera. Nie masz zespołu, budżetu korpo, ani czasu na 12-miesięczny development. Musisz być smart.

---

## Time Resources

### Szacunek Czasu na MVP

| Funkcja | Czas |
|---------|------|
| Setup Flutter + Firebase | 2h |
| Ekran startowy + wybór trybu | 1.5h |
| Journey system (6 journeys × 7 dni) | 4h |
| Koło emocji (Plutchik) | 2h |
| Baza pytań + logika | 2h |
| Formularz odpowiedzi | 1.5h |
| Historia sesji | 1.5h |
| Kalendarz nastrojów | 2h |
| Auth + Firebase | 1.5h |
| UI Polish + animacje | 2h |
| **RAZEM MVP** | **~10h** |

**Buffer:** 5h na bugfixy

**Łącznie: ~15h** (przy założeniu part-time: 3-4 tygodnie)

---

## Content Resources (Pytania & Journeys)

### Co musisz stworzyć

| Zasób | Ilość | Czas |
|-------|-------|------|
| 6 Journeys × 7 dni | 42 pytania | 6-8h |
| 8 głównych emocji × 3 pytania | 24 pytania | 2-3h |
| 24 podspektra × 3 pytania | 72 pytania | 3-4h |
| System promptów | - | 1-2h |
| **RAZEM** | **~140 pytań** | **~10-15h** |

**Gdzie wziąć pytania:**
- Adaptacja z journaling prompts (istnieją darmowe banki)
- Własne pytania (Twoja unikalna wartość)
- AI assistance (nie pisz od zera)

---

## Financial Resources

### Koszty Jednorazowe (Year 1)

| Kategoria | Koszt |
|-----------|-------|
| Apple Developer | $99 |
| Google Play | $25 |
| Domain (opcjonalnie) | $12 |
| **RAZEM** | **$136** (~500 PLN) |

### Koszty Miesięczne

| Kategoria | Koszt |
|-----------|-------|
| Firebase (free tier) | $0 |
| Analytics | $0 |
| Hosting | $0 |
| Email | $0 |
| **RAZEM** | **$0/msc** |

### Konkluzja Finansowa

**Budżet Year 1: ~500 PLN**

To jest minimalny możliwy budżet. Możesz zacząć za darmo (tylko Apple Developer wymagany do App Store).

---

## Human Resources

### Czy potrzebujesz zespołu?

| Rola | Potrzebna? | Alternatywa |
|------|------------|-------------|
| Backend Developer | ❌ | Firebase (BaaS) |
| Designer | ❌ | Tailwind + templates |
| Copywriter | ❌ | Własne pytania + AI |
| Marketing | ❌ | Organic TikTok |
| PM | ❌ | Ty |

**WERDYKT: Solo developer wystarczy.**

---

## Tech Stack

### Rekomendowany Stack (MVP)

| Technologia | Uzasadnienie |
|-------------|--------------|
| **React + Vite** | Szybki start, popularny, web/PWA |
| **Firebase Auth** | User authentication |
| **Firebase Firestore** | Cloud storage (free tier: 50k/day) |
| **Hive/Isar** | Lokalna baza (offline-first) |
| **Riverpod** | State management |

### Alternatywy

| Opcja | Kiedy wybrać |
|-------|--------------|
| React Native | Tylko jeśli chcesz mobile app |
| Supabase | Jeśli wolisz SQL |
| No-code (FlutterFlow) | Jeśli nie chcesz kodować |

---

## Risk Analysis

### Red Flags

1. **Scope creep** – "Dodam jeszcze jedną funkcję" = projekt nigdy się nie skończy
   - *Mitigation:* Trzymaj się 15h limitu

2. **App Store rejection** – Apple może odrzucić
   - *Mitigation:* Zapoznij się z guidelines przed submit

3. **Brak czasu na content** – Pytania to Twój moat, muszą być dobre
   - *Mitigation:* Stwórz przed MVP, nie w trakcie

4. **Burnout** – 25h to dużo w krótkim czasie
   - *Mitigation:* Part-time schedule, nie na raz

---

## Opportunities

1. **AI-assisted development** – GitHub Copilot, ChatCode przyspieszają coding
2. **No-code tools** – FlutterFlow = MVP bez kodowania
3. **Darmowe tier Firebase** – wystarczy na początek
4. **Organic growth** – TikTok = darmowy zasięg w niszy Gen Z

---

## Rekomendacja

**WERDYKT: ✅ WYKONALNE**

- Czas: 15h (~2-3 tygodnie part-time)
- Budżet: ~500 PLN
- Zespół: 1 osoba
- Tech: React + Tailwind + Shadcn + Firebase

### Warunki sukcesu:

1. **Trzymaj się limitu czasu** – 15h to maximum
2. **Content first** – pytania muszą być gotowe PRZED codingiem
3. **Minimal UI** – nie rozbudowuj designu
4. **Launch fast** – wersja 1.0 może być prosta

---

## Podsumowanie Tabelaryczne

| Kryterium | Wartość |
|-----------|---------|
| Czas na MVP | 15h |
| Budżet Year 1 | ~500 PLN |
| Developerzy | 1 |
| Tech stack | React + Firebase |
| Pytania do stworzenia | ~140 |
| Platformy | Web / PWA |

---

## Następny Krok

1. Stwórz pytania (10-15h)
2. Setup React (2h)
3. Implementacja core features (15h)
4. Test + submit (5h)
5. Launch! 🚀

---

*Czas to Twój najcenniejszy zasób. Nie marnuj go na "nice to have".*
