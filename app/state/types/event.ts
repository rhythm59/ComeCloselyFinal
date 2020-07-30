export interface EventTypeI {
  id: string;
  name: string;
  createdAt?: number;
  updatedAt?: number;
}

export interface EventI {
  id?: string;
  title: string;
  type: string;
  location: string;
  date: string;
  time: string;
  ticketsAvailable: number;
  coverPhoto: string;
  createdAt?: number;
  updatedAt?: number;
  userId?: string;
}
