import pandas as pd
import numpy as np
from sklearn.cluster import KMeans
from sklearn.decomposition import PCA

import matplotlib.pyplot as plt
import warnings

# 경고 메세지 끄기
warnings.filterwarnings(action='ignore')

df = pd.read_csv("C:/Users/SSAFY/Documents/donggi/sansam_db_data/course.csv")
data = df[['COURSE_ELEV_DIFF', 'COURSE_UPTIME', 'COURSE_DOWNTIME', 'COURSE_LENGTH']]

kmeans = KMeans(n_clusters=3, init='k-means++', max_iter=300, random_state=0)
kmeans.fit(data)

data['cluster'] = kmeans.labels_
centroids = kmeans.cluster_centers_
labels = kmeans.labels_
n_points = np.bincount(labels)
for i in range(len(centroids)):
    print("Cluster {} - Centroid: {}, Number of points: {}".format(i, centroids[i], n_points[i]))

print(data.to_string())

pca = PCA(n_components=3)
print(data.values)
pca_transformed = pca.fit_transform(data.values)
print(pca_transformed)
print(pca_transformed.size)
data['pca_x'] = pca_transformed[:, 0]
data['pca_y'] = pca_transformed[:, 1]
data['pca_z'] = pca_transformed[:, 2]

# cluster 값이 0, 1, 2 인 경우마다 별도의 Index로 추출
marker0_ind = data[data['cluster'] == 0].index
marker1_ind = data[data['cluster'] == 1].index
marker2_ind = data[data['cluster'] == 2].index
print("markers")
print(marker0_ind)

# cluster값 0, 1, 2에 해당하는 Index로 각 cluster 레벨의 pca_x, pca_y 값 추출. o, s, ^ 로 marker 표시
ax = plt.figure().add_subplot(projection='3d')
ax.scatter(xs=data.loc[marker0_ind, 'pca_x'], ys=data.loc[marker0_ind, 'pca_y'], zs=data.loc[marker0_ind, 'pca_z'], label="Cluster 1", marker='o')
ax.scatter(xs=data.loc[marker1_ind, 'pca_x'], ys=data.loc[marker1_ind, 'pca_y'], zs=data.loc[marker1_ind, 'pca_z'], label="Cluster 2", marker='s')
ax.scatter(xs=data.loc[marker2_ind, 'pca_x'], ys=data.loc[marker2_ind, 'pca_y'], zs=data.loc[marker2_ind, 'pca_z'], label="Cluster 3", marker='^')

ax.set_xlabel('PCA 1')
ax.set_ylabel('PCA 2')
ax.set_zlabel('PCA 3')
plt.legend(loc="upper right")
plt.title('3D modeling of Principal Component Analysis From Clustering')
plt.show()
