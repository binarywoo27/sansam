import { configureStore } from "@reduxjs/toolkit";
import mainReducer from "./mainSlice";
import signup2Reducer from "./signup2Slice";
import recommenReducer from "./RecommendSlice";
import loginReducer from "./loginSlice";
import courseReducer from "./courseSlice";

export const store = configureStore({
  reducer: {
    main: mainReducer,
    signup2: signup2Reducer,
    recommend: recommenReducer,
    login: loginReducer,
    course: courseReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
