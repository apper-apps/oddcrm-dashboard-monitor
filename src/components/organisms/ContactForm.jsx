import React, { useState } from "react";
import { toast } from "react-toastify";
import ApperIcon from "@/components/ApperIcon";
import Button from "@/components/atoms/Button";
import Card from "@/components/atoms/Card";
import FormField from "@/components/molecules/FormField";
import { cn } from "@/utils/cn";

const ContactForm = ({ 
  contact,
  onSave,
  onCancel,
  className,
  ...props 
}) => {
  const [formData, setFormData] = useState({
    name: contact?.name || "",
    email: contact?.email || "",
    phone: contact?.phone || "",
    company: contact?.company || "",
    status: contact?.status || "lead",
    tags: contact?.tags ? contact.tags.join(", ") : "",
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }
    
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    
    try {
      const contactData = {
        ...formData,
        tags: formData.tags.split(",").map(tag => tag.trim()).filter(tag => tag),
        lastContact: contact?.lastContact || new Date().toISOString(),
        createdAt: contact?.createdAt || new Date().toISOString(),
      };
      
      await onSave(contactData);
      toast.success(contact ? "Contact updated successfully" : "Contact created successfully");
    } catch (error) {
      toast.error("Failed to save contact");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className={cn("p-6", className)} {...props}>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-gray-900">
          {contact ? "Edit Contact" : "Add New Contact"}
        </h2>
        <Button variant="ghost" onClick={onCancel} className="p-2">
          <ApperIcon name="X" className="h-5 w-5" />
        </Button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            label="Name"
            required
            value={formData.name}
            onChange={(e) => handleChange("name", e.target.value)}
            error={errors.name}
            placeholder="Enter contact name"
          />
          
          <FormField
            label="Email"
            type="email"
            required
            value={formData.email}
            onChange={(e) => handleChange("email", e.target.value)}
            error={errors.email}
            placeholder="Enter email address"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            label="Phone"
            type="tel"
            value={formData.phone}
            onChange={(e) => handleChange("phone", e.target.value)}
            error={errors.phone}
            placeholder="Enter phone number"
          />
          
          <FormField
            label="Company"
            value={formData.company}
            onChange={(e) => handleChange("company", e.target.value)}
            error={errors.company}
            placeholder="Enter company name"
          />
        </div>

        <FormField
          label="Status"
          value={formData.status}
          onChange={(e) => handleChange("status", e.target.value)}
          error={errors.status}
        >
          <select
            value={formData.status}
            onChange={(e) => handleChange("status", e.target.value)}
            className="flex h-10 w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          >
            <option value="lead">Lead</option>
            <option value="prospect">Prospect</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
        </FormField>

        <FormField
          label="Tags"
          value={formData.tags}
          onChange={(e) => handleChange("tags", e.target.value)}
          error={errors.tags}
          placeholder="Enter tags separated by commas"
        />

        <div className="flex items-center gap-3 pt-4">
          <Button
            type="submit"
            disabled={isSubmitting}
            className="flex items-center gap-2"
          >
            {isSubmitting ? (
              <ApperIcon name="Loader2" className="h-4 w-4 animate-spin" />
            ) : (
              <ApperIcon name="Save" className="h-4 w-4" />
            )}
            {contact ? "Update Contact" : "Create Contact"}
          </Button>
          
          <Button
            type="button"
            variant="secondary"
            onClick={onCancel}
          >
            Cancel
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default ContactForm;