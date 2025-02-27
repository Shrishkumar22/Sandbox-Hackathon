import React from "react";
import Link from "next/link";
import Navbar from "../components/Navbar";

export default function Home() {
    return (
        <div>
            <Navbar />
            <main className="container">
                <h1>AI-Powered Phishing Detection</h1>
                <p>Detect phishing emails using AI and track honeypot activity.</p>
                <div className="buttons">
                    <Link href="/analyze"><button>Analyze Email</button></Link>
                    <Link href="/honeypot"><button>Honeypot Logs</button></Link>
                </div>
            </main>
        </div>
    );
}
