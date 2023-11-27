# Use an official Node.js runtime as the base image
FROM node:18

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the working directory
# COPY package*.json ./

COPY package*.json ./
# Install Node.js dependencies
RUN npm install -g nodemon
RUN npm install 

# Copy the rest of your application code to the working directory

COPY . .
# Expose the port your Express.js application will listen on
EXPOSE 3000

# Define the command to start your application
CMD [ "nodemon", "app.js" ]
