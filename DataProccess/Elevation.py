import requests
import pandas as pd
import api_keys


# 높이 좌표를 512개 단위로 보내기
def divide_chunks(lst, n=512):
    for i in range(0, len(lst), n):
        yield lst[i:i + n]


def get_elevation_api(last_points):
    """ google 고도 api 요청 및 가장 높은 고도의 좌표 저장 V1 """
    # for i in range(len(df_paths)):
    #     dic[i] = [df_paths[i]['paths'][0][0], df_paths[i]['paths'][0][-1]]
    #     lon, lat = transform(epsg5186, wgs84, dic[i][-1][0], dic[i][-1][1])  # 좌표계 변환 (등산로 끝점만 확인)
    #     url = f"https://maps.googleapis.com/maps/api/elevation/json?locations={lat},{lon}&key={GOOGLE_API_KEY}"
    #     response = requests.request("GET", url, headers={}, data={})
    #     compTop = response.json()['results'][0]['elevation']
    #
    #     # 가장 높은 좌표의 idx 저장
    #     if top < compTop:
    #         top = compTop
    #         topX, topY = lon, lat
    #         top_point_idx = i
    """ google 고도 api 요청 및 가장 높은 고도의 좌표 저장 V2 """
    query_chunks = divide_chunks(last_points, 350) # 공식문서에서 한번에 512개까지 가능이라고 했지만 실제론 약 380개만 보낼 수 있음

    urls = [f"https://maps.googleapis.com/maps/api/elevation/json?locations={'|'.join(query_chunk)}&key={api_keys.GOOGLE_API_KEY}" for query_chunk in query_chunks]
    elevations = []
    for url in urls:
        response = requests.request("GET", url, headers={}, data={})
        elevations.extend(pd.DataFrame(response.json()["results"])["elevation"])

    return elevations


def main(course_df, last_points):
    # course_df에 고도 column 저장
    course_df["ELEVATION"] = get_elevation_api(last_points)

    top_point_idx = course_df.ELEVATION.idxmax()  # 가장 높은 등산로의 idx 저장
    top_point_elev = course_df.ELEVATION[top_point_idx]  # 가장 높은 포인트의 고도 저장

    print(f"정상 포인트 : {top_point_idx}, 정상 고도 : {top_point_elev}")
    return top_point_idx, top_point_elev
