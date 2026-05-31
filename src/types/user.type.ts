export interface UserProfile {
  _id: string;
  name: string;
  email: string;
  role: "user" | "admin";
  createdAt?: string;
  updatedAt?: string;
}

export interface UpdateProfileResponse {
  message: string;
  user: {
    id: string;
    name: string;
    email: string;
    role: "user" | "admin";
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
