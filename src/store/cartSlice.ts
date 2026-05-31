import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { getCart, addToCart, updateCartItem, removeCartItem, clearCart } from "../services/cartApi";
import type { Cart } from "../types/cart.type";

interface CartState {
  cart: Cart | null;
  isLoading: boolean;
  error: string | null;
}

const initialState: CartState = {
  cart: null,
  isLoading: false,
  error: null,
};

export const fetchCartItems = createAsyncThunk(
  "cart/fetch",
  async (_, { rejectWithValue }) => {
    try {
      const response = await getCart();
      return response;
    } catch (error: any) {
      // If no cart exists or another error occurs, return error message
      const message = error.response?.data?.message || error.message || "Không thể tải giỏ hàng.";
      return rejectWithValue(message);
    }
  }
);

export const addCartItem = createAsyncThunk(
  "cart/addItem",
  async (
    { productId, size, quantity }: { productId: string; size: number | string; quantity: number },
    { rejectWithValue }
  ) => {
    try {
      const response = await addToCart(productId, size, quantity);
      return response;
    } catch (error: any) {
      const message = error.response?.data?.message || error.message || "Không thể thêm vào giỏ hàng.";
      return rejectWithValue(message);
    }
  }
);

export const updateCartItemQty = createAsyncThunk(
  "cart/updateQty",
  async (
    { itemId, quantity }: { itemId: string; quantity: number },
    { rejectWithValue }
  ) => {
    try {
      const response = await updateCartItem(itemId, quantity);
      return response;
    } catch (error: any) {
      const message = error.response?.data?.message || error.message || "Không thể cập nhật số lượng.";
      return rejectWithValue(message);
    }
  }
);

export const removeCartItemById = createAsyncThunk(
  "cart/removeItem",
  async (itemId: string, { rejectWithValue }) => {
    try {
      const response = await removeCartItem(itemId);
      return response;
    } catch (error: any) {
      const message = error.response?.data?.message || error.message || "Không thể xóa sản phẩm khỏi giỏ hàng.";
      return rejectWithValue(message);
    }
  }
);

export const clearCartItems = createAsyncThunk(
  "cart/clear",
  async (_, { rejectWithValue }) => {
    try {
      const response = await clearCart();
      return response;
    } catch (error: any) {
      const message = error.response?.data?.message || error.message || "Không thể làm trống giỏ hàng.";
      return rejectWithValue(message);
    }
  }
);

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    resetCartState: (state) => {
      state.cart = null;
      state.error = null;
      state.isLoading = false;
    },
  },
  extraReducers: (builder) => {
    // Fetch Cart
    builder
      .addCase(fetchCartItems.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchCartItems.fulfilled, (state, action: PayloadAction<Cart>) => {
        state.isLoading = false;
        state.cart = action.payload;
      })
      .addCase(fetchCartItems.rejected, (state, action) => {
        state.isLoading = false;
        // In case there is no cart found (e.g. 404, empty for new user), we initialize a blank structure
        state.cart = { _id: "", user: "", items: [], totalPrice: 0 };
        state.error = action.payload as string;
      });

    // Add Item
    builder
      .addCase(addCartItem.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(addCartItem.fulfilled, (state, action: PayloadAction<Cart>) => {
        state.isLoading = false;
        state.cart = action.payload;
      })
      .addCase(addCartItem.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });

    // Update Qty
    builder
      .addCase(updateCartItemQty.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateCartItemQty.fulfilled, (state, action: PayloadAction<Cart>) => {
        state.isLoading = false;
        state.cart = action.payload;
      })
      .addCase(updateCartItemQty.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });

    // Remove Item
    builder
      .addCase(removeCartItemById.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(removeCartItemById.fulfilled, (state, action: PayloadAction<Cart>) => {
        state.isLoading = false;
        state.cart = action.payload;
      })
      .addCase(removeCartItemById.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });

    // Clear Cart
    builder
      .addCase(clearCartItems.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(clearCartItems.fulfilled, (state) => {
        state.isLoading = false;
        state.cart = {
          _id: state.cart?._id || "",
          user: state.cart?.user || "",
          items: [],
          totalPrice: 0,
        };
      })
      .addCase(clearCartItems.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

export const { resetCartState } = cartSlice.actions;
export default cartSlice.reducer;
