export interface User {
  fname: string;
  lname: string;
  email: string;
  password: string;
  createdAt: string;
}

export interface LoginSession {
  email: string;
  name: string;
  loggedInAt: string;
  rememberMe: boolean;
}

export interface AuthContextType {
  user: User | null;
  loginSession: LoginSession | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  signup: (userData: Omit<User, "createdAt">) => Promise<boolean>;
  login: (
    email: string,
    password: string,
    rememberMe: boolean,
  ) => Promise<boolean>;
  logout: () => void;
  updateUser: (userData: Partial<User>) => void;
  checkAuth: () => void;
  forgetPassword: (email: string) => Promise<boolean>;
  resetPassword: (
    email: string,
    token: string,
    newPassword: string,
  ) => Promise<boolean>;
}
