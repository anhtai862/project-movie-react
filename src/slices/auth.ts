import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { CurrentUser } from "interfaces/auth";
import authAPI from "services/authAPI";

interface AuthState {
  // thông tin của user đăng nhập
  currentUser: CurrentUser;
  isLoading: boolean;
  error?: string;
}

const initialState: AuthState = {
  currentUser: JSON.parse(localStorage.getItem("user") as string) || {},
  isLoading: false,
  error: "",
};

// thunk actions
// dispatch(login(values))
export const login = createAsyncThunk("auth/login", async (values: any) => {
  try {
    const data = await authAPI.login(values);
    // Lưu thông tin đăng nhập vào localStorage
    localStorage.setItem("user", JSON.stringify(data));
    return data;
  } catch (error) {
    throw error;
  }
});

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state: AuthState) => {
      // Xoá thông tin user khỏi localStorage
      localStorage.removeItem("user");
      // set state currentUser về object rỗng
      return { ...state, currentUser: {} as CurrentUser };
    },
  },
  extraReducers: (builder) => {
    // auth/login/pending
    builder.addCase(login.pending, (state) => {
      return { ...state, isLoading: true, error: "" };
    });
    // auth/login/fulfilled
    builder.addCase(login.fulfilled, (state, { payload }) => {
      return { ...state, isLoading: false, currentUser: payload };
    });
    // auth/login/rejected
    builder.addCase(login.rejected, (state, { error }) => {
      return { ...state, isLoading: false, error: error.message };
    });
  },
});

// export actions
export const { logout } = authSlice.actions;

export default authSlice.reducer;
