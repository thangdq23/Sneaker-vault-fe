import React, { useState, useEffect } from "react";
import { useToast } from "../../contexts/ToastContext";
import {
  getBrands,
  addBrand,
  updateBrand,
  deleteBrand,
} from "../../utils/brandHelper";

const BrandsPage = (): React.JSX.Element => {
  const { showToast } = useToast();
  const [brands, setBrands] = useState<string[]>([]);
  const [newBrandName, setNewBrandName] = useState("");
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [editingValue, setEditingValue] = useState("");

  const loadBrands = () => {
    setBrands(getBrands());
  };

  useEffect(() => {
    loadBrands();
  }, []);

  const handleAddBrand = (e: React.FormEvent) => {
    e.preventDefault();
    const name = newBrandName.trim();
    if (!name) {
      showToast("Tên thương hiệu không được để trống.", "error");
      return;
    }
    const success = addBrand(name);
    if (success) {
      showToast("Thêm thương hiệu thành công!", "success");
      setNewBrandName("");
      loadBrands();
    } else {
      showToast("Thương hiệu đã tồn tại hoặc không hợp lệ.", "error");
    }
  };

  const handleStartEdit = (index: number, val: string) => {
    setEditingIndex(index);
    setEditingValue(val);
  };

  const handleCancelEdit = () => {
    setEditingIndex(null);
    setEditingValue("");
  };

  const handleUpdateBrand = (oldName: string) => {
    const newVal = editingValue.trim();
    if (!newVal) {
      showToast("Tên thương hiệu không được để trống.", "error");
      return;
    }
    if (newVal.toLowerCase() === oldName.toLowerCase()) {
      handleCancelEdit();
      return;
    }
    const success = updateBrand(oldName, newVal);
    if (success) {
      showToast("Cập nhật thương hiệu thành công!", "success");
      handleCancelEdit();
      loadBrands();
    } else {
      showToast("Tên thương hiệu đã tồn tại hoặc không hợp lệ.", "error");
    }
  };

  const handleDeleteBrand = (name: string) => {
    if (window.confirm(`Bạn có chắc chắn muốn xóa thương hiệu "${name}"?`)) {
      const success = deleteBrand(name);
      if (success) {
        showToast("Xóa thương hiệu thành công!", "success");
        loadBrands();
      } else {
        showToast("Không thể xóa thương hiệu.", "error");
      }
    }
  };

  return (
    <div className="space-y-6 animate-fade-in-up font-body">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl font-bold text-on-background">
            Quản lý thương hiệu
          </h1>
          <p className="text-sm text-secondary">
            Xem, thêm mới, chỉnh sửa và xóa các thương hiệu giày trong hệ thống.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Form Add Brand */}
        <div className="lg:col-span-1">
          <div className="bg-white p-6 rounded-3xl border border-outline-variant/15 shadow-sm">
            <h3 className="font-display text-lg font-bold text-on-background mb-4">
              Thêm thương hiệu mới
            </h3>
            <form onSubmit={handleAddBrand} className="space-y-4">
              <div>
                <label className="form-label font-semibold text-on-background text-sm">
                  Tên thương hiệu *
                </label>
                <input
                  type="text"
                  value={newBrandName}
                  onChange={(e) => setNewBrandName(e.target.value)}
                  placeholder="Nhập tên ví dụ: Adidas, Yeezy..."
                  className="sv-form-input text-sm mt-1.5"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full btn btn-primary flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-semibold cursor-pointer"
              >
                <span className="material-symbols-outlined text-base">add</span>
                Thêm thương hiệu
              </button>
            </form>
          </div>
        </div>

        {/* Brands List Table */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-3xl border border-outline-variant/15 shadow-sm overflow-hidden">
            <div className="p-6 border-b border-outline-variant/10">
              <h3 className="font-display text-lg font-bold text-on-background">
                Danh sách thương hiệu ({brands.length})
              </h3>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-surface-container-low text-secondary text-xs uppercase font-bold tracking-wider border-b border-outline-variant/10">
                    <th className="px-6 py-4">#</th>
                    <th className="px-6 py-4">Tên thương hiệu</th>
                    <th className="px-6 py-4 text-right">Thao tác</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-outline-variant/10 text-sm">
                  {brands.length === 0 ? (
                    <tr>
                      <td colSpan={3} className="px-6 py-8 text-center text-secondary">
                        Không có thương hiệu nào.
                      </td>
                    </tr>
                  ) : (
                    brands.map((brandName, index) => {
                      const isEditing = editingIndex === index;
                      return (
                        <tr
                          key={brandName}
                          className="hover:bg-surface-container-low/30 smooth-transition"
                        >
                          <td className="px-6 py-4.5 text-secondary font-mono">
                            {index + 1}
                          </td>
                          <td className="px-6 py-4.5 font-medium text-on-background">
                            {isEditing ? (
                              <input
                                type="text"
                                value={editingValue}
                                onChange={(e) => setEditingValue(e.target.value)}
                                className="sv-form-input py-1.5 px-3 text-sm focus:outline-none w-full max-w-xs"
                                autoFocus
                              />
                            ) : (
                              brandName
                            )}
                          </td>
                          <td className="px-6 py-4.5 text-right">
                            {isEditing ? (
                              <div className="flex justify-end items-center gap-2">
                                <button
                                  type="button"
                                  onClick={() => handleUpdateBrand(brandName)}
                                  className="p-1.5 text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors cursor-pointer flex items-center justify-center"
                                  title="Lưu"
                                >
                                  <span className="material-symbols-outlined text-lg">
                                    check
                                  </span>
                                </button>
                                <button
                                  type="button"
                                  onClick={handleCancelEdit}
                                  className="p-1.5 text-zinc-500 hover:bg-zinc-100 rounded-lg transition-colors cursor-pointer flex items-center justify-center"
                                  title="Hủy"
                                >
                                  <span className="material-symbols-outlined text-lg">
                                    close
                                  </span>
                                </button>
                              </div>
                            ) : (
                              <div className="flex justify-end items-center gap-2">
                                <button
                                  type="button"
                                  onClick={() => handleStartEdit(index, brandName)}
                                  className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors cursor-pointer flex items-center justify-center"
                                  title="Chỉnh sửa"
                                >
                                  <span className="material-symbols-outlined text-lg">
                                    edit
                                  </span>
                                </button>
                                <button
                                  type="button"
                                  onClick={() => handleDeleteBrand(brandName)}
                                  className="p-1.5 text-rose-600 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer flex items-center justify-center"
                                  title="Xóa"
                                >
                                  <span className="material-symbols-outlined text-lg">
                                    delete
                                  </span>
                                </button>
                              </div>
                            )}
                          </td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BrandsPage;
