# Use the official Node.js 18 image as the base image
FROM node:18

# Install tini
RUN apt-get update && apt-get install -y tini

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json (if available) to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code to the working directory
COPY . .

# Expose the port the app runs on
EXPOSE 3000

# Set the environment variable to production
ENV NODE_ENV=production

# Use tini as the init system, to make ctrl + c - interrupt work
ENTRYPOINT ["tini", "--"]

# Define the command to run the application
CMD ["node", "server.js"]