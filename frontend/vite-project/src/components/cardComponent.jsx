import React from "react";

export default function Card({ title, details = {} }) {
  return (
    <div className="border rounded-xl shadow p-4 w-64 bg-white dark:bg-slate-800">
      {/* Main Title */}
      <h2 className="text-xl font-bold mb-2 text-gray-800 dark:text-white">{title}</h2>

      {/* Details */}
      <div className="space-y-1">
        {Object.entries(details).map(([key, value]) => (
          <div key={key} className="flex justify-between text-gray-600 dark:text-gray-300">
            <span className="font-medium">{key}:</span>
            <span>{value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
