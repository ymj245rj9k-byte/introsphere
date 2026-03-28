import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'

export function Landing() {
  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-6">
      <div className="max-w-md text-center space-y-8">
        {/* Logo/Title */}
        <div className="space-y-4">
          <h1 className="text-5xl font-bold tracking-tight text-foreground">
            Introsphere
          </h1>
          <p className="text-lg text-muted-foreground">
            Zamiast 30 minut przed pustą stroną – wybierasz nastrój, odpowiadasz na pytanie i od razu widzisz wzorce swoich emocji.
          </p>
        </div>

        {/* CTA Buttons */}
        <div className="space-y-4">
          <Link to="/session" className="block">
            <Button size="lg" className="w-full pulse">
              Rozpocznij sesję
            </Button>
          </Link>
          <Link to="/auth" className="block">
            <Button variant="outline" size="lg" className="w-full">
              Zaloguj się
            </Button>
          </Link>
        </div>

        {/* Features */}
        <div className="pt-8 space-y-4 text-left">
          <div className="flex items-start gap-3">
            <div className="w-2 h-2 mt-2 rounded-full bg-primary" />
            <p className="text-sm text-muted-foreground">
              <strong className="text-foreground">Koło emocji</strong> – dotknij koloru, nie musisz umieć nazywać
            </p>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-2 h-2 mt-2 rounded-full bg-primary" />
            <p className="text-sm text-muted-foreground">
              <strong className="text-foreground">Guided Journeys</strong> – 7-dniowe programy z konkretnymi pytaniami
            </p>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-2 h-2 mt-2 rounded-full bg-primary" />
            <p className="text-sm text-muted-foreground">
              <strong className="text-foreground">Kalendarz nastrojów</strong> – zobacz wzorce w czasie
            </p>
          </div>
        </div>

        {/* Disclaimer */}
        <p className="text-xs text-muted-foreground pt-4">
          To nie jest terapia. To narzędzie do samorefleksji.
        </p>
      </div>
    </div>
  )
}
