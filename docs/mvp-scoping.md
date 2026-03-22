# MVP Scope – Introsphere

## Limit: 15 godzin

> "Nie chcę 30 minut gapienia się w pustą stronę – chcę konkretne pytanie na dziś."

---

## Must Have (MVP – Core: 10h max)

### 1. Ekran Startowy – Wybór Atmosfery

**[OPCJONALNE – nie wymagane do działania]**

- [ ] Ekran powitalny z wyborem "atmosfery" / "vibe"
- [ ] 5 atmosfer podstawowych (free):
  1. **Clean Girl Aesthetic** – calm, minimal, beige/cream/soft neutrals, lots of white space, soft gradients, rounded shapes
  2. **Cottagecore** – slow life, nature, greens/warm browns, flowers, handwritten fonts
  3. **Dark Academia** – introspective, intellectual, poetic, dark brown/burgundy/parchment, typewriter fonts
  4. **Soft Girl Aesthetic** – emotional openness, vulnerability, pastel pink/lavender/baby blue, cute icons
  5. **Futuristic Femme** – tech-wellness, AI-self-optimization, chrome/silver accents, sleek minimal UI
- [ ] Dodatkowe atmosfery w premium: retro, vintage, pastel, cyberpunk (placeholder)
- [ ] Wybór wpływa na kolory/tła w całej aplikacji
- [ ] Zapis wyboru (atmosfera = default dla wszystkich sesji)
- [ ] Możliwość zmiany atmosfery w ustawieniach

**Dlaczego opcjonalne?** Julia nie potrzebuje ładnego tła żeby zacząć pisać. Potrzebuje pytania.

---

### 2. Ekran Wyboru Trybu

- [ ] Dwie opcje do wyboru:
  - **"Rozpocznij journey"** – kilkudniowy program (7 dni)
  - **"Jednorazowa sesja"** – pojedyncze pytanie

---

### 3. Wybór Journey (dla trybu Journey)

- [ ] Lista 6 journeys w MVP:
  - **"Wewnętrzne Dziecko"**
  - **"Granice"**
  - **"Energia"**
  - **"Wdzięczność"**
  - **"Decyzje"**
  - **"Relacje"**
- [ ] Krótki opis każdego journey
- [ ] Wybór koloru tła dla journey

---

### 4. Wybór Emocji – Koło Emocji (dla trybu Jednorazowa Sesja)

**[CORE – bez tego nie ma aplikacji]**

- [ ] Wybór ogólnej emocji (8 podstawowych z modelu Plutchika):
  - 😊 Radość (Joy)
  - 😢 Smutek (Sadness)
  - 😠 Złość (Anger)
  - 😨 Strach (Fear)
  - 🤢 Wstręt (Disgust)
  - 😲 Zaskoczenie (Surprise)
- [ ] Opcja "precyzuj" – rozwinięcie emocji:
  - Smutek → tęsknota, samotność, żal, rozczarowanie, zranienie
  - Strach → niepokój, lęk, panika, obawa, niepewność
  - Złość → irytacja, frustracja, wściekłość, gniew, agresja
  - Radość → szczęście, euforia, spokój, wdzięczność, nadzieja
- [ ] Opcja "zostań na ogólnej" – nie trzeba precyzować
- [ ] Losowanie pytania z banku dla wybranej kategorii emocji

---

### 5. Ekran Pytania (Krok 2)

**[CORE]**

- [ ] Wyświetla pytanie dopasowane do wybranej emocji
- [ ] Pokazuje "Dzień X z 7" (dla trybu Journey)
- [ ] Przycisk "Odpowiedz"
- [ ] Przycisk "Losuj inne pytanie" (dla jednorazowej sesji)

---

### 6. Formularz Odpowiedzi (Krok 3)

**[CORE]**

