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
RUN npm run build
# OR if using yarn: RUN yarn build

# Use a smaller image for production
FROM node:18-alpine AS runner
WORKDIR /hefaceit

# Copy only necessary files from builder
COPY --from=builder /hefaceit/package*.json ./
COPY --from=builder /hefaceit/.next ./.next
COPY --from=builder /hefaceit/public ./public
COPY --from=builder /hefaceit/node_modules ./node_modules


# Expose the port the app runs on
EXPOSE 3000

# Command to run the application
CMD ["npm", "run", "dev"]