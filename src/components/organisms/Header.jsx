import React from "react";
import ApperIcon from "@/components/ApperIcon";
import Button from "@/components/atoms/Button";
import SearchBar from "@/components/molecules/SearchBar";
import { cn } from "@/utils/cn";

const Header = ({ 
  title, 
  onMenuClick,
  searchValue,
  onSearchChange,
  onSearchClear,
  actions,
  className,
  ...props 
}) => {
  return (
    <header className={cn(
      "bg-white border-b border-gray-200 px-4 lg:px-6 py-4 flex items-center justify-between",
      className
    )} {...props}>
      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          size="small"
          onClick={onMenuClick}
          className="lg:hidden p-2"
        >
          <ApperIcon name="Menu" className="h-5 w-5" />
        </Button>
        
        <div>
          <h1 className="text-xl font-bold text-gray-900">{title}</h1>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <SearchBar
          placeholder="Search..."
          value={searchValue}
          onChange={onSearchChange}
          onClear={onSearchClear}
          className="w-64 hidden sm:block"
        />
        
        <div className="flex items-center gap-2">
          {actions}
          <Button variant="ghost" size="small" className="p-2">
            <ApperIcon name="Bell" className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;