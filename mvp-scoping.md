# MVP Scope - Introsphere

## Limit: 15 godzin

## Must Have (MVP - 10h max)

### 1. Ekran Startowy - Wybór Atmosfery
- [ ] Ekran powitalny z wyborem "atmosfery" / "vibe"
- [ ] 5 atmosfer podstawowych (free):
  1. **Clean Girl Aesthetic** - calm, minimal, beige/cream/soft neutrals, simple UI, lots of white space, soft gradients, rounded shapes. Dla osób skupionych na wellness i rutinach.
  2. **Cottagecore** - slow life, nature, greens/warm browns, flowers, handwritten fonts, illustrations of plants. Romantyzacja prostego życia i natury.
  3. **Dark Academia** - introspective, intellectual, poetic, dark brown/burgundy/parchment, book textures, ink, typewriter fonts. Romantyzacja literatury i głębokiego myślenia.
  4. **Soft Girl Aesthetic** - emotional openness, vulnerability, pastel pink/lavender/baby blue, cute icons (hearts, stars, clouds). Dla emocjonalnego wyrażania.
  5. **Futuristic Femme** - tech-wellness, AI-self-optimization, chrome/silver accents, sleek minimal UI, glowing gradients. Dla fanów technologii i AI.
- [ ] Dodatkowe atmosfery w premium: retro, vintage, pastel, cyberpunk (placeholder)
- [ ] Wybór wpływa na kolory/tła w całej aplikacji
- [ ] Zapis wyboru (atmosfera = default dla wszystkich sesji)
- [ ] Możliwość zmiany atmosfery w ustawieniach

### 2. Ekran Wyboru Trybu
- [ ] Dwie opcje do wyboru:
  - "Rozpocznij journey" (kilkudniowy program)
  - "Jednorazowa sesja" (pojedyncze pytanie)

### 3. Wybór Journey (dla trybu Journey)
- [ ] Lista 3 journeys w MVP:
  - "7 dni z moim lękiem"
  - "7 dni z wdzięcznością"
  - "7 dni z moim wewnętrznym dzieckiem"
- [ ] Krótki opis każdego journey
- [ ] Wybór koloru tła dla journey

### 4. Wybór Emocji - Koło Emocji (dla trybu Jednorazowa Sesja)
- [ ] Wybór ogólnej emocji (6 podstawowych z modelu Plutchika):
  - 😊 Radość
  - 😢 Smutek
  - 😠 Złość
  - 😨 Strach
  - 🤢 Wstręt
  - 😲 Zaskoczenie
- [ ] Opcja "precyzuj" - rozwinięcie emocji (np. smutek → tęsknota, samotność, żal)
- [ ] Opcja "zostań na ogólnej" - nie trzeba precyzować
- [ ] Losowanie pytania z banku dla wybranej kategorii emocji

### 5. Ekran Journey (Krok 2)
- [ ] Pokazuje "Dzień X z 7"
- [ ] Wyświetla pytanie dnia
- [ ] Przycisk "Odpowiedz"

### 6. Formularz Odpowiedzi (Krok 3)
- [ ] Pole tekstowe do wpisania odpowiedzi
- [ ] Przycisk "Zapisz"
- [ ] Zapis do localStorage (demo) lub Firebase

### 7. Postęp w Journey (Krok 4)
- [ ] Pokazuje które dni ukończone (1-7)
- [ ] Przycisk do następnego dnia (odblokowany po zapisaniu)

### 8. Historia Sesji
- [ ] Lista ukończonych journey
- [ ] Lista odpowiedzi z podziałem na dni

### 9. Kalendarz Nastrojów
- [ ] Prosty kalendarz miesiąca
- [ ] Kolorowanie dni według nastroju
- [ ] Brak interaktywności w MVP (tylko wyświetlanie)

---

## Should Have (extra - jeśli starczy czasu +5h)

### 8. Authentication
- [ ] Logowanie przez Google (Firebase Auth)
- [ ] Zapis sesji w chmurze

### 9. Dashboard
- [ ] Statystyki: ile sesji w tym tygodniu
- [ ] Najczęstszy nastrój

### 10. Eksport
- [ ] Eksport historii do PDF

---

## Szacunek Czasu

| Funkcja | Czas |
|---------|------|
| Setup React + Tailwind + Shadcn | 2h |
| Ekran startowy | 0.5h |
| Wybór nastroju | 1h |
| Pytanie doprecyzowujące | 0.5h |
| Baza pytań + logika | 1h |
| Formularz odpowiedzi | 1h |
| Historia sesji | 1h |
| Kalendarz nastrojów | 2h |
| Firebase integration | 1h |
| **RAZEM MVP** | **10h** |

Buffer: 5h na bugfixy i should have features

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

---

## Tech Stack

- React + Vite
- Tailwind CSS
- Shadcn UI
- Firebase (Auth + Firestore)
- React Router
