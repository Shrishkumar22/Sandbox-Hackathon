import React from "react";
import { useRouter } from "next/router";
import Navbar from "../components/Navbar";

export default function Results() {
    const router = useRouter();
    const { data } = router.query;

    return (
        <div>
            <Navbar />
            <h2>Analysis Results</h2>
            <p>{data ? JSON.stringify(data) : "No results available"}</p>
        </div>
    );
}
