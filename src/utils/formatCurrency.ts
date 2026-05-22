export const formatVnd = (amount: number): string =>
  amount.toLocaleString("vi-VN", {
    style: "currency",
    currency: "VND",
  });
