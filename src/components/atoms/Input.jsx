import React from "react";
import { cn } from "@/utils/cn";

export default function Input({
  className,
  type = "text",
  error,
  disabled,
  value,
  ...props
}) {
  // Ensure controlled inputs always have a defined value
  const safeValue = value !== undefined ? value : "";
  
  return (
    <input
type={type}
      disabled={disabled}
      value={safeValue}
className={cn(
        "w-full px-3 py-2 border border-gray-300 rounded-lg",
        "placeholder:text-gray-400",
        "focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent",
        "disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-gray-50",
        "transition-colors duration-200",
        error && "border-red-500 focus:ring-red-500",
        className
      )}
      {...props}
    />
  );
}