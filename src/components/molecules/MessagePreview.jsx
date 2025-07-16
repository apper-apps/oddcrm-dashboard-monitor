import React from "react";
import { format } from "date-fns";
import ApperIcon from "@/components/ApperIcon";
import Avatar from "@/components/atoms/Avatar";
import Badge from "@/components/atoms/Badge";
import Card from "@/components/atoms/Card";
import { cn } from "@/utils/cn";

const MessagePreview = ({ 
  message, 
  onClick,
  isSelected = false,
  className,
  ...props 
}) => {
  const getStatusVariant = (status) => {
    switch (status) {
      case "read": return "default";
      case "unread": return "primary";
      case "replied": return "success";
      default: return "default";
    }
  };

  const getSourceIcon = (source) => {
    switch (source) {
      case "email": return "Mail";
      case "twitter": return "Twitter";
      case "facebook": return "Facebook";
      case "linkedin": return "Linkedin";
      default: return "MessageCircle";
    }
  };

  return (
    <Card
      className={cn(
        "p-4 cursor-pointer transition-all duration-200 hover:shadow-md border-l-4",
        isSelected ? "border-l-primary-500 bg-primary-50" : "border-l-transparent hover:border-l-primary-200",
        message.status === "unread" && "bg-blue-50 border-blue-200",
        className
      )}
      onClick={onClick}
      {...props}
    >
      <div className="flex items-start gap-3">
        <Avatar 
          fallback={message.sender?.charAt(0)?.toUpperCase() || "U"}
          size="medium"
        />
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between mb-1">
            <h4 className="font-medium text-gray-900 truncate">
              {message.sender || "Unknown Sender"}
            </h4>
            <div className="flex items-center gap-2">
              <ApperIcon 
                name={getSourceIcon(message.source)} 
                className="h-4 w-4 text-gray-400" 
              />
              <span className="text-xs text-gray-500">
                {format(new Date(message.timestamp), "MMM d, HH:mm")}
              </span>
            </div>
          </div>
          <p className="text-sm font-medium text-gray-700 mb-1 truncate">
            {message.subject}
          </p>
          <p className="text-sm text-gray-600 line-clamp-2 mb-2">
            {message.content}
          </p>
          <div className="flex items-center justify-between">
            <Badge variant={getStatusVariant(message.status)}>
              {message.status}
            </Badge>
            {message.hasAttachments && (
              <ApperIcon name="Paperclip" className="h-4 w-4 text-gray-400" />
            )}
          </div>
        </div>
      </div>
    </Card>
  );
};

export default MessagePreview;