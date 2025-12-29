"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import Header from "@/components/header";
import type { UserStats } from "@/app/api/user/stats/route";

export default function StatsPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [stats, setStats] = useState<UserStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/");
    }
  }, [status, router]);

  useEffect(() => {
    const fetchStats = async () => {
      if (!session?.user) return;

      try {
        const response = await fetch("/api/user/stats");
        if (!response.ok) {
          throw new Error("Failed to fetch statistics");
        }
        const data = await response.json();
        setStats(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setLoading(false);
      }
    };

    if (session?.user) {
      fetchStats();
    }
  }, [session?.user]);

  if (status === "loading" || loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="max-w-4xl mx-auto p-6">
          <div className="animate-pulse space-y-6">
            <div className="h-8 bg-gray-200 rounded w-48"></div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="h-24 bg-gray-200 rounded-lg"></div>
              ))}
            </div>
            <div className="h-80 bg-gray-200 rounded-lg"></div>
          </div>
        </div>
      </div>
    );
  }

  if (status === "unauthenticated") {
    return null;
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="max-w-4xl mx-auto p-6">
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-700">
            {error}
          </div>
        </div>
      </div>
    );
  }

  const totalQuestions = (stats?.totalAnswered ?? 0) + (stats?.totalSkipped ?? 0);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="max-w-4xl mx-auto p-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">Your Statistics</h1>

        {/* Summary Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-4">
            <p className="text-sm text-gray-500 mb-1">Total Questions</p>
            <p className="text-2xl font-bold text-gray-800">{totalQuestions}</p>
          </div>
          <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-4">
            <p className="text-sm text-gray-500 mb-1">Answered</p>
            <p className="text-2xl font-bold text-blue-600">
              {stats?.totalAnswered ?? 0}
            </p>
          </div>
          <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-4">
            <p className="text-sm text-gray-500 mb-1">Skipped</p>
            <p className="text-2xl font-bold text-amber-600">
              {stats?.totalSkipped ?? 0}
            </p>
          </div>
          <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-4">
            <p className="text-sm text-gray-500 mb-1">Success Rate</p>
            <p className="text-2xl font-bold text-green-600">
              {stats?.successRate ?? 0}%
            </p>
          </div>
        </div>

        {/* Correct vs Total Answered Summary */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-4 mb-8">
          <p className="text-sm text-gray-500 mb-1">Correct Answers</p>
          <p className="text-lg">
            <span className="font-bold text-green-600">{stats?.totalCorrect ?? 0}</span>
            <span className="text-gray-500"> / {stats?.totalAnswered ?? 0} answered</span>
          </p>
        </div>

        {/* Bar Chart */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">
            Last 7 Days Activity
          </h2>
          {stats?.dailyStats && stats.dailyStats.length > 0 ? (
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={stats.dailyStats}>
                <XAxis dataKey="date" tick={{ fontSize: 12 }} />
                <YAxis allowDecimals={false} tick={{ fontSize: 12 }} />
                <Tooltip />
                <Legend />
                <Bar dataKey="answered" fill="#3b82f6" name="Answered" />
                <Bar dataKey="correct" fill="#22c55e" name="Correct" />
                <Bar dataKey="skipped" fill="#f59e0b" name="Skipped" />
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <p className="text-gray-500 text-center py-8">
              No activity in the last 7 days
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
