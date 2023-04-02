# Use Node.js 14.17 as the base image
FROM node:14.17

# Set the working directory to $HOME
WORKDIR $HOME

# Copy the package.json and package-lock.json files to the container
COPY package*.json ./

# Install the dependencies
RUN npm install

# Copy the rest of the application files to the container
COPY . .

# Expose port 8080 for the application
EXPOSE 8080

# Start the application
CMD [ "npm", "run", "serve" ]