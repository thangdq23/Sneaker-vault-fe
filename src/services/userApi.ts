import apiClient from "./apiClient";
import type { UserProfile, UpdateProfileResponse, UserListResponse, Address } from "../types/user.type";

export const getCurrentProfile = async (): Promise<UserProfile> => {
  const response = await apiClient.get<UserProfile>("/users/me");
  return response.data;
};

export const updateProfile = async (data: {
  name?: string;
  phone?: string;
  avatar?: string;
}): Promise<UpdateProfileResponse> => {
  const response = await apiClient.put<UpdateProfileResponse>("/users/me", data);
  return response.data;
};

export const changePassword = async (passwordData: {
  currentPassword?: string;
  newPassword?: string;
}): Promise<{ message: string }> => {
  const response = await apiClient.put<{ message: string }>(
    "/users/me/change-password",
    passwordData
  );
  return response.data;
};

export const addAddress = async (addressData: {
  receiverName: string;
  phone: string;
  addressDetail: string;
  isDefault?: boolean;
}): Promise<{ message: string; addresses: Address[] }> => {
  const response = await apiClient.post<{ message: string; addresses: Address[] }>(
    "/users/me/addresses",
    addressData
  );
  return response.data;
};

export const updateAddress = async (
  addressId: string,
  addressData: {
    receiverName: string;
    phone: string;
    addressDetail: string;
    isDefault?: boolean;
  }
): Promise<{ message: string; addresses: Address[] }> => {
  const response = await apiClient.put<{ message: string; addresses: Address[] }>(
    `/users/me/addresses/${addressId}`,
    addressData
  );
  return response.data;
};

export const deleteAddress = async (
  addressId: string
): Promise<{ message: string; addresses: Address[] }> => {
  const response = await apiClient.delete<{ message: string; addresses: Address[] }>(
    `/users/me/addresses/${addressId}`
  );
  return response.data;
};

export const setDefaultAddress = async (
  addressId: string
): Promise<{ message: string; addresses: Address[] }> => {
  const response = await apiClient.patch<{ message: string; addresses: Address[] }>(
    `/users/me/addresses/${addressId}/default`
  );
  return response.data;
};

export const uploadAvatar = async (file: File): Promise<string> => {
  const formData = new FormData();
  formData.append("avatar", file);
  const response = await apiClient.post<{ url: string }>("/users/me/avatar", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data.url;
};

export const listUsers = async (params?: {
  page?: number;
  limit?: number;
  search?: string;
}): Promise<UserListResponse> => {
  const response = await apiClient.get<UserListResponse>("/users", { params });
  return response.data;
};
