import axios from "axios";

export interface Tokens {
  "X-ACCESS-TOKEN": string;
  "X-REFRESH-TOKEN": string;
}

const flaskApi = axios.create({
  baseURL: "https://j8d205.p.ssafy.io/flask-api",
  // baseURL: "http://localhost:5001/",
});

const springApi = axios.create({
  baseURL: "https://j8d205.p.ssafy.io/api",
  // baseURL: "http://localhost:5000/",
});

export const userApi = {
  userInfo: (accessToken: string | null, refreshToken: string | null) =>
    springApi.get("user/info", {
      headers: {
        "X-ACCESS-TOKEN": accessToken,
        "X-REFRESH-TOKEN": refreshToken,
      },
    }),
  logOut: (
    accessToken: string | null | undefined,
    refreshToken: string | null | undefined
  ) =>
    springApi.get("user/signout", {
      headers: {
        "X-ACCESS-TOKEN": accessToken,
        "X-REFRESH-TOKEN": refreshToken,
      },
    }),
  isRec: (accessToken: string | null, refreshToken: string | null) =>
    springApi.get("user/main/is-recommendable", {
      headers: {
        "X-ACCESS-TOKEN": accessToken,
        "X-REFRESH-TOKEN": refreshToken,
      },
    }),
};

export const courseApi = {
  searchBar: (accessToken: string | null, refreshToken: string | null) =>
    springApi.get("course/mtlist", {
      headers: {
        "X-ACCESS-TOKEN": accessToken,
        "X-REFRESH-TOKEN": refreshToken,
      },
    }),
  ageGender: (accessToken: string | null, refreshToken: string | null) =>
    flaskApi.get("course/main/age-gender", {
      headers: {
        "X-ACCESS-TOKEN": accessToken,
        "X-REFRESH-TOKEN": refreshToken,
      },
    }),
  recommend: (accessToken: string | null, refreshToken: string | null) =>
    flaskApi.get("course/main/recommend", {
      headers: {
        "X-ACCESS-TOKEN": accessToken,
        "X-REFRESH-TOKEN": refreshToken,
      },
    }),
  topTen: (accessToken: string | null, refreshToken: string | null) =>
    springApi.get("course/top-ten", {
      headers: {
        "X-ACCESS-TOKEN": accessToken,
        "X-REFRESH-TOKEN": refreshToken,
      },
    }),
};

export default flaskApi;
