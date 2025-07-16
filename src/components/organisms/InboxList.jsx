import React from "react";
import MessagePreview from "@/components/molecules/MessagePreview";
import { cn } from "@/utils/cn";

const InboxList = ({ 
  messages, 
  selectedMessage,
  onMessageSelect,
  className,
  ...props 
}) => {
  return (
    <div className={cn("space-y-3", className)} {...props}>
      {messages.map((message) => (
        <MessagePreview
          key={message.Id}
          message={message}
          isSelected={selectedMessage?.Id === message.Id}
          onClick={() => onMessageSelect(message)}
        />
      ))}
    </div>
  );
};

export default InboxList;