FROM node:lts-buster

# Clone your repo
RUN git clone https://github.com/sigmalord-nick/merlin-md.git

# Set working directory to the cloned repo
WORKDIR /merlin-md

# Install dependencies and pm2 globally
RUN npm install && npm install -g pm2

# Expose the port your app uses
EXPOSE 9090

# Use pm2 to start your app
CMD ["pm2-runtime", "index.js", "--name", "merlin-md"]
