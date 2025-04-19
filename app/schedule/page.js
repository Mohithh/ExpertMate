"use client";
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function SchedulePage() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleAuth = async () => {
    setIsLoading(true);
    try {
      // Redirect to Zoom OAuth
      window.location.href = `https://zoom.us/oauth/authorize?response_type=code&client_id=${process.env.NEXT_PUBLIC_ZOOM_CLIENT_ID}&redirect_uri=${encodeURIComponent(window.location.origin + '/api/zoom-callback')}`;
    } catch (error) {
      alert("Error initiating Zoom auth");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <button
        onClick={handleAuth}
        disabled={isLoading}
        className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition"
      >
        {isLoading ? 'Connecting...' : 'Schedule with Zoom'}
      </button>
    </div>
  );
}