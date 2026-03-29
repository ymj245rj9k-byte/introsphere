# Introsphere - UI/UX Themes & Atmosphere

## Spis Treści
1. [System Motywów (Theme)](#1-system-motywów-theme)
2. [System Atmosfery (Skin)](#2-system-atmosfery-skin)

---

## 1. System Motywów (Theme)

Motywy (jasny/ciemny) są zdefiniowane w [`index.css`](../app/src/index.css) jako CSS custom properties w sekcji `:root` i `.dark`.

### 1.1 Theme Toggle

```
Pozycja: Prawa górna, w pasku header
Ikona: Słońce (☀️) / Księżyc (🌙)

Zachowanie:
- Smooth transition: 0.3s ease-in-out
- Ikona rotate 180° przy przejściu
- Preferencja zapisana w localStorage
- Opcja "System" = follow system preference
```

---

## 2. System Atmosfery (Skin)

### 2.1 Definicja

**Atmosphere** = personalizacja wyglądu aplikacji poza trybem jasny/ciemny. Obejmuje:
- Kolorystykę elementów UI (akcenty)
- Czcionkę (font family)
- Zaokrąglenia (border radius)
- Intensywność cieni

### 2.2 Domyślne Atmosfery
| **Nazwa** | **Paleta** | **Typografia** | **Styl wizualny** |
|---|---|---|---|
| **Cream Calm** | Kremowy (#faf7f2), ciepły beż (#e8ddd0), złamana biel, akcenty nude | Plus Jakarta Sans — lekki, geometryczny | Brak cieni i dekoracji. Karty z 0.5px ramką. Duże odstępy między sekcjami. Śledzenie nastroju jako rząd geometrycznych kółek. |
| **Green Forest** | Mech (#4a6741), szałwia (#8aab7e), ciepły brąz (#6b4c2a), kremowy papier (#f5f0e8) | Caveat (nagłówki), Lora (body) | Tekstura tła imitująca papier akwarelowy. Ikonografia botaniczna — cienkie ilustracje liści. Śledzenie nastroju jako rosnąca roślina. |
| **Dark Ink** | Granat (#1a1f3a), pergamin (#f5eed6), antyczne złoto (#c9a063) | Playfair Display Italic (nagłówki), EB Garamond (body) | Tekstura pergaminu w tle. Nawigacja stylizowana na zakładki księgi. Złote linie jako separatory. Nastroje jako symbole alchemiczne. |
| **Soft Pink** | Pudrowy róż (#f2dde4), mglisty błękit (#dde8f2), lawenda (#e8ddf2), ciepła biel | Instrument Serif Italic (nagłówki), DM Sans (body) | Dekoracje wektorowe — kokardki i kwiaty jako separatory. Nastroje jako pastelowe bąble z opisami. Zaokrąglone karty z dużym paddingiem. |
| **Silver Tech** | Grafit (#0f0f13), srebro (#c0c0c8), turkus (#00d4aa) jako akcent | JetBrains Mono (body, tagi), Geist (nagłówki) | Ostre krawędzie, zero border-radius. Nastrój jako badge (`mood: anxious`). Streak jako siatka w stylu GitHub contribution graph. |
| **Vintage Noir** | Czerń (#0c0c0c), złoto (#c9a84c), ecru (#f5f0e0), bordeaux (#6b1f2a) | Cormorant Garamond (nagłówki), Libre Baskerville (body) | Cienkie złote linie i symetryczne ornamenty art deco. Wysoki kontrast tekstu. Duże, dramatyczne nagłówki z dużym letter-spacing. |
| **Desert Rose** | Terakota (#c4714a), piasek (#d4b896), brudny róż (#c4907a), kakao (#6b3d2a) | Abril Fatface (nagłówki), Lora (body) | Tekstura tła imitująca glinę. Śledzenie nastroju jako koła w gradiencie terakoty — intensywność przez nasycenie koloru. |
| **Ocean Deep** | Granat (#0d2137), morska zieleń (#1a4a4a), stalowy błękit (#2a4a6b), turkus (#00b4d8) | Newsreader Italic (nagłówki), Inter (body) | Gradient tła pogłębiający się ku dołowi. Śledzenie nastroju jako skala głębokości. Miękkie, duże border-radius na kartach. |

### 2.3 Implementacja

> **Źródło prawdy:** Wszystkie kolory i style atmosfer są zdefiniowane w [`index.css`](../app/src/index.css) jako CSS custom properties.
>
> Każdy atmosfera ma klasę `.atmosphere-{nazwa}` z wariantami dla trybu jasnego i ciemnego (`.dark.atmosphere-{nazwa}`).
>
> **Przykład użycia:**
> ```css
> .atmosphere-cream-calm {
>   --atmosphere-bg: #FAF8F5;
>   --atmosphere-accent: #D4C5B5;
>   --atmosphere-font: 'Inter', sans-serif;
>   --atmosphere-radius: 24px;
> }
> ```
>
> **Dostępne atmosfery:** Cream Calm, Green Forest, Dark Ink, Soft Pink, Silver Tech, Vintage Noir, Desert Rose, Ocean Deep

### 2.4 UI Wyboru Atmosfery

```
Lokalizacja: Prawa góra, obok login/theme
Ikona: 🎨 (palette)

Po kliknięciu → Dropdown/Panel:
┌─────────────────────────────┐
│  🎨 Wybierz Atmosferę       │
├─────────────────────────────┤
│  🟠 Cream Calm              │
│  🌿 Green Forest            │
│  🖋️ Dark Ink                │
│  🌸 Soft Pink               │
│  ⚙️ Silver Tech             │
│  🎭 Vintage Noir            │
│  🏜️ Desert Rose             │
│  🌊 Ocean Deep              │
└─────────────────────────────┘

Zachowanie:
- Mini preview przy hover
- Klik = natychmiastowa zmiana
- Zapis w localStorage
- Tylko dla zalogowanych (Premium feature option)
```

---

*Document version 1.0 | 2026-03-22*
