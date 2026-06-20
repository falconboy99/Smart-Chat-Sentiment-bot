# Build the React frontend
FROM node:20-alpine AS frontend-build
WORKDIR /app/chatapp
COPY chatapp/package.json chatapp/package-lock.json ./
RUN npm ci
COPY chatapp/ ./
RUN npm run build

# Build the Node backend
FROM node:20-alpine AS backend-build
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci --omit=dev
COPY . ./

# Final runtime image
FROM node:20-alpine AS runtime
WORKDIR /app
COPY --from=backend-build /app/node_modules ./node_modules
COPY --from=backend-build /app/index.js ./index.js
COPY --from=frontend-build /app/chatapp/build ./chatapp/build

ENV NODE_ENV=production
EXPOSE 3001
CMD ["node", "index.js"]
