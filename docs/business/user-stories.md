# User Stories – Introsphere

## Legenda

- **Priorytet:** P0 (krytyczny) → P1 (ważny) → P2 (mile widziany)
- **Status:** ✅ Zaimplementowane | 🔄 W toku | ⬜ Planowane

---

## Autentykacja i Onboarding

### US-01: Rejestracja
> Jako **nowy użytkownik**, chcę **założyć konto email + hasło**, żeby **moje wpisy były zapisane i dostępne na różnych urządzeniach**.

- **Priorytet:** P0 | **Status:** ✅
- **Kryteria akceptacji:**
  - Formularz rejestracji z walidacją email i hasła
  - Po rejestracji redirect do onboardingu
  - Błąd gdy email już istnieje

### US-02: Logowanie
> Jako **powracający użytkownik**, chcę **zalogować się na swoje konto**, żeby **mieć dostęp do historii moich wpisów**.

- **Priorytet:** P0 | **Status:** ✅
- **Kryteria akceptacji:**
  - Formularz logowania email + hasło
  - Po zalogowaniu redirect do `/home`
  - Błąd przy złych danych

### US-03: Onboarding
> Jako **nowo zarejestrowany użytkownik**, chcę **przejść przez krótkie wprowadzenie**, żeby **zrozumieć jak korzystać z aplikacji przed pierwszą sesją**.

- **Priorytet:** P1 | **Status:** ✅
- **Kryteria akceptacji:**
  - 3 kroki z paskiem postępu
  - Możliwość pominięcia lub przejścia dalej
  - Po ukończeniu redirect do `/home`

---

## Sesja Emocjonalna

### US-04: Wybór emocji z koła
> Jako **użytkownik**, chcę **wybrać nastrój klikając sektor na kole emocji**, żeby **nie musieć samodzielnie wymyślać słowa na to, co czuję**.

- **Priorytet:** P0 | **Status:** ✅
- **Kryteria akceptacji:**
  - 8 sektorów widocznych na kole
  - Kliknięcie otwiera modal z podspektrami
  - Możliwość zostania przy emocji L3 lub wyboru L2/L1

### US-05: Precyzowanie emocji
> Jako **użytkownik**, chcę **doprecyzować swoją emocję** (np. smutek → tęsknota), żeby **dostać pytanie lepiej dopasowane do mojego stanu**.

- **Priorytet:** P1 | **Status:** ✅
- **Kryteria akceptacji:**
  - Modal EmotionDetails pokazuje podspektry dla wybranej emocji
  - Można wybrać podspektrum lub zostać przy emocji ogólnej

### US-06: Odpowiedź na pytanie
> Jako **użytkownik**, chcę **otrzymać konkretne pytanie i wpisać odpowiedź**, żeby **nie stać przed pustą stroną i móc przetworzyć swoje emocje**.

- **Priorytet:** P0 | **Status:** ✅
- **Kryteria akceptacji:**
  - Pytanie dopasowane do wybranej emocji
  - Textarea do wpisania odpowiedzi
  - Przycisk Zapisz nieaktywny przy pustym polu
  - Po zapisaniu redirect do `/home`

---

## Guided Journeys

### US-07: Przeglądanie dostępnych Journey
> Jako **użytkownik**, chcę **zobaczyć listę 7-dniowych programów**, żeby **wybrać journey pasujący do moich potrzeb**.

- **Priorytet:** P0 | **Status:** ✅
- **Kryteria akceptacji:**
  - Lista 6 journey z ikoną, tytułem i opisem
  - Widoczny postęp dla każdego journey (n/7 dni)

### US-08: Realizacja dnia Journey
> Jako **użytkownik pracujący nad konkretnym programem**, chcę **codziennie odpowiadać na pytanie z journey**, żeby **systematycznie pracować nad wybranym tematem przez 7 dni**.

- **Priorytet:** P0 | **Status:** ✅
- **Kryteria akceptacji:**
  - Widok dnia z pytaniem i textarea
  - Po zapisaniu redirect do overview z zaktualizowanym postępem
  - Postęp zachowany po odświeżeniu strony

### US-09: Kontynuacja Journey
> Jako **użytkownik w trakcie journey**, chcę **zobaczyć gdzie jestem i przejść do następnego dnia**, żeby **nie zgubić postępu**.

- **Priorytet:** P0 | **Status:** ✅
- **Kryteria akceptacji:**
  - Przycisk „Continue day N" prowadzi do właściwego dnia
  - Pasek postępu (JourneyProgress) odzwierciedla ukończone dni
  - Postęp synchronizowany z bazą danych

