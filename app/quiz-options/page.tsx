"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "../../components/ui/input"
import { Label } from "../../components/ui/label"
import { LoadingSpinner } from "../../components/loading-spinner"

export default function QuizOptionsPage() {
  const [file, setFile] = useState<File | null>(null)
  const [isLoading, setIsLoading] = useState(false)

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
      }, 10000)
    }
  }

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold text-center mb-10">Choose Your Quiz Experience</h1>
      <div className="grid md:grid-cols-2 gap-6">
        <Card className="w-full">
          <CardHeader>
            <CardTitle>Try an Example Quiz</CardTitle>
            <CardDescription>Experience our quiz format with a sample on Photosynthesis</CardDescription>
          </CardHeader>
          <CardContent>
            <p>This quiz contains questions about the process of photosynthesis in plants.</p>
          </CardContent>
          <CardFooter>
            <Link href="/quiz" passHref>
              <Button className="w-full">Start Photosynthesis Quiz</Button>
            </Link>
          </CardFooter>
        </Card>

        <Card className="w-full">
          <CardHeader>
            <CardTitle>Upload Your Own Content</CardTitle>
            <CardDescription>Generate a quiz from your PDF (1 topic only)</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit}>
              <Label htmlFor="pdf-upload">Upload PDF</Label>
              <Input id="pdf-upload" type="file" accept=".pdf" className="mt-2" onChange={handleFileChange} />
              <Button type="submit" className="w-full mt-4" disabled={!file || isLoading}>
                {isLoading ? "Processing..." : "Generate Quiz"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
      {isLoading && <LoadingSpinner />}
    </div>
  )
}

