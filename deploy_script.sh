#!/bin/bash

# Stop and remove all running containers
docker stop $(docker ps -aq)
docker rm $(docker ps -aq)

# Delete all Docker images
docker rmi -f $(docker images -aq)

# Navigate to the directory containing your Docker Compose file
cd /home/stock-rex/Desktop/stock-reX

# Bring down existing Docker Compose services
docker compose down

# Build and bring up the Docker Compose services
docker compose up -d --build

# Notify when done
echo "Deployment complete!"

#curl -X GET http://0.0.0.0:8080/feedback/get_feedback
#curl -X POST -H "Content-Type: application/json" -d '{"feedback_value": 5}' http://0.0.0.0:8080/feedback/add_feedback/123/4
#curl -X POST -H "Content-Type: application/json" -d '{"feedback_value": 5}' http://0.0.0.0:8080/feedback/add_feedback/123/5
#curl -X POST -H "Content-Type: application/json" -d '{"feedback_value": 5}' http://0.0.0.0:8080/feedback/add_feedback/123/6
#curl -X GET http://0.0.0.0:8080/feedback/get_feedback
#curl -X GET http://0.0.0.0:8080/feedback/get_unseen_shoe/123