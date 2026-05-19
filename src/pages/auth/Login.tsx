import axios from "axios";
import { useState, type ChangeEvent, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
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

    if (!form.password.trim()) {
      setError("Mật khẩu không được để trống.");
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
        setError(
          (err.response?.data as { message?: string })?.message ??
            err.message ??
            "Đã có lỗi xảy ra. Vui lòng thử lại.",
        );
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
          active="login"
          onSwitch={(tab) =>
            navigate(tab === "register" ? "/register" : "/login")
          }
        />

        <AuthFormLayout
          title="Welcome Back"
          subtitle="Enter your credentials to access your vault."
          error={error}
          loading={loading}
          submitLabel="Continue to Vault"
          onSubmit={handleSubmit}
        >
          <AuthInput
            name="email"
            label="Email Address"
            type="email"
            value={form.email}
            onChange={handleChange}
            placeholder="name@example.com"
          />
          <AuthInput
            name="password"
            label="Password"
            type="password"
            value={form.password}
            onChange={handleChange}
            placeholder="••••••••"
          />
        </AuthFormLayout>

        <p className="mt-12 text-center font-label-sm text-label-sm text-on-surface-variant">
          Having trouble?{" "}
          <a
            className="text-on-surface underline hover:text-primary transition-colors"
            href="#"
          >
            Contact Concierge
          </a>
        </p>
      </section>
    </main>
  );
};

export default Login;
