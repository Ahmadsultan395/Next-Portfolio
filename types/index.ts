// Profile related types
export interface Profile {
  id: string;
  name: string;
  role: string;
  email: string;
  phone: string;
  location: string;
  bio: string;
  github: string;
  portfolio: string;
  linkedin: string;
  upwork: string;
  avatar?: string;
  isVisible: boolean;
  isAvailableForFreelance: boolean;
  acceptContactForm: boolean;
  showSocialLinks: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface ProfileFormData {
  name: string;
  role: string;
  email: string;
  phone: string;
  location: string;
  bio: string;
  github: string;
  portfolio: string;
  linkedin: string;
  upwork: string;
}

// Common component types
export interface BreadcrumbItem {
  label: string;
  href?: string;
  active?: boolean;
}

export interface DropdownOption {
  value: string;
  label: string;
  icon?: string;
}

export interface ToastMessage {
  id: string;
  type: "success" | "error" | "info" | "warning";
  message: string;
}
