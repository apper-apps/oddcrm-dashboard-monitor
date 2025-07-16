import React from "react";
import ApperIcon from "@/components/ApperIcon";
import Input from "@/components/atoms/Input";
import Label from "@/components/atoms/Label";
import { cn } from "@/utils/cn";

export default function FormField({
  label,
  error,
  required,
  children,
  className,
  ...props
}) {
  // Ensure controlled inputs have defined values
  const enhancedChildren = React.Children.map(children, child => {
    if (React.isValidElement(child) && child.type === Input) {
      return React.cloneElement(child, {
        ...child.props,
        value: child.props.value || ""
      });
    }
    return child;
  });

return (
    <div className={cn("space-y-1", className)}>
      {label && (
        <Label>
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </Label>
      )}
      {enhancedChildren || <Input {...props} />}
      {error && (
        <p className="text-sm text-red-600 flex items-center gap-1">
          <ApperIcon name="alert-circle" size={16} />
          {error}
        </p>
      )}
    </div>
  );
}