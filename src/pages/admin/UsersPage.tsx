import React from "react";

const UsersPage = (): React.JSX.Element => {
  const users = [
    { id: 1, name: "Nguyễn Văn A", email: "admin@gmail.com", role: "admin", roleClass: "bg-purple-100 text-purple-800", date: "01/05/2026" },
    { id: 2, name: "Trần Văn B", email: "tranb@gmail.com", role: "user", roleClass: "bg-slate-100 text-slate-800", date: "15/05/2026" },
    { id: 3, name: "Lê Thị C", email: "lethic@gmail.com", role: "user", roleClass: "bg-slate-100 text-slate-800", date: "20/05/2026" },
    { id: 4, name: "Phạm Minh D", email: "phamd@gmail.com", role: "user", roleClass: "bg-slate-100 text-slate-800", date: "01/06/2026" },
  ];

  return (
    <div className="space-y-6 animate-fade-in-up">
      <div>
        <h1 className="font-display text-2xl font-bold text-on-background">Quản lý người dùng</h1>
        <p className="text-sm text-secondary">Quản lý tài khoản, thay đổi quyền hạn và theo dõi hoạt động người dùng.</p>
      </div>

      {/* Filter Bar */}
      <div className="bg-white p-4 rounded-2xl border border-outline-variant/20 shadow-sm flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="flex items-center bg-surface-container-low px-4 py-2 rounded-full w-full md:w-96 border border-outline-variant/30">
          <span className="material-symbols-outlined text-outline">search</span>
          <input
            className="bg-transparent border-none focus:ring-0 text-body-sm w-full placeholder-on-surface-variant/50 ml-2"
            placeholder="Tìm kiếm người dùng theo tên hoặc email..."
            type="text"
          />
        </div>

        <div className="flex flex-wrap items-center gap-3 w-full md:w-auto font-body">
          <select className="bg-surface-container-low text-sm rounded-xl px-4 py-2 border border-outline-variant/30 text-on-surface focus:outline-none cursor-pointer">
            <option>Tất cả vai trò</option>
            <option>Quản trị viên (admin)</option>
            <option>Khách hàng (user)</option>
          </select>
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-white rounded-2xl border border-outline-variant/20 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-outline-variant/30 text-xs font-semibold text-secondary uppercase bg-surface-container-low/50">
                <th className="py-3.5 px-6">Họ tên</th>
                <th className="py-3.5 px-6">Email</th>
                <th className="py-3.5 px-6">Vai trò</th>
                <th className="py-3.5 px-6">Ngày đăng ký</th>
                <th className="py-3.5 px-6 text-center">Thao tác</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant/20 text-sm">
              {users.map((user) => (
                <tr key={user.id} className="hover:bg-surface-container-low/20 transition-colors">
                  <td className="py-4 px-6 font-medium text-on-background">{user.name}</td>
                  <td className="py-4 px-6 font-mono text-secondary">{user.email}</td>
                  <td className="py-4 px-6">
                    <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold uppercase ${user.roleClass}`}>
                      {user.role}
                    </span>
                  </td>
                  <td className="py-4 px-6 text-secondary">{user.date}</td>
                  <td className="py-4 px-6">
                    <div className="flex items-center justify-center gap-2">
                      <button className="p-1.5 hover:bg-surface-container-low rounded-lg text-secondary hover:text-primary transition-colors cursor-pointer" title="Phân quyền">
                        <span className="material-symbols-outlined text-base">manage_accounts</span>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default UsersPage;
