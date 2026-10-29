import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "@/lib/types";

type AuthState = { activeStatus: boolean; userData: User | null };

const initialState: AuthState = { activeStatus: false, userData: null };

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action: PayloadAction<User>) => {
      state.activeStatus = true;
      state.userData = action.payload;
    },
    logout: (state) => {
      state.activeStatus = false;
      state.userData = null;
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
