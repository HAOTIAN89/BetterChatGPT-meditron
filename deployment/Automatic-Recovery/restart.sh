#!/bin/bash

# Define the path to the script and the Docker container name
script_path="../meditron-eval/run_img.sh"
container_name="meditron-eval-restart"

# Check if the run_img.sh script exists
if [ -f "$script_path" ]; then
    echo "Starting the Docker image..."
    # Start the Docker image
    (cd "../meditron-eval/" && ./run_img.sh $container_name)
else
    echo "Error: Script run_img.sh not found in the path $script_path"
    exit 1
fi

# Wait for Docker to initialize
echo "Waiting for Docker to initialize..."
sleep 10

# Set the script inside the Docker container as executable
echo "Setting the internal script as executable..."
docker exec -it $container_name chmod +x /home/ubuntu/moove/model_depolyment.sh

# Execute the script inside the Docker container
echo "Executing script inside Docker container to start tmux sessions..."
docker exec -it $container_name /home/ubuntu/moove/model_depolyment.sh