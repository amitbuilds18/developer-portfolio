# Node.js 20 lightweight Alpine image
FROM node:20-alpine

WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm install

# Copy source code and build TypeScript to dist/
COPY . .
RUN npm run build

# Render dynamically passes PORT (defaults to 5000 if not set)
EXPOSE 5000

# Start compiled server
CMD ["npm", "start"]
