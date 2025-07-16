import React, { useState, useEffect } from "react";
import { useOutletContext } from "react-router-dom";
import { toast } from "react-toastify";
import ApperIcon from "@/components/ApperIcon";
import Button from "@/components/atoms/Button";
import Header from "@/components/organisms/Header";
import InboxList from "@/components/organisms/InboxList";
import Loading from "@/components/ui/Loading";
import Error from "@/components/ui/Error";
import Empty from "@/components/ui/Empty";
import { messageService } from "@/services/api/messageService";

const InboxPage = () => {
  const { onMenuClick } = useOutletContext();
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchValue, setSearchValue] = useState("");
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    loadMessages();
  }, []);

  const loadMessages = async () => {
    try {
      setLoading(true);
      setError("");
      const data = await messageService.getAll();
      setMessages(data);
    } catch (err) {
      setError("Failed to load messages");
      toast.error("Failed to load messages");
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

  const handleMessageSelect = (message) => {
    setSelectedMessage(message);
  };

  const handleMarkAsRead = async (messageId) => {
    try {
      await messageService.update(messageId, { status: "read" });
      setMessages(prev => prev.map(msg => 
        msg.Id === messageId ? { ...msg, status: "read" } : msg
      ));
      toast.success("Message marked as read");
    } catch (err) {
      toast.error("Failed to update message");
    }
  };

  const filteredMessages = messages.filter(message => {
    const matchesSearch = !searchValue || 
      message.subject.toLowerCase().includes(searchValue.toLowerCase()) ||
      message.sender.toLowerCase().includes(searchValue.toLowerCase()) ||
      message.content.toLowerCase().includes(searchValue.toLowerCase());
    
    const matchesFilter = filter === "all" || message.status === filter;
    
    return matchesSearch && matchesFilter;
  });

  const unreadCount = messages.filter(msg => msg.status === "unread").length;

  if (loading) {
    return (
      <div className="space-y-6">
        <Header
          title="Inbox"
          onMenuClick={onMenuClick}
          searchValue={searchValue}
          onSearchChange={handleSearchChange}
          onSearchClear={handleSearchClear}
        />
        <Loading type="list" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="space-y-6">
        <Header
          title="Inbox"
          onMenuClick={onMenuClick}
          searchValue={searchValue}
          onSearchChange={handleSearchChange}
          onSearchClear={handleSearchClear}
        />
        <Error 
          title="Failed to load messages"
          message={error}
          onRetry={loadMessages}
        />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Header
        title={`Inbox ${unreadCount > 0 ? `(${unreadCount})` : ""}`}
        onMenuClick={onMenuClick}
        searchValue={searchValue}
        onSearchChange={handleSearchChange}
        onSearchClear={handleSearchClear}
        actions={
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="small"
              onClick={loadMessages}
              className="flex items-center gap-2"
            >
              <ApperIcon name="RefreshCw" className="h-4 w-4" />
              Refresh
            </Button>
            <Button
              variant="primary"
              size="small"
              className="flex items-center gap-2"
            >
              <ApperIcon name="Plus" className="h-4 w-4" />
              Compose
            </Button>
          </div>
        }
      />

      <div className="flex flex-col lg:flex-row gap-6">
        <div className="flex-1">
          <div className="mb-4">
            <div className="flex items-center gap-2 text-sm">
              <button
                onClick={() => setFilter("all")}
                className={`px-3 py-1 rounded-full transition-colors ${
                  filter === "all" 
                    ? "bg-primary-100 text-primary-700" 
                    : "text-gray-600 hover:bg-gray-100"
                }`}
              >
                All ({messages.length})
              </button>
              <button
                onClick={() => setFilter("unread")}
                className={`px-3 py-1 rounded-full transition-colors ${
                  filter === "unread" 
                    ? "bg-primary-100 text-primary-700" 
                    : "text-gray-600 hover:bg-gray-100"
                }`}
              >
                Unread ({unreadCount})
              </button>
              <button
                onClick={() => setFilter("read")}
                className={`px-3 py-1 rounded-full transition-colors ${
                  filter === "read" 
                    ? "bg-primary-100 text-primary-700" 
                    : "text-gray-600 hover:bg-gray-100"
                }`}
              >
                Read ({messages.filter(msg => msg.status === "read").length})
              </button>
            </div>
          </div>

          {filteredMessages.length === 0 ? (
            <Empty
              title="No messages found"
              message={searchValue ? "No messages match your search criteria." : "Your inbox is empty."}
              icon="Inbox"
              actionLabel="Compose Message"
              onAction={() => toast.info("Compose feature coming soon!")}
            />
          ) : (
            <InboxList
              messages={filteredMessages}
              selectedMessage={selectedMessage}
              onMessageSelect={handleMessageSelect}
            />
          )}
        </div>

        {selectedMessage && (
          <div className="lg:w-96">
            <div className="bg-white rounded-xl shadow-soft border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-gray-900">Message Details</h3>
                <Button
                  variant="ghost"
                  size="small"
                  onClick={() => setSelectedMessage(null)}
                  className="p-1"
                >
                  <ApperIcon name="X" className="h-4 w-4" />
                </Button>
              </div>

              <div className="space-y-4">
                <div>
                  <p className="text-sm text-gray-600">From</p>
                  <p className="font-medium text-gray-900">{selectedMessage.sender}</p>
                </div>

                <div>
                  <p className="text-sm text-gray-600">Subject</p>
                  <p className="font-medium text-gray-900">{selectedMessage.subject}</p>
                </div>

                <div>
                  <p className="text-sm text-gray-600">Content</p>
                  <p className="text-gray-900">{selectedMessage.content}</p>
                </div>

                <div className="flex gap-2 pt-4">
                  <Button
                    variant="primary"
                    size="small"
                    className="flex items-center gap-2"
                  >
                    <ApperIcon name="Reply" className="h-4 w-4" />
                    Reply
                  </Button>
                  {selectedMessage.status === "unread" && (
                    <Button
                      variant="secondary"
                      size="small"
                      onClick={() => handleMarkAsRead(selectedMessage.Id)}
                      className="flex items-center gap-2"
                    >
                      <ApperIcon name="Check" className="h-4 w-4" />
                      Mark as Read
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default InboxPage;