---

## Kalendarz Nastrojów

### US-10: Przeglądanie kalendarza
> Jako **użytkownik**, chcę **widzieć kolorowy kalendarz swoich nastrojów**, żeby **rozpoznawać wzorce emocjonalne w czasie**.

- **Priorytet:** P1 | **Status:** ✅
- **Kryteria akceptacji:**
  - Siatka miesięczna z kolorowymi dniami
  - Kolor dnia odpowiada emocji z wpisu
  - Nawigacja prev/next month

### US-11: Szczegóły wpisu z kalendarza
> Jako **użytkownik**, chcę **kliknąć dzień w kalendarzu i zobaczyć szczegóły wpisu**, żeby **móc przeczytać co pisałam w danym dniu**.

- **Priorytet:** P1 | **Status:** ✅
- **Kryteria akceptacji:**
  - Kliknięcie kolorowego dnia otwiera dialog ze szczegółami
  - Widoczna: data, emocja, treść odpowiedzi

### US-12: Usunięcie wpisu
> Jako **użytkownik**, chcę **usunąć błędny lub niechciany wpis**, żeby **moja historia była dokładna**.

- **Priorytet:** P1 | **Status:** ✅
- **Kryteria akceptacji:**
  - Przycisk „Usuń" w dialogu szczegółów wpisu
  - Dialog potwierdzenia przed usunięciem
  - Wpis znika z kalendarza i historii po potwierdzeniu

---

## Historia Wpisów

### US-13: Lista wpisów
> Jako **użytkownik**, chcę **widzieć listę wszystkich swoich wpisów od najnowszych**, żeby **móc przeglądać swoją historię refleksji**.

- **Priorytet:** P1 | **Status:** ✅
- **Kryteria akceptacji:**
  - Wpisy posortowane od najnowszego
  - Widoczna data, emocja (lub brak), fragment treści
  - Pusty stan gdy brak wpisów

### US-14: Filtrowanie historii
> Jako **użytkownik**, chcę **filtrować wpisy po emocji lub journey**, żeby **szybko znaleźć wpisy z konkretnego tematu**.

- **Priorytet:** P1 | **Status:** ✅
- **Kryteria akceptacji:**
  - Dropdown z 32 emocjami (EN)
  - Dropdown z 6 journey (EN)
  - Przycisk Clear resetuje filtry

---

## Quick Entry

### US-15: Szybki wpis bez emocji
> Jako **użytkownik**, chcę **zapisać myśl bez wyboru emocji**, żeby **nie tracić czasu na koło emocji gdy po prostu chcę coś zapisać**.

- **Priorytet:** P1 | **Status:** 🔄 (zapis działa; wyświetlanie w kalendarzu/historii – w toku)
- **Kryteria akceptacji:**
  - Przycisk „Quick Entry" na Home page
  - Prosty formularz: textarea + Zapisz
  - Po zapisaniu redirect do `/home`
  - ⬜ Wpis widoczny w kalendarzu i historii (planowane)

---

## Personalizacja

### US-16: Zmiana atmosfery
> Jako **użytkownik**, chcę **wybrać motyw wizualny aplikacji**, żeby **korzystać z niej w klimacie, który mi odpowiada**.

- **Priorytet:** P2 | **Status:** ✅
- **Kryteria akceptacji:**
  - 8 motywów do wyboru w Ustawieniach
  - Zmiana natychmiastowa (live preview)
  - Wybór zachowany po odświeżeniu (Zustand persist)
  - Dostępne dla wszystkich (free i premium)

---

## Premium (Planowane)

### US-17: Pełny kalendarz historyczny ⬜
> Jako **użytkownik Premium**, chcę **widzieć kalendarz z wpisami ze wszystkich miesięcy**, żeby **analizować długoterminowe wzorce emocjonalne**.

- **Priorytet:** P2 | **Status:** ⬜
- **Kryteria akceptacji:**
  - Nawigacja do dowolnego miesiąca wstecz
  - Free: tylko bieżący miesiąc

### US-18: Eksport do PDF ⬜
> Jako **użytkownik Premium**, chcę **wyeksportować swoje wpisy do PDF**, żeby **mieć lokalną kopię lub podzielić się z terapeutą**.

- **Priorytet:** P2 | **Status:** ⬜

---

## Podsumowanie

| Status | Liczba |
|--------|--------|
| ✅ Zaimplementowane | 15 |
| 🔄 W toku (częściowo) | 1 |
| ⬜ Planowane | 2 |
| **Łącznie** | **18** |
