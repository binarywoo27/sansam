from datetime import datetime
from sqlalchemy import create_engine, Integer, String, DateTime
from sqlalchemy.sql.schema import Column
from sqlalchemy.orm import sessionmaker, declarative_base
import pandas as pd
from faker import Faker
import random

from config import DB_URL

fake = Faker("ko_KR")

database = create_engine(DB_URL)
Session = sessionmaker(autocommit=False, autoflush=False, bind=database)
session = Session()

Base = declarative_base()


class Review(Base):
    __tablename__ = 'REVIEW'

    REVIEW_NO = Column(Integer, primary_key=True)
    USER_NO = Column(Integer, nullable=False)
    COURSE_NO = Column(Integer, nullable=False)
    REVIEW_DATE = Column(DateTime, nullable=False)
    REVIEW_TIME = Column(Integer, nullable=False)
    REVIEW_REL_DIFF = Column(String, nullable=False)
    REVIEW_CONTENT = Column(String, nullable=True)


def create_dummy_user():
    user = pd.DataFrame(columns=['USER_EMAIL', 'USER_NICKNM', 'USER_AGE', 'USER_GENDER', 'USER_LOCATION'])
    for i in range(100):
        user_profile = fake.profile()
        user_email = user_profile['mail']
        user_nicknm = user_profile['name'][1:]
        user_age = int((datetime.now().date() - user_profile['birthdate']).days / 365)
        user_gender = user_profile['sex']
        user_location = random.sample(
            ['강원', '경기', '경남', '경북', '광주', '대구', '대전', '부산', '서울', '세종', '울산', '인천', '전남', '전북', '제주', '충남', '충북'], 1)[
            0]
        user = user.append(
            {'USER_EMAIL': user_email, 'USER_NICKNM': user_nicknm, 'USER_AGE': user_age, 'USER_GENDER': user_gender,
             'USER_LOCATION': user_location}, ignore_index=True)
    user.to_sql(name='USER', con=database, if_exists='append', index=False, method='multi')


def create_dummy_review():
    for i in range(500):
        user_no = random.randint(1, 100)
        course_no = random.randint(1, 4553)
        review_date = fake.date_between_dates(date_start=datetime(2018, 1, 1), date_end=datetime(2023, 3, 30))
        review_time = random.randint(60, 600)
        review_rel_diff = random.choice('ENH')
        review_content = random.sample(
            ['꽃이 너무 예뻐요!', '힘들지만 재밌어요!', '날씨가 더울 때는 가지 마세요... 지옥입니다.', '오르막길이 생각보다 힘들었어요', '편안한 산이예요. 함께 가실분 구해요~',
             '다람쥐가 짱 많다.',
             '삶이 힘들 때, 한번쯤 가면 좋은 산', '시원한 바람과 함께 타기 좋은 산!', '행복한 산행이였습니다.', '자연과 함께 할 수 있는 산.', None,
             '너무 힘들었어요. 정말 쉽지 않네요...',
             '진흙이 많아요... 신발 조심하세요 ㅠㅠ', '정상은 생각보다 바람이 많이 불어서 추웠다.', '자연과 하나되는 산행!', '산삶 덕분에 산행이 즐거워요 산삶 최고!'], 1)[0]

        # review_date의 형식을 datetime.date에서 timestamp형식으로 변환
        review_date = datetime.combine(review_date, datetime.min.time())

        review = Review(USER_NO=user_no, COURSE_NO=course_no, REVIEW_DATE=review_date, REVIEW_TIME=review_time,
                        REVIEW_REL_DIFF=review_rel_diff, REVIEW_CONTENT=review_content)
        session.add(review)
        session.commit()


create_dummy_user()
create_dummy_review()
