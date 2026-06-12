import React, { useEffect, useState } from "react";
import { getAllReviews, deleteReview } from "../../services/reviewApi";
import { useToast } from "../../contexts/ToastContext";
import ProductRating from "../../components/product/ProductRating";

const ReviewsPage = (): React.JSX.Element => {
  const { showToast } = useToast();

  const [reviews, setReviews] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [ratingFilter, setRatingFilter] = useState("all");

  // Pagination State
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [totalPages, setTotalPages] = useState(1);
  const [totalReviews, setTotalReviews] = useState(0);

  // Modal State
  const [confirmModal, setConfirmModal] = useState<{
    isOpen: boolean;
    reviewId: string | null;
    reviewerName: string;
    productName: string;
  }>({
    isOpen: false,
    reviewId: null,
    reviewerName: "",
    productName: "",
  });
  const [actionLoading, setActionLoading] = useState(false);

  const fetchReviewsData = async () => {
    setLoading(true);
    try {
      const ratingParam = ratingFilter === "all" ? undefined : ratingFilter;
      const res = await getAllReviews({
        page,
        limit,
        rating: ratingParam,
        search: search.trim() || undefined,
      });
      setReviews(res.data || []);
      setTotalPages(res.meta?.totalPages || 1);
      setTotalReviews(res.meta?.total || 0);
    } catch (err: any) {
      showToast(
        err.response?.data?.message ||
          err.message ||
          "Không thể tải danh sách đánh giá.",
        "error",
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReviewsData();
  }, [page, ratingFilter]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setPage(1);
    fetchReviewsData();
  };

  const handleOpenConfirmModal = (review: any) => {
    setConfirmModal({
      isOpen: true,
      reviewId: review._id,
      reviewerName: review.user?.name || "Khách hàng",
      productName: review.product?.name || "Sản phẩm",
    });
  };

  const handleConfirmAction = async () => {
    const { reviewId } = confirmModal;
    if (!reviewId) return;

    setActionLoading(true);
    try {
      await deleteReview(reviewId);
      showToast("Đã xóa đánh giá thành công.", "success");
      setConfirmModal({
        isOpen: false,
        reviewId: null,
        reviewerName: "",
        productName: "",
      });
      fetchReviewsData();
    } catch (err: any) {
      showToast(
        err.response?.data?.message ||
          err.message ||
          "Xóa đánh giá thất bại. Vui lòng thử lại.",
        "error",
      );
    } finally {
      setActionLoading(false);
    }
  };

  return (
    <div className="space-y-6 text-on-surface">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl font-bold text-on-background">
            Quản lý đánh giá
          </h1>
          <p className="text-sm text-secondary font-body mt-1">
            Xem và kiểm duyệt các đánh giá sản phẩm của khách hàng.
          </p>
        </div>
        <div className="text-xs font-semibold px-3 py-1.5 rounded-full bg-slate-100 text-secondary border border-outline-variant/35 shrink-0 self-start sm:self-center">
          Tổng cộng:{" "}
          <strong className="text-on-surface">{totalReviews} đánh giá</strong>
        </div>
      </div>

      <div className="bg-white p-4 rounded-3xl border border-outline-variant/20 shadow-sm flex flex-col md:flex-row items-center gap-4">
        <form onSubmit={handleSearchSubmit} className="w-full md:flex-grow">
          <div className="relative">
            <input
              type="text"
              placeholder="Tìm kiếm theo sản phẩm, tên khách hàng hoặc nội dung..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="bg-surface-alt w-full pl-10 pr-4 py-2.5 rounded-2xl border border-outline-variant/25 text-xs sm:text-sm font-semibold focus:outline-none focus:border-slate-400 font-body transition-colors"
            />
            {search && (
              <button
                type="button"
                onClick={() => {
                  setSearch("");
                  setPage(1);
                  setTimeout(() => fetchReviewsData(), 0);
                }}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-secondary hover:text-on-surface"
              >
                <span className="material-symbols-outlined text-base">
                  close
                </span>
              </button>
            )}
          </div>
        </form>

        <div className="flex w-full md:w-auto items-center gap-2 font-body">
          <label className="text-xs font-bold text-secondary shrink-0">
            Bộ lọc sao:
          </label>
          <select
            value={ratingFilter}
            onChange={(e) => {
              setRatingFilter(e.target.value);
              setPage(1);
            }}
            className="bg-surface-alt text-xs sm:text-sm rounded-xl px-4 py-2.5 border border-outline-variant/25 text-on-surface font-semibold focus:outline-none focus:border-slate-400 cursor-pointer shadow-sm w-full md:w-40"
          >
            <option value="all">Tất cả sao</option>
            <option value="5">5 Sao</option>
            <option value="4">4 Sao</option>
            <option value="3">3 Sao</option>
            <option value="2">2 Sao</option>
            <option value="1">1 Sao</option>
          </select>
        </div>
      </div>

      <div className="bg-white rounded-3xl border border-outline-variant/20 shadow-sm overflow-hidden">
        {loading ? (
          <div className="py-20 text-center text-secondary font-medium font-body text-sm">
            Đang tải dữ liệu đánh giá...
          </div>
        ) : reviews.length === 0 ? (
          <div className="py-20 text-center text-secondary font-medium font-body text-sm">
            Không tìm thấy đánh giá nào.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse font-body">
              <thead>
                <tr className="bg-slate-50 border-b border-outline-variant/15 text-[10px] sm:text-xs font-bold uppercase tracking-wider text-secondary">
                  <th className="px-6 py-4">Sản phẩm</th>
                  <th className="px-6 py-4">Khách hàng</th>
                  <th className="px-6 py-4">Đánh giá</th>
                  <th className="px-6 py-4">Nội dung bình luận</th>
                  <th className="px-6 py-4">Ngày tạo</th>
                  <th className="px-6 py-4 text-right">Thao tác</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-xs sm:text-sm">
                {reviews.map((rev) => (
                  <tr
                    key={rev._id}
                    className="hover:bg-slate-50/50 transition-colors"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 overflow-hidden rounded-xl border border-outline-variant/20 bg-slate-50 flex items-center justify-center shrink-0">
                          {rev.product?.images?.[0] ? (
                            <img
                              src={rev.product.images[0]}
                              alt={rev.product.name}
                              className="h-full w-full object-cover"
                            />
                          ) : (
                            <span className="material-symbols-outlined text-outline text-lg">
                              image
                            </span>
                          )}
                        </div>
                        <div className="min-w-0">
                          <span
                            className="block font-bold text-on-surface truncate max-w-[200px]"
                            title={rev.product?.name}
                          >
                            {rev.product?.name || "N/A"}
                          </span>
                          <span className="text-[10px] text-secondary font-mono bg-slate-100 px-1 rounded">
                            SKU: {rev.product?.sku || "N/A"}
                          </span>
                        </div>
                      </div>
                    </td>

                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2.5">
                        <div className="h-7 w-7 rounded-full overflow-hidden bg-slate-100 flex items-center justify-center border border-outline-variant/30 shrink-0">
                          {rev.user?.avatar ? (
                            <img
                              src={rev.user.avatar}
                              alt={rev.user?.name || "Khách hàng"}
                              className="h-full w-full object-cover"
                            />
                          ) : (
                            <span className="material-symbols-outlined text-outline text-sm">
                              person
                            </span>
                          )}
                        </div>
                        <div className="min-w-0">
                          <span className="block font-semibold text-on-surface truncate max-w-[150px]">
                            {rev.user?.name || "Khách hàng"}
                          </span>
                          <span className="block text-[10px] text-secondary truncate max-w-[150px]">
                            {rev.user?.email || ""}
                          </span>
                        </div>
                      </div>
                    </td>

                    <td className="px-6 py-4 whitespace-nowrap">
                      <ProductRating rating={rev.rating} />
                    </td>

                    <td className="px-6 py-4 max-w-xs sm:max-w-sm">
                      <p
                        className="text-secondary leading-relaxed line-clamp-2"
                        title={rev.comment}
                      >
                        {rev.comment || (
                          <em className="text-outline/70">
                            Không có bình luận
                          </em>
                        )}
                      </p>
                    </td>

                    <td className="px-6 py-4 whitespace-nowrap text-secondary text-xs">
                      {new Date(rev.createdAt).toLocaleDateString("vi-VN")}
                      <br />
                      <span className="text-[10px] text-outline">
                        {new Date(rev.createdAt).toLocaleTimeString("vi-VN", {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </span>
                    </td>

                    <td className="px-6 py-4 text-right whitespace-nowrap">
                      <button
                        onClick={() => handleOpenConfirmModal(rev)}
                        className="btn btn-outline border-rose-200 hover:bg-rose-50 text-rose-600 rounded-xl px-3 py-1.5 text-xs font-semibold cursor-pointer transition-colors"
                      >
                        Xóa
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {!loading && totalPages > 1 && (
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-6 border-t border-slate-100 font-body">
            <span className="text-xs text-secondary">
              Hiển thị trang <strong>{page}</strong> trên{" "}
              <strong>{totalPages}</strong> trang
            </span>
            <div className="flex gap-1">
              <button
                disabled={page === 1}
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                className="px-3.5 py-1.5 rounded-xl border border-outline-variant/30 text-xs font-semibold hover:bg-slate-50 transition-colors disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
              >
                Trước
              </button>
              {[...Array(totalPages)].map((_, index) => {
                const p = index + 1;
                return (
                  <button
                    key={p}
                    onClick={() => setPage(p)}
                    className={`h-8 w-8 text-xs font-bold rounded-xl transition-all cursor-pointer ${
                      page === p
                        ? "bg-slate-900 text-white shadow-sm"
                        : "border border-outline-variant/20 hover:bg-slate-50 text-secondary"
                    }`}
                  >
                    {p}
                  </button>
                );
              })}
              <button
                disabled={page === totalPages}
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                className="px-3.5 py-1.5 rounded-xl border border-outline-variant/30 text-xs font-semibold hover:bg-slate-50 transition-colors disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
              >
                Sau
              </button>
            </div>
          </div>
        )}
      </div>

      {confirmModal.isOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center z-50 animate-fade-in px-4">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-sm w-full shadow-2xl border border-outline-variant/10 font-body">
            <span className="material-symbols-outlined text-4xl text-rose-500 mb-3 block text-center">
              warning
            </span>
            <h3 className="text-base sm:text-lg font-bold text-on-surface text-center mb-2">
              Xác nhận xóa đánh giá?
            </h3>
            <p className="text-xs sm:text-sm text-secondary text-center mb-6 leading-relaxed">
              Bạn có chắc chắn muốn xóa đánh giá của khách hàng{" "}
              <strong>{confirmModal.reviewerName}</strong> cho sản phẩm{" "}
              <strong>{confirmModal.productName}</strong>? Hành động này không
              thể hoàn tác.
            </p>
            <div className="flex gap-3">
              <button
                disabled={actionLoading}
                onClick={() =>
                  setConfirmModal({
                    isOpen: false,
                    reviewId: null,
                    reviewerName: "",
                    productName: "",
                  })
                }
                className="flex-1 py-3 border border-outline-variant/30 rounded-2xl text-xs sm:text-sm font-bold text-secondary hover:bg-slate-50 transition-all disabled:opacity-50 cursor-pointer"
              >
                Hủy
              </button>
              <button
                disabled={actionLoading}
                onClick={handleConfirmAction}
                className="flex-1 py-3 bg-rose-600 hover:bg-rose-700 rounded-2xl text-xs sm:text-sm font-bold text-white shadow-sm transition-all disabled:opacity-50 cursor-pointer"
              >
                {actionLoading ? "Đang xử lý..." : "Xóa đánh giá"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ReviewsPage;
