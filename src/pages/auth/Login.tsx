import axios from "axios";
import { useState, type ChangeEvent, type FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../../services/authApi";
import type { LoginRequest } from "../../types/auth.type";
import AuthHero from "../../components/auth/AuthHero";
import AuthToggle from "../../components/auth/AuthToggle";
import AuthInput from "../../components/auth/AuthInput";
import AuthFormLayout from "../../components/auth/AuthFormLayout";

const Login = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState<LoginRequest>({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const isValidEmail = (value: string) => /\S+@\S+\.\S+/.test(value);
  const isValidPassword = (value: string) => value.trim().length >= 6;

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({ ...prev, [event.target.name]: event.target.value }));
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);

    if (!isValidEmail(form.email)) {
      setError("Vui lòng nhập email hợp lệ.");
      return;
    }

    if (!isValidPassword(form.password)) {
      setError("Mật khẩu phải có ít nhất 6 kí tự.");
      return;
    }

    try {
      setLoading(true);
      const response = await login(form);
      localStorage.setItem("token", response.token);
      localStorage.setItem("user", JSON.stringify(response.user ?? {}));
      navigate("/");
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        const response = err.response;
        const serverMessage = (response?.data as { message?: string })?.message;

        if (response?.status === 404) {
          setError("Tài khoản không tồn tại.");
        } else if (response?.status === 401) {
          setError("Sai email hoặc mật khẩu.");
        } else if (
          serverMessage?.toLowerCase().includes("not found") ||
          serverMessage?.toLowerCase().includes("invalid credentials") ||
          serverMessage?.toLowerCase().includes("wrong password")
        ) {
          setError("Sai email hoặc mật khẩu.");
        } else {
          setError(
            serverMessage ??
              err.message ??
              "Đã có lỗi xảy ra. Vui lòng thử lại.",
          );
        }
      } else if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Đã có lỗi xảy ra. Vui lòng thử lại.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="pt-24 md:pt-0 min-h-screen flex flex-col md:flex-row">
      <AuthHero />

      <section className="flex flex-1 flex-col items-center justify-center bg-background px-margin-mobile py-10 md:px-margin-desktop md:py-12">
        <AuthToggle
          active="login"
          onSwitch={(tab) =>
            navigate(tab === "register" ? "/register" : "/login")
          }
        />

        <AuthFormLayout
          title="Chào mừng trở lại"
          subtitle="Nhập thông tin đăng nhập để truy cập tài khoản của bạn."
          error={error}
          loading={loading}
          submitLabel="Đăng nhập"
          onSubmit={handleSubmit}
        >
          <AuthInput
            name="email"
            label="Email"
            type="text"
            value={form.email}
            onChange={handleChange}
            placeholder="abc@gmail.com"
          />
          <AuthInput
            name="password"
            label="Mật khẩu"
            type="password"
            value={form.password}
            onChange={handleChange}
            placeholder="••••••••"
          />
        </AuthFormLayout>

        <div className="mt-12 flex flex-col items-center gap-2 text-center">
          <a
            className="text-on-surface underline hover:text-primary transition-colors font-label-sm"
            href="#"
          >
            Quên mật khẩu?
          </a>

          <p className="font-label-sm text-label-sm text-on-surface-variant">
            Chưa có tài khoản?{" "}
            <Link
              className="text-on-surface underline hover:text-primary transition-colors"
              to="/register"
            >
              Đăng ký
            </Link>
          </p>
        </div>
      </section>
    </main>
  );
};

export default Login;
