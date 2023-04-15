import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface courseInfo {
  // COURSE_NO?: number;
  // COURSE_MT_CD?: string;
  // COURSE_MT_NM?: string;
  // COURSE_MT_NO?: number;
  // COURSE_ELEV_DIFF?: number;
  // COURSE_UPTIME?: number;
  // COURSE_DOWNTIME?: number;
  // COURSE_LENGTH?: number;
  // COURSE_LOCATION?: string;
  // COURSE_ADDRESS?: string;
  courseNo?: number;
  courseMtNm?: string;
  courseMtCd?: number;
  courseMtNo?: number;
  courseXCoords?: Array<number>;
  courseYCoords?: Array<number>;
  courseAbsDiff?: string;
  courseUptime?: number;
  courseDowntime?: number;
  courseLength?: number;
  courseLocation?: string;
}

export interface ItemInfo {
  // USER_AGE_POOL?: number;
  // USER_GENDER?: string;
  // COURSE_LIST: courseInfo[];
  courseName?: string;
  userAge?: number;
  userGender?: string;
  courseList: courseInfo[];
}

interface MainState {
  genderAge: ItemInfo[];
  easyCourse: ItemInfo[];
  normalCourse: ItemInfo[];
  hardCourse: ItemInfo[];
}

const initialState: MainState = {
  genderAge: [
    {
      // USER_AGE_POOL: 0,
      // USER_GENDER: "",
      // COURSE_LIST: [],
      userAge: 0,
      userGender: "",
      courseList: [],
    },
  ],
  easyCourse: [
    {
      // COURSE_LIST: [],
      courseList: [],
    },
  ],
  normalCourse: [
    {
      // COURSE_LIST: [],
      courseList: [],
    },
  ],
  hardCourse: [
    {
      // COURSE_LIST: [],
      courseList: [],
    },
  ],
};

export const mainSlice = createSlice({
  name: "main",
  initialState,
  reducers: {
    changeGenderAge: (state, action: PayloadAction<ItemInfo[]>) => {
      state.genderAge = action.payload;
    },
    changeEasyCourse: (state, action: PayloadAction<ItemInfo[]>) => {
      state.easyCourse = action.payload;
    },
    changeNormalCourse: (state, action: PayloadAction<ItemInfo[]>) => {
      state.normalCourse = action.payload;
    },
    changeHardCourse: (state, action: PayloadAction<ItemInfo[]>) => {
      state.hardCourse = action.payload;
    },
  },
});

export const {
  changeGenderAge,
  changeEasyCourse,
  changeNormalCourse,
  changeHardCourse,
} = mainSlice.actions;
export default mainSlice.reducer;
