import React from "react";
import ContactCard from "@/components/molecules/ContactCard";
import { cn } from "@/utils/cn";

const ContactList = ({ 
  contacts, 
  onContactClick,
  onContactEdit,
  onContactDelete,
  viewMode = "grid",
  className,
  ...props 
}) => {
  return (
    <div className={cn(
      viewMode === "grid" 
        ? "grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3" 
        : "space-y-4",
      className
    )} {...props}>
      {contacts.map((contact) => (
        <ContactCard
          key={contact.Id}
          contact={contact}
          onClick={() => onContactClick(contact)}
          onEdit={onContactEdit}
          onDelete={onContactDelete}
        />
      ))}
    </div>
  );
};

export default ContactList;