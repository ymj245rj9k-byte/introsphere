# Introsphere

Journaling dla Gen Z. Wybierz nastrój, odpowiedz na pytanie, zobacz wzorce swoich emocji.

## Tech Stack

- **Frontend:** React 18 + Vite
- **Styling:** Tailwind CSS + Shadcn UI
- **State:** Zustand
- **Backend:** Supabase (PostgreSQL + Auth)
- **Routing:** React Router v6

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Copy environment variables
cp .env.example .env

# Fill in your Supabase credentials in .env file

# Start development server
npm run dev
```

### Environment Variables

Create a `.env` file with the following variables:

```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── ui/             # Shadcn base components
│   ├── layout/         # Layout components
│   ├── emotion-wheel/  # Emotion wheel components
│   ├── journey/        # Journey components
│   ├── calendar/       # Calendar components
│   └── common/         # Shared components
├── pages/              # Page components (routes)
├── lib/                # Core utilities
├── hooks/              # Custom React hooks
├── stores/             # Zustand stores
├── types/              # TypeScript definitions
├── data/               # Static data
└── constants/          # App constants
```

## Features

- 🎨 Koło emocji z 8 podstawowymi emocjami + 24 wariantami
- 📚 6 Guided Journeys × 7 dni = 42 unikalne pytania
- 📅 Kalendarz nastrojów
- 📝 Historia sesji
- 🎭 5 atmosfer wizualnych (Dark Aesthetic)

## License

MIT
