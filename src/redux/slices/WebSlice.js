import { createSlice } from "@reduxjs/toolkit";

export const WebSlice = createSlice({
  name: "web",
  initialState: {
    token: "",
    webProfile: {},
    permissions: [],
  },
  reducers: {},
  extraReducers: (builder) => {},
});
export default WebSlice.reducer;
