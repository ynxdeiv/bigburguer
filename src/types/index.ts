export interface User {
  id: string;
  email: string;
  name: string;
  phone?: string;
}

export interface LoginFormData {
  email: string;
  password: string;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  available: number;
}

export interface CartItem {
  id: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
}

export interface OrderData {
  items: CartItem[];
  total: number;
  paymentMethod: string;
  status: string;
  userId?: string;
}

export interface Order extends OrderData {
  id: string;
  createdAt: string;
}

export interface ContactFormData {
  name: string;
  email: string;
  message: string;
}

export interface ContactFormType extends ContactFormData {}

export type MenuItem = {
  label: string;
  path: string;
};

export interface NavButtonProps {
  label: string;
  className?: string;
  onClick?: () => void;
}

export interface CheckoutFormData {
  name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  paymentMethod: "pix" | "credit" | "boleto";
}

export interface PaymentData {
  method: "pix" | "credit" | "boleto";
  cardNumber?: string;
  expiryDate?: string;
  cvv?: string;
  cardName?: string;
  pixKey?: string;
}

export interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  updateUser: (userData: Partial<User>) => void;
  isAuthenticated: () => boolean;
  isLoading: boolean;
}

export interface CartContextType {
  isCartOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  toggleCart: () => void;
}

export interface LoginContextType {
  isLoginOpen: boolean;
  openLogin: () => void;
  closeLogin: () => void;
  toggleLogin: () => void;
}

export interface UseCartReturn {
  cart: CartItem[];
  addToCart: (product: Omit<CartItem, "quantity">) => void;
  removeFromCart: (params: { id: string; returnStock: boolean }) => void;
  updateQuantity: (params: { id: string; quantity: number }) => void;
  clearCart: () => void;
  createOrder: (orderData: OrderData) => void;
  isAdding: boolean;
  isRemoving: boolean;
  isUpdating: boolean;
  isClearing: boolean;
  isCreatingOrder: boolean;
  total: number;
  totalItems: number;
}

export interface UseProductsReturn {
  products: Product[];
  isLoading: boolean;
  error: Error | null;
  refetch: () => void;
}

export interface BaseButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children?: React.ReactNode;
  disabled?: boolean;
  loading?: boolean;
  asChild?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  className?: string;
}

export interface InputProps {
  label?: string;
  placeholder?: string;
  type?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  disabled?: boolean;
  className?: string;
  required?: boolean;
}

export interface TextareaProps {
  label?: string;
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  error?: string;
  disabled?: boolean;
  className?: string;
  rows?: number;
  required?: boolean;
}

export interface ApiResponse<T> {
  data: T;
  message?: string;
  success: boolean;
}

export interface ApiError {
  message: string;
  status: number;
  code?: string;
}

export interface AppContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
  isDarkMode: boolean;
  resolvedTheme: Theme;
}

export type Theme = "light" | "dark" | "system";

export interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  resolvedTheme: "light" | "dark";
}

export interface ValidationError {
  field: string;
  message: string;
}

export interface FormErrors {
  [key: string]: string | undefined;
}

export type Optional<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;
export type RequiredFields<T, K extends keyof T> = T & Required<Pick<T, K>>;

export interface CustomEvent<T = any> {
  type: string;
  payload: T;
  timestamp: number;
}

export interface AppConfig {
  apiUrl: string;
  appName: string;
  version: string;
  environment: "development" | "production" | "test";
}

export interface Notification {
  id: string;
  type: "success" | "error" | "warning" | "info";
  message: string;
  duration?: number;
  timestamp: number;
}

export interface AppStats {
  totalUsers: number;
  totalOrders: number;
  totalRevenue: number;
  averageOrderValue: number;
}
