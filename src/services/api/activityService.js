import activitiesData from "@/services/mockData/activities.json";

// Simulate API delays
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

class ActivityService {
  constructor() {
    this.activities = [...activitiesData];
  }

  async getAll() {
    await delay(300);
    return [...this.activities];
  }

  async getById(id) {
    await delay(200);
    const activity = this.activities.find(a => a.Id === id);
    if (!activity) {
      throw new Error("Activity not found");
    }
    return { ...activity };
  }

  async create(activityData) {
    await delay(400);
    const newActivity = {
      Id: Math.max(...this.activities.map(a => a.Id)) + 1,
      ...activityData,
      timestamp: new Date().toISOString(),
    };
    this.activities.push(newActivity);
    return { ...newActivity };
  }

  async update(id, updates) {
    await delay(300);
    const index = this.activities.findIndex(a => a.Id === id);
    if (index === -1) {
      throw new Error("Activity not found");
    }
    this.activities[index] = { ...this.activities[index], ...updates };
    return { ...this.activities[index] };
  }

  async delete(id) {
    await delay(250);
    const index = this.activities.findIndex(a => a.Id === id);
    if (index === -1) {
      throw new Error("Activity not found");
    }
    this.activities.splice(index, 1);
    return true;
  }

  async getByContactId(contactId) {
    await delay(200);
    return this.activities.filter(a => a.contactId === contactId);
  }
}

export const activityService = new ActivityService();