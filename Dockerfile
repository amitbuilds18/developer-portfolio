# Root Dockerfile targeting backend
FROM node:20-alpine

WORKDIR /app

# Install backend dependencies
COPY backend/package*.json ./
RUN npm install

# Copy backend source and build
COPY backend/ ./
RUN npm run build

EXPOSE 5000

CMD ["npm", "start"]
