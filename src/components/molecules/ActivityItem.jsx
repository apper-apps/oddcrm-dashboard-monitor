import React from "react";
import { format } from "date-fns";
import ApperIcon from "@/components/ApperIcon";
import Avatar from "@/components/atoms/Avatar";
import Badge from "@/components/atoms/Badge";
import { cn } from "@/utils/cn";

const ActivityItem = ({ 
  activity, 
  className,
  ...props 
}) => {
  const getActivityIcon = (type) => {
    switch (type) {
      case "email": return "Mail";
      case "call": return "Phone";
      case "meeting": return "Calendar";
      case "task": return "CheckSquare";
      case "note": return "FileText";
      case "deal": return "DollarSign";
      default: return "MessageCircle";
    }
  };

  const getActivityColor = (type) => {
    switch (type) {
      case "email": return "text-blue-600 bg-blue-100";
      case "call": return "text-green-600 bg-green-100";
      case "meeting": return "text-purple-600 bg-purple-100";
      case "task": return "text-orange-600 bg-orange-100";
      case "note": return "text-gray-600 bg-gray-100";
      case "deal": return "text-emerald-600 bg-emerald-100";
      default: return "text-gray-600 bg-gray-100";
    }
  };

  return (
    <div className={cn("flex items-start gap-3 p-4", className)} {...props}>
      <div className={cn(
        "flex items-center justify-center w-8 h-8 rounded-full flex-shrink-0",
        getActivityColor(activity.type)
      )}>
        <ApperIcon name={getActivityIcon(activity.type)} className="h-4 w-4" />
      </div>
      
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between mb-1">
          <h4 className="font-medium text-gray-900 text-sm">
            {activity.description}
          </h4>
          <span className="text-xs text-gray-500">
            {format(new Date(activity.timestamp), "MMM d, HH:mm")}
          </span>
        </div>
        
        {activity.metadata && (
          <div className="text-sm text-gray-600 mb-2">
            {activity.type === "email" && activity.metadata.subject && (
              <p className="font-medium">{activity.metadata.subject}</p>
            )}
            {activity.metadata.content && (
              <p className="line-clamp-2">{activity.metadata.content}</p>
            )}
            {activity.metadata.duration && (
              <p>Duration: {activity.metadata.duration}</p>
            )}
            {activity.metadata.amount && (
              <p>Amount: ${activity.metadata.amount.toLocaleString()}</p>
            )}
          </div>
        )}
        
        <Badge variant="default" className="text-xs">
          {activity.type}
        </Badge>
      </div>
    </div>
  );
};

export default ActivityItem;