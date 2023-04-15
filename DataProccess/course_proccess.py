import os
import pandas as pd
import warnings
from sqlalchemy import create_engine
from pyproj import Proj, transform

import Dataframe
import Graph
import Dfs
import Elevation
import Info
import api_keys


# 경고 메세지 끄기
warnings.filterwarnings(action='ignore')

# 변환할 좌표계 정의
epsg5186 = Proj(init="epsg:5186")
wgs84 = Proj(init='epsg:4326')

# DB 연결
engine = create_engine(f"mariadb+pymysql://ssafy:{api_keys.MARIADB_PASSWORD}@127.0.0.1:3306/sansam_db?charset=utf8mb4")

# 모든 데이터셋 파일 하나씩 읽기
dir_path = "/dataset/mountain" # 데이터셋 있는 디렉토리 설정 (압축풀고)
dir_list = os.listdir(dir_path)[:-1] # 디렉토리 내 폴더 리스트 저장
course_idx = 1
coord_idx = 1
for _dir in dir_list:
    # 산정보 폴더를 하나씩 돌면서 json 파일 읽기
    file_path=dir_path+_dir
    file_list=os.listdir(file_path)
    PMNTN_DIR_SPOT = file_path + '/' + file_list[0] if file_list[0].startswith("PMNTN_SPOT") else file_path + '/' + file_list[1]
    PMNTN_DIR = file_path + '/' + file_list[1] if PMNTN_DIR_SPOT == file_path + '/' + file_list[0] else file_path + '/' + file_list[0]

    # 시종점 좌표 리스트, 등산로의 시작점과 끝점을 column으로 가지는 dataframe 생성
    start_points_idx, course_df, last_points = Dataframe.main(PMNTN_DIR_SPOT, PMNTN_DIR)
    # 가장 높은 등산로의 idx와 고도 저장
    top_point_idx, top_point_elev = Elevation.main(course_df, last_points)

    # 그래프로 연결정보 저장 및 등산 코스 뽑아내기
    graph = Graph.main(course_df)
    courses = Dfs.main(course_df, graph, start_points_idx, top_point_elev, top_point_idx)
    # 코스 수가 0이면 df에 저장 X
    if len(courses) == 0:
        continue
    print(f"등산 코스 총 수 : {file_list[0]} : {len(courses)}")

    # 등산로의 시작점 좌표계 변환
    course_df["FIRST_POINT"] = course_df.FIRST_POINT.map(lambda point: transform(epsg5186, wgs84, point[0], point[1]))

    # DB에 저장 하기 위한 데이터 프레임 틀 만들기
    COURSE = pd.DataFrame(columns=['COURSE_MT_CD', 'COURSE_MT_NM', 'COURSE_MT_NO', 'COURSE_ELEV_DIFF', 'COURSE_UPTIME', 'COURSE_DOWNTIME', 'COURSE_LENGTH', 'COURSE_LOCATION', 'COURSE_ADDRESS'])
    COORDINATE = pd.DataFrame(columns=["COURSE_NO", 'COORD_X', 'COORD_Y'])

    # courses[i]에 있는 idx의 colum만 가져오기
    paths_df = course_df[["paths", "MNTN_CODE", "MNTN_NM", "PMNTN_LT", "PMNTN_UPPL", "PMNTN_GODN", "ELEVATION"]]
    coord_idx = 1
    for i, course in enumerate(courses):
        # course_points 반환, COURSE df에 코스 정보 저장
        course_points, COURSE.loc[course_idx] = Info.main(course_df, paths_df, i, course, top_point_elev)
        """ course 를 이루는 전체 좌표를 COORDINATE df 에 저장 V1 """
        # for p in course_points:
        #     lng, lat = map(float, p.split(","))
        #     COORDINATE.loc[coord_idx] = [course_idx, lng, lat]
        #     coord_idx+=1
        """ course 를 이루는 전체 좌표를 COORDINATE df 에 저장 V2 """
        new_coord = pd.DataFrame(course_points, columns=["COORD_X", "COORD_Y"]).assign(COURSE_NO=course_idx)
        COORDINATE = pd.concat([COORDINATE, new_coord], axis=0)

        course_idx+=1

    # one query 에 DataFrame 을 mariaDB에 넣기
    # COURSE.to_sql(name='COURSE', con=engine, if_exists='append', index=False, method='multi')
    # COORDINATE.to_sql(name='COORDINATE', con=engine, if_exists='append', index=False, method='multi')