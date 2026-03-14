# Strategia Monetyzacji + Tech Stack + GTM

## Monetyzacja

### Model: Freemium + Premium Rewards

| Poziom | Funkcje | Cena |
|--------|---------|------|
| **Free** | Wszystkie moody z koła + 5 atmosfer + pełny kalendarz | 0 zł |
| **Rewards** | Po 10 sesjach: odblokuj nowe UI/atmosfery | 0 zł |
| **Premium** | Natychmiastowy dostęp do wszystkich nowych UI + eksport PDF | 9.99 zł/mc |
| **Lifetime** | Wszystko na zawsze | 99 zł |

### Szczegóły:
- **Free:** Koło emocji (6 podstawowych + precyzacja), 5 atmosfer, pełny kalendarz
- **Rewards:** Używaj często = odblokuj nowe atmosfery (retro, vintage, pastel, etc.)
- **Premium:** Nie czekaj - odblokuj wszystko od razu + eksport PDF

### Why This Works
- Free daje "spróbuj zanim kupisz" - critical dla Gen Z
- 9.99 zł = cena kawy = low barrier to entry
- Lifetime = dla ludzi którzy "nie chcą subskrypcji" (też popularne w Gen Z)

### Koszty
- Firebase Free Tier: 0 zł (do 1GB, 100k reads/day)
- Vercel Hobby: 0 zł
- Domena: ~50 zł/rok
- **Margines:** 100% (poza czasem Twojej pracy)

---

## Tech Stack

### Frontend
- **React** (Vite) - szybki start, popularny
- **Tailwind CSS** - stylowanie (umiesz CSS więc łatwe)
- **Shadcn UI** - gotowe komponenty (Button, Card, Input, etc.)
- **Framer Motion** - proste animacje

### Backend
- **Firebase** - Auth + Firestore + Hosting
- Dlaczego: darmowy tier, proste API, integracja z React

### Narzędzia
- **Figma** (darmowa) - do prototypu UI
- **GitHub** - kod
- **Vercel** - deployment

### Alternatywa: Supabase
- Też darmowy tier
- Bardziej SQL-like (może być łatwiejsze dla Ciebie)
- Wg mnie Firebase jest bardziej "plug & play" dla React

---

## Go-To-Market (GTM)

### Phase 1: TikTok + Instagram Reels (0 zł)

**Content Strategy:**
- "Prowadzę sesję shadow work na aplikacji" - ASMR vibes
- "Moje pytanie na dziś..." - nagranie ekranu
- "Jak wybrać nastrój w apce" - tutorial 15s

**Hasztagi:**
- #shadowwork
- #introspection
- #selfcare
- #journaling
- #psychologiatiktok
- #mentalhealth

**Posting:** 3-5x tygodniowo przez 1 miesiąc

### Phase 2: Reddit + Grupy Facebook

**Subreddity:**
- r/Journaling
- r/ShadowWork
- r/psychology
- r/Polska (jeśli po polsku)

**Post:** "Stworzyłam aplikację do shadow work - darmowa wersja dostępna"

### Phase 3: Product Hunt

Kiedy będziesz miała MVP (1.0):
- Pitch na Product Hunt
- Wartość: wiral + feedback

---

## Timeline MVP

| Tydzień | Zadanie |
|---------|---------|
| 1 | Setup projektu + UI components |
| 2 | Logika: wybór nastroju + pytania |
| 3 | Formularz + zapis do Firebase |
| 4 | Historia + kalendarz |
| 5 | Testy + bugfix + deploy |

**15 godzin = ~3-4 tygodnie pracy (3-4h/tydzień)**

---

## Ryzyka i Mitigacje

| Ryzyko | Mitigation |
|--------|------------|
| Nie znajdziesz użytkowników | TikTok organic - darmowe, może wypalić |
| Za trudne technicznie | Firebase = proste, Shadcn = gotowe |
| Konkurencja zrobi to samo | First-mover advantage w tej niszy |
| Płatności trudne | Stripe (może później), na start free足够 |

---

## Następne Kroki

1. ✅ Potwierdź że idea + plan są OK
2. ⏳ Setup React + Tailwind
3. ⏳ Stwórz komponenty Shadcn
4. ⏳ Zaimplementuj MVP

**Pytanie: Jesteś zadowolona z tego planu? Chcesz coś zmienić?**
