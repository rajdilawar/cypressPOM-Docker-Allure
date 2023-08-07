# Use the official Cypress Docker image as the base image
FROM cypress/base:latest

# Set the working directory inside the container
WORKDIR /app

# Copy the entire project to the container
COPY . .

# Install project dependencies
RUN npm install

# Install Cypress binary
RUN npx cypress install

# Execute the Cypress tests when the container starts
CMD ["npm", "test"]
