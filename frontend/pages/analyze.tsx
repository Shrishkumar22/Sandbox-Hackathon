import { useState, useEffect } from 'react';
import axios from 'axios';

// Define the expected type for the API response
type AnalyzeResponse = {
  result: string;
  confidence: number;
};

export default function AnalyzePage() {
  const [data, setData] = useState<AnalyzeResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    axios.get<AnalyzeResponse>('/api/analyze')
      .then((response) => {
        setData(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching analysis:", error);
        setError("Failed to fetch data");
        setLoading(false);
      });
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold">Analysis Result</h1>
      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}
      {data && (
        <div className="mt-4 p-4 border rounded">
          <p><strong>Result:</strong> {data.result}</p>
          <p><strong>Confidence:</strong> {data.confidence}%</p>
        </div>
      )}
    </div>
  );
}