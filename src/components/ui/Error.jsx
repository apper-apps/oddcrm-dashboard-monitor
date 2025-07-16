import React from "react";
import ApperIcon from "@/components/ApperIcon";
import Button from "@/components/atoms/Button";
import Card from "@/components/atoms/Card";
import { cn } from "@/utils/cn";

const Error = ({ 
  title = "Something went wrong",
  message = "We're sorry, but something went wrong. Please try again.",
  onRetry,
  className,
  ...props 
}) => {
  return (
    <Card className={cn("p-12 text-center", className)} {...props}>
      <div className="max-w-md mx-auto">
        <div className="w-16 h-16 mx-auto mb-6 bg-red-100 rounded-full flex items-center justify-center">
          <ApperIcon name="AlertCircle" className="h-8 w-8 text-red-600" />
        </div>
        
        <h2 className="text-xl font-semibold text-gray-900 mb-2">
          {title}
        </h2>
        
        <p className="text-gray-600 mb-8">
          {message}
        </p>
        
        {onRetry && (
          <Button 
            onClick={onRetry}
            className="inline-flex items-center gap-2"
          >
            <ApperIcon name="RefreshCw" className="h-4 w-4" />
            Try Again
          </Button>
        )}
      </div>
    </Card>
  );
};

export default Error;