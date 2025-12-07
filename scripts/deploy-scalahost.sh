#!/bin/bash
set -e

# Configuration
QUADLET_NAME="5l-labs.container"
SOURCE_PATH="./deployment/scalahost/$QUADLET_NAME"
DEST_DIR="$HOME/.config/containers/systemd"
SERVICE_NAME="5l-labs"

echo "Deploying 5l-labs to ScalaHost (Podman/Quadlet)..."

# 1. Ensure destination directory exists
mkdir -p "$DEST_DIR"

# 2. Copy Quadlet file
echo "Copying $QUADLET_NAME to $DEST_DIR..."
cp "$SOURCE_PATH" "$DEST_DIR/"

# 3. Reload systemd user daemon
echo "Reloading systemd --user daemon..."
systemctl --user daemon-reload

# 4. Enable lingering (requires sudo if not already enabled for user, or run by admin)
# Attempt to enable linger for current user if loginctl is available
if command -v loginctl >/dev/null 2>&1; then
    if ! loginctl show-user $USER --property=Linger | grep -q "yes"; then
        echo "Attempting to enable linger for $USER (may prompt for password)..."
        loginctl enable-linger $USER || echo "Warning: Failed to enable linger. Service may stop when you log out."
    else
        echo "Linger is already enabled for $USER."
    fi
else
    echo "Warning: loginctl not found. Make sure lingering is enabled for long-running services."
fi

# 5. Start/Restart service
echo "Starting/Restarting $SERVICE_NAME.service..."
systemctl --user restart "$SERVICE_NAME.service"

echo "Deployment complete! Check status with: systemctl --user status $SERVICE_NAME.service"
