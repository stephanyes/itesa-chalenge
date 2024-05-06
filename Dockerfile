FROM node:20
WORKDIR /app
ADD . .
RUN npm install
EXPOSE 6000

CMD ["npm", "run", "dev"]
