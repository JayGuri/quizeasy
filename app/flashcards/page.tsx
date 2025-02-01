"use client"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, RotateCcw, ChevronDown } from "lucide-react"

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
  {
    front: "Explain the light-dependent reactions of photosynthesis",
    back: "The light-dependent reactions of photosynthesis occur in the thylakoid membranes of chloroplasts. These reactions involve the following steps:\n\n1. Light absorption by chlorophyll and other pigments\n2. Excitation of electrons and their transfer through an electron transport chain\n3. Generation of a proton gradient across the thylakoid membrane\n4. Production of ATP through chemiosmosis\n5. Reduction of NADP+ to NADPH\n\nThese reactions produce ATP and NADPH, which are then used in the light-independent reactions (Calvin cycle) to produce glucose.",
  },
]

const ScrollIndicator = () => (
  <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 animate-bounce">
    <ChevronDown className="w-6 h-6 text-muted-foreground/50" />
  </div>
)

const MotionDiv = motion.div

export default function FlashcardsPage() {
  const [currentCard, setCurrentCard] = useState(0)
  const [isFlipped, setIsFlipped] = useState(false)
  const [showScrollIndicator, setShowScrollIndicator] = useState(false)
  const contentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setIsFlipped(false)
    checkOverflow()
  }, [isFlipped]) //Corrected dependency

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

  return (
    <div className="container mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold text-center mb-10">Photosynthesis Flashcards</h1>
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

