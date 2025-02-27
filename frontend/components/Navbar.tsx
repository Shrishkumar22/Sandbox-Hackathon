import React from "react";
import Link from "next/link";

export default function Navbar() {
    return (
        <nav className="navbar">
            <Link href="/">Home</Link>
            <Link href="/analyze">Analyze Email</Link>
            <Link href="/honeypot">Honeypot Logs</Link>
        </nav>
    );
}
