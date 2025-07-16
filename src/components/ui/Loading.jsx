import React from "react";
import { cn } from "@/utils/cn";

const Loading = ({ className, type = "default" }) => {
  if (type === "cards") {
    return (
      <div className={cn("space-y-6", className)}>
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="bg-white rounded-xl p-6 shadow-soft border border-gray-200">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-gray-200 rounded-full shimmer-bg animate-shimmer" />
                <div className="flex-1 space-y-2">
                  <div className="h-4 bg-gray-200 rounded shimmer-bg animate-shimmer" />
                  <div className="h-3 bg-gray-200 rounded w-2/3 shimmer-bg animate-shimmer" />
                </div>
              </div>
              <div className="space-y-2 mb-4">
                <div className="h-3 bg-gray-200 rounded shimmer-bg animate-shimmer" />
                <div className="h-3 bg-gray-200 rounded w-3/4 shimmer-bg animate-shimmer" />
              </div>
              <div className="flex items-center justify-between">
                <div className="h-6 w-16 bg-gray-200 rounded-full shimmer-bg animate-shimmer" />
                <div className="h-3 w-20 bg-gray-200 rounded shimmer-bg animate-shimmer" />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (type === "list") {
    return (
      <div className={cn("space-y-4", className)}>
        {[...Array(8)].map((_, i) => (
          <div key={i} className="bg-white rounded-xl p-4 shadow-soft border border-gray-200">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 bg-gray-200 rounded-full shimmer-bg animate-shimmer flex-shrink-0" />
              <div className="flex-1 space-y-2">
                <div className="flex items-center justify-between">
                  <div className="h-4 bg-gray-200 rounded w-32 shimmer-bg animate-shimmer" />
                  <div className="h-3 bg-gray-200 rounded w-16 shimmer-bg animate-shimmer" />
                </div>
                <div className="h-4 bg-gray-200 rounded w-48 shimmer-bg animate-shimmer" />
                <div className="h-3 bg-gray-200 rounded w-full shimmer-bg animate-shimmer" />
                <div className="h-3 bg-gray-200 rounded w-2/3 shimmer-bg animate-shimmer" />
                <div className="flex items-center justify-between">
                  <div className="h-6 w-16 bg-gray-200 rounded-full shimmer-bg animate-shimmer" />
                  <div className="h-4 w-4 bg-gray-200 rounded shimmer-bg animate-shimmer" />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (type === "pipeline") {
    return (
      <div className={cn("grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6", className)}>
        {[...Array(4)].map((_, i) => (
          <div key={i} className="bg-white rounded-xl p-4 shadow-soft border border-gray-200 min-h-[600px]">
            <div className="mb-4">
              <div className="flex items-center justify-between mb-2">
                <div className="h-5 bg-gray-200 rounded w-24 shimmer-bg animate-shimmer" />
                <div className="h-4 bg-gray-200 rounded w-6 shimmer-bg animate-shimmer" />
              </div>
              <div className="h-4 bg-gray-200 rounded w-20 shimmer-bg animate-shimmer" />
            </div>
            <div className="space-y-3">
              {[...Array(3)].map((_, j) => (
                <div key={j} className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 bg-gray-200 rounded-full shimmer-bg animate-shimmer" />
                      <div className="space-y-1">
                        <div className="h-4 bg-gray-200 rounded w-24 shimmer-bg animate-shimmer" />
                        <div className="h-3 bg-gray-200 rounded w-20 shimmer-bg animate-shimmer" />
                      </div>
                    </div>
                    <div className="h-4 w-4 bg-gray-200 rounded shimmer-bg animate-shimmer" />
                  </div>
                  <div className="space-y-2 mb-3">
                    <div className="flex items-center justify-between">
                      <div className="h-6 bg-gray-200 rounded w-20 shimmer-bg animate-shimmer" />
                      <div className="h-4 bg-gray-200 rounded w-12 shimmer-bg animate-shimmer" />
                    </div>
                    <div className="h-3 bg-gray-200 rounded w-32 shimmer-bg animate-shimmer" />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="h-6 w-16 bg-gray-200 rounded-full shimmer-bg animate-shimmer" />
                    <div className="h-4 w-8 bg-gray-200 rounded shimmer-bg animate-shimmer" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className={cn("flex items-center justify-center p-12", className)}>
      <div className="text-center">
        <div className="inline-block w-8 h-8 border-4 border-primary-200 border-t-primary-600 rounded-full animate-spin mb-4" />
        <p className="text-gray-600 font-medium">Loading...</p>
      </div>
    </div>
  );
};

export default Loading;