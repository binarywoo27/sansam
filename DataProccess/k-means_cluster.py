import pandas as pd
import numpy as np
from sklearn.cluster import KMeans
import warnings
import sys
np.set_printoptions(threshold=sys.maxsize)

# 경고 메세지 끄기
warnings.filterwarnings(action='ignore')

df = pd.read_csv("C:/Users/multicampus/Desktop/특화PJT_자료/course.csv")
data = df[['COURSE_ELEV_DIFF', 'COURSE_UPTIME', 'COURSE_DOWNTIME', 'COURSE_LENGTH']]

centroids = np.array([[243.372269, 69, 35, 3.35],
                      [78.161583, 19, 5, 0.66],
                      [613.146301, 109, 74, 6.07]])
kmeans = KMeans(n_clusters=3, init=centroids, max_iter=300, random_state=0)
kmeans.fit(data)

data['cluster']=kmeans.labels_
X, y = data[['COURSE_ELEV_DIFF', 'COURSE_UPTIME', 'COURSE_DOWNTIME', 'COURSE_LENGTH']].values, kmeans.labels_

# 각 점에서 센트로이드까지 거리 반환
dist_model = kmeans.transform(X)
easy_model = dist_model[:,0]

# easy인 경우
# top 10 smallest의 idx 반환 (순서대로 X)
ind = np.argpartition(dist_model[:,0], 10)[:10]
top_10 = easy_model[ind]

# sorted top 10 smallest idx
sorted_top_10_idx = ind[np.argsort(top_10)]
print(sorted_top_10_idx)
