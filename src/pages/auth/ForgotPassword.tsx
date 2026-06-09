import { useState, type FormEvent } from "react";
import { Link } from "react-router-dom";
import { useToast } from "../../contexts/ToastContext";
import { forgotPassword } from "../../services/authApi";
import AuthHero from "../../components/auth/AuthHero";
import AuthInput from "../../components/auth/AuthInput";

const ForgotPassword = () => {
  const { showToast } = useToast();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const isValidEmail = (val: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);
    setSuccessMessage(null);

    if (!email.trim() || !isValidEmail(email)) {
      setError("Vui lòng nhập một địa chỉ email hợp lệ.");
      return;
    }

    try {
      setLoading(true);
      const res = await forgotPassword(email.trim());
      setSuccessMessage(res.message);
      showToast("Yêu cầu đã được gửi thành công!", "success");
      setEmail("");
    } catch (err: any) {
      const msg =
        err.response?.data?.message ||
        err.message ||
        "Gửi yêu cầu đặt lại mật khẩu thất bại. Vui lòng thử lại.";
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
            <h1 className="section-title text-on-surface">Quên mật khẩu?</h1>
            <p className="section-desc mt-2 text-on-surface-variant">
              Nhập địa chỉ email đã đăng ký của bạn. Chúng tôi sẽ gửi liên kết đặt lại mật khẩu đến email này.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div
                className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm leading-relaxed text-red-700"
                role="alert"
              >
                {error}
              </div>
            )}

            {successMessage && (
              <div
                className="rounded-xl border border-emerald-200 bg-emerald-50 p-4 text-sm leading-relaxed text-emerald-700"
                role="alert"
              >
                {successMessage}
              </div>
            )}

            <AuthInput
              name="email"
              label="Địa chỉ Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="abc@gmail.com"
            />

            <button
              disabled={loading}
              className="btn btn-primary w-full min-h-[3rem] text-base shadow-lg disabled:cursor-not-allowed disabled:opacity-70 cursor-pointer"
              type="submit"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                  Đang xử lý...
                </span>
              ) : (
                "Gửi link đặt lại mật khẩu"
              )}
            </button>
          </form>

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
        </div>
      </section>
    </main>
  );
};

export default ForgotPassword;
