FROM node:16.13.1

WORKDIR /backend

COPY /backend package.json

COPY /backend package-lock.json

COPY /backend tsconfig.json

COPY /backend ./

RUN npm install

CMD [ "npm" , "start" ]

EXPOSE 3001