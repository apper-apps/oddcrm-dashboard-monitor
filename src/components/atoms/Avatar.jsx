import React from "react";
import { cn } from "@/utils/cn";

const Avatar = React.forwardRef(({ 
  className, 
  src,
  alt,
  fallback,
  size = "medium",
  ...props 
}, ref) => {
  const sizes = {
    small: "h-8 w-8 text-xs",
    medium: "h-10 w-10 text-sm",
    large: "h-12 w-12 text-base",
    xl: "h-16 w-16 text-lg"
  };

  if (src) {
    return (
      <img
        ref={ref}
        src={src}
        alt={alt}
        className={cn(
          "rounded-full object-cover",
          sizes[size],
          className
        )}
        {...props}
      />
    );
  }

  return (
    <div
      ref={ref}
      className={cn(
        "rounded-full bg-gradient-to-br from-primary-500 to-secondary-500 flex items-center justify-center font-medium text-white",
        sizes[size],
        className
      )}
      {...props}
    >
      {fallback}
    </div>
  );
});

Avatar.displayName = "Avatar";

export default Avatar;