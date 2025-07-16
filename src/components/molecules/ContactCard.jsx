import React from "react";
import { format } from "date-fns";
import ApperIcon from "@/components/ApperIcon";
import Avatar from "@/components/atoms/Avatar";
import Badge from "@/components/atoms/Badge";
import Card from "@/components/atoms/Card";
import Button from "@/components/atoms/Button";
import { cn } from "@/utils/cn";

const ContactCard = ({ 
  contact, 
  onClick,
  onEdit,
  onDelete,
  className,
  ...props 
}) => {
  const getStatusVariant = (status) => {
    switch (status) {
      case "active": return "success";
      case "inactive": return "default";
      case "lead": return "warning";
      case "prospect": return "primary";
      default: return "default";
    }
  };

  const handleEdit = (e) => {
    e.stopPropagation();
    onEdit?.(contact);
  };

  const handleDelete = (e) => {
    e.stopPropagation();
    onDelete?.(contact);
  };

  return (
    <Card
      className={cn(
        "p-6 cursor-pointer transition-all duration-200 hover:shadow-md group",
        className
      )}
      onClick={onClick}
      {...props}
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <Avatar 
            fallback={contact.name?.charAt(0)?.toUpperCase() || "U"}
            size="large"
          />
          <div>
            <h3 className="font-semibold text-gray-900 group-hover:text-primary-600 transition-colors">
              {contact.name}
            </h3>
            <p className="text-sm text-gray-600">{contact.company}</p>
          </div>
        </div>
        <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <Button
            variant="ghost"
            size="small"
            onClick={handleEdit}
            className="h-8 w-8 p-0"
          >
            <ApperIcon name="Edit2" className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="small"
            onClick={handleDelete}
            className="h-8 w-8 p-0 hover:text-red-600"
          >
            <ApperIcon name="Trash2" className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="space-y-2 mb-4">
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <ApperIcon name="Mail" className="h-4 w-4" />
          <span className="truncate">{contact.email}</span>
        </div>
        {contact.phone && (
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <ApperIcon name="Phone" className="h-4 w-4" />
            <span>{contact.phone}</span>
          </div>
        )}
      </div>

      <div className="flex items-center justify-between">
        <Badge variant={getStatusVariant(contact.status)}>
          {contact.status}
        </Badge>
        <span className="text-xs text-gray-500">
          Last contact: {format(new Date(contact.lastContact), "MMM d, yyyy")}
        </span>
      </div>

      {contact.tags && contact.tags.length > 0 && (
        <div className="flex flex-wrap gap-1 mt-3">
          {contact.tags.slice(0, 3).map((tag, index) => (
            <Badge key={index} variant="default" className="text-xs">
              {tag}
            </Badge>
          ))}
          {contact.tags.length > 3 && (
            <Badge variant="default" className="text-xs">
              +{contact.tags.length - 3} more
            </Badge>
          )}
        </div>
      )}
    </Card>
  );
};

export default ContactCard;