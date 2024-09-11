##!/bin/bash

# Script to set up the test environment for phone-shop application

echo "Starting environment setup..."

# Navigate to server directory and install server dependencies
echo "Installing server dependencies..."
cd server
npm install
if [ $? -ne 0 ]; then
  echo "Failed to install server dependencies."
  exit 1
fi

# Navigate to client directory and install client dependencies
echo "Installing client dependencies..."
cd ../client
npm install
if [ $? -ne 0 ]; then
  echo "Failed to install client dependencies."
  exit 1
fi

# Go back to server directory to configure MySQL
cd ../server

# Check if .env file exists, if not, prompt user to create it
if [ ! -f .env ]; then
  echo ".env file not found! Please create a .env file with your database configuration."
  exit 1
fi

# Feed some initial data to the database
echo "Seeding the database with initial data..."
npm run seed
if [ $? -ne 0 ]; then
  echo "Failed to seed the database."
  exit 1
fi

# Start the backend server
echo "Starting the backend server..."
npm start &
if [ $? -ne 0 ]; then
  echo "Failed to start the backend server."
  exit 1
fi

# Start the Vue application in another terminal
echo "Starting the Vue application..."
cd ../client
npm run serve &
if [ $? -ne 0 ]; then
  echo "Failed to start the Vue application."
  exit 1
fi

echo "Environment setup complete. Your application should be running locally on port 8080."
