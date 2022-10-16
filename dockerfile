FROM node:14.20-alpine


WORKDIR /app
COPY package*.json ./
RUN npm install  
COPY . ./

# CMD ["npm",  "start" ]

EXPOSE 3030