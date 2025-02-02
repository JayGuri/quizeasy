"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "../../components/ui/input"
import { Label } from "../../components/ui/label"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { uploadPDF, getNextFlashcard, type Flashcard } from "../../lib/api"

const demoFlashcards = [
  {
    topic: "Photosynthesis",
    question: "What is photosynthesis?",
    answer:
      "Photosynthesis is the process by which plants use sunlight, water and carbon dioxide to produce oxygen and energy in the form of sugar.",
  },
  {
    topic: "Photosynthesis Components",
    question: "What are the main components needed for photosynthesis?",
    answer: "The main components needed for photosynthesis are: sunlight, water, carbon dioxide, and chlorophyll.",
  },
  {
    topic: "Photosynthesis Location",
    question: "Where does photosynthesis take place in the plant?",
    answer:
      "Photosynthesis primarily takes place in the leaves of plants, specifically in the chloroplasts of plant cells.",
  },
  {
    topic: "Chlorophyll",
    question: "What is the role of chlorophyll in photosynthesis?",
    answer:
      "Chlorophyll is the pigment that gives plants their green color and is responsible for absorbing light energy used in photosynthesis.",
  },
  {
    topic: "Photosynthesis Stages",
    question: "What are the two main stages of photosynthesis?",
    answer:
      "The two main stages of photosynthesis are the light-dependent reactions and the light-independent reactions (Calvin cycle).",
  },
]

export default function FlashcardsPage() {
  const [currentCard, setCurrentCard] = useState(0)
  const [isFlipped, setIsFlipped] = useState(false)
  const [isDemoMode, setIsDemoMode] = useState(true)
  const [file, setFile] = useState<File | null>(null)
  const [sessionId, setSessionId] = useState<string | null>(null)
  const [flashcard, setFlashcard] = useState<Flashcard | null>(null)
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setFile(event.target.files[0])
    }
  }

  const handleUpload = async () => {
    if (!file) {
      setError("Please select a PDF file.")
      return
    }

    setLoading(true)
    setError(null)

    try {
      const data = await uploadPDF(file, 5)
      setSessionId(data.session_id)
      setFlashcard(data.flashcard)
      setIsDemoMode(false)
    } catch (err) {
      setError("Failed to upload PDF.")
    } finally {
      setLoading(false)
    }
  }

  const handleNextFlashcard = async () => {
    setIsFlipped(false)
    if (isDemoMode) {
      setCurrentCard((prev) => (prev + 1) % demoFlashcards.length)
    } else {
      if (!sessionId) {
        setError("No session ID found. Please upload a PDF first.")
        return
      }

      setLoading(true)
      setError(null)

      try {
        const data = await getNextFlashcard(sessionId)
        if (data.flashcard) {
          setFlashcard(data.flashcard)
        } else {
          setError("No more flashcards available.")
        }
      } catch (err) {
        setError("Failed to fetch the next flashcard.")
      } finally {
        setLoading(false)
      }
    }
  }

  const handlePreviousFlashcard = () => {
    if (isDemoMode) {
      setIsFlipped(false)
      setCurrentCard((prev) => (prev - 1 + demoFlashcards.length) % demoFlashcards.length)
    }
    // Note: Previous functionality not available for generated flashcards
    // as they are fetched sequentially from the API
  }

  const toggleFlip = () => {
    setIsFlipped(!isFlipped)
  }

  const switchToDemo = () => {
    setIsDemoMode(true)
    setCurrentCard(0)
    setIsFlipped(false)
    setSessionId(null)
    setFlashcard(null)
    setError(null)
  }

  const switchToPDFUpload = () => {
    setIsDemoMode(false)
    setCurrentCard(0)
    setIsFlipped(false)
    setSessionId(null)
    setFlashcard(null)
    setError(null)
  }

  const getCurrentFlashcard = () => {
    if (isDemoMode) {
      return demoFlashcards[currentCard]
    }
    return flashcard
  }

  const currentFlashcard = getCurrentFlashcard()

  return (
    <div className="min-h-screen overflow-hidden">
      <div className="container max-w-4xl mx-auto px-4 py-10">
        <h1 className="text-3xl font-bold text-center mb-10">QuizEasy - Flashcard Generator</h1>

        <div className="flex justify-center mb-10 space-x-4">
          <Button onClick={switchToDemo} variant={isDemoMode ? "default" : "outline"} className="w-40">
            Demo Flashcards
          </Button>
          <Button onClick={switchToPDFUpload} variant={!isDemoMode ? "default" : "outline"} className="w-40">
            Upload PDF
          </Button>
        </div>

        {!isDemoMode && (
          <div className="mb-10 flex flex-col items-center">
            <Label htmlFor="pdf-upload" className="mb-2">
              Upload PDF
            </Label>
            <Input
              id="pdf-upload"
              type="file"
              accept="application/pdf"
              onChange={handleFileChange}
              className="max-w-xs mb-2"
            />
            <Button onClick={handleUpload} disabled={loading || !file} className="w-40">
              {loading ? "Uploading..." : "Generate Flashcards"}
            </Button>
          </div>
        )}

        {error && (
          <div className="mb-6 text-center">
            <p className="text-red-500">{error}</p>
          </div>
        )}

        {currentFlashcard && (
          <div className="relative mb-6">
            <Card className="w-full aspect-[3/1.5] perspective">
              <CardContent
                className={`absolute w-full h-full transition-transform duration-500 preserve-3d cursor-pointer ${
                  isFlipped ? "rotate-y-180" : ""
                }`}
                onClick={toggleFlip}
              >
                {/* Front of card */}
                <div className="absolute inset-0 backface-hidden">
                  <div className="flex flex-col items-center justify-center h-full p-6 text-center">
                    <p className="text-sm text-muted-foreground mb-4">{currentFlashcard.topic}</p>
                    <p className="text-xl font-medium">{currentFlashcard.question}</p>
                  </div>
                </div>
                {/* Back of card */}
                <div className="absolute inset-0 backface-hidden rotate-y-180">
                  <div className="flex items-center justify-center h-full p-6 text-center bg-primary text-primary-foreground rounded-lg">
                    <p className="text-lg">{currentFlashcard.answer}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="mt-6 flex items-center justify-between">
              <div className="flex gap-2">
                <Button onClick={handlePreviousFlashcard} disabled={loading || !isDemoMode} className="w-40">
                  <ChevronLeft className="mr-2 h-4 w-4" />
                  Previous
                </Button>
                <Button onClick={handleNextFlashcard} disabled={loading} className="w-40">
                  Next
                  <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
              <p className="text-sm text-muted-foreground">
                {isDemoMode
                  ? `Card ${currentCard + 1} of ${demoFlashcards.length}`
                  : flashcard
                    ? "Generated Flashcard"
                    : "No flashcard available"}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

