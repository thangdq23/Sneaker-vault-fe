import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { logout, updateUserProfile, updateUserAddresses, updateUserAvatar } from "../../store/authSlice";
import { resetCartState } from "../../store/cartSlice";
import { useToast } from "../../contexts/ToastContext";
import { getMyOrders } from "../../services/orderApi";
import {
  changePassword as changePasswordApi,
  addAddress as addAddressApi,
  updateAddress as updateAddressApi,
  deleteAddress as deleteAddressApi,
  setDefaultAddress as setDefaultAddressApi,
  uploadAvatar as uploadAvatarApi,
} from "../../services/userApi";
import type { Order } from "../../types/order.type";
import type { Address } from "../../types/user.type";
import { formatVnd } from "../../utils/formatCurrency";

type TabType = "info" | "addresses" | "password" | "orders";
type OrderFilterType = "all" | "pending" | "processing" | "shipped" | "delivered" | "cancelled" | "returned";

const ProfilePage = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { showToast } = useToast();

  const { token, user } = useAppSelector((state) => state.auth);

  const [activeTab, setActiveTab] = useState<TabType>("info");
  const [orderFilter, setOrderFilter] = useState<OrderFilterType>("all");

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [avatarUploading, setAvatarUploading] = useState(false);
  const [infoSaving, setInfoSaving] = useState(false);

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordSaving, setPasswordSaving] = useState(false);

  const [addressModalOpen, setAddressModalOpen] = useState(false);
  const [editingAddressId, setEditingAddressId] = useState<string | null>(null);
  const [receiverName, setReceiverName] = useState("");
  const [addressPhone, setAddressPhone] = useState("");
  const [addressDetail, setAddressDetail] = useState("");
  const [isDefaultAddress, setIsDefaultAddress] = useState(false);
  const [addressSaving, setAddressSaving] = useState(false);

  const [orders, setOrders] = useState<Order[]>([]);
  const [ordersLoading, setOrdersLoading] = useState(false);
  const [ordersError, setOrdersError] = useState<string | null>(null);

  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const [addressToDeleteId, setAddressToDeleteId] = useState<string | null>(null);

  useEffect(() => {
    if (!token) {
      navigate("/login");
      return;
    }

    if (user) {
      setName(user.name || "");
      setPhone(user.phone || "");
    }
  }, [token, navigate, user]);

  useEffect(() => {
    if (!token || activeTab !== "orders") return;

    const loadOrders = async () => {
      setOrdersLoading(true);
      setOrdersError(null);
      try {
        const res = await getMyOrders();
        setOrders(res.data);
      } catch (err: any) {
        setOrdersError(
          err.response?.data?.message ||
            err.message ||
            "Không thể tải danh sách đơn hàng."
        );
      } finally {
        setOrdersLoading(false);
      }
    };

    void loadOrders();
  }, [token, activeTab]);

  const confirmLogout = () => {
    dispatch(logout());
    dispatch(resetCartState());
    showToast("Đăng xuất thành công!", "success");
    navigate("/login");
  };

  const handleUpdateInfo = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || name.trim().length < 3) {
      showToast("Họ tên phải có ít nhất 3 ký tự.", "error");
      return;
    }

    setInfoSaving(true);
    try {
      const resultAction = await dispatch(
        updateUserProfile({
          name: name.trim(),
          phone: phone.trim(),
        })
      );
      if (updateUserProfile.fulfilled.match(resultAction)) {
        showToast("Cập nhật thông tin thành công!", "success");
      } else {
        showToast(
          (resultAction.payload as string) || "Cập nhật thông tin thất bại.",
          "error"
        );
      }
    } catch (err: any) {
      showToast(err.message || "Đã xảy ra lỗi khi lưu thông tin.", "error");
    } finally {
      setInfoSaving(false);
    }
  };

  const handleAvatarChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      showToast("Chỉ chấp nhận tệp tin hình ảnh.", "error");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      showToast("Kích thước ảnh không được vượt quá 5MB.", "error");
      return;
    }

    setAvatarUploading(true);
    try {
      const imageUrl = await uploadAvatarApi(file);
      await dispatch(updateUserProfile({ avatar: imageUrl }));
      dispatch(updateUserAvatar(imageUrl));
      showToast("Cập nhật ảnh đại diện thành công!", "success");
    } catch (err: any) {
      showToast(
        err.response?.data?.message || err.message || "Tải ảnh lên thất bại.",
        "error"
      );
    } finally {
      setAvatarUploading(false);
    }
  };

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword.length < 6) {
      showToast("Mật khẩu mới phải có ít nhất 6 ký tự.", "error");
      return;
    }
    if (newPassword !== confirmPassword) {
      showToast("Xác nhận mật khẩu mới không trùng khớp.", "error");
      return;
    }

    setPasswordSaving(true);
    try {
      await changePasswordApi({
        currentPassword,
        newPassword,
      });
      showToast("Đổi mật khẩu thành công!", "success");
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (err: any) {
      showToast(
        err.response?.data?.message || err.message || "Đổi mật khẩu thất bại.",
        "error"
      );
    } finally {
      setPasswordSaving(false);
    }
  };

  const openAddAddressModal = () => {
    setEditingAddressId(null);
    setReceiverName("");
    setAddressPhone("");
    setAddressDetail("");
    setIsDefaultAddress(user?.addresses?.length === 0); // Default if first address
    setAddressModalOpen(true);
  };

  const openEditAddressModal = (address: Address) => {
    setEditingAddressId(address._id);
    setReceiverName(address.receiverName);
    setAddressPhone(address.phone);
    setAddressDetail(address.addressDetail);
    setIsDefaultAddress(address.isDefault);
    setAddressModalOpen(true);
  };

  const handleSaveAddress = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!receiverName.trim() || receiverName.trim().length < 2) {
      showToast("Họ tên người nhận phải từ 2 ký tự.", "error");
      return;
    }
    if (!addressPhone.trim() || !/^\+?[0-9]{9,15}$/.test(addressPhone.trim())) {
      showToast("Số điện thoại không hợp lệ.", "error");
      return;
    }
    if (!addressDetail.trim() || addressDetail.trim().length < 5) {
      showToast("Địa chỉ chi tiết phải từ 5 ký tự.", "error");
      return;
    }

    setAddressSaving(true);
    try {
      const addressData = {
        receiverName: receiverName.trim(),
        phone: addressPhone.trim(),
        addressDetail: addressDetail.trim(),
        isDefault: isDefaultAddress,
      };

      let res;
      if (editingAddressId) {
        res = await updateAddressApi(editingAddressId, addressData);
        showToast("Cập nhật địa chỉ thành công!", "success");
      } else {
        res = await addAddressApi(addressData);
        showToast("Thêm địa chỉ thành công!", "success");
      }

      dispatch(updateUserAddresses(res.addresses));
      setAddressModalOpen(false);
    } catch (err: any) {
      showToast(
        err.response?.data?.message || err.message || "Lưu địa chỉ thất bại.",
        "error"
      );
    } finally {
      setAddressSaving(false);
    }
  };

  const handleDeleteAddressClick = (addressId: string) => {
    setAddressToDeleteId(addressId);
  };

  const confirmDeleteAddress = async () => {
    if (!addressToDeleteId) return;

    try {
      const res = await deleteAddressApi(addressToDeleteId);
      dispatch(updateUserAddresses(res.addresses));
      showToast("Xóa địa chỉ thành công!", "success");
    } catch (err: any) {
      showToast(
        err.response?.data?.message || err.message || "Xóa địa chỉ thất bại.",
        "error"
      );
    } finally {
      setAddressToDeleteId(null);
    }
  };

  const handleSetDefaultAddress = async (addressId: string) => {
    try {
      const res = await setDefaultAddressApi(addressId);
      dispatch(updateUserAddresses(res.addresses));
      showToast("Đã thiết lập địa chỉ mặc định mới!", "success");
    } catch (err: any) {
      showToast(
        err.response?.data?.message ||
          err.message ||
          "Không thể thiết lập địa chỉ mặc định.",
        "error"
      );
    }
  };

  if (!token || !user) return null;

  // Filters orders based on selected state
  const filteredOrders = orders.filter((order) => {
    if (orderFilter === "all") return true;
    return order.status === orderFilter;
  });

  const getStatusBadgeClass = (status: Order["status"]) => {
    switch (status) {
      case "pending":
        return "bg-amber-500/10 text-amber-500 border-amber-500/20";
      case "processing":
        return "bg-blue-500/10 text-blue-500 border-blue-500/20";
      case "shipped":
        return "bg-indigo-500/10 text-indigo-500 border-indigo-500/20";
      case "delivered":
        return "bg-emerald-500/10 text-emerald-500 border-emerald-500/20";
      case "cancelled":
        return "bg-rose-500/10 text-rose-500 border-rose-500/20";
      case "returned":
        return "bg-purple-500/10 text-purple-500 border-purple-500/20";
      default:
        return "bg-gray-500/10 text-gray-500 border-gray-500/20";
    }
  };

  const getStatusText = (status: Order["status"]) => {
    switch (status) {
      case "pending":
        return "Chờ xử lý";
      case "processing":
        return "Đã xác nhận";
      case "shipped":
        return "Đang giao hàng";
      case "delivered":
        return "Đã giao hàng";
      case "cancelled":
        return "Đã hủy";
      case "returned":
        return "Hoàn trả";
      default:
        return status;
    }
  };

  return (
    <main className="mx-auto max-w-container-max px-margin-mobile pb-20 pt-28 md:px-margin-desktop md:pt-32 text-on-surface">
      <div className="grid grid-cols-1 gap-gutter lg:grid-cols-12 items-start">
        
        <aside className="lg:col-span-3 space-y-4">
          
          <div className="rounded-3xl border border-outline-variant/20 bg-surface-container p-6 shadow-sm flex flex-col items-center text-center relative overflow-hidden">
            <div className="relative group mb-4">
              <div className="relative h-24 w-24 overflow-hidden rounded-full border-2 border-primary bg-surface-container-lowest flex items-center justify-center shadow-md">
                {user.avatar ? (
                  <img
                    src={user.avatar}
                    alt={user.name}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <span className="text-2xl font-bold uppercase text-primary">
                    {user.name
                      ? user.name
                          .split(" ")
                          .map((s) => s[0])
                          .join("")
                          .slice(0, 2)
                      : user.email.charAt(0)}
                  </span>
                )}
                
                <label className="absolute inset-0 bg-black/60 flex flex-col items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 cursor-pointer text-[10px] font-bold">
                  <span className="material-symbols-outlined text-base mb-1">
                    photo_camera
                  </span>
                  THAY ĐỔI
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleAvatarChange}
                    disabled={avatarUploading}
                    className="hidden"
                  />
                </label>
              </div>

              {avatarUploading && (
                <div className="absolute inset-0 bg-black/40 rounded-full flex items-center justify-center">
                  <div className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                </div>
              )}
            </div>

            <h3 className="font-display text-lg font-bold text-on-surface line-clamp-1">
              {user.name}
            </h3>
            <p className="text-xs text-on-surface-variant mb-4 line-clamp-1 max-w-full">
              {user.email}
            </p>
            <span className="inline-block rounded-full bg-primary/10 border border-primary/20 px-3 py-1 text-[10px] font-bold text-primary uppercase">
              Tài khoản {user.role === "admin" ? "Quản trị" : "Thành viên"}
            </span>
          </div>

          <nav className="rounded-3xl border border-outline-variant/20 bg-surface-container p-4 shadow-sm flex flex-row lg:flex-col overflow-x-auto gap-1 lg:overflow-x-visible no-scrollbar">
            
            <div className="hidden lg:block px-3 py-2 text-[10px] font-bold uppercase tracking-wider text-on-surface-variant/50">
              Tài khoản của tôi
            </div>
            
            <button
              onClick={() => setActiveTab("info")}
              className={`flex items-center gap-3 px-4 py-3 text-sm font-semibold rounded-2xl transition-all whitespace-nowrap cursor-pointer ${
                activeTab === "info"
                  ? "bg-primary text-white shadow-sm"
                  : "text-on-surface-variant hover:bg-outline-variant/10 hover:text-on-surface"
              }`}
            >
              <span className="material-symbols-outlined text-lg">person</span>
              Thông tin cá nhân
            </button>

            <button
              onClick={() => setActiveTab("addresses")}
              className={`flex items-center gap-3 px-4 py-3 text-sm font-semibold rounded-2xl transition-all whitespace-nowrap cursor-pointer ${
                activeTab === "addresses"
                  ? "bg-primary text-white shadow-sm"
                  : "text-on-surface-variant hover:bg-outline-variant/10 hover:text-on-surface"
              }`}
            >
              <span className="material-symbols-outlined text-lg">location_on</span>
              Địa chỉ giao hàng
            </button>

            <button
              onClick={() => setActiveTab("password")}
              className={`flex items-center gap-3 px-4 py-3 text-sm font-semibold rounded-2xl transition-all whitespace-nowrap cursor-pointer ${
                activeTab === "password"
                  ? "bg-primary text-white shadow-sm"
                  : "text-on-surface-variant hover:bg-outline-variant/10 hover:text-on-surface"
              }`}
            >
              <span className="material-symbols-outlined text-lg">lock</span>
              Đổi mật khẩu
            </button>

            <div className="hidden lg:block border-t border-outline-variant/20 my-2"></div>
            
            <div className="hidden lg:block px-3 py-2 text-[10px] font-bold uppercase tracking-wider text-on-surface-variant/50">
              Đơn hàng của tôi
            </div>

            <button
              onClick={() => setActiveTab("orders")}
              className={`flex items-center gap-3 px-4 py-3 text-sm font-semibold rounded-2xl transition-all whitespace-nowrap cursor-pointer ${
                activeTab === "orders"
                  ? "bg-primary text-white shadow-sm"
                  : "text-on-surface-variant hover:bg-outline-variant/10 hover:text-on-surface"
              }`}
            >
              <span className="material-symbols-outlined text-lg">shopping_bag</span>
              Lịch sử mua hàng
            </button>

            <div className="hidden lg:block border-t border-outline-variant/20 my-2"></div>

            <button
              onClick={() => setShowLogoutConfirm(true)}
              className="flex items-center gap-3 px-4 py-3 text-sm font-semibold rounded-2xl text-rose-500 hover:bg-rose-500/10 transition-all whitespace-nowrap cursor-pointer"
            >
              <span className="material-symbols-outlined text-lg">logout</span>
              Đăng xuất
            </button>
          </nav>
        </aside>

        <section className="lg:col-span-9 rounded-3xl border border-outline-variant/20 bg-surface-container-lowest p-6 shadow-sm md:p-8 min-h-[500px]">
          
          {activeTab === "info" && (
            <div className="space-y-6">
              <div>
                <h2 className="font-display text-xl font-bold text-on-surface mb-1">
                  Thông tin cá nhân
                </h2>
                <p className="text-xs text-on-surface-variant">
                  Cập nhật thông tin tài khoản của bạn
                </p>
              </div>

              <form onSubmit={handleUpdateInfo} className="space-y-5 max-w-xl">
                <div>
                  <label className="form-label">Địa chỉ Email</label>
                  <div className="relative">
                    <input
                      type="email"
                      disabled
                      value={user.email}
                      className="form-input bg-surface-container/40 border border-outline-variant/20 text-on-surface-variant cursor-not-allowed pr-10"
                    />
                    <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-lg text-outline">
                      lock
                    </span>
                  </div>
                  <p className="text-[10px] text-on-surface-variant/70 mt-1">
                    Email không thể chỉnh sửa để đảm bảo tính an toàn của tài khoản.
                  </p>
                </div>

                <div>
                  <label className="form-label">Họ và tên</label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Nhập họ và tên"
                    className="form-input bg-surface-container-lowest border border-outline-variant/30 text-on-surface"
                  />
                </div>

                <div>
                  <label className="form-label">Số điện thoại</label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="Nhập số điện thoại"
                    className="form-input bg-surface-container-lowest border border-outline-variant/30 text-on-surface"
                  />
                </div>

                <div>
                  <label className="form-label">Địa chỉ mặc định</label>
                  <div className="rounded-2xl border border-outline-variant/30 bg-surface-container/30 p-4 text-sm">
                    {user.addresses && user.addresses.length > 0 ? (
                      (() => {
                        const defAddr = user.addresses.find((a) => a.isDefault);
                        if (defAddr) {
                          return (
                            <div className="space-y-1">
                              <p className="font-bold text-on-surface">
                                {defAddr.receiverName} - {defAddr.phone}
                              </p>
                              <p className="text-on-surface-variant">{defAddr.addressDetail}</p>
                            </div>
                          );
                        }
                        return <p className="text-on-surface-variant">Chưa thiết lập địa chỉ mặc định.</p>;
                      })()
                    ) : (
                      <p className="text-on-surface-variant">
                        Bạn chưa thêm địa chỉ giao hàng nào. Hãy sang tab{" "}
                        <button
                          type="button"
                          onClick={() => setActiveTab("addresses")}
                          className="text-primary font-bold underline cursor-pointer"
                        >
                          Địa chỉ giao hàng
                        </button>{" "}
                        để thêm mới.
                      </p>
                    )}
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={infoSaving}
                    className="btn btn-primary btn-pill min-w-[120px] cursor-pointer"
                  >
                    {infoSaving ? (
                      <span className="flex items-center gap-2">
                        <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                        Đang lưu...
                      </span>
                    ) : (
                      "Lưu thông tin"
                    )}
                  </button>
                </div>
              </form>
            </div>
          )}

          {activeTab === "addresses" && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                  <h2 className="font-display text-xl font-bold text-on-surface mb-1">
                    Địa chỉ giao hàng
                  </h2>
                  <p className="text-xs text-on-surface-variant">
                    Quản lý danh sách địa chỉ nhận hàng của bạn
                  </p>
                </div>
                <button
                  onClick={openAddAddressModal}
                  className="btn btn-primary btn-pill gap-2 cursor-pointer self-start sm:self-auto text-xs"
                >
                  <span className="material-symbols-outlined text-sm">add</span>
                  Thêm địa chỉ mới
                </button>
              </div>

              {!user.addresses || user.addresses.length === 0 ? (
                <div className="py-16 text-center border border-dashed border-outline-variant/40 rounded-3xl">
                  <span className="material-symbols-outlined text-4xl text-outline-variant mb-2">
                    location_off
                  </span>
                  <p className="font-semibold text-sm mb-1">Chưa có địa chỉ nào</p>
                  <p className="text-xs text-on-surface-variant mb-4">
                    Thêm địa chỉ giao hàng để thuận tiện hơn khi đặt hàng.
                  </p>
                  <button
                    onClick={openAddAddressModal}
                    className="btn btn-secondary btn-pill text-xs cursor-pointer"
                  >
                    Thêm địa chỉ đầu tiên
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {user.addresses.map((address) => (
                    <div
                      key={address._id}
                      className={`rounded-2xl border p-5 flex flex-col justify-between transition-all duration-300 relative ${
                        address.isDefault
                          ? "border-primary bg-primary/[0.02]"
                          : "border-outline-variant/30 hover:border-outline-variant/70"
                      }`}
                    >
                      <div className="space-y-2">
                        <div className="flex items-center justify-between gap-2">
                          <span className="font-bold text-on-surface text-sm">
                            {address.receiverName}
                          </span>
                          {address.isDefault && (
                            <span className="rounded-full bg-primary text-white text-[9px] font-bold px-2 py-0.5 uppercase tracking-wide">
                              Mặc định
                            </span>
                          )}
                        </div>
                        <p className="text-xs font-semibold text-on-surface-variant">
                          SĐT: {address.phone}
                        </p>
                        <p className="text-xs text-on-surface-variant line-clamp-3">
                          {address.addressDetail}
                        </p>
                      </div>

                      <div className="mt-6 pt-4 border-t border-outline-variant/20 flex flex-wrap items-center gap-3">
                        <button
                          onClick={() => openEditAddressModal(address)}
                          className="text-xs font-bold text-primary hover:underline flex items-center gap-1 cursor-pointer"
                        >
                          <span className="material-symbols-outlined text-sm">edit</span>
                          Sửa
                        </button>
                        
                        {!address.isDefault && (
                          <>
                            <button
                              onClick={() => handleDeleteAddressClick(address._id)}
                              className="text-xs font-bold text-rose-600 hover:underline flex items-center gap-1 cursor-pointer"
                            >
                              <span className="material-symbols-outlined text-sm">delete</span>
                              Xóa
                            </button>
                            <button
                              onClick={() => handleSetDefaultAddress(address._id)}
                              className="ml-auto text-xs font-bold text-on-surface-variant hover:text-on-surface underline cursor-pointer"
                            >
                              Đặt mặc định
                            </button>
                          </>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {activeTab === "password" && (
            <div className="space-y-6">
              <div>
                <h2 className="font-display text-xl font-bold text-on-surface mb-1">
                  Đổi mật khẩu
                </h2>
                <p className="text-xs text-on-surface-variant">
                  Cập nhật mật khẩu bảo mật tài khoản của bạn
                </p>
              </div>

              <form onSubmit={handleChangePassword} className="space-y-5 max-w-xl">
                <div>
                  <label className="form-label">Mật khẩu hiện tại</label>
                  <input
                    type="password"
                    required
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    placeholder="Nhập mật khẩu hiện tại"
                    className="form-input bg-surface-container-lowest border border-outline-variant/30 text-on-surface"
                  />
                </div>

                <div>
                  <label className="form-label">Mật khẩu mới</label>
                  <input
                    type="password"
                    required
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="Mật khẩu mới ít nhất 6 ký tự"
                    className="form-input bg-surface-container-lowest border border-outline-variant/30 text-on-surface"
                  />
                </div>

                <div>
                  <label className="form-label">Xác nhận mật khẩu mới</label>
                  <input
                    type="password"
                    required
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Nhập lại mật khẩu mới"
                    className="form-input bg-surface-container-lowest border border-outline-variant/30 text-on-surface"
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={passwordSaving}
                    className="btn btn-primary btn-pill min-w-[120px] cursor-pointer"
                  >
                    {passwordSaving ? (
                      <span className="flex items-center gap-2">
                        <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                        Đang xử lý...
                      </span>
                    ) : (
                      "Đổi mật khẩu"
                    )}
                  </button>
                </div>
              </form>
            </div>
          )}

          {activeTab === "orders" && (
            <div className="space-y-6">
              <div>
                <h2 className="font-display text-xl font-bold text-on-surface mb-1">
                  Đơn hàng của tôi
                </h2>
                <p className="text-xs text-on-surface-variant">
                  Quản lý và xem lịch sử đặt hàng của bạn
                </p>
              </div>

              <div className="flex gap-1 overflow-x-auto pb-2 border-b border-outline-variant/20 no-scrollbar">
                {(
                  [
                    { id: "all", label: "Tất cả" },
                    { id: "pending", label: "Chờ xử lý" },
                    { id: "processing", label: "Đã xác nhận" },
                    { id: "shipped", label: "Đang giao" },
                    { id: "delivered", label: "Đã giao" },
                    { id: "cancelled", label: "Đã hủy" },
                    { id: "returned", label: "Hoàn trả" },
                  ] as const
                ).map((filter) => (
                  <button
                    key={filter.id}
                    onClick={() => setOrderFilter(filter.id)}
                    className={`px-4 py-2 text-xs font-bold rounded-xl whitespace-nowrap cursor-pointer transition-colors ${
                      orderFilter === filter.id
                        ? "bg-primary text-white shadow-sm"
                        : "text-on-surface-variant hover:bg-outline-variant/10 hover:text-on-surface"
                    }`}
                  >
                    {filter.label}
                  </button>
                ))}
              </div>

              {ordersLoading ? (
                <div className="py-12 text-center text-on-surface-variant font-medium text-sm">
                  <div className="h-6 w-6 animate-spin rounded-full border-2 border-primary border-t-transparent mx-auto mb-3"></div>
                  Đang tải lịch sử đơn hàng...
                </div>
              ) : ordersError ? (
                <div className="py-8 text-center text-rose-600 font-semibold bg-rose-50 rounded-2xl border border-rose-200 text-xs">
                  {ordersError}
                </div>
              ) : filteredOrders.length === 0 ? (
                <div className="py-16 text-center text-on-surface-variant">
                  <span className="material-symbols-outlined text-5xl text-outline-variant mb-3">
                    shopping_cart
                  </span>
                  <p className="font-semibold text-base mb-1">Không tìm thấy đơn hàng nào</p>
                  <p className="text-xs text-on-surface-variant mb-6">
                    Không có đơn hàng nào khớp với bộ lọc này.
                  </p>
                  {orderFilter !== "all" ? (
                    <button
                      onClick={() => setOrderFilter("all")}
                      className="btn btn-secondary btn-pill text-xs cursor-pointer"
                    >
                      Xem tất cả đơn hàng
                    </button>
                  ) : (
                    <Link to="/shop" className="btn btn-primary btn-pill text-xs">
                      Mua sắm ngay
                    </Link>
                  )}
                </div>
              ) : (
                <div className="space-y-6">
                  {filteredOrders.map((order) => (
                    <div
                      key={order._id}
                      className="rounded-2xl border border-outline-variant/35 bg-surface-container-lowest p-5 shadow-sm hover:shadow-md transition-shadow duration-300"
                    >
                      <div className="flex flex-col gap-2 border-b border-outline-variant/30 pb-4 sm:flex-row sm:items-center sm:justify-between">
                        <div>
                          <span className="block text-xs font-semibold text-on-surface-variant">
                            Mã đơn hàng
                          </span>
                          <span className="font-mono text-sm font-bold text-primary">
                            {order.orderCode}
                          </span>
                          <span className="block text-[10px] text-on-surface-variant/80 mt-0.5">
                            Ngày đặt:{" "}
                            {new Date(order.createdAt).toLocaleDateString(
                              "vi-VN"
                            )}{" "}
                            {new Date(order.createdAt).toLocaleTimeString(
                              "vi-VN",
                              { hour: "2-digit", minute: "2-digit" }
                            )}
                          </span>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          <span className="inline-block rounded-full border border-outline-variant/30 px-2.5 py-0.5 text-[10px] font-bold leading-normal uppercase">
                            {order.paymentMethod === "cod" ? "COD" : "Thẻ ngân hàng"}
                          </span>
                          <span
                            className={`inline-block rounded-full border px-2.5 py-0.5 text-[10px] font-bold leading-normal uppercase ${getStatusBadgeClass(
                              order.status
                            )}`}
                          >
                            {getStatusText(order.status)}
                          </span>
                        </div>
                      </div>

                      <div className="py-4 space-y-3">
                        {order.items?.map((item: any, idx) => {
                          const isPopulated = typeof item.product === "object";
                          const productName = isPopulated
                            ? item.product.name
                            : `Sản phẩm ${item.product}`;
                          const brand = isPopulated
                            ? item.product.brand
                            : "Sneaker Vault";
                          const image = isPopulated && item.product.images?.length > 0
                            ? item.product.images[0]
                            : null;

                          return (
                            <div key={idx} className="flex items-start gap-4">
                              <div className="h-14 w-14 flex-shrink-0 overflow-hidden rounded-xl border border-outline-variant/20 bg-surface-alt flex items-center justify-center">
                                {image ? (
                                  <img
                                    src={image}
                                    alt={productName}
                                    className="h-full w-full object-cover"
                                  />
                                ) : (
                                  <span className="material-symbols-outlined text-outline text-xl">
                                    image
                                  </span>
                                )}
                              </div>
                              <div className="min-w-0 flex-1">
                                <h4 className="line-clamp-1 text-sm font-bold text-on-surface">
                                  {productName}
                                </h4>
                                <p className="text-xs text-on-surface-variant mt-0.5">
                                  Size: {item.size} | Thương hiệu: {brand} | Số lượng: {item.quantity}
                                </p>
                              </div>
                              <span className="text-sm font-bold text-on-surface whitespace-nowrap">
                                {formatVnd(item.price * item.quantity)}
                              </span>
                            </div>
                          );
                        })}
                      </div>

                      <div className="flex flex-col gap-3 border-t border-outline-variant/30 pt-4 sm:flex-row sm:items-center sm:justify-between">
                        <div>
                          <span className="block text-[10px] text-on-surface-variant">
                            Giao tới:
                          </span>
                          <span className="text-xs font-semibold text-on-surface line-clamp-1">
                            {order.shippingAddress} (SĐT: {order.phone})
                          </span>
                        </div>
                        <div className="text-right sm:shrink-0">
                          <span className="block text-[10px] text-on-surface-variant">
                            Tổng thanh toán
                          </span>
                          <span className="text-base font-bold text-primary sm:text-lg">
                            {formatVnd(order.totalAmount)}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </section>
      </div>

      {showLogoutConfirm && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/60 p-4">
          <div className="w-full max-w-sm rounded-3xl bg-surface-container-lowest p-6 shadow-2xl border border-outline-variant/20">
            <h3 className="font-display text-lg font-bold text-on-surface mb-2">
              Xác nhận đăng xuất
            </h3>
            <p className="text-xs text-on-surface-variant mb-6">
              Bạn có chắc chắn muốn đăng xuất khỏi tài khoản của mình?
            </p>
            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => setShowLogoutConfirm(false)}
                className="btn btn-secondary flex-1 btn-pill text-xs cursor-pointer"
              >
                Hủy
              </button>
              <button
                type="button"
                onClick={confirmLogout}
                className="btn btn-primary flex-1 btn-pill bg-rose-600 hover:bg-rose-700 border-none text-white text-xs cursor-pointer"
              >
                Đăng xuất
              </button>
            </div>
          </div>
        </div>
      )}

      {addressModalOpen && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/60 p-4">
          <form
            onSubmit={handleSaveAddress}
            className="w-full max-w-md rounded-3xl bg-surface-container-lowest p-6 shadow-2xl border border-outline-variant/20 space-y-4"
          >
            <div>
              <h3 className="font-display text-lg font-bold text-on-surface mb-1">
                {editingAddressId ? "Chỉnh sửa địa chỉ" : "Thêm địa chỉ mới"}
              </h3>
              <p className="text-xs text-on-surface-variant">
                Nhập thông tin giao nhận hàng chi tiết
              </p>
            </div>

            <div className="space-y-3">
              <div>
                <label className="form-label">Tên người nhận</label>
                <input
                  type="text"
                  required
                  value={receiverName}
                  onChange={(e) => setReceiverName(e.target.value)}
                  placeholder="Nhập tên người nhận"
                  className="form-input bg-surface-container-lowest border border-outline-variant/30 text-on-surface"
                />
              </div>

              <div>
                <label className="form-label">Số điện thoại</label>
                <input
                  type="tel"
                  required
                  value={addressPhone}
                  onChange={(e) => setAddressPhone(e.target.value)}
                  placeholder="Nhập số điện thoại liên lạc"
                  className="form-input bg-surface-container-lowest border border-outline-variant/30 text-on-surface"
                />
              </div>

              <div>
                <label className="form-label">Địa chỉ chi tiết (Số nhà, đường, quận, thành phố)</label>
                <textarea
                  required
                  rows={3}
                  value={addressDetail}
                  onChange={(e) => setAddressDetail(e.target.value)}
                  placeholder="Nhập địa chỉ nhận hàng chi tiết"
                  className="form-input bg-surface-container-lowest border border-outline-variant/30 text-on-surface resize-none p-3"
                ></textarea>
              </div>

              <div className="flex items-center gap-2 py-1">
                <input
                  type="checkbox"
                  id="is-default-checkbox"
                  checked={isDefaultAddress}
                  disabled={user?.addresses?.length === 0 && !editingAddressId} // Must be default if it's the only one
                  onChange={(e) => setIsDefaultAddress(e.target.checked)}
                  className="h-4 w-4 rounded border-outline-variant/35 text-primary focus:ring-primary"
                />
                <label
                  htmlFor="is-default-checkbox"
                  className="text-xs font-semibold text-on-surface-variant cursor-pointer select-none"
                >
                  Đặt làm địa chỉ giao hàng mặc định
                </label>
              </div>
            </div>

            <div className="flex gap-3 pt-2">
              <button
                type="button"
                onClick={() => setAddressModalOpen(false)}
                className="btn btn-secondary flex-1 btn-pill text-xs cursor-pointer"
              >
                Hủy
              </button>
              <button
                type="submit"
                disabled={addressSaving}
                className="btn btn-primary flex-1 btn-pill text-xs cursor-pointer"
              >
                {addressSaving ? "Đang lưu..." : "Lưu địa chỉ"}
              </button>
            </div>
          </form>
        </div>
      )}

      {addressToDeleteId && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/60 p-4">
          <div className="w-full max-w-sm rounded-3xl bg-surface-container-lowest p-6 shadow-2xl border border-outline-variant/20">
            <h3 className="font-display text-lg font-bold text-on-surface mb-2">
              Xác nhận xóa địa chỉ
            </h3>
            <p className="text-xs text-on-surface-variant mb-6">
              Bạn có chắc chắn muốn xóa địa chỉ giao hàng này không? Hành động này không thể hoàn tác.
            </p>
            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => setAddressToDeleteId(null)}
                className="btn btn-secondary flex-1 btn-pill text-xs cursor-pointer"
              >
                Hủy
              </button>
              <button
                type="button"
                onClick={confirmDeleteAddress}
                className="btn btn-primary flex-1 btn-pill bg-rose-600 hover:bg-rose-700 border-none text-white text-xs cursor-pointer"
              >
                Xác nhận xóa
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
};

export default ProfilePage;
