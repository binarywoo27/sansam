
graph, visited = [], []


# 등산로 연결 정보 그래프(dictionary)에 저장
def make_graph(course_df, idx):
    global graph, visited
    last = course_df.loc[idx, "LAST_POINT"]
    for i in range(len(course_df)):
        fid = course_df.loc[i,"FID"]
        first = course_df.loc[i, "FIRST_POINT"]

        # 현재 등산로의 끝점과 탐색 등산로의 시작점이 같은 경우 이어졌다고 판단
        if last == first and not visited[fid][0] and fid not in graph[idx][1]:
            graph[idx][1].append(fid)
            graph[fid][0].append(idx)
            visited[fid][0] = True
            make_graph(course_df, fid)
            visited[fid][0] = False


# course_df 정보로 연결 정보 저장
def main(course_df):
    global graph, visited
    # 등산로 idx를 바탕으로 연결 그래프 만들기
    graph = {i: {0: [], 1: []} for i in range(len(course_df))}  # 0 : 등산로의 시작점 , 1 : 등산로의 끝점
    visited = [[False] * 2 for _ in range(len(course_df))]  # [0] : 시작점 방문 여부 , [1] : 끝점 방문 여부
    for idx in range(len(course_df)):
        visited[idx][1] = True
        make_graph(course_df, idx)
        visited[idx][1] = False

    print(f"등산로 연결 정보 : {graph}")
    return graph
