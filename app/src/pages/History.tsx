import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

interface SavedResponse {
  id: string
  emotionId: string
  emotionName: string
  emotionColor: string
  question: string
  response: string
  createdAt: string
}

export function History() {
  const [responses, setResponses] = useState<SavedResponse[]>([])
  const [selectedResponse, setSelectedResponse] = useState<SavedResponse | null>(null)
  const [filter, setFilter] = useState<string>('all')

  // Load responses from localStorage
  useEffect(() => {
    const responsesKey = 'introsphere_responses'
    const savedResponses = localStorage.getItem(responsesKey)
    if (savedResponses) {
      try {
        const parsed = JSON.parse(savedResponses)
        setResponses(parsed)
      } catch (e) {
        console.error('Failed to parse responses:', e)
      }
    }
  }, [])

  // Delete a response
  const handleDelete = (id: string) => {
    const updatedResponses = responses.filter(r => r.id !== id)
    setResponses(updatedResponses)
    localStorage.setItem('introsphere_responses', JSON.stringify(updatedResponses))
    if (selectedResponse?.id === id) {
      setSelectedResponse(null)
    }
  }

  // Format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', {
      weekday: 'short',
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    })
  }

  // Get unique emotions for filter
  const uniqueEmotions = Array.from(new Set(responses.map(r => r.emotionName)))

  // Filter responses
  const filteredResponses = filter === 'all'
    ? responses
    : responses.filter(r => r.emotionName === filter)

  // Truncate text
  const truncateText = (text: string, maxLength: number) => {
    if (text.length <= maxLength) return text
    return text.substring(0, maxLength) + '...'
  }

  return (
    <div className="p-6 space-y-6">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold">Session History</h1>
        <p className="text-muted-foreground">
          Browse your previous responses
        </p>
      </div>

      {responses.length === 0 ? (
        <div className="text-center py-12 space-y-4">
          <div className="text-6xl">📝</div>
          <div className="space-y-2">
            <h3 className="text-lg font-semibold">No sessions yet</h3>
            <p className="text-muted-foreground">
              Start your first session to see your history here
            </p>
          </div>
          <Link to="/session">
            <Button>Start Session</Button>
          </Link>
        </div>
      ) : (
        <>
          {/* Filter */}
          <div className="flex gap-2 flex-wrap">
            <Button
              variant={filter === 'all' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setFilter('all')}
            >
              All ({responses.length})
            </Button>
            {uniqueEmotions.map(emotion => {
              const count = responses.filter(r => r.emotionName === emotion).length
              return (
                <Button
                  key={emotion}
                  variant={filter === emotion ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setFilter(emotion)}
                >
                  {emotion} ({count})
                </Button>
              )
            })}
          </div>

          <div className="grid gap-4 lg:grid-cols-2">
            {/* Response List */}
            <div className="space-y-3">
              <h2 className="text-lg font-semibold">
                {filter === 'all' ? 'All Sessions' : filter}
                <span className="text-muted-foreground font-normal ml-2">
                  ({filteredResponses.length})
                </span>
              </h2>
              <div className="space-y-3 max-h-[600px] overflow-y-auto pr-2">
                {filteredResponses.map(response => (
                  <Card
                    key={response.id}
                    className={`cursor-pointer transition-all hover:shadow-md ${
                      selectedResponse?.id === response.id
                        ? 'ring-2 ring-primary'
                        : ''
                    }`}
                    onClick={() => setSelectedResponse(response)}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-start gap-3">
                        <div
                          className="w-3 h-3 rounded-full mt-1.5 flex-shrink-0"
                          style={{ backgroundColor: response.emotionColor }}
                        />
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between gap-2">
                            <h3 className="font-semibold text-sm truncate">
                              {response.emotionName}
                            </h3>
                            <span className="text-xs text-muted-foreground flex-shrink-0">
                              {formatDate(response.createdAt)}
                            </span>
                          </div>
                          <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
                            {response.question}
                          </p>
                          <p className="text-sm mt-2 line-clamp-2">
                            {truncateText(response.response, 100)}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Response Detail */}
            <div className="lg:sticky lg:top-6 lg:self-start">
              {selectedResponse ? (
                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div
                          className="w-4 h-4 rounded-full"
                          style={{ backgroundColor: selectedResponse.emotionColor }}
                        />
                        <CardTitle>{selectedResponse.emotionName}</CardTitle>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDelete(selectedResponse.id)}
                        className="text-destructive hover:text-destructive"
                      >
                        Delete
                      </Button>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {formatDate(selectedResponse.createdAt)}
                    </p>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <h4 className="text-sm font-semibold text-muted-foreground">
                        Question
                      </h4>
                      <p className="text-base">{selectedResponse.question}</p>
                    </div>
                    <div className="space-y-2">
                      <h4 className="text-sm font-semibold text-muted-foreground">
                        Your Response
                      </h4>
                      <p className="text-base whitespace-pre-wrap">
                        {selectedResponse.response}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              ) : (
                <Card className="h-full min-h-[300px] flex items-center justify-center">
                  <CardContent className="text-center py-12">
                    <div className="text-4xl mb-4">👆</div>
                    <p className="text-muted-foreground">
                      Select a session to view details
                    </p>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>

          {/* Stats */}
          <div className="pt-4 border-t">
            <h2 className="text-lg font-semibold mb-3">Statistics</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Card>
                <CardContent className="pt-6">
                  <div className="text-3xl font-bold">{responses.length}</div>
                  <p className="text-xs text-muted-foreground">Total sessions</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6">
                  <div className="text-3xl font-bold">{uniqueEmotions.length}</div>
                  <p className="text-xs text-muted-foreground">Unique emotions</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6">
                  <div className="text-3xl font-bold">
                    {responses.length > 0
                      ? Math.round(
                          responses.reduce((acc, r) => acc + r.response.length, 0) /
                            responses.length
                        )
                      : 0}
                  </div>
                  <p className="text-xs text-muted-foreground">Avg. response length</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6">
                  <div className="text-3xl font-bold">
                    {responses.length > 0
                      ? new Date(responses[0].createdAt).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                        })
                      : '-'}
                  </div>
                  <p className="text-xs text-muted-foreground">Last session</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </>
      )}
    </div>
  )
}
