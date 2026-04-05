# Monetyzacja i GTM – Introsphere

---

## Model Monetyzacji

### Freemium + Lifetime Deal

| Poziom | Funkcje | Cena |
|--------|---------|------|
| **Free** | 3 sesje/miesiąc, podstawowy kalendarz nastrojów, 5 atmosfer | 0 PLN |
| **Rewards** | Po 10 sesjach: odblokuj nowe atmosfery (retro, vintage, pastel) | 0 PLN |
| **Premium** | Nieograniczone sesje, rozszerzony kalendarz, eksport PDF | 9.99 PLN/mc |
| **Lifetime** | Wszystko Premium, jeden raz | 99 PLN |

---

### Dlaczego taki model?

1. **Free musi dawać wartość** – Gen Z nie kupi bez wypróbowania
2. **9.99 PLN = cena kawy** – low barrier to entry
3. **Lifetime = szybki cash flow** – dla tych co "nie chcą subskrypcji"
4. **Rewards = retention** – użytkownik wraca, żeby odblokować nowe atmosfery

---

### Szacunkowa ekonomia

**Założenia:**
- TikTok organic = 0 PLN (koszt = Twój czas)
- Break-even: 50 płacących użytkowników

| Scenariusch | Użytkownicy Free | Conversion | Płacący | Przychód/mc |
|-------------|-------------------|------------|---------|-------------|
| Konserwatywny | 100 | 2% | 2 | 20 PLN |
| Bazowy | 500 | 3% | 15 | 150 PLN |
| Optymistyczny | 1000 | 5% | 50 | 500 PLN |

**Lifetime (99 PLN):**
- Przy 10 sprzedażach = 990 PLN jednorazowo
- Nie wymaga recurring revenue

---

### Koszty

| Koszt | Cena |
|-------|------|
| Supabase Free Tier | 0 PLN (do 500MB, 2GB transfer) |
| Vercel Hobby | 0 PLN |
| Domena | ~50 PLN/rok |
| **Margines** | **100%** (poza czasem Twojej pracy) |

---

## Tech Stack

### Frontend
- **React** (Vite) – szybki start, popularny
- **Tailwind CSS** – stylowanie
- **Shadcn UI** – gotowe komponenty (Button, Card, Input, etc.)
- **Zustand** – state management

### Backend
- **Supabase** – Auth + PostgreSQL + Hosting
- Dlaczego: darmowy tier, proste API, integracja z React

### Narzędzia
- **Figma** (darmowa) – do prototypu UI
- **GitHub** – kod
- **Vercel** – deployment

---

## Go-To-Market (GTM)

### Phase 1: TikTok + Instagram Reels (0 PLN)

**Content Strategy:**
- "Prowadzę sesję shadow work na aplikacji" – ASMR vibes, screen recording
- "Moje pytanie na dziś..." – nagranie ekranu z pytaniem
- "Jak wybrać nastrój w apce" – tutorial 15s
- "7 dni z moim lękiem – dzień 1" – vlog z sesji

**Hasztagi:**
- #shadowwork
- #introspection
- #selfcare
- #journaling
- #psychologiatiktok
- #mentalhealth
- #softlife

**Posting:** 3-5x tygodniowo przez 1 miesiąc
**Cel:** 10,000 wyświetleń → 100 pobrań → 3 płacących

---

### Phase 2: Reddit + Grupy Facebook

**Subreddity:**
- r/Journaling
- r/ShadowWork
- r/psychology
- r/Polska (jeśli po polsku)

**Post:**
> "Stworzyłam aplikację do shadow work – darmowa wersja dostępna. Zamiast 30 minut gapienia się w pustą stronę, dostajesz konkretne pytanie dopasowane do nastroju. Jestem ciekawa feedbacku!"

---

### Phase 3: Product Hunt

**Kiedy:** Po MVP (1.0)  
**Cel:** Wiral + feedback + social proof

**Pitch:**
- "Introsphere – guided journaling for people who don't know what to write"
- Screenshot z aplikacji
- Link do demo

---

### Phase 4: Influencer Marketing (opcjonalne)

**Po osiągnięciu 100 płacących:**
- Micro-influencerzy na TikToku (5-20k followersów)
- Wymiana: darmowy Lifetime access
- Post: "Ta apka zmieniła mój poranny rytuał"

---

## Timeline MVP

| Tydzień | Zadanie |
|---------|---------|
| 1 | Setup projektu + UI components |
| 2 | Logika: wybór nastroju + pytania |
| 3 | Formularz + zapis do Supabase |
| 4 | Historia + kalendarz |
| 5 | Testy + bugfix + deploy |

**15 godzin = ~3-4 tygodnie pracy (3-4h/tydzień)**

---

## Ryzyka i Mitigacje

| Ryzyko | Mitigation |
|--------|------------|
| Nie znajdziesz użytkowników | TikTok organic – darmowe, może wypalić |
| Za trudne technicznie | Supabase = proste, Shadcn = gotowe |
| Konkurencja zrobi to samo | First-mover advantage w tej niszy |
| Gen Z nie płaci | Lifetime deal = szybki cash flow |
| Conversion rate niski | Free ma wszystko = musi zobaczyć wartość |

---

## Metryki do śledzenia

| Metryka | Cel | Kiedy alarm |
|---------|-----|-------------|
| **Conversion rate** | >5% | Jeśli <2% → problem |
| **CAC (koszt pozyskania)** | <20 PLN | Jeśli >50 PLN → nie opłaca się |
| **Retention miesiąc 1** | >30% | Jeśli <20% → produkt nie wciąga |
| **Support tickets** | <5/tydzień | Jeśli >20 → Support Trap realny |
| **Sesji/tydzień** | >2 | Jeśli <1 → użytkownicy nie wracają |

---

## Następne Kroki

1. ✅ Potwierdź że idea + plan są OK
2. ⏳ Setup React + Tailwind
3. ⏳ Stwórz komponenty Shadcn
4. ⏳ Zaimplementuj MVP
5. ⏳ Uruchom na TikTok
6. ⏳ Mierz metryki

---

## Pytanie do przemyślenia

Czy shadow work to "trend" (przejdzie) czy "stała potrzeba" (zostanie)?

- Jeśli trend → szybki exit strategy
- Jeśli stała → gra o długoterminowy biznes
