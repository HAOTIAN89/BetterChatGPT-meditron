#!/bin/bash

# Install necessary Python package
echo "Installing required Python package..."
pip install shortuuid

# Start three separate tmux sessions for different components
echo "Starting tmux sessions..."

# Session for the controller
echo 'Starting tmux session for the controller...'
tmux new-session -d -s controller 'cd /home/ubuntu/moove/FastChat-meditron && python3 -m fastchat.serve.controller'
echo 'Start to sleep 10s...'
sleep 10

# Session for the chat
echo 'Starting tmux session for chat...'
tmux new-session -d -s chat 'cd /home/ubuntu/moove/FastChat-meditron && ./fastchat.sh -c meditron-70b -m single -n 4'
echo 'Start to sleep 600s...'
sleep 600

# Session for the API server
echo 'Starting tmux session for the API server...'
tmux new-session -d -s api_server 'cd /home/ubuntu/moove/FastChat-meditron && python3 -m fastchat.serve.openai_api_server --host 104.171.203.227 --port 8000'
echo 'Start to sleep 10s...'
sleep 10

echo "Fastchat project is now running inside the container."