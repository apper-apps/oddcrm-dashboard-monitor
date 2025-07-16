import messagesData from "@/services/mockData/messages.json";

// Simulate API delays
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

class MessageService {
  constructor() {
    this.messages = [...messagesData];
  }

  async getAll() {
    await delay(300);
    return [...this.messages];
  }

  async getById(id) {
    await delay(200);
    const message = this.messages.find(m => m.Id === id);
    if (!message) {
      throw new Error("Message not found");
    }
    return { ...message };
  }

  async create(messageData) {
    await delay(400);
    const newMessage = {
      Id: Math.max(...this.messages.map(m => m.Id)) + 1,
      ...messageData,
      timestamp: new Date().toISOString(),
    };
    this.messages.push(newMessage);
    return { ...newMessage };
  }

  async update(id, updates) {
    await delay(300);
    const index = this.messages.findIndex(m => m.Id === id);
    if (index === -1) {
      throw new Error("Message not found");
    }
    this.messages[index] = { ...this.messages[index], ...updates };
    return { ...this.messages[index] };
  }

  async delete(id) {
    await delay(250);
    const index = this.messages.findIndex(m => m.Id === id);
    if (index === -1) {
      throw new Error("Message not found");
    }
    this.messages.splice(index, 1);
    return true;
  }

  async getByContactId(contactId) {
    await delay(200);
    return this.messages.filter(m => m.contactId === contactId);
  }
}

export const messageService = new MessageService();