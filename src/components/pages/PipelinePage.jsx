import React, { useState, useEffect } from "react";
import { useOutletContext } from "react-router-dom";
import { toast } from "react-toastify";
import ApperIcon from "@/components/ApperIcon";
import Button from "@/components/atoms/Button";
import Header from "@/components/organisms/Header";
import PipelineBoard from "@/components/organisms/PipelineBoard";
import Loading from "@/components/ui/Loading";
import Error from "@/components/ui/Error";
import Empty from "@/components/ui/Empty";
import { dealService } from "@/services/api/dealService";
import { contactService } from "@/services/api/contactService";

const PipelinePage = () => {
  const { onMenuClick } = useOutletContext();
  const [deals, setDeals] = useState([]);
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchValue, setSearchValue] = useState("");

  const stages = [
    { name: "Lead", color: "bg-yellow-100 text-yellow-800" },
    { name: "Qualified", color: "bg-blue-100 text-blue-800" },
    { name: "Proposal", color: "bg-purple-100 text-purple-800" },
    { name: "Won", color: "bg-green-100 text-green-800" },
  ];

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      setError("");
      const [dealsData, contactsData] = await Promise.all([
        dealService.getAll(),
        contactService.getAll()
      ]);
      setDeals(dealsData);
      setContacts(contactsData);
    } catch (err) {
      setError("Failed to load pipeline data");
      toast.error("Failed to load pipeline data");
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

  const handleDealMove = async (deal, newStage) => {
    try {
      const updatedDeal = await dealService.update(deal.Id, { 
        ...deal, 
        stage: newStage 
      });
      setDeals(prev => prev.map(d => 
        d.Id === deal.Id ? updatedDeal : d
      ));
      toast.success(`Deal moved to ${newStage}`);
    } catch (err) {
      toast.error("Failed to move deal");
    }
  };

  const handleAddDeal = () => {
    toast.info("Add deal feature coming soon!");
  };

  const filteredDeals = deals.filter(deal => {
    if (!searchValue) return true;
    
    const searchLower = searchValue.toLowerCase();
    const contact = contacts.find(c => c.Id === deal.contactId);
    
    return (
      deal.title.toLowerCase().includes(searchLower) ||
      (contact && contact.name.toLowerCase().includes(searchLower))
    );
  });

  const totalValue = deals.reduce((sum, deal) => sum + deal.value, 0);
  const wonDeals = deals.filter(deal => deal.stage === "Won");
  const wonValue = wonDeals.reduce((sum, deal) => sum + deal.value, 0);

  if (loading) {
    return (
      <div className="space-y-6">
        <Header
          title="Pipeline"
          onMenuClick={onMenuClick}
          searchValue={searchValue}
          onSearchChange={handleSearchChange}
          onSearchClear={handleSearchClear}
        />
        <Loading type="pipeline" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="space-y-6">
        <Header
          title="Pipeline"
          onMenuClick={onMenuClick}
          searchValue={searchValue}
          onSearchChange={handleSearchChange}
          onSearchClear={handleSearchClear}
        />
        <Error 
          title="Failed to load pipeline"
          message={error}
          onRetry={loadData}
        />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Header
        title="Pipeline"
        onMenuClick={onMenuClick}
        searchValue={searchValue}
        onSearchChange={handleSearchChange}
        onSearchClear={handleSearchClear}
        actions={
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="small"
              onClick={loadData}
              className="flex items-center gap-2"
            >
              <ApperIcon name="RefreshCw" className="h-4 w-4" />
              Refresh
            </Button>
            <Button
              variant="primary"
              size="small"
              onClick={handleAddDeal}
              className="flex items-center gap-2"
            >
              <ApperIcon name="Plus" className="h-4 w-4" />
              Add Deal
            </Button>
          </div>
        }
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className="bg-white rounded-xl p-6 shadow-soft border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Pipeline</p>
              <p className="text-2xl font-bold text-gradient">
                ${totalValue.toLocaleString()}
              </p>
            </div>
            <div className="p-3 bg-blue-100 rounded-full">
              <ApperIcon name="TrendingUp" className="h-6 w-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-soft border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Won Deals</p>
              <p className="text-2xl font-bold text-gradient">
                ${wonValue.toLocaleString()}
              </p>
            </div>
            <div className="p-3 bg-green-100 rounded-full">
              <ApperIcon name="CheckCircle" className="h-6 w-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-soft border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Active Deals</p>
              <p className="text-2xl font-bold text-gradient">
                {deals.filter(d => d.stage !== "Won").length}
              </p>
            </div>
            <div className="p-3 bg-purple-100 rounded-full">
              <ApperIcon name="Clock" className="h-6 w-6 text-purple-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-soft border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Conversion Rate</p>
              <p className="text-2xl font-bold text-gradient">
                {deals.length > 0 ? Math.round((wonDeals.length / deals.length) * 100) : 0}%
              </p>
            </div>
            <div className="p-3 bg-orange-100 rounded-full">
              <ApperIcon name="Target" className="h-6 w-6 text-orange-600" />
            </div>
          </div>
        </div>
      </div>

      {filteredDeals.length === 0 ? (
        <Empty
          title="No deals found"
          message={searchValue ? "No deals match your search criteria." : "Start tracking your sales opportunities by adding your first deal."}
          icon="BarChart3"
          actionLabel="Add First Deal"
          onAction={handleAddDeal}
        />
      ) : (
        <PipelineBoard
          stages={stages}
          deals={filteredDeals}
          contacts={contacts}
          onDealMove={handleDealMove}
        />
      )}
    </div>
  );
};

export default PipelinePage;