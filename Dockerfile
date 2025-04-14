# Use an official Node.js runtime as the base image
FROM node:18-alpine AS builder

# Set the working directory in the container
WORKDIR /hefaceit

# Copy package.json and package-lock.json (or yarn.lock)
COPY package*.json ./

# Install dependencies (use yarn if you prefer)
RUN npm install --frozen-lockfile
# OR if using yarn: RUN yarn install --frozen-lockfile

# Copy the rest of the application files
COPY . .

# Build the Next.js application
RUN npm run dev