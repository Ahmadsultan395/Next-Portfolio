export interface Service {
  _id: string;
  title: string;
  subtitle: string;
  description: string;
  badge: string;
  tech: string[];
  features: string[];
  icon: string;
  color: string;
  order: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}
export interface ServiceFormValues {
  title: string;
  subtitle: string;
  description: string;
  badge: string;
  tech: string[];
  features: string[];
  icon: string;
  color: string;
  order: number;
  isActive: boolean;
}
export interface ServiceResponse  { success: boolean; data: Service }
export interface ServicesResponse { success: boolean; data: Service[] }
export interface ServiceContextType {
  services: Service[];
  loading: boolean;
  error: string | null;
  fetchServices: () => Promise<void>;
  createService: (v: ServiceFormValues) => Promise<void>;
  updateService: (id: string, v: ServiceFormValues) => Promise<void>;
  deleteService: (id: string) => Promise<void>;
}
