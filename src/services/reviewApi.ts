import apiClient from "./apiClient";

export const getProductReviews = async (productId: string): Promise<any> => {
  const response = await apiClient.get<any>(`/reviews/product/${productId}`);
  return response.data;
};

export const createReview = async (
  productId: string,
  rating: number,
  comment: string
): Promise<any> => {
  const response = await apiClient.post<any>("/reviews", {
    productId,
    rating,
    comment,
  });
  return response.data;
};

export const getAllReviews = async (params?: {
  page?: number;
  limit?: number;
  rating?: string;
  search?: string;
}): Promise<any> => {
  const response = await apiClient.get<any>("/reviews", {
    params,
  });
  return response.data;
};

export const deleteReview = async (reviewId: string): Promise<any> => {
  const response = await apiClient.delete<any>(`/reviews/${reviewId}`);
  return response.data;
};
