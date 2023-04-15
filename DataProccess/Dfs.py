from collections import deque

courses, checked, one_path = [], [], []
cnt, top_point_idx, limit_dis = 0, 0, 0


# 시종점(시작점)을 포함한 등산 코스 찾기
def course_dfs(course_df, graph, idx, cur_dis):
    global courses, checked, one_path, cnt, limit_dis

    # 산별 총 길이 제한을 넘거나 한 시종점에서의 코스 수가 3개 초과한 경우 제외
    if cnt > 3 or cur_dis > limit_dis:
        return

    if idx == top_point_idx:
        # 최종적으로 나온 코스를 courses에 저장
        courses.append([i for i in one_path])
        cnt += 1
        return

    # 모든 이어진 등산로를 탐색하기 위해 백트래킹으로 구현
    for v in graph[idx][1]:
        if not checked[v][0]:
            checked[v][0] = True
            one_path.append(v)
            course_dfs(course_df, graph, v, cur_dis+course_df.loc[v,"PMNTN_LT"])
            one_path.pop()
            checked[v][0] = False


def main(course_df, graph, start_points_idx, top_point_elev, top_idx):
    global courses, checked, one_path, cnt, limit_dis, top_point_idx

    # start_points_idx 로 시작 해서 top_point_idx 로 끝나는 등산 코스 찾기
    top_point_idx = top_idx
    courses = []
    checked = [[False] * 2 for _ in range(len(course_df))]
    for s in start_points_idx:
        one_path = deque([s])
        cnt = 0
        checked[s][1] = True
        # 의미없는 등산로를 거르기 위해 limit_dis 를 고도 * 8 로 제한
        limit_dis = top_point_elev * 8 / 1000
        course_dfs(course_df, graph, s, course_df.loc[s, "PMNTN_LT"])
        checked[s][1] = False

    print(f"등산 코스 리스트 : {courses}")
    return courses
