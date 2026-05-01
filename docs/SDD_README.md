# Spec Driven Development (SDD) – Introsphere

## Przegląd

Ten projekt stosuje podejście **Spec Driven Development (SDD)**, w którym specyfikacja poprzedza implementację, a każda funkcjonalność ma jawny, wersjonowany opis w repozytorium.

## Założenia SDD

- **Specyfikacja przed implementacją** – Plan zawsze przed kodem
- **Jawny, wersjonowany opis** – Każda zmiana dokumentowana
- **Deterministyczna generacja AI** – Implementacja wspierana przez agentów
- **Single Source of Truth** – Repozytorium jako jedno źródło prawdy

## Cel

- Skalowalność pracy zespołu
- Powtarzalność procesu deweloperskiego
- Audytowalność decyzji
- Możliwość delegowania pracy do agentów AI

## Struktura Katalogów

```
.
├── docs/                      # Dokumentacja SDD
│   ├── architecture/          # Architektura techniczna
│   │   ├── index.md
│   │   └── technical.md
│   ├── business/              # Aspekty biznesowe
│   │   ├── index.md
│   │   ├── project-description.md
│   │   ├── icp-persona.md
│   │   └── ...
│   ├── tech/                  # Technologie i stack
│   ├── plans/                 # Plany i specyfikacje
│   │   ├── index.md
│   │   ├── emotions-structure.md
│   │   ├── journeys.md
│   │   └── ...
│   └── roles/                 # Role zespołu
│       ├── product_owner/
│       ├── ux_ui/
│       ├── architect/
│       ├── developer/
│       └── tester/
│
├── app/                       # Kod źródłowy aplikacji
│   └── src/
│       ├── components/        # Komponenty UI
│       ├── pages/             # Strony (routing)
│       ├── lib/               # Narzędzia core
│       ├── hooks/             # Custom hooks
│       ├── stores/            # Zustand stores
│       ├── types/             # Typy TypeScript
│       ├── data/              # Dane statyczne
│       └── constants/         # Stałe
│
├── implemented_features.md    # Lista zaimplementowanych funkcji
├── implemented_plans.md       # Historia wdrożeń
└── README.md                  # Główny README projektu
```

## Przepływ Pracy (Workflow)

### 1. Specyfikacja

Każda nowa funkcjonalność zaczyna się od opisu w `docs/`:

- **Business**: Po co to robimy? (product-owner)
- **Plans**: Co dokładnie robimy? (architect, ux-ui)
- **Architecture**: Jak to zrobimy? (architect)

### 2. Implementacja

- Kod w `app/src/` zgodnie ze specyfikacją
- Commity z odniesieniem do planu
- Tests i typecheck przed merge

### 3. Wdrożenie

- Dokumentacja w `implemented_plans.md`
- Tag wersji w plikach
- Review i merge

## Konwencje Nazewnictwa

- **Katalogi**: `kebab-case` (np. `emotion-wheel`, `journey-card`)
- **Pliki komponentów**: `PascalCase.tsx` (np. `EmotionWheel.tsx`)
- **Pliki hooków**: `useNazwa.ts` (np. `useJourney.ts`)
- **Pliki store**: `nazwaStore.ts` (np. `authStore.ts`)

## Rola AI Agentów

Każdy agent operuje w swoim katalogu:

- `docs/roles/product_owner/` – Decyzje biznesowe
- `docs/roles/ux_ui/` – Design i UX
- `docs/roles/architect/` – Architektura
- `docs/roles/developer/` – Implementacja
- `docs/roles/tester/` – Jakość

## Ważne Dokumenty

- [SDD README](./SDD_README.md) – Ten plik
- [implemented_features.md](./implemented_features.md) – Zaimplementowane funkcje
- [implemented_plans.md](./implemented_plans.md) – Historia wdrożeń
- [docs/architecture/technical.md](./docs/architecture/technical.md) – Architektura
- [docs/business/project-description.md](./docs/business/project-description.md) – Opis projektu

## Status

- V1.0.0 (2026-04-20): MVP – typy, dane, strony, komponenty bazowe
- V1.1.0 (2026-04-28): Poprawki UX dla journeys (w toku)
