import { useState, type ChangeEvent, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../store/hooks";
import { registerUser } from "../../store/authSlice";
import type { RegisterRequest } from "../../types/auth.type";
import AuthHero from "../../components/auth/AuthHero";
import AuthToggle from "../../components/auth/AuthToggle";
import AuthInput from "../../components/auth/AuthInput";
import AuthFormLayout from "../../components/auth/AuthFormLayout";

const Register = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
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
      const resultAction = await dispatch(registerUser({
        ...form,
        confirmPassword,
      }));
      
      if (registerUser.fulfilled.match(resultAction)) {
        const searchParams = new URLSearchParams(window.location.search);
        const redirectUrl = searchParams.get("redirect");
        navigate(redirectUrl || "/");
      } else {
        setError((resultAction.payload as string) || "Đăng ký thất bại.");
      }
    } catch (err: unknown) {
      if (err instanceof Error) {
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
          active="register"
          onSwitch={(tab) => navigate(tab === "login" ? "/login" : "/register")}
        />

        <AuthFormLayout
          title="Tạo tài khoản"
          subtitle="Điền thông tin bên dưới để bắt đầu mua sắm tại Sneaker Vault."
          error={error}
          loading={loading}
          submitLabel="Đăng ký"
          onSubmit={handleSubmit}
        >
          <AuthInput
            name="name"
            label="Họ và tên"
            type="text"
            value={form.name}
            onChange={handleChange}
            placeholder="Nguyễn Văn A"
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
            label="Mật khẩu"
            type="password"
            value={form.password}
            onChange={handleChange}
            placeholder="••••••••"
          />
          <AuthInput
            name="confirmPassword"
            label="Xác nhận mật khẩu"
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
            Đăng nhập
          </span>
        </p>
      </section>
    </main>
  );
};

export default Register;
