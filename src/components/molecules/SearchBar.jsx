import React from "react";
import ApperIcon from "@/components/ApperIcon";
import { cn } from "@/utils/cn";

export default function SearchBar({
  placeholder = "Search...",
  value = "",
  onChange,
  onClear,
  className,
  ...props 
}) {
  const safeValue = value || "";
  
  return (
    <div className={cn("relative flex items-center", className)}>
      <ApperIcon
        name="search"
        size={20}
        className="absolute left-3 text-gray-400"
      />
      <input
        type="text"
        placeholder={placeholder}
        value={safeValue}
        onChange={onChange}
        className="w-full pl-10 pr-10 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        {...props}
      />
      {safeValue && (
        <button
          type="button"
          onClick={onClear}
          className="absolute right-3 p-1 text-gray-400 hover:text-gray-600 transition-colors"
          aria-label="Clear search"
        >
          <ApperIcon name="x" size={16} />
        </button>
      )}
    </div>
  );
}