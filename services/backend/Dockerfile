FROM python:3.10

WORKDIR /app

COPY . /app

RUN pip install -r requirements.txt

COPY ./data /app/data

EXPOSE 8080

ENV VAR_NAME = value

CMD ["python", "app.py"]