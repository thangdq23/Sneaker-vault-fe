import apiClient from "./apiClient";
import type {
  AuthResponse,
  LoginRequest,
  RegisterRequest,
} from "../types/auth.type";

export const login = async (data: LoginRequest): Promise<AuthResponse> => {
  const response = await apiClient.post<AuthResponse>("/auth/login", data);
  return response.data;
};

export const register = async (
  data: RegisterRequest,
): Promise<AuthResponse> => {
  const response = await apiClient.post<AuthResponse>("/auth/register", data);
  return response.data;
};
