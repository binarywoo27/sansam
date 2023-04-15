import pandas as pd
import json
import math
import warnings
from pyproj import Proj, transform

# 경고 메세지 끄기
warnings.filterwarnings(action='ignore')

# 변환할 좌표계 정의
epsg5186 = Proj(init="epsg:5186")
wgs84 = Proj(init='epsg:4326')


# 마지막 점이 시종점인 경우 path 를 뒤집음
def reverse_path(paths):
    paths[0]=paths[0][::-1]
    return paths


def get_start_points(pmntn_spot_dir):
    # 공공 데이터셋 정보를 dataframe 으로 받아서 시종점(feature) 좌표 추출
    start_dict = json.load(open(pmntn_spot_dir, 'rt', encoding='UTF8'))
    start_df = pd.DataFrame(start_dict["features"])

    # dictionary 로 되어 있는 것들을 column 으로 펼친 후에 concat 함
    start_df = pd.concat([start_df["attributes"].apply(pd.Series), start_df["geometry"].apply(pd.Series)], axis=1)

    # MANAGE_SP2 가 시종점 인 것들만 쿼리 하기
    start_points_df = start_df[start_df.MANAGE_SP2 == "시종점"]
    # x, y 가 NaN인 경우 row 삭제
    start_points_df = start_points_df.drop(start_points_df[(start_points_df.x == "NaN") & (start_points_df.y == "NaN")].index)
    start_points = start_points_df[["x", "y"]].astype(int).values.tolist()

    return start_points


def get_course_df(pmntn_dir, start_points):
    # 공공 데이터셋 정보를 dataframe로 받아서 등산로 정보를 저장
    course_dict = json.load(open(pmntn_dir, 'rt', encoding='UTF8'))
    course_df = pd.DataFrame(course_dict["features"])
    course_df = pd.concat([course_df["attributes"].apply(pd.Series), course_df["geometry"].apply(pd.Series)], axis=1)

    # paths 의 첫번째 좌표가 시종점인 등산로 idx 찾기
    course_df["LAST_POINT"] = course_df["paths"].map(lambda paths: list(map(math.trunc, paths[0][-1])))
    course_df["IS_LAST_POINT_START"] = course_df["LAST_POINT"].map(lambda point: point in start_points)
    course_df.loc[course_df["IS_LAST_POINT_START"] == True, "paths"] = course_df.loc[course_df["IS_LAST_POINT_START"] == True, "paths"].map(reverse_path)
    course_df.drop(columns=["LAST_POINT", "IS_LAST_POINT_START"], inplace=True)

    course_df["FIRST_POINT"] = course_df["paths"].map(lambda paths: list(map(math.trunc, paths[0][0])))
    course_df["LAST_POINT"] = course_df["paths"].map(lambda paths: list(map(math.trunc, paths[0][-1])))
    course_df["IS_START_POINT"] = course_df["FIRST_POINT"].map(lambda point: point in start_points)

    return course_df


def main(pmntn_dir_spot, pmntn_dir):
    start_points = get_start_points(pmntn_dir_spot)  # 시종점 좌표 리스트 반환
    course_df = get_course_df(pmntn_dir, start_points)  # 등산로의 시작점, 끝점을 column으로 가지는 dataframe 생성
    start_points_idx = course_df.query("IS_START_POINT == True").FID.tolist() # 시작점 == 시종점인 등산로 idx 리스트 반환

    # 끝점 리스트로 반환
    last_points = (
        course_df.LAST_POINT.map(lambda point: transform(epsg5186, wgs84, point[0], point[1]))
        .map(lambda lnglat: f"{lnglat[1]}, {lnglat[0]}")
        .to_list()
    )

    print(f"시종점 idx : {start_points_idx}")
    print(f"끝점 리스트 : {last_points}")

    return start_points_idx, course_df, last_points
