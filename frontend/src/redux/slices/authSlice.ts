import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api, { setAuthToken } from "@/utils/axiosInstance";
import { loginUser,  logoutUser} from "@/app/lib/api";

interface AuthState {
  user: string | null;
  role: string | null;
  permissions: string[];
  isAuthenticated: boolean;
  token: string | null;
}

const initialState: AuthState = {
  user: null,
  role: null,
  permissions: [],
  isAuthenticated: false,
  token: null,
};

// Async login action
export const login = createAsyncThunk(
  "auth/login",
  async ({ username, password }: { username: string; password: string }, { rejectWithValue }) => {
    try {
      const data = await loginUser(username, password);
      setAuthToken(data.token);
      return data; // { user, role, permissions, token }
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Login failed");
    }
  }
);

export const logout = createAsyncThunk("auth/logout", async () => {
  await logoutUser();
  setAuthToken(null);
});

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(login.fulfilled, (state, action) => {
      state.user = action.payload.user;
      state.role = action.payload.role;
      state.permissions = action.payload.permissions;
      state.isAuthenticated = true;
      state.token = action.payload.token;
    });

    builder.addCase(logout.fulfilled, (state) => {
      state.user = null;
      state.role = null;
      state.permissions = [];
      state.isAuthenticated = false;
      state.token = null;
    });
  },
});

export default authSlice.reducer;