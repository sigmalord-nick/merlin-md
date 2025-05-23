# Use the official Node.js LTS image
FROM node:18

# Set working directory inside the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json (if available)
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy all project files
COPY . .

# Expose the port your app runs on (adjust if necessary)
EXPOSE 3000

# Start the app (adjust the entry file if different)
CMD ["node", "command.js"]
