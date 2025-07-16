import React, { useEffect, useState } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import { toast } from "react-toastify";
import ApperIcon from "@/components/ApperIcon";
import Empty from "@/components/ui/Empty";
import Error from "@/components/ui/Error";
import Loading from "@/components/ui/Loading";
import ContactList from "@/components/organisms/ContactList";
import Header from "@/components/organisms/Header";
import ContactForm from "@/components/organisms/ContactForm";
import Button from "@/components/atoms/Button";
import { contactService } from "@/services/api/contactService";

const ContactsPage = () => {
const { onMenuClick } = useOutletContext();
  const navigate = useNavigate();
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchValue, setSearchValue] = useState("");
  const [viewMode, setViewMode] = useState("grid");
  const [showForm, setShowForm] = useState(false);
  const [editingContact, setEditingContact] = useState(null);
  useEffect(() => {
    loadContacts();
  }, []);

  const loadContacts = async () => {
    try {
      setLoading(true);
      setError("");
      const data = await contactService.getAll();
      setContacts(data);
    } catch (err) {
      setError("Failed to load contacts");
      toast.error("Failed to load contacts");
    } finally {
      setLoading(false);
    }
  };

const handleSearchChange = (e) => {
    const value = e?.target?.value || "";
    setSearchValue(value);
  };

  const handleSearchClear = () => {
    setSearchValue("");
  };

  const handleContactClick = (contact) => {
    navigate(`/contacts/${contact.id}`);
  };

  const handleAddContact = () => {
    setEditingContact(null);
    setShowForm(true);
  };

  const handleCancelForm = () => {
    setEditingContact(null);
    setShowForm(false);
  };

  const handleEditContact = (contact) => {
    setEditingContact(contact);
    setShowForm(true);
  };

const handleDeleteContact = async (contact) => {
    if (!contact?.id && !contact?.Id) {
      toast.error("Invalid contact data");
      return;
    }
    
    const contactId = contact.id || contact.Id;
    const contactName = contact.name || 'this contact';
    
    if (window.confirm(`Are you sure you want to delete ${contactName}?`)) {
      try {
        await contactService.delete(contactId);
        setContacts(prev => prev.filter(c => 
          (c.id || c.Id) !== contactId
        ));
        toast.success("Contact deleted successfully");
      } catch (err) {
        console.error('Delete contact error:', err);
        toast.error("Failed to delete contact");
      }
    }
  };

  const handleSaveContact = async (contactData) => {
    if (!contactData) {
      toast.error("Invalid contact data");
      return;
    }

    try {
      if (editingContact) {
        const contactId = editingContact.id || editingContact.Id;
        const updatedContact = await contactService.update(contactId, contactData);
        setContacts(prev => prev.map(c => {
          const currentId = c.id || c.Id;
          return currentId === contactId ? updatedContact : c;
        }));
        toast.success("Contact updated successfully");
      } else {
        const newContact = await contactService.create(contactData);
        setContacts(prev => [...prev, newContact]);
        toast.success("Contact created successfully");
      }
      
      setEditingContact(null);
      setShowForm(false);
    } catch (err) {
      console.error('Save contact error:', err);
      toast.error(editingContact ? "Failed to update contact" : "Failed to create contact");
    }
  };

  const searchLower = (searchValue || "").toLowerCase();
const filteredContacts = contacts.filter(contact => {
    if (!searchValue) return true;
    if (!contact) return false;
    
    const searchLower = searchValue.toLowerCase();
    return (
      contact.name?.toLowerCase().includes(searchLower) ||
      contact.email?.toLowerCase().includes(searchLower) ||
      contact.company?.toLowerCase().includes(searchLower) ||
      contact.tags?.some(tag => tag?.toLowerCase().includes(searchLower))
    );
  });

  if (loading) {
    return (
      <div className="space-y-6">
<Header
          title="Contacts"
          onMenuClick={onMenuClick}
          searchValue={searchValue || ""}
          onSearchChange={handleSearchChange}
          onSearchClear={handleSearchClear}
        />
        <Loading type="cards" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="space-y-6">
        <Header
          title="Contacts"
          onMenuClick={onMenuClick}
          searchValue={searchValue}
          onSearchChange={handleSearchChange}
          onSearchClear={handleSearchClear}
        />
        <Error 
          title="Failed to load contacts"
          message={error}
          onRetry={loadContacts}
        />
      </div>
    );
  }

  if (showForm) {
    return (
      <div className="space-y-6">
        <Header
          title={editingContact ? "Edit Contact" : "Add Contact"}
          onMenuClick={onMenuClick}
        />
        <ContactForm
          contact={editingContact}
          onSave={handleSaveContact}
          onCancel={handleCancelForm}
        />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Header
        title={`Contacts (${contacts.length})`}
        onMenuClick={onMenuClick}
        searchValue={searchValue}
        onSearchChange={handleSearchChange}
        onSearchClear={handleSearchClear}
        actions={
          <div className="flex items-center gap-2">
            <div className="flex items-center rounded-lg border border-gray-300 p-1">
              <Button
                variant={viewMode === "grid" ? "primary" : "ghost"}
                size="small"
                onClick={() => setViewMode("grid")}
                className="p-1"
              >
                <ApperIcon name="Grid3X3" className="h-4 w-4" />
              </Button>
              <Button
                variant={viewMode === "list" ? "primary" : "ghost"}
                size="small"
                onClick={() => setViewMode("list")}
                className="p-1"
              >
                <ApperIcon name="List" className="h-4 w-4" />
              </Button>
            </div>
            <Button
              variant="primary"
              size="small"
              onClick={handleAddContact}
              className="flex items-center gap-2"
            >
              <ApperIcon name="Plus" className="h-4 w-4" />
              Add Contact
            </Button>
          </div>
        }
      />

      {filteredContacts.length === 0 ? (
        <Empty
          title="No contacts found"
          message={searchValue ? "No contacts match your search criteria." : "Start building your network by adding your first contact."}
          icon="Users"
          actionLabel="Add First Contact"
          onAction={handleAddContact}
        />
      ) : (
        <ContactList
          contacts={filteredContacts}
          viewMode={viewMode}
          onContactClick={handleContactClick}
          onContactEdit={handleEditContact}
          onContactDelete={handleDeleteContact}
        />
      )}
    </div>
  );
};

export default ContactsPage;