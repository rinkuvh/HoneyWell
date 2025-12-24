import { createSlice } from "@reduxjs/toolkit";

import {
  loginUser,
  updateProfile,
  userLoginWithOtp,
  userLogout,
} from "../services/UserService";

export const UserSlice = createSlice({
  name: "user",
  initialState: {
    token: "",
    userProfile: {},
    permissions: [],
    isScreenReader: false,
    screenReaderRate: "",
    notificationCount: 0,
  },
  reducers: {
    //#region logout
    logoutUser: (state) => {
      state.userProfile = {};
      state.token = "";
      localStorage.removeItem("authToken");
      state.permissions = [];
    },
    userLoginData: (state, action) => {
      state.userProfile = action?.payload?.data;
      state.token = action?.payload?.data?.token;
      localStorage.setItem("authToken", action?.payload?.data?.token);
    },
    userLoginOtpData: (state, action) => {
      state.userProfile = action?.payload?.data;
      state.token = action?.payload?.data?.token;
    },
    setIsScreenReader: (state, action) => {
      state.isScreenReader = action?.payload;
    },
    setScreenReaderRate: (state, action) => {
      state.screenReaderRate = action?.payload;
    },
    setNotificationCountAction: (state, action) => {
      state.notificationCount = action?.payload;
    },
    setUserProfile: (state, action) => {
      state.userProfile = action?.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      // .addCase(loginUser.fulfilled, (state, action) => {
      //   state.userProfile = action?.payload?.data?.payload;
      //   state.token = action?.payload?.data?.token;
      // })
      // .addCase(userLoginWithOtp.fulfilled, (state, action) => {
      //   state.userProfile = action?.payload?.data;
      //   state.token = action?.payload?.data?.token;
      // })
      .addCase(updateProfile.fulfilled, (state, action) => {
        state.userProfile = action?.payload?.data;
      })
      .addCase(userLogout.fulfilled, (state, action) => {
        state.userProfile = {};
        state.token = "";
        state.permissions = [];
      });
  },
});
export const {
  userLoginData,
  userLoginOtpData,
  logoutUser,
  setIsScreenReader,
  setScreenReaderRate,
  setNotificationCountAction,
  setUserProfile,
} = UserSlice.actions;
export default UserSlice.reducer;
