FROM node:14.19 AS development

WORKDIR /usr/src/app

COPY package*.json ./ 

RUN yarn --only=development
COPY . .
RUN yarn build

FROM node:14.19
COPY --from=development /usr/src/app/dist ./dist

FROM postgres
ENV POSTGRES_PASSWORD admin
ENV POSTGRES_DB users accounts transactions
COPY public.sql /docker-entrypoint-initdb.d/
CMD ["node", "dist/main"]