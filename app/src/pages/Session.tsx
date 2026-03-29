import { useState, useEffect, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { EmotionWheel } from '@/components/emotion-wheel'
import { Emotion } from '@/types/emotion'
import { getRandomQuestion } from '@/data/questions'

type SessionStep = 'emotion' | 'question'

interface SavedResponse {
  id: string
  emotionId: string
  emotionName: string
  emotionColor: string
  question: string
  response: string
  createdAt: string
}

export function Session() {
  const navigate = useNavigate()
  const [step, setStep] = useState<SessionStep>('emotion')
  const [selectedEmotion, setSelectedEmotion] = useState<Emotion | null>(null)
  const [question, setQuestion] = useState<string>('')
  const [response, setResponse] = useState<string>('')
  const [isSaving, setIsSaving] = useState(false)
  const [isSaved, setIsSaved] = useState(false)
  const [lastSaved, setLastSaved] = useState<Date | null>(null)

  // Auto-save to localStorage every 2 seconds after user stops typing
  const autoSave = useCallback(() => {
    if (!selectedEmotion || !question || !response.trim()) return

    const draftKey = 'introsphere_draft'
    const draft = {
      emotionId: selectedEmotion.id,
      emotionName: selectedEmotion.name_en,
      emotionColor: selectedEmotion.color,
      question,
      response,
      updatedAt: new Date().toISOString(),
    }
    localStorage.setItem(draftKey, JSON.stringify(draft))
    setLastSaved(new Date())
  }, [selectedEmotion, question, response])

  // Load draft on mount
  useEffect(() => {
    const draftKey = 'introsphere_draft'
    const savedDraft = localStorage.getItem(draftKey)
    if (savedDraft) {
      try {
        const draft = JSON.parse(savedDraft)
        setResponse(draft.response || '')
      } catch (e) {
        console.error('Failed to load draft:', e)
      }
    }
  }, [])

  // Auto-save effect
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      autoSave()
    }, 2000)

    return () => clearTimeout(timeoutId)
  }, [response, autoSave])

  const handleEmotionSelect = (emotion: Emotion) => {
    setSelectedEmotion(emotion)
    setQuestion(getRandomQuestion(emotion.id))
    setStep('question')
    setIsSaved(false)
  }

  const handleSave = async () => {
    if (!selectedEmotion || !response.trim()) return

    setIsSaving(true)

    // Create response object
    const responseData: SavedResponse = {
      id: crypto.randomUUID(),
      emotionId: selectedEmotion.id,
      emotionName: selectedEmotion.name_en,
      emotionColor: selectedEmotion.color || 'var(--atmosphere-text-muted)',
      question,
      response: response.trim(),
      createdAt: new Date().toISOString(),
    }

    // Save to localStorage
    const responsesKey = 'introsphere_responses'
    const existingResponses = localStorage.getItem(responsesKey)
    let responses: SavedResponse[] = []
    
    if (existingResponses) {
      try {
        responses = JSON.parse(existingResponses)
      } catch (e) {
        console.error('Failed to parse existing responses:', e)
      }
    }

    responses.unshift(responseData)
    localStorage.setItem(responsesKey, JSON.stringify(responses))

    // Clear draft
    localStorage.removeItem('introsphere_draft')

    // Simulate save delay
    await new Promise((resolve) => setTimeout(resolve, 500))

    setIsSaving(false)
    setIsSaved(true)

    // Navigate to home after short delay
    setTimeout(() => {
      navigate('/home')
    }, 1000)
  }

  const handleRandomQuestion = () => {
    if (selectedEmotion) {
      setQuestion(getRandomQuestion(selectedEmotion.id))
      setIsSaved(false)
    }
  }

  const characterCount = response.length
  const maxCharacters = 5000

  return (
    <div className="min-h-screen p-6 space-y-6 bg-background">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold text-foreground">New Session</h1>
        <p className="text-muted-foreground">
          {step === 'emotion' && 'How are you feeling?'}
          {step === 'question' && 'Answer the question'}
        </p>
      </div>

      {step === 'emotion' && (
        <div className="space-y-6">
          <EmotionWheel onSelect={handleEmotionSelect} />
        </div>
      )}

      {step === 'question' && selectedEmotion && (
        <div className="space-y-6">
          <Card className="bg-card/80 backdrop-blur-xl border-border">
            <CardHeader>
              <div className="flex items-center gap-2">
                <div
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: selectedEmotion.color }}
                />
                <CardTitle className="text-lg text-card-foreground">
                  {selectedEmotion.name_en}
                </CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-lg text-foreground">{question}</p>
            </CardContent>
          </Card>

          <div className="space-y-4">
            <div className="relative">
              <textarea
                className="w-full min-h-[200px] p-4 rounded-xl border border-input bg-background text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring resize-none"
                placeholder="There are no wrong answers. Write what you feel..."
                value={response}
                onChange={(e) => {
                  if (e.target.value.length <= maxCharacters) {
                    setResponse(e.target.value)
                    setIsSaved(false)
                  }
                }}
                maxLength={maxCharacters}
              />
              <div className="absolute bottom-3 right-3 flex items-center gap-2">
                {lastSaved && !isSaved && (
                  <span className="text-xs text-muted-foreground">
                    Draft saved
                  </span>
                )}
                {isSaved && (
                  <span className="text-xs text-green-400 flex items-center gap-1">
                    <svg
                      className="w-3 h-3"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    Saved!
                  </span>
                )}
                <span
                  className={`text-xs ${
                    characterCount > maxCharacters * 0.9
                      ? 'text-yellow-400'
                      : 'text-muted-foreground'
                  }`}
                >
                  {characterCount}/{maxCharacters}
                </span>
              </div>
            </div>

            <div className="flex gap-3">
              <Button
                variant="outline"
                onClick={handleRandomQuestion}
                className="flex-1"
              >
                🎲 Random Question
              </Button>
              <Button
                onClick={handleSave}
                className="flex-1"
                disabled={!response.trim() || isSaving || isSaved}
              >
                {isSaving ? (
                  <span className="flex items-center gap-2">
                    <svg
                      className="w-4 h-4 animate-spin"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                      />
                    </svg>
                    Saving...
                  </span>
                ) : isSaved ? (
                  <span className="flex items-center gap-2">
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    Saved!
                  </span>
                ) : (
                  'Save'
                )}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
