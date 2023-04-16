import { configureStore } from "@reduxjs/toolkit";
import logger from "redux-logger";
import userReducer from "./userSlice";
import typeItemReducer from "./typeSlice";
import pieceItemReducer from "./pieceSlice";
import itemReducer from "./itemSlice";
import itemInReducer from "./itemInSlice";
import itemOutReducer from "./itemOutSlice";
import departmentReducer from "./departmentSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    typeItem: typeItemReducer,
    pieceItem: pieceItemReducer,
    item: itemReducer,
    itemIn: itemInReducer,
    itemOut: itemOutReducer,
    department: departmentReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: true,
      serializableCheck: false,
    }), //.concat(logger)
});
