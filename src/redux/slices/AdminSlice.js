import { createSlice } from "@reduxjs/toolkit";
import {
  adminLoginWithOtp,
  adminLogout,
  loginAdmin,
  updateProfile,
} from "../services/AdminService";

export const AdminSlice = createSlice({
  name: "admin",
  initialState: {
    token: "",
    adminProfile: {},
    permissions: [],
  },
  reducers: {
    //#region logout
    loginData: (state, action) => {
      state.adminProfile = action?.payload?.data;
      state.token = action?.payload?.data?.token;
      localStorage.setItem("authToken", action?.payload?.data?.token)
    },
    logout: (state) => {
      state.adminProfile = null;
      state.token = null;
      localStorage.removeItem("authToken"); // Clearing token from localStorage
    },
    // loginOtpData: (state, action) => {
    //   state.adminProfile = action?.payload?.data;
    //   state.token = action?.payload?.data?.token;
    // },
  },
  extraReducers: (builder) => {
    builder
      // .addCase(loginAdmin.fulfilled, (state, action) => {
      //   state.adminProfile = action?.payload?.data;
      //   state.token = action?.payload?.data?.token;
      // })
      // .addCase(adminLoginWithOtp.fulfilled, (state, action) => {
      //   state.adminProfile = action?.payload?.data;
      //   state.token = action?.payload?.data?.token;
      // })
      .addCase(updateProfile.fulfilled, (state, action) => {
        state.adminProfile = action?.payload?.data;
      })
      .addCase(adminLogout.fulfilled, (state, action) => {
        state.adminProfile = {};
        state.token = "";
        state.permissions = [];
      });
  },
});
export const { logout, loginData } = AdminSlice.actions;
export default AdminSlice.reducer;
