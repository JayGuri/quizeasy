"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

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

  const nextCard = () => {
    setCurrentCard((prev) => (prev + 1) % flashcardsData.length)
    setIsFlipped(false)
  }

  const prevCard = () => {
    setCurrentCard((prev) => (prev - 1 + flashcardsData.length) % flashcardsData.length)
    setIsFlipped(false)
  }

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold text-center mb-10">Photosynthesis Flashcards</h1>
      <div className="flex flex-col items-center">
        <Card className="w-full max-w-2xl h-64 perspective">
          <CardContent
            className={`w-full h-full transition-transform duration-500 preserve-3d cursor-pointer ${
              isFlipped ? "rotate-y-180" : ""
            }`}
            onClick={() => setIsFlipped(!isFlipped)}
          >
            <div className="absolute w-full h-full backface-hidden flex items-center justify-center p-6 text-center">
              <p className="text-xl">{flashcardsData[currentCard].front}</p>
            </div>
            <div className="absolute w-full h-full backface-hidden rotate-y-180 flex items-center justify-center p-6 text-center bg-primary text-primary-foreground rounded-lg">
              <p>{flashcardsData[currentCard].back}</p>
            </div>
          </CardContent>
        </Card>
        <div className="flex justify-between w-full max-w-2xl mt-6">
          <Button onClick={prevCard}>Previous</Button>
          <p className="text-center">
            Card {currentCard + 1} of {flashcardsData.length}
          </p>
          <Button onClick={nextCard}>Next</Button>
        </div>
      </div>
    </div>
  )
}

