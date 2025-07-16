import React, { useState, useEffect } from "react";
import { useOutletContext, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import ApperIcon from "@/components/ApperIcon";
import Button from "@/components/atoms/Button";
import Header from "@/components/organisms/Header";
import ContactList from "@/components/organisms/ContactList";
import ContactForm from "@/components/organisms/ContactForm";
import Loading from "@/components/ui/Loading";
import Error from "@/components/ui/Error";
import Empty from "@/components/ui/Empty";
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
    setSearchValue(e.target.value);
  };

  const handleSearchClear = () => {
    setSearchValue("");
  };

  const handleContactClick = (contact) => {
    navigate(`/contacts/${contact.Id}`);
  };

  const handleAddContact = () => {
    setEditingContact(null);
    setShowForm(true);
  };

  const handleEditContact = (contact) => {
    setEditingContact(contact);
    setShowForm(true);
  };

  const handleDeleteContact = async (contact) => {
    if (window.confirm(`Are you sure you want to delete ${contact.name}?`)) {
      try {
        await contactService.delete(contact.Id);
        setContacts(prev => prev.filter(c => c.Id !== contact.Id));
        toast.success("Contact deleted successfully");
      } catch (err) {
        toast.error("Failed to delete contact");
      }
    }
  };

  const handleSaveContact = async (contactData) => {
    try {
      if (editingContact) {
        const updatedContact = await contactService.update(editingContact.Id, contactData);
        setContacts(prev => prev.map(c => 
          c.Id === editingContact.Id ? updatedContact : c
        ));
      } else {
        const newContact = await contactService.create(contactData);
        setContacts(prev => [...prev, newContact]);
      }
      setShowForm(false);
      setEditingContact(null);
    } catch (err) {
      throw err;
    }
  };

  const handleCancelForm = () => {
    setShowForm(false);
    setEditingContact(null);
  };

  const filteredContacts = contacts.filter(contact => {
    if (!searchValue) return true;
    
    const searchLower = searchValue.toLowerCase();
    return (
      contact.name.toLowerCase().includes(searchLower) ||
      contact.email.toLowerCase().includes(searchLower) ||
      contact.company.toLowerCase().includes(searchLower) ||
      contact.tags.some(tag => tag.toLowerCase().includes(searchLower))
    );
  });

  if (loading) {
    return (
      <div className="space-y-6">
        <Header
          title="Contacts"
          onMenuClick={onMenuClick}
          searchValue={searchValue}
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