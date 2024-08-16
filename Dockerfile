FROM node:18 as base

# Set the working directory inside the container
WORKDIR /app

# Add package file
RUN apt update && apt install

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./
COPY package-lock.json ./

# Install application dependencies
RUN npm install --frozen-lockfile

# Copy source
COPY src ./src
COPY .env ./.env
COPY tsconfig.json ./

# Build the application
RUN npm run build

# Expose port 3000
EXPOSE 3000

# Define the command to start the Node.js application
CMD ["npm", "run", "start:prod"]