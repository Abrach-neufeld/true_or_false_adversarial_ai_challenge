"use client";

import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { FlaskConical } from "lucide-react";

export default function TestingModeToggle() {
  const { data: session } = useSession();
  const [testingMode, setTestingMode] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Check if user is admin and current testing mode status
  useEffect(() => {
    const checkStatus = async () => {
      if (!session?.user?.email) {
        setIsAdmin(false);
        return;
      }

      try {
        // Check testing mode status
        const response = await fetch("/api/admin/testing-mode");
        if (response.ok) {
          const data = await response.json();
          setTestingMode(data.testingMode);
        }

        // Check if admin by trying to access admin endpoint
        const adminResponse = await fetch("/api/admin/stats");
        setIsAdmin(adminResponse.ok);
      } catch {
        setIsAdmin(false);
      }
    };

    checkStatus();
  }, [session?.user?.email]);

  const toggleTestingMode = async () => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/admin/testing-mode", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ enabled: !testingMode }),
      });

      if (response.ok) {
        setTestingMode(!testingMode);
      }
    } catch (error) {
      console.error("Failed to toggle testing mode:", error);
    }
    setIsLoading(false);
  };

  // Don't render anything if not an admin
  if (!isAdmin) return null;

  return (
    <button
      onClick={toggleTestingMode}
      disabled={isLoading}
      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
        testingMode
          ? "bg-amber-100 text-amber-800 border border-amber-300 hover:bg-amber-200"
          : "bg-gray-100 text-gray-600 border border-gray-200 hover:bg-gray-200"
      }`}
      title={testingMode ? "Testing mode ON - no data is being saved" : "Click to enable testing mode"}
    >
      <FlaskConical className={`w-3.5 h-3.5 ${testingMode ? "text-amber-600" : "text-gray-500"}`} />
      {testingMode ? "Testing Mode" : "Test"}
    </button>
  );
}
