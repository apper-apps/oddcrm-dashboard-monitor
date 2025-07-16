import React, { useState } from "react";
import { useOutletContext } from "react-router-dom";
import { toast } from "react-toastify";
import ApperIcon from "@/components/ApperIcon";
import Button from "@/components/atoms/Button";
import Card from "@/components/atoms/Card";
import FormField from "@/components/molecules/FormField";
import Header from "@/components/organisms/Header";

const SettingsPage = () => {
  const { onMenuClick } = useOutletContext();
  const [activeTab, setActiveTab] = useState("general");
  const [settings, setSettings] = useState({
    general: {
      companyName: "Your Company",
      timezone: "America/New_York",
      currency: "USD",
      language: "en",
    },
    notifications: {
      emailNotifications: true,
      pushNotifications: true,
      weeklyReports: true,
      dealUpdates: true,
    },
    pipeline: {
      defaultStages: ["Lead", "Qualified", "Proposal", "Won"],
      autoAssignDeals: false,
      dealReminders: true,
    },
  });

  const tabs = [
    { id: "general", label: "General", icon: "Settings" },
    { id: "notifications", label: "Notifications", icon: "Bell" },
    { id: "pipeline", label: "Pipeline", icon: "BarChart3" },
    { id: "integrations", label: "Integrations", icon: "Link" },
  ];

  const handleSaveSettings = () => {
    toast.success("Settings saved successfully!");
  };

  const handleUpdateSetting = (section, key, value) => {
    setSettings(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [key]: value,
      },
    }));
  };

  const renderGeneralSettings = () => (
    <Card className="p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">General Settings</h3>
      <div className="space-y-4">
        <FormField
          label="Company Name"
          value={settings.general.companyName}
          onChange={(e) => handleUpdateSetting("general", "companyName", e.target.value)}
        />
        
        <FormField
          label="Timezone"
          value={settings.general.timezone}
          onChange={(e) => handleUpdateSetting("general", "timezone", e.target.value)}
        >
          <select
            value={settings.general.timezone}
            onChange={(e) => handleUpdateSetting("general", "timezone", e.target.value)}
            className="flex h-10 w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          >
            <option value="America/New_York">Eastern Time</option>
            <option value="America/Chicago">Central Time</option>
            <option value="America/Denver">Mountain Time</option>
            <option value="America/Los_Angeles">Pacific Time</option>
          </select>
        </FormField>
        
        <FormField
          label="Currency"
          value={settings.general.currency}
          onChange={(e) => handleUpdateSetting("general", "currency", e.target.value)}
        >
          <select
            value={settings.general.currency}
            onChange={(e) => handleUpdateSetting("general", "currency", e.target.value)}
            className="flex h-10 w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          >
            <option value="USD">US Dollar</option>
            <option value="EUR">Euro</option>
            <option value="GBP">British Pound</option>
            <option value="CAD">Canadian Dollar</option>
          </select>
        </FormField>
      </div>
    </Card>
  );

  const renderNotificationSettings = () => (
    <Card className="p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Notification Settings</h3>
      <div className="space-y-4">
        {Object.entries(settings.notifications).map(([key, value]) => (
          <div key={key} className="flex items-center justify-between">
            <div>
              <label className="text-sm font-medium text-gray-700">
                {key.replace(/([A-Z])/g, " $1").replace(/^./, str => str.toUpperCase())}
              </label>
              <p className="text-xs text-gray-500">
                {key === "emailNotifications" && "Receive email notifications for important updates"}
                {key === "pushNotifications" && "Get push notifications in your browser"}
                {key === "weeklyReports" && "Weekly summary of your CRM activity"}
                {key === "dealUpdates" && "Notifications when deals are updated"}
              </p>
            </div>
            <button
              onClick={() => handleUpdateSetting("notifications", key, !value)}
              className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 ${
                value ? "bg-primary-600" : "bg-gray-200"
              }`}
            >
              <span
                className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                  value ? "translate-x-5" : "translate-x-0"
                }`}
              />
            </button>
          </div>
        ))}
      </div>
    </Card>
  );

  const renderPipelineSettings = () => (
    <Card className="p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Pipeline Settings</h3>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Default Pipeline Stages
          </label>
          <div className="space-y-2">
            {settings.pipeline.defaultStages.map((stage, index) => (
              <div key={index} className="flex items-center gap-2">
                <input
                  type="text"
                  value={stage}
                  onChange={(e) => {
                    const newStages = [...settings.pipeline.defaultStages];
                    newStages[index] = e.target.value;
                    handleUpdateSetting("pipeline", "defaultStages", newStages);
                  }}
                  className="flex h-10 w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
                <Button
                  variant="ghost"
                  size="small"
                  onClick={() => {
                    const newStages = settings.pipeline.defaultStages.filter((_, i) => i !== index);
                    handleUpdateSetting("pipeline", "defaultStages", newStages);
                  }}
                  className="p-2"
                >
                  <ApperIcon name="X" className="h-4 w-4" />
                </Button>
              </div>
            ))}
            <Button
              variant="ghost"
              size="small"
              onClick={() => {
                const newStages = [...settings.pipeline.defaultStages, "New Stage"];
                handleUpdateSetting("pipeline", "defaultStages", newStages);
              }}
              className="flex items-center gap-2"
            >
              <ApperIcon name="Plus" className="h-4 w-4" />
              Add Stage
            </Button>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div>
            <label className="text-sm font-medium text-gray-700">Auto-assign Deals</label>
            <p className="text-xs text-gray-500">Automatically assign new deals to team members</p>
          </div>
          <button
            onClick={() => handleUpdateSetting("pipeline", "autoAssignDeals", !settings.pipeline.autoAssignDeals)}
            className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 ${
              settings.pipeline.autoAssignDeals ? "bg-primary-600" : "bg-gray-200"
            }`}
          >
            <span
              className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                settings.pipeline.autoAssignDeals ? "translate-x-5" : "translate-x-0"
              }`}
            />
          </button>
        </div>

        <div className="flex items-center justify-between">
          <div>
            <label className="text-sm font-medium text-gray-700">Deal Reminders</label>
            <p className="text-xs text-gray-500">Get reminders for overdue deals</p>
          </div>
          <button
            onClick={() => handleUpdateSetting("pipeline", "dealReminders", !settings.pipeline.dealReminders)}
            className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 ${
              settings.pipeline.dealReminders ? "bg-primary-600" : "bg-gray-200"
            }`}
          >
            <span
              className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                settings.pipeline.dealReminders ? "translate-x-5" : "translate-x-0"
              }`}
            />
          </button>
        </div>
      </div>
    </Card>
  );

  const renderIntegrationSettings = () => (
    <Card className="p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Integrations</h3>
      <div className="space-y-4">
        <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-100 rounded-lg">
              <ApperIcon name="Mail" className="h-5 w-5 text-blue-600" />
            </div>
            <div>
              <p className="font-medium text-gray-900">Email Integration</p>
              <p className="text-sm text-gray-600">Connect your email account</p>
            </div>
          </div>
          <Button variant="secondary" size="small">
            Connect
          </Button>
        </div>

        <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-green-100 rounded-lg">
              <ApperIcon name="Calendar" className="h-5 w-5 text-green-600" />
            </div>
            <div>
              <p className="font-medium text-gray-900">Calendar Integration</p>
              <p className="text-sm text-gray-600">Sync with your calendar</p>
            </div>
          </div>
          <Button variant="secondary" size="small">
            Connect
          </Button>
        </div>

        <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-purple-100 rounded-lg">
              <ApperIcon name="Slack" className="h-5 w-5 text-purple-600" />
            </div>
            <div>
              <p className="font-medium text-gray-900">Slack Integration</p>
              <p className="text-sm text-gray-600">Get notifications in Slack</p>
            </div>
          </div>
          <Button variant="secondary" size="small">
            Connect
          </Button>
        </div>
      </div>
    </Card>
  );

  return (
    <div className="space-y-6">
      <Header
        title="Settings"
        onMenuClick={onMenuClick}
        actions={
          <Button
            variant="primary"
            onClick={handleSaveSettings}
            className="flex items-center gap-2"
          >
            <ApperIcon name="Save" className="h-4 w-4" />
            Save Changes
          </Button>
        }
      />

      <div className="flex flex-col lg:flex-row gap-6">
        <div className="lg:w-64">
          <Card className="p-4">
            <nav className="space-y-2">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    activeTab === tab.id
                      ? "bg-primary-100 text-primary-700"
                      : "text-gray-600 hover:bg-gray-100"
                  }`}
                >
                  <ApperIcon name={tab.icon} className="h-4 w-4" />
                  {tab.label}
                </button>
              ))}
            </nav>
          </Card>
        </div>

        <div className="flex-1">
          {activeTab === "general" && renderGeneralSettings()}
          {activeTab === "notifications" && renderNotificationSettings()}
          {activeTab === "pipeline" && renderPipelineSettings()}
          {activeTab === "integrations" && renderIntegrationSettings()}
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;