export interface Address {
  _id: string;
  receiverName: string;
  phone: string;
  addressDetail: string;
  isDefault: boolean;
}

export interface UserProfile {
  _id: string;
  name: string;
  email: string;
  role: "user" | "admin";
  avatar?: string;
  phone?: string;
  addresses?: Address[];
  isActive?: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface UserDetailsResponse {
  user: UserProfile;
  totalOrders: number;
  totalSpent: number;
  orders: any[]; // Order list array
}

export interface UpdateProfileResponse {
  message: string;
  user: {
    id: string;
    name: string;
    email: string;
    role: "user" | "admin";
    avatar?: string;
    phone?: string;
    addresses?: Address[];
  };
}

export interface UserListResponse {
  data: UserProfile[];
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}
