FROM node:lts-buster

# Install dependencies
WORKDIR /app
COPY package*.json ./
RUN npm install

# Copy app files
COPY . .

# Start app
CMD ["node", "start"]
