export interface AuthResponse {
  message: string;
  token: string;
  user: {
    _id: string;
    email: string;
    [key: string]: any;
  };
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  name: string;
  email: string;
  password: string;
}
