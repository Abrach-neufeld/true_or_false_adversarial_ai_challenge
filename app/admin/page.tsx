"use client";

import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { StatementStats } from "@/app/api/admin/stats/route";
import StatsTable from "@/components/admin/stats-table";
import Header from "@/components/header";

export default function AdminDashboard() {
  const { status } = useSession();
  const router = useRouter();
  const [stats, setStats] = useState<StatementStats[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await fetch("/api/admin/stats");
        if (response.status === 403) {
          setError("Access denied. Admin privileges required.");
          return;
        }
        if (!response.ok) {
          throw new Error("Failed to fetch statistics");
        }
        const data = await response.json();
        setStats(data.stats);
        setCategories(data.categories);
      } catch (err) {
        setError("Failed to load statistics. Please try again.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    if (status === "authenticated") {
      fetchStats();
    } else if (status === "unauthenticated") {
      router.push("/");
    }
  }, [status, router]);

  // Calculate summary stats
  const totalAttempts = stats.reduce((sum, s) => sum + s.attemptsCount, 0);
  const totalCorrect = stats.reduce(
    (sum, s) => sum + Math.round((s.attemptsCount * s.successRate) / 100),
    0
  );
  const overallSuccessRate = totalAttempts > 0 ? (totalCorrect / totalAttempts) * 100 : 0;
  const totalFeedback = stats.reduce((sum, s) => sum + s.feedbackCount, 0);

  if (status === "loading" || loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
        <Header />
        <div className="flex items-center justify-center h-[calc(100vh-80px)]">
          <div className="text-lg text-gray-600">Loading...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
        <Header />
        <div className="flex flex-col items-center justify-center h-[calc(100vh-80px)] gap-4">
          <div className="text-lg text-red-600">{error}</div>
          <button
            onClick={() => router.push("/")}
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <Header />
      <div className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">
          Admin Dashboard
        </h1>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="text-sm font-medium text-gray-500 mb-1">
              Total Statements
            </div>
            <div className="text-3xl font-bold text-gray-900">{stats.length}</div>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <div className="text-sm font-medium text-gray-500 mb-1">
              Total Attempts
            </div>
            <div className="text-3xl font-bold text-gray-900">{totalAttempts}</div>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <div className="text-sm font-medium text-gray-500 mb-1">
              Overall Success Rate
            </div>
            <div className="text-3xl font-bold text-gray-900">
              {overallSuccessRate.toFixed(1)}%
            </div>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <div className="text-sm font-medium text-gray-500 mb-1">
              Total Feedback
            </div>
            <div className="text-3xl font-bold text-gray-900">{totalFeedback}</div>
          </div>
        </div>

        {/* Stats Table */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            Question Statistics
          </h2>
          <StatsTable stats={stats} categories={categories} />
        </div>
      </div>
    </div>
  );
}
