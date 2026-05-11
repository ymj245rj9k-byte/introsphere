# CalendarEntry Component - 2026-04-20

## 1. Cel
Stworzenie komponentu dialogu ze szczegółami wpisu nastroju. Wyświetlany po kliknięciu dnia w kalendarzu z kolorowym wpisem.

## 2. Zakres
**W zakresie:**
- `src/components/calendar/CalendarEntry.tsx` — dialog ze szczegółami wpisu (emocja, data, treść)

**Poza zakresem:**
- Edycja wpisu
- Animacje

## 3. Wymagania funkcjonalne
- Props: `entry: MoodEntry`, `onClose: () => void`
- Wyświetla: datę, nazwę emocji, treść odpowiedzi
- Przycisk zamknięcia

## 4. Wymagania niefunkcjonalne
- **Wydajność:** brak zapytań w komponencie – dane przez props
- **Bezpieczeństwo:** wyświetla tylko dane przekazane przez rodzica (już przefiltrowane per user)
- **UX:** modal z focus trap, zamknięcie przez Escape lub kliknięcie overlay

## 5. Kontekst techniczny
- **Komponenty:** używany przez `MoodCalendar.tsx`; korzysta z `dialog.tsx` Shadcn
- **API:** brak
- **Dane:** `MoodEntry` z `calendar_entries` (przez `useCalendar`)

## 6. Kroki implementacji
1. Utwórz `CalendarEntry.tsx` — dialog ze strukturą: nagłówek (data + emocja) + treść + przycisk zamknięcia
2. Eksportuj z `components/calendar/index.ts`

## 7. Kryteria akceptacji
- Dialog wyświetla poprawne dane wpisu
- Zamknięcie przez przycisk lub Escape
- `npm run build` bez błędów

## 8. Testy
- **Unit:** brak
- **Integracyjne:** `npm run build` bez błędów; ręczny test: klik dnia w kalendarzu → dialog z danymi wpisu

---
*Status: [x] Zaimplementowany*
