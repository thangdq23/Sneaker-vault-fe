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

    if (!form.name.trim()) {
      setError("Vui lòng nhập tên.");
      return;
    }

    if (!isValidEmail(form.email)) {
      setError("Vui lòng nhập email hợp lệ.");
      return;
    }

    if (!form.password.trim()) {
      setError("Mật khẩu không được để trống.");
      return;
    }

    if (form.password !== confirmPassword) {
      setError("Confirm password phải khớp.");
      return;
    }

    try {
      setLoading(true);
      const response = await register(form);
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
          active="register"
          onSwitch={(tab) => navigate(tab === "login" ? "/login" : "/register")}
        />

        <AuthFormLayout
          title="Create Your Vault"
          subtitle="Join our exclusive community of collectors."
          error={error}
          loading={loading}
          submitLabel="CREATE ACCOUNT"
          onSubmit={handleSubmit}
        >
          <AuthInput
            name="name"
            label="Full Name"
            type="text"
            value={form.name}
            onChange={handleChange}
            placeholder="John Doe"
          />
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
          <AuthInput
            name="confirmPassword"
            label="Confirm Password"
            type="password"
            value={confirmPassword}
            onChange={handleChange}
            placeholder="••••••••"
          />
        </AuthFormLayout>

        <p className="mt-12 text-center font-label-sm text-label-sm text-on-surface-variant">
          Already have an account?{" "}
          <span
            onClick={() => navigate("/login")}
            className="cursor-pointer text-on-surface underline hover:text-primary transition-colors"
          >
            Login here
          </span>
        </p>
      </section>
    </main>
  );
};

export default Register;
