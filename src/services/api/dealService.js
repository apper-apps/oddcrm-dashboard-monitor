import dealsData from "@/services/mockData/deals.json";

// Simulate API delays
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

class DealService {
  constructor() {
    this.deals = [...dealsData];
  }

  async getAll() {
    await delay(300);
    return [...this.deals];
  }

  async getById(id) {
    await delay(200);
    const deal = this.deals.find(d => d.Id === id);
    if (!deal) {
      throw new Error("Deal not found");
    }
    return { ...deal };
  }

  async create(dealData) {
    await delay(400);
    const newDeal = {
      Id: Math.max(...this.deals.map(d => d.Id)) + 1,
      ...dealData,
      createdAt: new Date().toISOString(),
    };
    this.deals.push(newDeal);
    return { ...newDeal };
  }

  async update(id, updates) {
    await delay(300);
    const index = this.deals.findIndex(d => d.Id === id);
    if (index === -1) {
      throw new Error("Deal not found");
    }
    this.deals[index] = { ...this.deals[index], ...updates };
    return { ...this.deals[index] };
  }

  async delete(id) {
    await delay(250);
    const index = this.deals.findIndex(d => d.Id === id);
    if (index === -1) {
      throw new Error("Deal not found");
    }
    this.deals.splice(index, 1);
    return true;
  }

  async getByContactId(contactId) {
    await delay(200);
    return this.deals.filter(d => d.contactId === contactId);
  }
}

export const dealService = new DealService();