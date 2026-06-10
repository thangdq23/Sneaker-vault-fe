import apiClient from "./apiClient";
import type { DashboardData } from "../types/dashboard.type";

export const getDashboardData = async (
  startDate: string,
  endDate: string
): Promise<DashboardData> => {
  const response = await apiClient.get<DashboardData>("/dashboard", {
    params: { startDate, endDate },
  });
  return response.data;
};
