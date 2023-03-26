FROM python:3.9.6-alpine
ENV PYTHONUNBUFFERED=1

WORKDIR /django_account

RUN pip install --upgrade pip 
COPY ./requirements.txt /django_account
RUN pip install -r requirements.txt 

COPY . /django_account

EXPOSE 8000
