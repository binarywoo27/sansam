import requests
import json
import api_keys
import numpy as np
import warnings
from pyproj import Proj, transform

# 경고 메세지 끄기
warnings.filterwarnings(action='ignore')

# 변환할 좌표계 정의
epsg5186 = Proj(init="epsg:5186")
wgs84 = Proj(init='epsg:4326')


def get_course_points(one_path_df):
    """ lng, lat 을 가져 와서 좌표 변환 V1 """
    # # courses[i]의 모든 좌표 ndarray에 저장 후 list 화
    # points = np.concatenate(
    #     one_path_df.paths
    #     .map(lambda _paths : _paths[0]).values
    # ).tolist()
    # points = pd.Series(points)# 2d list를 Series 화
    #
    # # 좌표계 변환하여 해당 코스의 최종 좌표들 저장
    # course_points = (
    #     points.map(lambda point: transform(epsg5186, wgs84, point[0], point[1]))
    #     .map(lambda lnglat: f"{lnglat[1]}, {lnglat[0]}")
    #     .to_list()
    # )
    """ lng, lat 을 가져 와서 좌표 변환 V2 (리스트로 한번에 변환)"""
    np_points = np.concatenate(one_path_df.paths.map(lambda _paths: _paths[0]).values)
    epsg5186_xs, epsg5186_ys = np_points.T
    wgs84_lngs, wgs84_lats = transform(epsg5186, wgs84, epsg5186_xs, epsg5186_ys)
    # course_points = [f"{lat}, {lng}" for lat, lng in zip(wgs84_lats, wgs84_lngs)]
    course_points = list(zip(wgs84_lats, wgs84_lngs))

    return course_points


# 좌포로 행정구역명 가져오기 api
def get_address(lat, lng):
    url = f"https://dapi.kakao.com/v2/local/geo/coord2address.json?x={lng}&y={lat}"

    headers = {"Authorization": api_keys.KAKAO_API_KEY }
    api_json = requests.get(url, headers=headers)
    full_address = json.loads(api_json.text)

    # 해당 좌표의 주소가 비어있는 경우, null 처리
    return "null" if full_address['meta']['total_count'] == 0 else full_address['documents'][0]['address']['address_name']


def main(course_df, paths_df, i, course, top_point_elev):
    # course를 이루고 있는 idx들의 정보 저장
    path_df = paths_df.iloc[course]

    # course를 이루고 있는 좌표를 반환
    course_points = get_course_points(path_df)

    # 각각의 columns 들을 더해서 dict 에 저장
    path_dict = (
        path_df[["PMNTN_LT", "PMNTN_UPPL", "PMNTN_GODN"]]
        .sum()
        .to_dict()
    )
    mn_dis, mn_up_time, mn_down_time = path_dict.values()

    # 시종점과 정상 높이 차
    mn_elev_diff = top_point_elev - path_df["ELEVATION"].iloc[0]
    # 산코드 저장
    mn_code = course_df.loc[course[0], 'MNTN_CODE']
    # 산이름 저장
    mn_name = course_df.loc[course[0], 'MNTN_NM']
    mn_name = mn_name.split('_')[0] if '_' in mn_name else mn_name
    # 산별 코스 번호 저장
    mn_course_num = i + 1
    # 시종점 주소 저장
    lat, lng = course_points[0]
    mn_course_adr = get_address(lat, lng)
    mn_district = mn_course_adr.split()[0]

    # print(f"course_points = {course_points}")
    # print(f"course info = {mn_code, mn_name, mn_course_num, mn_elev_diff, mn_up_time, mn_down_time, round(mn_dis, 2), mn_district, mn_course_adr}")

    return course_points, [mn_code, mn_name, mn_course_num, mn_elev_diff, mn_up_time, mn_down_time, round(mn_dis, 2), mn_district, mn_course_adr]
