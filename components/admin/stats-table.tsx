"use client";

import React, { useState } from "react";
import { Star, ChevronDown, ChevronUp } from "lucide-react";
import { StatementStats } from "@/app/api/admin/stats/route";

interface StatsTableProps {
  stats: StatementStats[];
  categories: string[];
}

type SortField = "statementText" | "categoryName" | "attemptsCount" | "skipRate" | "successRate" | "averageRating" | "alreadyKnewPercentage";
type SortDirection = "asc" | "desc";

export default function StatsTable({ stats, categories }: StatsTableProps) {
  const [sortField, setSortField] = useState<SortField>("attemptsCount");
  const [sortDirection, setSortDirection] = useState<SortDirection>("desc");
  const [categoryFilter, setCategoryFilter] = useState<string>("all");
  const [expandedRow, setExpandedRow] = useState<string | null>(null);

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("desc");
    }
  };

  const filteredStats = categoryFilter === "all"
    ? stats
    : stats.filter((s) => s.categoryName === categoryFilter);

  const sortedStats = [...filteredStats].sort((a, b) => {
    const aVal = a[sortField];
    const bVal = b[sortField];

    if (aVal === null) return 1;
    if (bVal === null) return -1;

    if (typeof aVal === "string" && typeof bVal === "string") {
      return sortDirection === "asc"
        ? aVal.localeCompare(bVal)
        : bVal.localeCompare(aVal);
    }

    return sortDirection === "asc"
      ? (aVal as number) - (bVal as number)
      : (bVal as number) - (aVal as number);
  });

  const SortIcon = ({ field }: { field: SortField }) => {
    if (sortField !== field) return null;
    return sortDirection === "asc" ? (
      <ChevronUp className="w-4 h-4 inline" />
    ) : (
      <ChevronDown className="w-4 h-4 inline" />
    );
  };

  const getSuccessRateColor = (rate: number) => {
    if (rate >= 70) return "text-green-600 bg-green-50";
    if (rate >= 40) return "text-yellow-600 bg-yellow-50";
    return "text-red-600 bg-red-50";
  };

  const renderStars = (rating: number | null) => {
    if (rating === null) return <span className="text-gray-400">-</span>;
    return (
      <div className="flex items-center gap-1">
        {Array.from({ length: 5 }, (_, i) => (
          <Star
            key={i}
            className={`w-4 h-4 ${
              i < Math.round(rating)
                ? "fill-yellow-400 text-yellow-400"
                : "fill-transparent text-gray-300"
            }`}
          />
        ))}
        <span className="text-sm text-gray-600 ml-1">({rating.toFixed(1)})</span>
      </div>
    );
  };

  return (
    <div className="space-y-4">
      {/* Filter */}
      <div className="flex items-center gap-4">
        <label className="text-sm font-medium text-gray-700">
          Filter by category:
        </label>
        <select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          className="border border-gray-300 rounded-md px-3 py-1.5 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        >
          <option value="all">All Categories</option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
        <span className="text-sm text-gray-500">
          Showing {sortedStats.length} of {stats.length} statements
        </span>
      </div>

      {/* Table */}
      <div className="overflow-x-auto border border-gray-200 rounded-lg">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th
                className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                onClick={() => handleSort("statementText")}
              >
                Statement <SortIcon field="statementText" />
              </th>
              <th
                className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                onClick={() => handleSort("categoryName")}
              >
                Category <SortIcon field="categoryName" />
              </th>
              <th
                className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                onClick={() => handleSort("attemptsCount")}
              >
                Attempts <SortIcon field="attemptsCount" />
              </th>
              <th
                className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                onClick={() => handleSort("skipRate")}
              >
                Skip Rate <SortIcon field="skipRate" />
              </th>
              <th
                className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                onClick={() => handleSort("successRate")}
              >
                Success Rate <SortIcon field="successRate" />
              </th>
              <th
                className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                onClick={() => handleSort("averageRating")}
              >
                Avg Rating <SortIcon field="averageRating" />
              </th>
              <th
                className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                onClick={() => handleSort("alreadyKnewPercentage")}
              >
                Already Knew <SortIcon field="alreadyKnewPercentage" />
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {sortedStats.map((stat) => (
              <React.Fragment key={stat.id}>
                <tr
                  className="hover:bg-gray-50 cursor-pointer"
                  onClick={() => setExpandedRow(expandedRow === stat.id ? null : stat.id)}
                >
                  <td className="px-4 py-3 text-sm text-gray-900 max-w-xs">
                    <div className="truncate" title={stat.statementText}>
                      {stat.statementText}
                    </div>
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600">
                    {stat.categoryName}
                  </td>
                  <td className="px-4 py-3 text-sm text-center text-gray-900">
                    {stat.attemptsCount}
                  </td>
                  <td className="px-4 py-3 text-sm text-center text-gray-600">
                    {stat.attemptsCount > 0 ? `${stat.skipRate}%` : "-"}
                  </td>
                  <td className="px-4 py-3 text-center">
                    {stat.answeredCount > 0 ? (
                      <span
                        className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getSuccessRateColor(
                          stat.successRate
                        )}`}
                      >
                        {stat.successRate}%
                      </span>
                    ) : (
                      <span className="text-gray-400">-</span>
                    )}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex justify-center">
                      {renderStars(stat.averageRating)}
                    </div>
                  </td>
                  <td className="px-4 py-3 text-sm text-center text-gray-600">
                    {stat.alreadyKnewPercentage !== null
                      ? `${stat.alreadyKnewPercentage}%`
                      : "-"}
                  </td>
                </tr>
                {expandedRow === stat.id && (
                  <tr className="bg-gray-50">
                    <td colSpan={7} className="px-4 py-4">
                      <div className="space-y-2">
                        <p className="text-sm font-medium text-gray-700">
                          Full Statement:
                        </p>
                        <p className="text-sm text-gray-900 bg-white p-3 rounded border">
                          &ldquo;{stat.statementText}&rdquo;
                        </p>
                        <p className="text-sm text-gray-600">
                          <span className="font-medium">Answer:</span>{" "}
                          <span
                            className={
                              stat.truthValue === "True"
                                ? "text-green-600"
                                : "text-red-600"
                            }
                          >
                            {stat.truthValue}
                          </span>
                        </p>
                        <p className="text-sm text-gray-600">
                          <span className="font-medium">Feedback count:</span>{" "}
                          {stat.feedbackCount}
                        </p>
                      </div>
                    </td>
                  </tr>
                )}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>

      {sortedStats.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          No statements found matching the current filter.
        </div>
      )}
    </div>
  );
}
