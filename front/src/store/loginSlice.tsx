import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface UserInfo {
  userEmail: string;
  userNicknm: string;
  userAge: number;
  userGender: string;
  userLocation: string;
}

interface LoginState {
  userInfo: UserInfo;
  isRec: boolean;
}

const initialState: LoginState = {
  userInfo: {
    userEmail: "",
    userNicknm: "",
    userAge: 0,
    userGender: "",
    userLocation: "",
  },
  isRec: false,
};

export const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    changeUserInfo: (state, action: PayloadAction<UserInfo>) => {
      state.userInfo = action.payload;
    },
    changeIsRec: (state, action: PayloadAction<boolean>) => {
      state.isRec = action.payload;
    },
  },
});

export const { changeUserInfo, changeIsRec } = loginSlice.actions;
export default loginSlice.reducer;
