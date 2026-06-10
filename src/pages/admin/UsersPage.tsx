import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAppSelector } from "../../store/hooks";
import { listUsers, blockUser, unblockUser } from "../../services/userApi";
import type { UserProfile } from "../../types/user.type";
import { useToast } from "../../contexts/ToastContext";

const UsersPage = (): React.JSX.Element => {
  const { showToast } = useToast();
  const { user: currentUser } = useAppSelector((state) => state.auth);

  const [users, setUsers] = useState<UserProfile[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");

  // Pagination State
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [totalPages, setTotalPages] = useState(1);
  const [totalUsers, setTotalUsers] = useState(0);

  // Modal State
  const [confirmModal, setConfirmModal] = useState<{
    isOpen: boolean;
    userId: string | null;
    userName: string;
    action: "block" | "unblock";
  }>({
    isOpen: false,
    userId: null,
    userName: "",
    action: "block",
  });
  const [actionLoading, setActionLoading] = useState(false);

  const fetchUsersData = async () => {
    setLoading(true);
    try {
      const res = await listUsers({
        page,
        limit,
        search: search.trim() || undefined,
      });
      setUsers(res.data);
      setTotalPages(res.meta.totalPages || 1);
      setTotalUsers(res.meta.total || 0);
    } catch (err: any) {
      showToast(
        err.response?.data?.message || err.message || "Không thể tải danh sách người dùng.",
        "error"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsersData();
  }, [page]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setPage(1);
    fetchUsersData();
  };

  const handleOpenConfirmModal = (user: UserProfile, action: "block" | "unblock") => {
    if (user._id === currentUser?._id) {
      showToast("Bạn không thể tự khóa tài khoản của chính mình!", "error");
      return;
    }
    setConfirmModal({
      isOpen: true,
      userId: user._id,
      userName: user.name,
      action,
    });
  };

  const handleConfirmAction = async () => {
    const { userId, action } = confirmModal;
    if (!userId) return;

    setActionLoading(true);
    try {
      if (action === "block") {
        await blockUser(userId);
        showToast("Đã khóa tài khoản người dùng thành công.", "success");
      } else {
        await unblockUser(userId);
        showToast("Đã mở khóa tài khoản người dùng thành công.", "success");
      }
      setConfirmModal({ isOpen: false, userId: null, userName: "", action: "block" });
      fetchUsersData();
    } catch (err: any) {
      showToast(
        err.response?.data?.message || err.message || "Thao tác thất bại. Vui lòng thử lại.",
        "error"
      );
    } finally {
      setActionLoading(false);
    }
  };

  // Client-side role filtering of paginated data
  const filteredUsers = users.filter((u) => {
    if (roleFilter === "all") return true;
    return u.role === roleFilter;
  });

  const renderSkeletonRow = (index: number) => (
    <tr key={`skeleton-${index}`} className="animate-pulse">
      <td className="py-4 px-6">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 bg-gray-200 rounded-full shrink-0"></div>
          <div className="h-4 bg-gray-200 rounded w-24"></div>
        </div>
      </td>
      <td className="py-4 px-6"><div className="h-4 bg-gray-200 rounded w-36"></div></td>
      <td className="py-4 px-6"><div className="h-4 bg-gray-200 rounded w-20"></div></td>
      <td className="py-4 px-6"><div className="h-4 bg-gray-200 rounded w-16"></div></td>
      <td className="py-4 px-6"><div className="h-4 bg-gray-200 rounded w-24"></div></td>
      <td className="py-4 px-6"><div className="h-5 bg-gray-200 rounded-full w-20 mx-auto"></div></td>
      <td className="py-4 px-6"><div className="h-8 bg-gray-200 rounded-lg w-20 mx-auto"></div></td>
    </tr>
  );

  return (
    <div className="space-y-6 animate-fade-in-up text-on-surface">
      <div>
        <h1 className="font-display text-2xl font-bold text-on-background">Quản lý người dùng</h1>
        <p className="text-sm text-secondary">Xem danh sách người dùng, theo dõi trạng thái và khóa/mở khóa tài khoản.</p>
      </div>

      <div className="bg-white p-4 rounded-2xl border border-outline-variant/20 shadow-sm flex flex-col md:flex-row gap-4 items-center justify-between">
        <form onSubmit={handleSearchSubmit} className="flex items-center bg-surface-container-low px-4 py-2 rounded-full w-full md:w-96 border border-outline-variant/30">
          <span className="material-symbols-outlined text-outline text-lg">search</span>
          <input
            className="bg-transparent border-none focus:ring-0 text-sm w-full placeholder-on-surface-variant/50 ml-2 outline-none text-on-surface"
            placeholder="Tìm theo tên, email, số điện thoại..."
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          {search && (
            <button
              type="button"
              onClick={() => {
                setSearch("");
                setPage(1);
                setTimeout(() => fetchUsersData());
              }}
              className="material-symbols-outlined text-outline hover:text-primary text-sm cursor-pointer ml-1"
            >
              close
            </button>
          )}
        </form>

        <div className="flex flex-wrap items-center gap-3 w-full md:w-auto font-body">
          <select
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value)}
            className="bg-surface-container-low text-sm rounded-xl px-4 py-2 border border-outline-variant/30 text-on-surface focus:outline-none cursor-pointer font-semibold"
          >
            <option value="all">Tất cả vai trò</option>
            <option value="admin">Quản trị viên (admin)</option>
            <option value="user">Khách hàng (user)</option>
          </select>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-outline-variant/20 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-outline-variant/30 text-xs font-semibold text-secondary uppercase bg-surface-container-low/50">
                <th className="py-3.5 px-6">Họ tên</th>
                <th className="py-3.5 px-6">Email</th>
                <th className="py-3.5 px-6">Số điện thoại</th>
                <th className="py-3.5 px-6">Vai trò</th>
                <th className="py-3.5 px-6">Ngày tham gia</th>
                <th className="py-3.5 px-6 text-center">Trạng thái</th>
                <th className="py-3.5 px-6 text-center">Thao tác</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant/20 text-sm">
              {loading ? (
                Array.from({ length: 5 }).map((_, i) => renderSkeletonRow(i))
              ) : filteredUsers.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-secondary font-medium">
                    Không tìm thấy người dùng nào.
                  </td>
                </tr>
              ) : (
                filteredUsers.map((user) => {
                  const isSelf = user._id === currentUser?._id;
                  return (
                    <tr key={user._id} className="hover:bg-surface-container-low/20 transition-colors">
                      <td className="py-4 px-6 font-semibold text-on-background">
                        <div className="flex items-center gap-3">
                          <div className="h-10 w-10 overflow-hidden rounded-full border border-outline-variant/20 bg-surface-alt flex items-center justify-center shrink-0">
                            {user.avatar ? (
                              <img src={user.avatar} alt={user.name} className="h-full w-full object-cover" />
                            ) : (
                              <span className="material-symbols-outlined text-outline text-lg">person</span>
                            )}
                          </div>
                          <span className="line-clamp-1">{user.name}</span>
                        </div>
                      </td>
                      <td className="py-4 px-6 font-mono text-xs text-secondary">{user.email}</td>
                      <td className="py-4 px-6 text-secondary">{user.phone || "N/A"}</td>
                      <td className="py-4 px-6">
                        <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                          user.role === "admin"
                            ? "bg-rose-50 text-rose-700 border border-rose-100"
                            : "bg-blue-50 text-blue-700 border border-blue-100"
                        }`}>
                          {user.role === "admin" ? "🔴 Admin" : "🔵 User"}
                        </span>
                      </td>
                      <td className="py-4 px-6 text-secondary">
                        {user.createdAt ? new Date(user.createdAt).toLocaleDateString("vi-VN") : "N/A"}
                      </td>
                      <td className="py-4 px-6 text-center">
                        <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                          user.isActive !== false
                            ? "bg-emerald-50 text-emerald-700 border border-emerald-100"
                            : "bg-rose-50 text-rose-700 border border-rose-100"
                        }`}>
                          {user.isActive !== false ? "🟢 Hoạt động" : "🔴 Đã khóa"}
                        </span>
                      </td>
                      <td className="py-4 px-6 text-center">
                        <div className="flex items-center justify-center gap-2">
                          <Link
                            to={`/admin/users/${user._id}`}
                            className="p-1.5 hover:bg-surface-container-low rounded-lg text-secondary hover:text-primary transition-colors cursor-pointer flex items-center"
                            title="Xem chi tiết"
                          >
                            <span className="material-symbols-outlined text-lg">visibility</span>
                          </Link>

                          {!isSelf && (
                            <button
                              onClick={() => handleOpenConfirmModal(user, user.isActive !== false ? "block" : "unblock")}
                              className={`p-1.5 rounded-lg transition-colors cursor-pointer flex items-center ${
                                user.isActive !== false
                                  ? "hover:bg-rose-50 text-rose-600 hover:text-rose-700"
                                  : "hover:bg-emerald-50 text-emerald-600 hover:text-emerald-700"
                              }`}
                              title={user.isActive !== false ? "Khóa tài khoản" : "Mở khóa tài khoản"}
                            >
                              <span className="material-symbols-outlined text-lg">
                                {user.isActive !== false ? "lock" : "lock_open"}
                              </span>
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        {totalPages > 1 && (
          <div className="flex items-center justify-between border-t border-outline-variant/20 px-6 py-4 bg-surface-container-lowest">
            <p className="text-xs text-secondary font-medium">
              Hiển thị <span className="font-bold text-primary">{filteredUsers.length}</span> trên{" "}
              <span className="font-bold text-primary">{totalUsers}</span> người dùng
            </p>
            <div className="flex gap-2">
              <button
                disabled={page === 1 || loading}
                onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
                className="btn btn-secondary btn-pill text-xs min-h-0 py-1.5 px-3 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
              >
                Trước
              </button>
              <div className="flex items-center gap-1.5 text-xs font-bold text-secondary font-mono">
                Trang {page} / {totalPages}
              </div>
              <button
                disabled={page === totalPages || loading}
                onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
                className="btn btn-secondary btn-pill text-xs min-h-0 py-1.5 px-3 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
              >
                Sau
              </button>
            </div>
          </div>
        )}
      </div>

      {confirmModal.isOpen && (
        <div className="fixed inset-0 z-[250] flex items-center justify-center bg-black/60 p-4">
          <div className="w-full max-w-sm rounded-3xl bg-white p-6 shadow-2xl animate-fade-in-up font-body">
            <h3 className="font-display text-lg font-bold text-on-surface mb-2">
              Xác nhận {confirmModal.action === "block" ? "khóa" : "mở khóa"} tài khoản
            </h3>
            <p className="text-xs text-secondary mb-6 leading-relaxed">
              Bạn có chắc chắn muốn {confirmModal.action === "block" ? "khóa" : "mở khóa"} tài khoản của người dùng{" "}
              <strong>{confirmModal.userName}</strong> không?
              {confirmModal.action === "block" && " Khi tài khoản bị khóa, người dùng này sẽ không thể đăng nhập, đặt hàng hoặc cập nhật thông tin trên hệ thống."}
            </p>
            <div className="flex gap-3">
              <button
                type="button"
                disabled={actionLoading}
                onClick={() => setConfirmModal({ isOpen: false, userId: null, userName: "", action: "block" })}
                className="btn btn-secondary flex-1 btn-pill text-xs cursor-pointer"
              >
                Hủy
              </button>
              <button
                type="button"
                disabled={actionLoading}
                onClick={handleConfirmAction}
                className={`btn flex-1 btn-pill text-white text-xs cursor-pointer flex items-center justify-center gap-2 border-none ${
                  confirmModal.action === "block"
                    ? "bg-rose-600 hover:bg-rose-700"
                    : "bg-emerald-600 hover:bg-emerald-700"
                }`}
              >
                {actionLoading ? (
                  <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                ) : (
                  "Xác nhận"
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UsersPage;
