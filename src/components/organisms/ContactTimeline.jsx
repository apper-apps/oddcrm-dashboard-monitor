import React from "react";
import ActivityItem from "@/components/molecules/ActivityItem";
import Card from "@/components/atoms/Card";
import { cn } from "@/utils/cn";

const ContactTimeline = ({ 
  activities, 
  className,
  ...props 
}) => {
  const sortedActivities = [...activities].sort((a, b) => 
    new Date(b.timestamp) - new Date(a.timestamp)
  );

  return (
    <Card className={cn("divide-y divide-gray-200", className)} {...props}>
      <div className="p-4 border-b border-gray-200">
        <h3 className="font-semibold text-gray-900">Activity Timeline</h3>
        <p className="text-sm text-gray-600">Recent interactions and updates</p>
      </div>
      
      <div className="max-h-96 overflow-y-auto scrollbar-thin">
        {sortedActivities.length === 0 ? (
          <div className="p-8 text-center text-gray-500">
            <p>No activities yet</p>
          </div>
        ) : (
          sortedActivities.map((activity) => (
            <ActivityItem
              key={activity.Id}
              activity={activity}
              className="border-b border-gray-100 last:border-b-0"
            />
          ))
        )}
      </div>
    </Card>
  );
};

export default ContactTimeline;