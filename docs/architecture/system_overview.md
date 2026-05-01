# System Overview – Introsphere

## 1. Executive Summary

**Introsphere** to webowa aplikacja typu journaling dla Gen Z (18–28 lat), zaprojektowana jako PWA (Progressive Web App). Aplikacja pomaga użytkownikom śledzić, analizować i rozumieć swoje emocje poprzez codzienne sesje refleksji, 7-dniowe programy (journeys) oraz interaktywne koło emocji. Cel biznesowy: budowa przyjaznej przestrzeni do pracy z emocjami z wykorzystaniem estetyki "dark & calm" i micro-interakcji.

## 2. High-Level Architecture

```
┌─────────────────────┐
│   Client Devices    │  (Browser, Mobile Safari, Desktop)
│   - React SPA       │
│   - PWA manifest    │
└─────────┬───────────┘
          ▼
┌─────────────────────┐
│     Vercel Edge     │  CDN + Serverless Functions
│  - Static assets    │  - API Routes
│  - ISR/SSR          │  - Auth edge
└─────────┬───────────┘
          ▼
┌─────────────────────┐
│   Supabase (BaaS)   │  PostgreSQL + Auth + Storage + Edge
│  - Postgres DB      │  - Row Level Security (RLS)
│  - Auth (JWT/OAuth) │  - Realtime
│  - Storage (PDF)    │  - Functions (optional)
└─────────┬───────────┘
          ▼
┌─────────────────────┐
│   Data Layer        │
│  - Type-safe queries│  (Supabase client w/ TypeScript)
│  - Migrations       │  (Migracje schematu)
└─────────────────────┘
```

## 3. Core Capabilities

- **Emotion tracking**: Codzienne wpisy o nastroju (wybór emocji z koła 8×24 warianty)
- **Journeys**: 6 programów 7-dniowych (42 pytania w sumie) z progresją
- **Mood Calendar**: Kalendarz nastrojów z wizualizacją historyczną
- **Atmosphere system**: 5 motywów wizualnych (cream-calm, green-forest, dark-ink, soft-pink, silver-tech)
- **PDF Export**: Eksport sesji i podsumowań (Premium)
- **Auth & Profiles**: Logowanie i proste profile użytkownika

## 4. Non-Functional Requirements

- **Performance**: TTFB < 300ms (CDN), LCP < 1.2s na 4G
- **Availability**: 99.9% (Vercel + Supabase SLA)
- **Security**: RLS w Postgres, walidacja po stronie klienta i serwera, HTTPS w całości
- **Accessibility**: WCAG 2.1 AA (focus states, aria-labels, klawiatura)
- **Offline**: PWA cache dla statycznych zasobów i odczytu ostatnich wpisów

## 5. Key Decisions

- **JAMstack + BaaS** – szybszy time-to-market, brak utrzymywania serwerów
- **TypeScript strict** – bezpieczeństwo typów w całej aplikacji
- **Zustand + Context** – lekkie state management bez boilerplate
- **Shadcn UI** – spójny, dostosowywalny system komponentów
- **Supabase RLS** – bezpieczeństwo danych na poziomie bazy

## 6. Future Extensions

- Webhooki / integracje (np. Spotify, Apple Health)
- AI insights (OpenAI) do analizy wpisów
- Multi-language (i18n)
- Team / Sharing journeys