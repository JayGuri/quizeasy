export interface Flashcard {
  topic: string
  question: string
  answer: string
}

export interface UploadResponse {
  session_id: string
  flashcard: Flashcard | null
}

export interface NextFlashcardResponse {
  session_id: string
  flashcard: Flashcard | null
}

export const uploadPDF = async (file: File, numCards: number, specificTopic?: string): Promise<UploadResponse> => {
  const formData = new FormData()
  formData.append("file", file)
  formData.append("num_cards", numCards.toString())
  if (specificTopic) {
    formData.append("specific_topic", specificTopic)
  }

  try {
    const response = await fetch("http://localhost:8000/upload", {
      method: "POST",
      body: formData,
    })

    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData.detail || "Failed to upload PDF")
    }

    const data: UploadResponse = await response.json()
    console.log("Upload response:", data) // Log the response for debugging
    return data
  } catch (error) {
    console.error("Error uploading PDF:", error)
    throw error
  }
}

export const getNextFlashcard = async (sessionId: string): Promise<NextFlashcardResponse> => {
  try {
    const response = await fetch("http://localhost:8000/next-flashcard", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        session_id: sessionId,
      }),
    })

    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData.detail || "Failed to fetch next flashcard")
    }

    const data: NextFlashcardResponse = await response.json()
    console.log("Next flashcard response:", data) // Log the response for debugging
    return data
  } catch (error) {
    console.error("Error fetching next flashcard:", error)
    throw error
  }
}

// New function to get all flashcards for a session
export const getAllFlashcards = async (sessionId: string): Promise<Flashcard[]> => {
  const flashcards: Flashcard[] = []
  let hasMore = true

  try {
    while (hasMore) {
      const response = await getNextFlashcard(sessionId)
      if (response.flashcard) {
        flashcards.push(response.flashcard)
      } else {
        hasMore = false
      }
    }
    console.log("All flashcards:", flashcards) // Log all flashcards for debugging
    return flashcards
  } catch (error) {
    console.error("Error fetching all flashcards:", error)
    throw error
  }
}

