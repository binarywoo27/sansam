FROM python:3.9-slim

COPY . /flaskSansam

WORKDIR /flaskSansam

RUN pip install --requirement requirements.txt

CMD python app.py

EXPOSE 5001