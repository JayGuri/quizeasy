"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Input } from "../../components/ui/input"
import { Label } from "../../components/ui/label"
import { RadioGroup, RadioGroupItem } from "../../components/ui/radio-group"
import { LoadingSpinner } from "../../components/loading-spinner"

export default function QuizOptionsPage() {
  const [file, setFile] = useState<File | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [numItems, setNumItems] = useState(10)
  const [topic, setTopic] = useState("")
  const [mode, setMode] = useState<"quiz" | "flashcard">("quiz")

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0])
    }
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (file) {
      setIsLoading(true)
      // Simulate processing time
      setTimeout(() => {
        setIsLoading(false)
        // Redirect to the appropriate page based on the selected mode
        window.location.href = mode === "quiz" ? "/quiz" : "/flashcards"
      }, 3000)
    }
  }

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold text-center mb-10">Choose Your Learning Experience</h1>
      <div className="grid md:grid-cols-2 gap-6">
        <Card className="w-full">
          <CardHeader>
            <CardTitle>Try an Example</CardTitle>
            <CardDescription>Experience our format with a sample on Photosynthesis</CardDescription>
          </CardHeader>
          <CardContent>
            <p>This contains information about the process of photosynthesis in plants.</p>
          </CardContent>
          <CardFooter className="flex gap-4">
            <Link href="/quiz" passHref>
              <Button>Start Quiz</Button>
            </Link>
            <Link href="/flashcards" passHref>
              <Button variant="outline">View Flashcards</Button>
            </Link>
          </CardFooter>
        </Card>

        <Card className="w-full">
          <CardHeader>
            <CardTitle>Upload Your Own Content</CardTitle>
            <CardDescription>Generate a quiz or flashcards from your PDF</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit}>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="pdf-upload">Upload PDF</Label>
                  <Input id="pdf-upload" type="file" accept=".pdf" className="mt-2" onChange={handleFileChange} />
                </div>
                <RadioGroup defaultValue="quiz" onValueChange={(value) => setMode(value as "quiz" | "flashcard")}>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="quiz" id="quiz" />
                    <Label htmlFor="quiz">Quiz</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="flashcard" id="flashcard" />
                    <Label htmlFor="flashcard">Flashcards</Label>
                  </div>
                </RadioGroup>
                <div>
                  <Label htmlFor="num-items">{mode === "quiz" ? "Number of Questions" : "Number of Flashcards"}</Label>
                  <Input
                    id="num-items"
                    type="number"
                    min="1"
                    max="50"
                    value={numItems}
                    onChange={(e) => setNumItems(Number.parseInt(e.target.value))}
                    className="mt-2"
                  />
                </div>
                <div>
                  <Label htmlFor="topic">Specific Topic (optional)</Label>
                  <Input
                    id="topic"
                    type="text"
                    value={topic}
                    onChange={(e) => setTopic(e.target.value)}
                    placeholder="Enter a specific topic"
                    className="mt-2"
                  />
                </div>
                <Button type="submit" className="w-full" disabled={!file || isLoading}>
                  {isLoading ? "Processing..." : `Generate ${mode === "quiz" ? "Quiz" : "Flashcards"}`}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
      {isLoading && <LoadingSpinner />}
    </div>
  )
}

