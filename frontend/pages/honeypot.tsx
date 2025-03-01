"use client"

import { useState, useEffect } from "react"
import { AlertCircle, Clock, Mail, User } from "lucide-react"

import Layout from "../components/layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card"
import { Alert, AlertDescription, AlertTitle } from "../components/ui/alert"
import { Badge } from "../components/ui/badge"
import { Skeleton } from "../components/ui/skeleton"

// Define the expected type for each email
type EmailData = {
  id: string
  subject: string
  sender: string
  body: string
  timestamp?: string
  threatLevel?: "high" | "medium" | "low"
}

export default function HoneypotPage() {
  const [emails, setEmails] = useState<EmailData[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [error] = useState<string | null>(null)

  useEffect(() => {
    // Simulating API call for demo purposes
    setTimeout(() => {
      // This would be replaced with your actual API call
      // axios.get<EmailData[]>('/api/honeypot')
      const mockEmails: EmailData[] = [
        {
          id: "1",
          subject: "Your Account Has Been Compromised",
          sender: "security@bankofamerica-secure.com",
          body: "Dear customer, we have detected suspicious activity on your account. Please click the link below to verify your identity and secure your account immediately.",
          timestamp: "2023-11-15T14:23:45Z",
          threatLevel: "high",
        },
        {
          id: "2",
          subject: "Invoice #INV-2023-11-456",
          sender: "billing@amazzon-services.net",
          body: "Please find attached your invoice for recent purchases. If you did not make these purchases, please contact our support team immediately.",
          timestamp: "2023-11-15T10:12:33Z",
          threatLevel: "medium",
        },
        {
          id: "3",
          subject: "Urgent: Action Required for Your PayPal Account",
          sender: "service@paypal-secure-center.com",
          body: "We've noticed some unusual activity on your PayPal account. Your account has been temporarily limited. To restore full access, please verify your information by clicking the secure link below.",
          timestamp: "2023-11-14T22:45:12Z",
          threatLevel: "high",
        },
        {
          id: "4",
          subject: "Your Netflix Subscription",
          sender: "billing@netflixx-account.com",
          body: "Your Netflix payment was declined. To avoid interruption of service, please update your payment information by clicking here.",
          timestamp: "2023-11-14T18:33:27Z",
          threatLevel: "medium",
        },
        {
          id: "5",
          subject: "IT Department: Password Reset Required",
          sender: "it-support@company-systems.org",
          body: "Due to a recent security update, all employees are required to reset their passwords. Please click the link to set up your new password within 24 hours.",
          timestamp: "2023-11-14T15:17:05Z",
          threatLevel: "high",
        },
      ]
      setEmails(mockEmails)
      setLoading(false)
    }, 1500)
  }, [])

  const getThreatLevelColor = (level?: string) => {
    switch (level) {
      case "high":
        return "bg-destructive text-destructive-foreground hover:bg-destructive/80"
      case "medium":
        return "bg-amber-500 text-white hover:bg-amber-600"
      case "low":
        return "bg-yellow-500 text-white hover:bg-yellow-600"
      default:
        return ""
    }
  }

  const formatDate = (dateString?: string) => {
    if (!dateString) return ""
    const date = new Date(dateString)
    return date.toLocaleString()
  }

  return (
    <Layout>
      <div className="max-w-4xl mx-auto">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold mb-2">Honeypot Logs</h1>
          <p className="text-muted-foreground">Monitoring captured phishing attempts in real-time</p>
        </div>

        {loading && (
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <Card key={i}>
                <CardHeader className="pb-2">
                  <Skeleton className="h-6 w-3/4" />
                  <Skeleton className="h-4 w-1/4 mt-2" />
                </CardHeader>
                <CardContent>
                  <Skeleton className="h-20 w-full" />
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {error && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {!loading && emails.length === 0 && (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-12">
              <Mail className="h-12 w-12 text-muted-foreground mb-4" />
              <p className="text-muted-foreground text-lg">No phishing emails detected yet</p>
            </CardContent>
          </Card>
        )}

        {!loading && emails.length > 0 && (
          <div className="space-y-4">
            {emails.map((email) => (
              <Card key={email.id} className="overflow-hidden">
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-lg">{email.subject}</CardTitle>
                    <Badge className={getThreatLevelColor(email.threatLevel)}>
                      {email.threatLevel?.toUpperCase()} THREAT
                    </Badge>
                  </div>
                  <CardDescription className="flex items-center gap-1 mt-1">
                    <User className="h-3 w-3" />
                    {email.sender}
                  </CardDescription>
                  <CardDescription className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    {formatDate(email.timestamp)}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="bg-muted/50 p-3 rounded-md text-sm">{email.body}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </Layout>
  )
}

