# New Entry – Data Layer - 2026-05-08

## 1. Cel
Implementacja warstwy danych dla szybkiego wpisu bez wyboru emocji (Quick Entry). Użytkownik może dodać notatki tekstowe bez przechodzenia przez pełną sesję emocjonalną.

## 2. Zakres
**W zakresie:**
- Zapis wpisu do `calendar_entries` z `emotion_id = null`
- Potwierdzenie, że kolumna `emotion_id` jest nullable w schemacie DB
- Redirect do `/home` po sukcesie

**Poza zakresem:**
- Przycisk Quick Entry na Home (osobny plan: `PLAN_home-page-quick-action-button`)
- Formularz Quick Entry (osobny plan: `PLAN_quick-entry-form-component`)
- Wyświetlanie quick entries w kalendarzu i historii (kolejne plany)

## 3. Wymagania funkcjonalne
- `saveQuickEntry(text, userId)` zapisuje do `calendar_entries` z `emotion_id = null`
- Po sukcesie: redirect do `/home`
- `calendar_entries.emotion_id` musi być nullable (weryfikacja schematu)

## 4. Wymagania niefunkcjonalne
- **Wydajność:** pojedyncze zapytanie INSERT
- **Bezpieczeństwo:** `user_id` pobierany z `authStore` – nie z inputu użytkownika
- **UX:** brak – warstwa danych, UX w planie formularza

## 5. Kontekst techniczny
- **Komponenty:** `lib/database.ts` — nowa lub rozszerzona funkcja zapisu
- **API:** `supabase.from('calendar_entries').insert({ user_id, text, emotion_id: null, created_at })`
- **Dane:** tabela `calendar_entries`, kolumna `emotion_id` nullable

## 6. Kroki implementacji
1. Zweryfikuj schemat Supabase — `emotion_id` nullable (√ już nullable)
2. Dodaj/zaktualizuj funkcję zapisu w `lib/database.ts` obsługującą `emotion_id = null`
3. Formularz `QuickEntry.tsx` wywołuje tę funkcję po submit

## 7. Kryteria akceptacji
- Wpis z `emotion_id = null` pojawia się w `calendar_entries`
- Po sukcesie następuje redirect do `/home`
- `npm run build` bez błędów

## 8. Testy
- **Unit:** brak
- **Integracyjne:** `npm run lint && npm run build` bez błędów; ręczny test: wyślij formularz Quick Entry → wpis w DB z `emotion_id = null` → redirect do `/home`

---
*Status: [x] Zaimplementowany*
