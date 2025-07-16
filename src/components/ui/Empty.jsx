import React from "react";
import ApperIcon from "@/components/ApperIcon";
import Button from "@/components/atoms/Button";
import Card from "@/components/atoms/Card";
import { cn } from "@/utils/cn";

const Empty = ({ 
  title = "No data found",
  message = "There's nothing here yet. Get started by adding your first item.",
  icon = "Inbox",
  actionLabel,
  onAction,
  className,
  ...props 
}) => {
  return (
    <Card className={cn("p-12 text-center", className)} {...props}>
      <div className="max-w-md mx-auto">
        <div className="w-16 h-16 mx-auto mb-6 bg-gradient-to-br from-primary-100 to-secondary-100 rounded-full flex items-center justify-center">
          <ApperIcon name={icon} className="h-8 w-8 text-primary-600" />
        </div>
        
        <h2 className="text-xl font-semibold text-gray-900 mb-2">
          {title}
        </h2>
        
        <p className="text-gray-600 mb-8">
          {message}
        </p>
        
        {actionLabel && onAction && (
          <Button 
            onClick={onAction}
            className="inline-flex items-center gap-2"
          >
            <ApperIcon name="Plus" className="h-4 w-4" />
            {actionLabel}
          </Button>
        )}
      </div>
    </Card>
  );
};

export default Empty;