- [ ] Pole tekstowe do wpisania odpowiedzi
- [ ] Placeholder z提示ą (np. "Nie ma złych odpowiedzi. Pisz, co czujesz.")
- [ ] Przycisk "Zapisz"
- [ ] Zapis do localStorage (demo) lub Firebase

---

### 7. Postęp w Journey (Krok 4)

- [ ] Pokazuje które dni ukończone (1-7)
- [ ] Przycisk do następnego dnia (odblokowany po zapisaniu)
- [ ] Celebracja ukończenia journey (prosty komunikat)

---

### 8. Historia Sesji

- [ ] Lista ukończonych journey
- [ ] Lista odpowiedzi z podziałem na dni
- [ ] Możliwość przeczytania poprzednich odpowiedzi

---

### 9. Kalendarz Nastrojów

- [ ] Prosty kalendarz miesiąca
- [ ] Kolorowanie dni według nastroju
- [ ] Brak interaktywności w MVP (tylko wyświetlanie)

---

## Should Have (extra – jeśli starczy czasu: +5h)

### 10. Authentication
- [ ] Logowanie przez Google (Firebase Auth)
- [ ] Zapis sesji w chmurze

### 11. Dashboard
- [ ] Statystyki: ile sesji w tym tygodniu
- [ ] Najczęstszy nastrój

### 12. Eksport
- [ ] Eksport historii do PDF

---

## Szacunek Czasu

| Funkcja | Czas |
|---------|------|
| Setup React + Tailwind + Shadcn | 2h |
| Ekran startowy (atmosfera) | 0.5h |
| Wybór nastroju (koło emocji) | 1h |
| Pytanie doprecyzowujące | 0.5h |
| Baza pytań + logika | 1h |
| Formularz odpowiedzi | 1h |
| Historia sesji | 1h |
| Kalendarz nastrojów | 2h |
| Firebase integration | 1h |
| **RAZEM MVP** | **10h** |

**Buffer:** 5h na bugfixy i should have features

---

## UI/UX Guidelines

### Kolory (Dark Aesthetic)
- Tło: #0a0a0a (prawie czarny)
- Akcenty: kolor nastroju (50% opacity)
- Tekst: #e5e5e5 (jasny szary)
- Borders: #262626

### Font
- Nagłówki: Sans-serif bold
- Body: Sans-serif regular
- Minimalna wielkość: 16px

### Animacje
- Fade in przy przejściu kroków (200ms)
- Pulse na przycisku startowym

### Zasada: Keep It Simple
- **Maksymalnie 3 ekrany do pierwszej odpowiedzi**
- Nie wymagaj rejestracji do pierwszej sesji
- Atmosfery = opcjonalne, nie bloker

---

## Tech Stack

- React + Vite
- Tailwind CSS
- Shadcn UI
- Firebase (Auth + Firestore)
- React Router

---

## Weryfikacja MVP

Po zbudowaniu MVP, Julia powinna móc:

1. ✅ Otworzyć aplikację
2. ✅ Wybrać nastrój z koła emocji
3. ✅ Otrzymać konkretne pytanie
4. ✅ Odpowiedzieć na pytanie
5. ✅ Zobaczyć swoją odpowiedź w historii
6. ✅ Zobaczyć kalendarz nastrojów

**Czas od otwarcia do pierwszej odpowiedzi: < 2 minuty**

---

## Ryzyka MVP

| Ryzyko | Mitigation |
|--------|------------|
| Za dużo funkcji | Trzymaj się 10h limitu |
| Zbyt skomplikowany onboarding | Max 3 ekrany |
| Brak pytań | 6 journeys × 7 dni = 42 pytania |
| Brak użytkowników | TikTok organic |

---

## Następny Krok

1. Setup projektu (2h)
2. Implementacja koła emocji (2.5h)
3. Baza pytań + formularz (2h)
4. Historia + kalendarz (3h)
5. Firebase + deploy (1.5h)
6. Test + bugfix (2h)

**Razem: ~15h**
