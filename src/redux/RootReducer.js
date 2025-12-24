import { combineReducers } from "@reduxjs/toolkit";

import adminReducer from "./slices/AdminSlice";
import userReducer from "./slices/UserSlice";
import webReducer from "./slices/WebSlice";

const rootReducer = combineReducers({
  admin: adminReducer,
  user: userReducer,
  web: webReducer,
});

export default rootReducer;
