import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

interface PerformanceAnalysisProps {
  score: number
  totalQuestions: number
  timeSpent: number
  questionTimes?: number[]
}

export function PerformanceAnalysis({ score, totalQuestions, timeSpent, questionTimes }: PerformanceAnalysisProps) {
  const percentageScore = (score / totalQuestions) * 100
  const averageTimePerQuestion = timeSpent / totalQuestions

  return (
    <Card className="w-full mt-6">
      <CardHeader>
        <CardTitle>Performance Analysis</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <h3 className="text-lg font-semibold">Score</h3>
          <Progress value={percentageScore} className="w-full mt-2" />
          <p className="text-sm text-muted-foreground mt-1">
            You scored {score} out of {totalQuestions} ({percentageScore.toFixed(1)}%)
          </p>
        </div>
        <div>
          <h3 className="text-lg font-semibold">Time Spent</h3>
          <p className="text-sm text-muted-foreground">Total time: {timeSpent.toFixed(2)} seconds</p>
          <p className="text-sm text-muted-foreground">
            Average time per question: {averageTimePerQuestion.toFixed(2)} seconds
          </p>
        </div>
        {questionTimes && questionTimes.length > 0 && (
          <div>
            <h3 className="text-lg font-semibold">Time per Question</h3>
            {questionTimes.map((time, index) => (
              <p key={index} className="text-sm text-muted-foreground">
                Question {index + 1}: {time.toFixed(2)} seconds
              </p>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}

