FROM node:20-alpine AS build

WORKDIR /app

COPY package.json ./
RUN npm install

COPY . .

RUN npx tsc

EXPOSE 3000

# Start your app
CMD ["node", "dist/app.js"]