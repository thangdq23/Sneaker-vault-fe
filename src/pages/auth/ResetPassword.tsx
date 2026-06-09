import { useState, useEffect, type FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useToast } from "../../contexts/ToastContext";
import { resetPassword } from "../../services/authApi";
import AuthHero from "../../components/auth/AuthHero";
import AuthInput from "../../components/auth/AuthInput";

const ResetPassword = () => {
  const navigate = useNavigate();
  const { showToast } = useToast();
  
  const [token, setToken] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  // Extract token from query params
  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const tokenParam = searchParams.get("token");
    if (!tokenParam) {
      setError("Token đặt lại mật khẩu không được tìm thấy hoặc không hợp lệ.");
    } else {
      setToken(tokenParam);
    }
  }, []);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);

    if (!token) {
      setError("Yêu cầu đặt lại mật khẩu không hợp lệ. Vui lòng sử dụng liên kết từ email.");
      return;
    }

    if (newPassword.length < 6) {
      setError("Mật khẩu mới phải có ít nhất 6 ký tự.");
      return;
    }

    if (newPassword !== confirmPassword) {
      setError("Xác nhận mật khẩu mới không khớp.");
      return;
    }

    try {
      setLoading(true);
      const res = await resetPassword(token, newPassword);
      showToast(res.message, "success");
      setSuccess(true);
      
      // Auto redirect to login after 3 seconds
      setTimeout(() => {
        navigate("/login");
      }, 3000);
    } catch (err: any) {
      const msg =
        err.response?.data?.message ||
        err.message ||
        "Đặt lại mật khẩu thất bại. Token có thể đã hết hạn hoặc không chính xác.";
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="pt-24 md:pt-0 min-h-screen flex flex-col md:flex-row text-on-surface">
      <AuthHero />

      <section className="flex flex-1 flex-col items-center justify-center bg-background px-margin-mobile py-10 md:px-margin-desktop md:py-12">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center md:text-left">
            <h1 className="section-title text-on-surface">Đặt lại mật khẩu</h1>
            <p className="section-desc mt-2 text-on-surface-variant">
              Tạo mật khẩu mới cho tài khoản của bạn.
            </p>
          </div>

          {success ? (
            <div className="space-y-4 text-center md:text-left bg-emerald-50 border border-emerald-200 rounded-3xl p-6">
              <span className="material-symbols-outlined text-5xl text-emerald-600 mb-2">
                check_circle
              </span>
              <h3 className="font-display font-bold text-lg text-emerald-800">
                Đặt lại mật khẩu thành công!
              </h3>
              <p className="text-sm text-emerald-700 leading-relaxed">
                Mật khẩu của bạn đã được thay đổi. Hệ thống đang tự động chuyển hướng bạn đến trang đăng nhập sau vài giây...
              </p>
              <Link to="/login" className="btn btn-primary btn-pill mt-4 w-full text-xs">
                Đến trang Đăng nhập ngay
              </Link>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              {error && (
                <div
                  className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm leading-relaxed text-red-700"
                  role="alert"
                >
                  {error}
                </div>
              )}

              <AuthInput
                name="newPassword"
                label="Mật khẩu mới"
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="••••••••"
              />

              <AuthInput
                name="confirmPassword"
                label="Xác nhận mật khẩu mới"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="••••••••"
              />

              <button
                disabled={loading || !token}
                className="btn btn-primary w-full min-h-[3rem] text-base shadow-lg disabled:cursor-not-allowed disabled:opacity-70 cursor-pointer"
                type="submit"
              >
                {loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                    Đang xử lý...
                  </span>
                ) : (
                  "Cập nhật mật khẩu"
                )}
              </button>
            </form>
          )}

          {!success && (
            <div className="mt-8 text-center">
              <p className="font-label-sm text-label-sm text-on-surface-variant">
                Quay lại{" "}
                <Link
                  className="text-on-surface underline hover:text-primary transition-colors font-bold"
                  to="/login"
                >
                  Đăng nhập
                </Link>
              </p>
            </div>
          )}
        </div>
      </section>
    </main>
  );
};

export default ResetPassword;
