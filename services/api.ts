interface QuizData {
    questions: {
      id: number
      question: string
      options: string[]
      correct: number
    }[]
  }
  
  interface FlashcardData {
    flashcards: {
      id: number
      front: string
      back: string
    }[]
  }
  
  export async function generateContent(
    file: File,
    mode: "quiz" | "flashcard",
    numItems: number,
    topic?: string,
  ): Promise<QuizData | FlashcardData> {
    const formData = new FormData()
    formData.append("file", file)
    formData.append("mode", mode)
    formData.append("numItems", numItems.toString())
    if (topic) formData.append("topic", topic)
  
    const response = await fetch("/api/generate-content", {
      method: "POST",
      body: formData,
    })
  
    if (!response.ok) {
      throw new Error("Failed to generate content")
    }
  
    return response.json()
  }
  
  