FROM node:alpine AS development

ENV NODE_ENV development

WORKDIR /accounting_frontend


COPY . /accounting_frontend

RUN npm install --force


EXPOSE 3000

CMD npm start