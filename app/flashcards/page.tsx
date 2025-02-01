"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, RotateCcw } from "lucide-react"

const flashcardsData = [
  {
    front: "What is photosynthesis?",
    back: "Photosynthesis is the process by which plants use sunlight, water and carbon dioxide to produce oxygen and energy in the form of sugar.",
  },
  {
    front: "What are the main components needed for photosynthesis?",
    back: "The main components needed for photosynthesis are: sunlight, water, carbon dioxide, and chlorophyll.",
  },
  {
    front: "Where does photosynthesis take place in the plant?",
    back: "Photosynthesis primarily takes place in the leaves of plants, specifically in the chloroplasts of plant cells.",
  },
  {
    front: "What is the role of chlorophyll in photosynthesis?",
    back: "Chlorophyll is the pigment that gives plants their green color and is responsible for absorbing light energy used in photosynthesis.",
  },
  {
    front: "What are the two main stages of photosynthesis?",
    back: "The two main stages of photosynthesis are the light-dependent reactions and the light-independent reactions (Calvin cycle).",
  },
]

export default function FlashcardsPage() {
  const [currentCard, setCurrentCard] = useState(0)
  const [isFlipped, setIsFlipped] = useState(false)

  useEffect(() => {
    setIsFlipped(false)
  }, [])

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

  return (
    <div className="container mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold text-center mb-10">Photosynthesis Flashcards</h1>
      <div className="flex flex-col items-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentCard}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            transition={{ duration: 0.3 }}
          >
            <div className="w-full max-w-2xl perspective-1000">
              <Card className="w-full h-64">
                <CardContent className="p-0 h-full">
                  <motion.div
                    className="w-full h-full relative"
                    initial={false}
                    animate={{ rotateY: isFlipped ? 180 : 0 }}
                    transition={{ duration: 0.6 }}
                    style={{ transformStyle: "preserve-3d" }}
                    onClick={() => setIsFlipped(!isFlipped)}
                  >
                    <div className="absolute w-full h-full backface-hidden flex items-center justify-center p-6 text-center">
                      <p className="text-xl">{flashcardsData[currentCard].front}</p>
                    </div>
                    <div className="absolute w-full h-full backface-hidden rotate-y-180 flex items-center justify-center p-6 text-center bg-primary text-primary-foreground rounded-lg">
                      <p>{flashcardsData[currentCard].back}</p>
                    </div>
                  </motion.div>
                </CardContent>
              </Card>
            </div>
          </motion.div>
        </AnimatePresence>
        <div className="flex justify-between items-center w-full max-w-2xl mt-6">
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

