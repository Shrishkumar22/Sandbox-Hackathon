import Link from "next/link"
import { Shield, Mail, Radar } from "lucide-react"

import Layout from "../components/layout"
import { Button } from "../components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card"

export default function Home() {
  return (
    <Layout>
      <div className="flex flex-col items-center text-center py-12 space-y-8">
        <div className="space-y-4 max-w-3xl">
          <div className="inline-block p-3 bg-primary/10 rounded-full mb-4">
            <Shield className="h-12 w-12 text-primary" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight">AI-Powered Phishing Detection</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Protect your organization with advanced machine learning algorithms that detect and analyze phishing
            attempts in real-time.
          </p>
        </div>

        <div className="flex flex-wrap gap-4 justify-center mt-8">
          <Button size="lg" asChild>
            <Link href="/analyze" className="gap-2">
              <Mail className="h-5 w-5" />
              Analyze Email
            </Link>
          </Button>
          <Button size="lg" variant="outline" asChild>
            <Link href="/honeypot" className="gap-2">
              <Radar className="h-5 w-5" />
              Honeypot Logs
            </Link>
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full mt-16">
          <Card>
            <CardHeader>
              <CardTitle>Advanced Detection</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Our AI algorithms analyze email content, headers, and links to identify sophisticated phishing attempts.
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Real-time Analysis</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Get instant results with confidence scores to quickly determine threat levels.
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Honeypot Monitoring</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Track malicious activity with our honeypot system that logs and analyzes attack patterns.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  )
}

