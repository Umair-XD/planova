export interface User {
  _id: string;
  name: string;
  email: string;
  password?: string;
  avatar?: string;
  createdAt: Date;
}

export interface Activity {
  time: string;
  description: string;
  cost: number;
}

export interface ItineraryDay {
  day: number;
  date: Date | string;
  title: string;
  activities: Activity[];
  accommodation?: string;
  meals: string[];
  estimatedCost: number;
}

export interface Trip {
  _id: string;
  userId: string;
  title: string;
  destination: string;
  startDate: Date | string;
  endDate: Date | string;
  budget: number;
  currency: string;
  duration: number;
  itinerary: ItineraryDay[];
  totalEstimatedCost: number;
  status: "planning" | "confirmed" | "completed";
  tags: string[];
  createdAt: Date;
  updatedAt: Date;
}

export interface Message {
  _id: string;
  userId: string;
  sessionId: string;
  role: "user" | "assistant";
  content: string;
  createdAt: Date;
}

export interface ApiResponse<T> {
  data: T | null;
  error: string | null;
}
