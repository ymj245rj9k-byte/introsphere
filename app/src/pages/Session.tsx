import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

export function Session() {
  const navigate = useNavigate()
  const [step, setStep] = useState<'mode' | 'emotion' | 'question' | 'response'>('mode')

  return (
    <div className="p-6 space-y-6">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold">Nowa sesja</h1>
        <p className="text-muted-foreground">
          {step === 'mode' && 'Wybierz tryb sesji'}
          {step === 'emotion' && 'Jak się czujesz?'}
          {step === 'question' && 'Odpowiedz na pytanie'}
          {step === 'response' && 'Zapisz swoją odpowiedź'}
        </p>
      </div>

      {step === 'mode' && (
        <div className="grid gap-4">
          <Card className="cursor-pointer hover:border-primary transition-colors" onClick={() => setStep('emotion')}>
            <CardHeader>
              <CardTitle>Jednorazowa sesja</CardTitle>
              <CardDescription>
                Wybierz nastrój i odpowiedz na jedno pytanie
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="cursor-pointer hover:border-primary transition-colors" onClick={() => navigate('/home')}>
            <CardHeader>
              <CardTitle>Guided Journey</CardTitle>
              <CardDescription>
                7-dniowy program z konkretnymi pytaniami
              </CardDescription>
            </CardHeader>
          </Card>
        </div>
      )}

      {step === 'emotion' && (
        <div className="space-y-6">
          <div className="text-center py-12">
            <p className="text-muted-foreground mb-4">
              Koło emocji będzie tutaj
            </p>
            <Button onClick={() => setStep('question')}>
              Kontynuuj (demo)
            </Button>
          </div>
        </div>
      )}

      {step === 'question' && (
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Pytanie na dziś</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-lg">
                Co sprawiło, że poczułeś się dzisiaj w ten sposób?
              </p>
            </CardContent>
          </Card>
          <Button onClick={() => setStep('response')} className="w-full">
            Odpowiedz
          </Button>
        </div>
      )}

      {step === 'response' && (
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Twoja odpowiedź</CardTitle>
            </CardHeader>
            <CardContent>
              <textarea
                className="w-full min-h-[200px] p-4 rounded-md border border-input bg-background text-sm"
                placeholder="Nie ma złych odpowiedzi. Pisz, co czujesz..."
              />
            </CardContent>
          </Card>
          <Button onClick={() => navigate('/home')} className="w-full">
            Zapisz
          </Button>
        </div>
      )}
    </div>
  )
}
