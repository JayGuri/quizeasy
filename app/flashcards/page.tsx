"use client"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence, type HTMLMotionProps } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, RotateCcw, ChevronDown } from "lucide-react"
import { useRouter } from "next/navigation"

// Demo flashcards data
const demoFlashcardsData = [
  {
    id: 1,
    front: "What is photosynthesis?",
    back: "Photosynthesis is the process by which plants use sunlight, water and carbon dioxide to produce oxygen and energy in the form of sugar.",
  },
  {
    id: 2,
    front: "What are the main components needed for photosynthesis?",
    back: "The main components needed for photosynthesis are: sunlight, water, carbon dioxide, and chlorophyll.",
  },
  // Add more demo flashcards here...
]

interface FlashcardData {
  id: number
  front: string
  back: string
}

const ScrollIndicator = () => (
  <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 animate-bounce">
    <ChevronDown className="w-6 h-6 text-muted-foreground/50" />
  </div>
)

type MotionDivProps = HTMLMotionProps<"div"> & {
  className?: string
  onClick?: () => void
}

const MotionDiv = motion.div as React.ComponentType<MotionDivProps>

export default function FlashcardsPage() {
  const [flashcardsData, setFlashcardsData] = useState<FlashcardData[]>([])
  const [currentCard, setCurrentCard] = useState(0)
  const [isFlipped, setIsFlipped] = useState(false)
  const [showScrollIndicator, setShowScrollIndicator] = useState(false)
  const [isDemo, setIsDemo] = useState(false)
  const contentRef = useRef<HTMLDivElement>(null)
  const router = useRouter()

  useEffect(() => {
    const contentMode = localStorage.getItem("contentMode")
    if (contentMode === "demo") {
      setFlashcardsData(demoFlashcardsData)
      setIsDemo(true)
    } else {
      const storedContent = localStorage.getItem("generatedContent")
      if (storedContent) {
        const parsedContent = JSON.parse(storedContent)
        if (parsedContent.type === "flashcard") {
          setFlashcardsData(parsedContent.content)
        } else {
          router.push("/quiz")
        }
      } else {
        router.push("/quiz-options")
      }
    }
  }, [router])

  useEffect(() => {
    setIsFlipped(false)
    checkOverflow()
  }, [currentCard]) //Fixed unnecessary dependency

  const checkOverflow = () => {
    if (contentRef.current) {
      setShowScrollIndicator(contentRef.current.scrollHeight > contentRef.current.clientHeight)
    }
  }

  const nextCard = () => {
    setCurrentCard((prev) => (prev + 1) % flashcardsData.length)
  }

  const prevCard = () => {
    setCurrentCard((prev) => (prev - 1 + flashcardsData.length) % flashcardsData.length)
  }

  const resetCards = () => {
    setCurrentCard(0)
    setIsFlipped(false)
  }

  if (flashcardsData.length === 0) {
    return <div>Loading...</div>
  }

  return (
    <div className="container mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold text-center mb-10">
        {isDemo ? "Demo Flashcards: Photosynthesis" : "Flashcards"}
      </h1>
      <div className="flex flex-col items-center">
        <AnimatePresence mode="wait">
          <MotionDiv
            key={currentCard}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            transition={{ duration: 0.3 }}
            className="w-full max-w-3xl perspective-1000"
          >
            <Card className="w-full h-[400px] md:h-[500px]">
              <CardContent className="p-0 h-full">
                <MotionDiv
                  className="w-full h-full relative"
                  initial={false}
                  animate={{ rotateY: isFlipped ? 180 : 0 }}
                  transition={{ duration: 0.6 }}
                  style={{ transformStyle: "preserve-3d" }}
                  onClick={() => setIsFlipped(!isFlipped)}
                >
                  <div className="absolute w-full h-full backface-hidden flex flex-col items-center justify-center p-8 text-center overflow-y-auto">
                    <div ref={contentRef} className="w-full max-h-full overflow-y-auto">
                      <p className="text-2xl font-semibold">{flashcardsData[currentCard].front}</p>
                    </div>
                    {showScrollIndicator && <ScrollIndicator />}
                  </div>
                  <div
                    className="absolute w-full h-full backface-hidden rotate-y-180 flex flex-col items-center justify-center p-8 text-center bg-primary text-primary-foreground rounded-lg overflow-y-auto"
                    style={{
                      backgroundImage:
                        "repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(255,255,255,0.1) 10px, rgba(255,255,255,0.1) 20px)",
                    }}
                  >
                    <div ref={contentRef} className="w-full max-h-full overflow-y-auto">
                      <p className="text-xl">{flashcardsData[currentCard].back}</p>
                    </div>
                    {showScrollIndicator && <ScrollIndicator />}
                  </div>
                </MotionDiv>
              </CardContent>
            </Card>
          </MotionDiv>
        </AnimatePresence>
        <div className="flex justify-between items-center w-full max-w-3xl mt-6">
          <Button onClick={prevCard} variant="outline" size="icon">
            <ChevronLeft className="h-4 w-4" />
            <span className="sr-only">Previous card</span>
          </Button>
          <p className="text-center">
            Card {currentCard + 1} of {flashcardsData.length}
          </p>
          <Button onClick={nextCard} variant="outline" size="icon">
            <ChevronRight className="h-4 w-4" />
            <span className="sr-only">Next card</span>
          </Button>
        </div>
        <Button onClick={resetCards} variant="outline" className="mt-4">
          <RotateCcw className="h-4 w-4 mr-2" />
          Reset
        </Button>
      </div>
    </div>
  )
}

