import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

interface PerformanceAnalysisProps {
  score: number
  totalQuestions: number
  timeSpent: number
}

export function PerformanceAnalysis({ score, totalQuestions, timeSpent }: PerformanceAnalysisProps) {
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
          <p className="text-sm text-muted-foreground">Total time: {timeSpent.toFixed(1)} seconds</p>
          <p className="text-sm text-muted-foreground">
            Average time per question: {averageTimePerQuestion.toFixed(1)} seconds
          </p>
        </div>
      </CardContent>
    </Card>
  )
}

