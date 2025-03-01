"use client"

import { useRouter } from "next/router"
import { AlertCircle, CheckCircle, ArrowLeft } from "lucide-react"

import Layout from "../components/layout"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../components/ui/card"
import { Alert, AlertDescription, AlertTitle } from "../components/ui/alert"
import { Button } from "../components/ui/button"
import { Progress } from "../components/ui/progress"

export default function Results() {
  const router = useRouter()
  const { data } = router.query

  let resultData = null
  try {
    if (typeof data === "string") {
      resultData = JSON.parse(data)
    }
  } catch (e) {
    console.error("Failed to parse result data", e)
  }

  const getResultColor = () => {
    if (!resultData?.result) return ""
    return resultData.result.includes("Phishing") ? "text-destructive" : "text-green-500"
  }

  const getConfidenceColor = () => {
    if (!resultData?.confidence) return "bg-primary"
    return resultData.result.includes("Phishing") ? "bg-destructive" : "bg-green-500"
  }

  return (
    <Layout>
      <div className="max-w-3xl mx-auto">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold mb-2">Analysis Results</h1>
          <p className="text-muted-foreground">Detailed findings from our AI-powered analysis</p>
        </div>

        {!resultData ? (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-12">
              <AlertCircle className="h-12 w-12 text-muted-foreground mb-4" />
              <p className="text-muted-foreground text-lg">No results available</p>
              <Button variant="outline" className="mt-4 gap-2" onClick={() => router.push("/analyze")}>
                <ArrowLeft className="h-4 w-4" />
                Return to Analysis
              </Button>
            </CardContent>
          </Card>
        ) : (
          <Card>
            <CardHeader>
              <CardTitle>Analysis Results</CardTitle>
              <CardDescription>Our AI has analyzed the email content and headers</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium">Verdict:</h3>
                <span className={`text-lg font-bold ${getResultColor()}`}>{resultData.result}</span>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Confidence</span>
                  <span>{resultData.confidence}%</span>
                </div>
                <Progress value={resultData.confidence} className={getConfidenceColor()} />
              </div>

              <Alert variant={resultData.result.includes("Phishing") ? "destructive" : "default"} className="mt-4">
                {resultData.result.includes("Phishing") ? (
                  <AlertCircle className="h-4 w-4" />
                ) : (
                  <CheckCircle className="h-4 w-4" />
                )}
                <AlertTitle>{resultData.result.includes("Phishing") ? "Warning" : "Safe"}</AlertTitle>
                <AlertDescription>
                  {resultData.result.includes("Phishing")
                    ? "This email contains characteristics commonly found in phishing attempts. Exercise caution."
                    : "This email appears to be legitimate based on our analysis."}
                </AlertDescription>
              </Alert>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="gap-2" onClick={() => router.push("/analyze")}>
                <ArrowLeft className="h-4 w-4" />
                Analyze Another Email
              </Button>
            </CardFooter>
          </Card>
        )}
      </div>
    </Layout>
  )
}

