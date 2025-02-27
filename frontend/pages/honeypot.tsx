import { useState, useEffect } from 'react';
import axios from 'axios';

// Define the expected type for each email
type EmailData = {
  id: string;
  subject: string;
  sender: string;
  body: string;
};

export default function HoneypotPage() {
  const [emails, setEmails] = useState<EmailData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    axios.get<EmailData[]>('/api/honeypot')
      .then((response) => {
        setEmails(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching emails:", error);
        setError("Failed to fetch emails");
        setLoading(false);
      });
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold">Honeypot Emails</h1>
      {loading && <p>Loading emails...</p>}
      {error && <p className="text-red-500">{error}</p>}
      {emails.length > 0 ? (
        <div className="mt-4">
          {emails.map((email) => (
            <div key={email.id} className="p-4 border rounded mb-4">
              <h2 className="text-lg font-semibold">{email.subject}</h2>
              <p className="text-sm text-gray-600">From: {email.sender}</p>
              <p className="mt-2">{email.body}</p>
            </div>
          ))}
        </div>
      ) : (
        <p>No emails found.</p>
      )}
    </div>
  );
}