import React from "react";
import { NavLink } from "react-router-dom";
import ApperIcon from "@/components/ApperIcon";
import { cn } from "@/utils/cn";

const NavigationItem = ({ 
  to, 
  icon, 
  label, 
  badge,
  className,
  ...props 
}) => {
  return (
    <NavLink
      to={to}
      className={({ isActive }) => cn(
        "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 hover:bg-gradient-to-r hover:from-primary-50 hover:to-secondary-50 hover:text-primary-700 group",
        isActive ? "bg-gradient-to-r from-primary-600 to-primary-700 text-white shadow-md" : "text-gray-600",
        className
      )}
      {...props}
    >
      <ApperIcon 
        name={icon} 
        className="h-5 w-5 flex-shrink-0 transition-colors group-hover:text-primary-600" 
      />
      <span className="flex-1">{label}</span>
      {badge && (
        <span className="bg-primary-100 text-primary-600 text-xs px-2 py-0.5 rounded-full">
          {badge}
        </span>
      )}
    </NavLink>
  );
};

export default NavigationItem;