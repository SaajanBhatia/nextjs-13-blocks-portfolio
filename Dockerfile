# Use the official Node.js image as the base image
FROM node:14-alpine

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package.json package-lock.json ./

# Install dependencies
RUN npm ci --quiet

# Copy the entire project to the working directory
COPY . .

# Build the Next.js app for production
RUN npm run build

# Expose the port that the Next.js app will run on
EXPOSE 3000

# Start the Next.js app
CMD ["npm", "start"]
