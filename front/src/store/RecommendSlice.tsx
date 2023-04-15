import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { courseInfo } from "./courseSlice";

export interface CourseInfo {
  COURSE_NO?: number;
  COURSE_MT_CD?: number;
  COURSE_MT_NM?: string;
  COURSE_MT_NO?: number;
  COURSE_ELEV_DIFF?: number;
  COURSE_UPTIME?: number;
  COURSE_DOWNTIME?: number;
  COURSE_LENGTH?: number;
  COURSE_LOCATION?: string;
  COURSE_ADDRESS?: string;
  courseIdx?: number;
}

export interface DiffInfo {
  EASY_COURSE_LIST: CourseInfo[];
  NORMAL_COURSE_LIST: CourseInfo[];
  HARD_COURSE_LIST: CourseInfo[];
}

export interface RecInfo {
  USER_AGE_POOL?: number;
  USER_GENDER?: string;
  COURSE_LIST: CourseInfo[];
  courseName?: string;
}

interface MainState {
  genderAge: RecInfo;
  difficultyCourse: DiffInfo;
  topTen: courseInfo[];
}

const initialState: MainState = {
  genderAge: {
    USER_AGE_POOL: 0,
    USER_GENDER: "",
    COURSE_LIST: [],
  },
  difficultyCourse: {
    EASY_COURSE_LIST: [{}],
    NORMAL_COURSE_LIST: [{}],
    HARD_COURSE_LIST: [{}],
  },
  topTen: [
    {
      courseNo: 0,
      courseLength: 0,
      courseMtNm: "",
      courseMtNo: 0,
      courseUptime: 0,
    },
  ],
};

export const RecommendSlice = createSlice({
  name: "Recommend",
  initialState,
  reducers: {
    changeAgeGender: (state, action: PayloadAction<RecInfo>) => {
      state.genderAge = action.payload;
    },
    changeCourses: (state, action: PayloadAction<DiffInfo>) => {
      state.difficultyCourse = action.payload;
    },
    changeTopTen: (state, action: PayloadAction<courseInfo[]>) => {
      state.topTen = action.payload;
    },
  },
});

export const { changeAgeGender, changeCourses, changeTopTen } =
  RecommendSlice.actions;
export default RecommendSlice.reducer;
