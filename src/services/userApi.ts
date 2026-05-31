import apiClient from "./apiClient";
import type { UserProfile, UpdateProfileResponse, UserListResponse } from "../types/user.type";

export const getCurrentProfile = async (): Promise<UserProfile> => {
  const response = await apiClient.get<UserProfile>("/users/me");
  return response.data;
};

export const updateProfile = async (name: string): Promise<UpdateProfileResponse> => {
  const response = await apiClient.put<UpdateProfileResponse>("/users/me", { name });
  return response.data;
};

export const listUsers = async (params?: {
  page?: number;
  limit?: number;
  search?: string;
}): Promise<UserListResponse> => {
  const response = await apiClient.get<UserListResponse>("/users", { params });
  return response.data;
};
