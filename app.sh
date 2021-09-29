#!/usr/bin/env bash

set -e

MODE=$1

# Print the usage message
function printHelp() {
  echo "Usage: "
  echo "  app.sh <mode>"
  echo "    <mode> - one of 'up', 'down'"
  echo "      - 'up' - start app"
  echo "      - 'down' - stop app"
  echo "  app.sh -h (print this message)"
  echo
  echo "Example:"
  echo "    ./app.sh up"
  echo "    ./app.sh down"
}

if [[ "${MODE}" == "up" ]]; then
  echo "## Starting app..."
  docker-compose -f app.yaml up -d
elif [[ "${MODE}" == "down" ]]; then
  echo "## Stopping app..."
  docker-compose -f app.yaml down
else
  printHelp
  exit 1
fi

echo "## Done."

docker ps|grep pedro
