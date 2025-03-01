"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Shield, Mail, Radar, Home } from "lucide-react"
import { Button } from "../components/ui/button"

export default function Navbar() {
  const pathname = usePathname()

  return (
    <nav className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center px-4 max-w-6xl mx-auto">
        <Link href="/" className="flex items-center gap-2 mr-6">
          <Shield className="h-6 w-6 text-primary" />
          <span className="font-bold text-lg hidden md:inline-block">PhishGuard</span>
        </Link>
        <div className="flex gap-1 md:gap-2">
          <Button
            variant={pathname === "/" ? "secondary" : "ghost"}
            size="sm"
            asChild
            className="flex items-center gap-1"
          >
            <Link href="/">
              <Home className="h-4 w-4 md:mr-1" />
              <span className="hidden md:inline-block">Home</span>
            </Link>
          </Button>
          <Button
            variant={pathname === "/analyze" ? "secondary" : "ghost"}
            size="sm"
            asChild
            className="flex items-center gap-1"
          >
            <Link href="/analyze">
              <Mail className="h-4 w-4 md:mr-1" />
              <span className="hidden md:inline-block">Analyze Email</span>
            </Link>
          </Button>
          <Button
            variant={pathname === "/honeypot" ? "secondary" : "ghost"}
            size="sm"
            asChild
            className="flex items-center gap-1"
          >
            <Link href="/honeypot">
              <Radar className="h-4 w-4 md:mr-1" />
              <span className="hidden md:inline-block">Honeypot Logs</span>
            </Link>
          </Button>
        </div>
      </div>
    </nav>
  )
}

