import React, { useState, useEffect } from "react";
import { useParams, useNavigate, useOutletContext } from "react-router-dom";
import { toast } from "react-toastify";
import ApperIcon from "@/components/ApperIcon";
import Button from "@/components/atoms/Button";
import Avatar from "@/components/atoms/Avatar";
import Badge from "@/components/atoms/Badge";
import Card from "@/components/atoms/Card";
import Header from "@/components/organisms/Header";
import ContactTimeline from "@/components/organisms/ContactTimeline";
import Loading from "@/components/ui/Loading";
import Error from "@/components/ui/Error";
import { contactService } from "@/services/api/contactService";
import { activityService } from "@/services/api/activityService";

const ContactDetailPage = () => {
  const { contactId } = useParams();
  const navigate = useNavigate();
  const { onMenuClick } = useOutletContext();
  const [contact, setContact] = useState(null);
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    loadContactData();
  }, [contactId]);

  const loadContactData = async () => {
    try {
      setLoading(true);
      setError("");
      const [contactData, activitiesData] = await Promise.all([
        contactService.getById(parseInt(contactId)),
        activityService.getByContactId(parseInt(contactId))
      ]);
      setContact(contactData);
      setActivities(activitiesData);
    } catch (err) {
      setError("Failed to load contact details");
      toast.error("Failed to load contact details");
    } finally {
      setLoading(false);
    }
  };

  const handleEditContact = () => {
    navigate(`/contacts`);
    // In a real app, you'd navigate to edit mode or show edit form
  };

  const handleDeleteContact = async () => {
    if (window.confirm(`Are you sure you want to delete ${contact.name}?`)) {
      try {
        await contactService.delete(contact.Id);
        toast.success("Contact deleted successfully");
        navigate("/contacts");
      } catch (err) {
        toast.error("Failed to delete contact");
      }
    }
  };

  const getStatusVariant = (status) => {
    switch (status) {
      case "active": return "success";
      case "inactive": return "default";
      case "lead": return "warning";
      case "prospect": return "primary";
      default: return "default";
    }
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <Header
          title="Contact Details"
          onMenuClick={onMenuClick}
        />
        <Loading />
      </div>
    );
  }

  if (error || !contact) {
    return (
      <div className="space-y-6">
        <Header
          title="Contact Details"
          onMenuClick={onMenuClick}
        />
        <Error 
          title="Failed to load contact"
          message={error}
          onRetry={loadContactData}
        />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Header
        title="Contact Details"
        onMenuClick={onMenuClick}
        actions={
          <div className="flex items-center gap-2">
            <Button
              variant="secondary"
              size="small"
              onClick={() => navigate("/contacts")}
              className="flex items-center gap-2"
            >
              <ApperIcon name="ArrowLeft" className="h-4 w-4" />
              Back
            </Button>
            <Button
              variant="ghost"
              size="small"
              onClick={handleEditContact}
              className="flex items-center gap-2"
            >
              <ApperIcon name="Edit2" className="h-4 w-4" />
              Edit
            </Button>
          </div>
        }
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <Card className="p-6">
            <div className="text-center mb-6">
              <Avatar
                fallback={contact.name.charAt(0).toUpperCase()}
                size="xl"
                className="mx-auto mb-4"
              />
              <h1 className="text-2xl font-bold text-gray-900 mb-2">
                {contact.name}
              </h1>
              <p className="text-gray-600 mb-4">{contact.company}</p>
              <Badge variant={getStatusVariant(contact.status)}>
                {contact.status}
              </Badge>
            </div>

            <div className="space-y-4 mb-6">
              <div className="flex items-center gap-3">
                <ApperIcon name="Mail" className="h-5 w-5 text-gray-400" />
                <div>
                  <p className="text-sm text-gray-600">Email</p>
                  <p className="font-medium text-gray-900">{contact.email}</p>
                </div>
              </div>

              {contact.phone && (
                <div className="flex items-center gap-3">
                  <ApperIcon name="Phone" className="h-5 w-5 text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-600">Phone</p>
                    <p className="font-medium text-gray-900">{contact.phone}</p>
                  </div>
                </div>
              )}

              <div className="flex items-center gap-3">
                <ApperIcon name="Calendar" className="h-5 w-5 text-gray-400" />
                <div>
                  <p className="text-sm text-gray-600">Last Contact</p>
                  <p className="font-medium text-gray-900">
                    {new Date(contact.lastContact).toLocaleDateString()}
                  </p>
                </div>
              </div>
            </div>

            {contact.tags && contact.tags.length > 0 && (
              <div className="mb-6">
                <p className="text-sm text-gray-600 mb-2">Tags</p>
                <div className="flex flex-wrap gap-2">
                  {contact.tags.map((tag, index) => (
                    <Badge key={index} variant="default">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            <div className="space-y-2">
              <Button
                variant="primary"
                className="w-full flex items-center gap-2"
                onClick={() => toast.info("Message feature coming soon!")}
              >
                <ApperIcon name="MessageCircle" className="h-4 w-4" />
                Send Message
              </Button>
              <Button
                variant="secondary"
                className="w-full flex items-center gap-2"
                onClick={() => toast.info("Call feature coming soon!")}
              >
                <ApperIcon name="Phone" className="h-4 w-4" />
                Call
              </Button>
              <Button
                variant="danger"
                className="w-full flex items-center gap-2"
                onClick={handleDeleteContact}
              >
                <ApperIcon name="Trash2" className="h-4 w-4" />
                Delete Contact
              </Button>
            </div>
          </Card>
        </div>

        <div className="lg:col-span-2">
          <ContactTimeline activities={activities} />
        </div>
      </div>
    </div>
  );
};

export default ContactDetailPage;