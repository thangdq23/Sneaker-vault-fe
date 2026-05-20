import axios from "axios";
import { useState, type ChangeEvent, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { register } from "../../services/authApi";
import type { RegisterRequest } from "../../types/auth.type";
import AuthHero from "../../components/auth/AuthHero";
import AuthToggle from "../../components/auth/AuthToggle";
import AuthInput from "../../components/auth/AuthInput";
import AuthFormLayout from "../../components/auth/AuthFormLayout";

const Register = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState<RegisterRequest>({
    name: "",
    email: "",
    password: "",
  });
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const isValidEmail = (value: string) => /\S+@\S+\.\S+/.test(value);
  const isValidName = (value: string) => value.trim().length >= 3;
  const isValidPassword = (value: string) => value.trim().length >= 6;

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    if (name === "confirmPassword") {
      setConfirmPassword(value);
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);

    if (!isValidName(form.name)) {
      setError("Tên phải có ít nhất 3 kí tự.");
      return;
    }

    if (!isValidEmail(form.email)) {
      setError("Vui lòng nhập email hợp lệ.");
      return;
    }

    if (!isValidPassword(form.password)) {
      setError(
        "Mật khẩu phải có ít nhất 6 kí tự, chứa chữ hoa, chữ thường và số.",
      );
      return;
    }

    if (form.password !== confirmPassword) {
      setError("Mật khẩu xác nhận phải khớp.");
      return;
    }

    try {
      setLoading(true);
      const response = await register({
        ...form,
        confirmPassword,
      });
      localStorage.setItem("token", response.token);
      localStorage.setItem("user", JSON.stringify(response.user ?? {}));
      navigate("/");
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        const response = err.response;
        const serverData = response?.data as
          | { message?: string; error?: string }
          | undefined;
        const serverMessage = serverData?.message ?? serverData?.error;

        if (response?.status === 409) {
          setError("Tài khoản đã tồn tại.");
        } else if (
          serverMessage?.toLowerCase().includes("duplicate") ||
          serverMessage?.toLowerCase().includes("already exists") ||
          serverMessage?.toLowerCase().includes("đã tồn tại")
        ) {
          setError("Tài khoản đã tồn tại.");
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

      <section className="flex-1 flex flex-col justify-center items-center px-margin-mobile md:px-margin-desktop py-12 bg-background">
        <AuthToggle
          active="register"
          onSwitch={(tab) => navigate(tab === "login" ? "/login" : "/register")}
        />

        <AuthFormLayout
          title="Create account"
          error={error}
          loading={loading}
          submitLabel="Đăng Ký"
          onSubmit={handleSubmit}
        >
          <AuthInput
            name="name"
            label="Họ và tên"
            type="text"
            value={form.name}
            onChange={handleChange}
            placeholder="Nguyen Van A"
          />
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
            label="Mật Khẩu"
            type="password"
            value={form.password}
            onChange={handleChange}
            placeholder="••••••••"
          />
          <AuthInput
            name="confirmPassword"
            label="Xác Nhận Mật Khẩu"
            type="password"
            value={confirmPassword}
            onChange={handleChange}
            placeholder="••••••••"
          />
        </AuthFormLayout>

        <p className="mt-12 text-center font-label-sm text-label-sm text-on-surface-variant">
          Bạn đã có tài khoản?{" "}
          <span
            onClick={() => navigate("/login")}
            className="cursor-pointer text-on-surface underline hover:text-primary transition-colors"
          >
            Đăng Nhập<p></p>
          </span>
        </p>
      </section>
    </main>
  );
};

export default Register;
