import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { login, register } from "../services/authApi";
import { getCurrentProfile, updateProfile } from "../services/userApi";
import type { LoginRequest, RegisterRequest, AuthResponse } from "../types/auth.type";
import type { UserProfile, Address } from "../types/user.type";

interface AuthState {
  token: string | null;
  user: UserProfile | null;
  isLoading: boolean;
  error: string | null;
}

const initialToken = localStorage.getItem("token");
let initialUser: UserProfile | null = null;
try {
  const userStr = localStorage.getItem("user");
  if (userStr) {
    initialUser = JSON.parse(userStr);
  }
} catch {
  initialUser = null;
}

const initialState: AuthState = {
  token: initialToken,
  user: initialUser,
  isLoading: false,
  error: null,
};

export const loginUser = createAsyncThunk(
  "auth/login",
  async (data: LoginRequest, { rejectWithValue }) => {
    try {
      const response = await login(data);
      return response;
    } catch (error: any) {
      const message = error.response?.data?.message || error.message || "Đăng nhập thất bại.";
      return rejectWithValue(message);
    }
  }
);

export const registerUser = createAsyncThunk(
  "auth/register",
  async (data: RegisterRequest, { rejectWithValue }) => {
    try {
      const response = await register(data);
      return response;
    } catch (error: any) {
      const message = error.response?.data?.message || error.message || "Đăng ký thất bại.";
      return rejectWithValue(message);
    }
  }
);

export const fetchProfile = createAsyncThunk(
  "auth/fetchProfile",
  async (_, { rejectWithValue }) => {
    try {
      const response = await getCurrentProfile();
      return response;
    } catch (error: any) {
      const message = error.response?.data?.message || error.message || "Không thể lấy thông tin cá nhân.";
      return rejectWithValue(message);
    }
  }
);

export const updateUserProfile = createAsyncThunk(
  "auth/updateProfile",
  async (
    data: { name?: string; phone?: string; avatar?: string },
    { rejectWithValue }
  ) => {
    try {
      const response = await updateProfile(data);
      return response;
    } catch (error: any) {
      const message = error.response?.data?.message || error.message || "Cập nhật thất bại.";
      return rejectWithValue(message);
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.token = null;
      state.user = null;
      state.error = null;
      localStorage.removeItem("token");
      localStorage.removeItem("user");
    },
    clearError: (state) => {
      state.error = null;
    },
    updateUserAddresses: (state, action: PayloadAction<Address[]>) => {
      if (state.user) {
        state.user.addresses = action.payload;
        localStorage.setItem("user", JSON.stringify(state.user));
      }
    },
    updateUserAvatar: (state, action: PayloadAction<string>) => {
      if (state.user) {
        state.user.avatar = action.payload;
        localStorage.setItem("user", JSON.stringify(state.user));
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action: PayloadAction<AuthResponse>) => {
        state.isLoading = false;
        state.token = action.payload.token;
        // The API returns role, name, email, id. Let's map it into UserProfile
        const mappedUser: UserProfile = {
          _id: action.payload.user.id || action.payload.user._id,
          name: action.payload.user.name,
          email: action.payload.user.email,
          role: action.payload.user.role as "user" | "admin",
        };
        state.user = mappedUser;
        localStorage.setItem("token", action.payload.token);
        localStorage.setItem("user", JSON.stringify(mappedUser));
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });

    builder
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action: PayloadAction<AuthResponse>) => {
        state.isLoading = false;
        state.token = action.payload.token;
        const mappedUser: UserProfile = {
          _id: action.payload.user.id || action.payload.user._id,
          name: action.payload.user.name,
          email: action.payload.user.email,
          role: action.payload.user.role as "user" | "admin",
        };
        state.user = mappedUser;
        localStorage.setItem("token", action.payload.token);
        localStorage.setItem("user", JSON.stringify(mappedUser));
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });

    builder
      .addCase(fetchProfile.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchProfile.fulfilled, (state, action: PayloadAction<UserProfile>) => {
        state.isLoading = false;
        state.user = action.payload;
        localStorage.setItem("user", JSON.stringify(action.payload));
      })
      .addCase(fetchProfile.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });

    builder
      .addCase(updateUserProfile.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateUserProfile.fulfilled, (state, action) => {
        state.isLoading = false;
        if (state.user) {
          state.user.name = action.payload.user.name;
          state.user.phone = action.payload.user.phone;
          state.user.avatar = action.payload.user.avatar;
          state.user.addresses = action.payload.user.addresses;
          localStorage.setItem("user", JSON.stringify(state.user));
        }
      })
      .addCase(updateUserProfile.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

export const { logout, clearError, updateUserAddresses, updateUserAvatar } = authSlice.actions;
export default authSlice.reducer;
