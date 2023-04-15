import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface courseInfo {
  courseNo?: number;
  courseMtNm?: string;
  courseMtCd?: number;
  courseMtNo?: number;
  courseXCoords?: number[];
  courseYCoords?: number[];
  courseAbsDiff?: string;
  courseUptime?: number;
  courseDowntime?: number;
  courseLength?: number;
  courseLocation?: string;
  courseAddress?: string;
}

interface HikingInfo {
  detailInfo: courseInfo;
  timeInfo: number;
  coordXInfo: Array<number>;
  coordYInfo: Array<number>;
  courseMap: any;
}

const initialState: HikingInfo = {
  detailInfo: {
    courseNo: 0,
    courseMtNm: "",
    courseMtCd: 0,
    courseMtNo: 0,
    courseXCoords: [],
    courseYCoords: [],
    courseAbsDiff: "",
    courseUptime: 0,
    courseDowntime: 0,
    courseLength: 0,
    courseLocation: "",
    courseAddress: "",
  },
  timeInfo: 0,
  coordXInfo: [],
  coordYInfo: [],
  courseMap: {},
};

export const courseSlice = createSlice({
  name: "course",
  initialState,
  reducers: {
    addCourse: (state, action: PayloadAction<courseInfo>) => {
      state.detailInfo = action.payload;
    },
    addTime: (state, action: PayloadAction<number>) => {
      state.timeInfo = action.payload;
    },
    addCoordX: (state, action: PayloadAction<number>) => {
      state.coordXInfo.push(action.payload);
    },
    addCoordY: (state, action: PayloadAction<number>) => {
      state.coordYInfo.push(action.payload);
    },
    addCourseMap: (state, action: PayloadAction<any>) => {
      state.courseMap = action.payload;
    },
  },
});

export const courseActions = courseSlice.actions;

export default courseSlice.reducer;
