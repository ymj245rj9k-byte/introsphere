import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

export function Home() {
  return (
    <div className="p-6 space-y-6">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold">Witaj w Introsphere</h1>
        <p className="text-muted-foreground">
          Gotowy na dzisiejszą sesję?
        </p>
      </div>

      <div className="grid gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Szybka sesja</CardTitle>
            <CardDescription>
              Wybierz nastrój i odpowiedz na jedno pytanie
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Link to="/session">
              <Button className="w-full">Rozpocznij</Button>
            </Link>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Guided Journeys</CardTitle>
            <CardDescription>
              7-dniowe programy z konkretnymi pytaniami
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Link to="/home">
              <Button variant="outline" className="w-full">
                Przeglądaj journey
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>

      {/* Stats placeholder */}
      <div className="pt-4">
        <h2 className="text-lg font-semibold mb-3">Twoje statystyki</h2>
        <div className="grid grid-cols-2 gap-4">
          <Card>
            <CardContent className="pt-6">
              <div className="text-3xl font-bold">0</div>
              <p className="text-xs text-muted-foreground">Sesji w tym tygodniu</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="text-3xl font-bold">0</div>
              <p className="text-xs text-muted-foreground">Dni z rzędu</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
