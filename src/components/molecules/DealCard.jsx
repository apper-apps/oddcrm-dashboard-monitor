import React from "react";
import { format } from "date-fns";
import ApperIcon from "@/components/ApperIcon";
import Avatar from "@/components/atoms/Avatar";
import Badge from "@/components/atoms/Badge";
import Card from "@/components/atoms/Card";
import { cn } from "@/utils/cn";

const DealCard = ({ 
  deal, 
  contact,
  isDragging = false,
  className,
  ...props 
}) => {
  const getProbabilityColor = (probability) => {
    if (probability >= 80) return "text-green-600";
    if (probability >= 60) return "text-yellow-600";
    if (probability >= 40) return "text-orange-600";
    return "text-red-600";
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <Card
      className={cn(
        "p-4 cursor-grab active:cursor-grabbing transition-all duration-200 hover:shadow-md border-l-4 border-l-primary-400",
        isDragging && "opacity-80 transform rotate-1 shadow-lg",
        className
      )}
      {...props}
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-2">
          <Avatar 
            fallback={contact?.name?.charAt(0)?.toUpperCase() || "U"}
            size="small"
          />
          <div>
            <h4 className="font-medium text-gray-900 text-sm">
              {deal.title}
            </h4>
            <p className="text-xs text-gray-600">
              {contact?.name || "Unknown Contact"}
            </p>
          </div>
        </div>
        <ApperIcon name="GripVertical" className="h-4 w-4 text-gray-400" />
      </div>

      <div className="space-y-2 mb-3">
        <div className="flex items-center justify-between">
          <span className="text-lg font-bold text-gradient">
            {formatCurrency(deal.value)}
          </span>
          <span className={cn("text-sm font-medium", getProbabilityColor(deal.probability))}>
            {deal.probability}%
          </span>
        </div>
        
        <div className="flex items-center gap-2 text-xs text-gray-600">
          <ApperIcon name="Calendar" className="h-3 w-3" />
          <span>Close: {format(new Date(deal.expectedClose), "MMM d, yyyy")}</span>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <Badge variant="default" className="text-xs">
          {deal.stage}
        </Badge>
        <div className="flex items-center gap-1">
          <ApperIcon name="MessageCircle" className="h-3 w-3 text-gray-400" />
          <span className="text-xs text-gray-500">3</span>
        </div>
      </div>
    </Card>
  );
};

export default DealCard;