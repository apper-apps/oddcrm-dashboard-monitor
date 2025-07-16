import React, { useState } from "react";
import { motion } from "framer-motion";
import ApperIcon from "@/components/ApperIcon";
import Button from "@/components/atoms/Button";
import NavigationItem from "@/components/molecules/NavigationItem";
import { cn } from "@/utils/cn";

const Sidebar = ({ isOpen, onClose, className }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const navigationItems = [
    { to: "/inbox", icon: "Inbox", label: "Inbox", badge: "12" },
    { to: "/contacts", icon: "Users", label: "Contacts" },
    { to: "/pipeline", icon: "BarChart3", label: "Pipeline" },
    { to: "/settings", icon: "Settings", label: "Settings" },
  ];

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Desktop Sidebar */}
      <div className={cn(
        "hidden lg:flex lg:flex-col lg:w-64 lg:fixed lg:inset-y-0 bg-white border-r border-gray-200 z-30",
        isCollapsed && "lg:w-16",
        className
      )}>
        <div className="flex items-center justify-between p-6">
          {!isCollapsed && (
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary-600 to-primary-700 flex items-center justify-center">
                <ApperIcon name="Zap" className="h-5 w-5 text-white" />
              </div>
              <h1 className="text-xl font-bold text-gradient">ODDCRM</h1>
            </div>
          )}
          <Button
            variant="ghost"
            size="small"
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="p-2"
          >
            <ApperIcon name={isCollapsed ? "ChevronRight" : "ChevronLeft"} className="h-4 w-4" />
          </Button>
        </div>

        <nav className="flex-1 px-4 pb-4">
          <div className="space-y-2">
            {navigationItems.map((item) => (
              <NavigationItem
                key={item.to}
                to={item.to}
                icon={item.icon}
                label={!isCollapsed ? item.label : ""}
                badge={!isCollapsed ? item.badge : undefined}
                className={cn(
                  "transition-all duration-200",
                  isCollapsed && "justify-center px-2"
                )}
              />
            ))}
          </div>
        </nav>

        <div className="p-4 border-t border-gray-200">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary-500 to-secondary-500 flex items-center justify-center">
              <span className="text-white text-sm font-medium">JD</span>
            </div>
            {!isCollapsed && (
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900">John Doe</p>
                <p className="text-xs text-gray-600">john@company.com</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Sidebar */}
      <motion.div
        initial={{ x: "-100%" }}
        animate={{ x: isOpen ? 0 : "-100%" }}
        transition={{ type: "tween", duration: 0.3 }}
        className={cn(
          "fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-gray-200 lg:hidden",
          className
        )}
      >
        <div className="flex items-center justify-between p-6">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary-600 to-primary-700 flex items-center justify-center">
              <ApperIcon name="Zap" className="h-5 w-5 text-white" />
            </div>
            <h1 className="text-xl font-bold text-gradient">ODDCRM</h1>
          </div>
          <Button
            variant="ghost"
            size="small"
            onClick={onClose}
            className="p-2"
          >
            <ApperIcon name="X" className="h-4 w-4" />
          </Button>
        </div>

        <nav className="flex-1 px-4 pb-4">
          <div className="space-y-2">
            {navigationItems.map((item) => (
              <NavigationItem
                key={item.to}
                to={item.to}
                icon={item.icon}
                label={item.label}
                badge={item.badge}
                onClick={onClose}
              />
            ))}
          </div>
        </nav>

        <div className="p-4 border-t border-gray-200">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary-500 to-secondary-500 flex items-center justify-center">
              <span className="text-white text-sm font-medium">JD</span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900">John Doe</p>
              <p className="text-xs text-gray-600">john@company.com</p>
            </div>
          </div>
        </div>
      </motion.div>
    </>
  );
};

export default Sidebar;