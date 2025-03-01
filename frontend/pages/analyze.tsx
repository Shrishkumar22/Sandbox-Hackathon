"use client"

import { useState } from "react"
import { AlertCircle, CheckCircle, Loader2, Send } from "lucide-react"

import Layout from "../components/layout"
import { Button } from "../components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../components/ui/card"
import { Textarea } from "../components/ui/textarea"
import { Alert, AlertDescription, AlertTitle } from "../components/ui/alert"
import { Progress } from "../components/ui/progress"

// Define the expected type for the API response
type AnalyzeResponse = {
  result: string
  confidence: number
}

export default function AnalyzePage() {
  const [data, setData] = useState<AnalyzeResponse | null>(null)
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)
  const [emailContent, setEmailContent] = useState<string>("")

  const handleAnalyze = () => {
    if (!emailContent.trim()) {
      setError("Please enter email content to analyze")
      return
    }

    setLoading(true)
    setError(null)

    // Simulating API call for demo purposes
    setTimeout(() => {
      // This would be replaced with your actual API call
      // axios.get<AnalyzeResponse>('/api/analyze')
      const mockResponse = {
        result: Math.random() > 0.5 ? "Phishing Detected" : "Legitimate Email",
        confidence: Math.floor(Math.random() * 30) + 70, // Random confidence between 70-99%
      }
      setData(mockResponse)
      setLoading(false)
    }, 2000)
  }

  const getResultColor = () => {
    if (!data) return ""
    return data.result.includes("Phishing") ? "text-destructive" : "text-green-500"
  }

  const getConfidenceColor = () => {
    if (!data) return "bg-primary"
    return data.result.includes("Phishing") ? "bg-destructive" : "bg-green-500"
  }

  return (
    <Layout>
      <div className="max-w-3xl mx-auto">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold mb-2">Email Analysis</h1>
          <p className="text-muted-foreground">Paste an email to analyze for phishing attempts</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Email Content</CardTitle>
            <CardDescription>Paste the full email including headers for best results</CardDescription>
          </CardHeader>
          <CardContent>
            <Textarea
              placeholder="Paste email content here..."
              className="min-h-[200px]"
              value={emailContent}
              onChange={(e) => setEmailContent(e.target.value)}
            />
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline" onClick={() => setEmailContent("")} disabled={loading || !emailContent}>
              Clear
            </Button>
            <Button onClick={handleAnalyze} disabled={loading || !emailContent} className="gap-2">
              {loading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Analyzing...
                </>
              ) : (
                <>
                  <Send className="h-4 w-4" />
                  Analyze Email
                </>
              )}
            </Button>
          </CardFooter>
        </Card>

        {error && (
          <Alert variant="destructive" className="mt-6">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {data && (
          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Analysis Results</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium">Verdict:</h3>
                <span className={`text-lg font-bold ${getResultColor()}`}>{data.result}</span>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Confidence</span>
                  <span>{data.confidence}%</span>
                </div>
                <Progress value={data.confidence} className={getConfidenceColor()} />
              </div>

              <Alert variant={data.result.includes("Phishing") ? "destructive" : "default"} className="mt-4">
                {data.result.includes("Phishing") ? (
                  <AlertCircle className="h-4 w-4" />
                ) : (
                  <CheckCircle className="h-4 w-4" />
                )}
                <AlertTitle>{data.result.includes("Phishing") ? "Warning" : "Safe"}</AlertTitle>
                <AlertDescription>
                  {data.result.includes("Phishing")
                    ? "This email contains characteristics commonly found in phishing attempts. Exercise caution."
                    : "This email appears to be legitimate based on our analysis."}
                </AlertDescription>
              </Alert>
            </CardContent>
          </Card>
        )}
      </div>
    </Layout>
  )
}

