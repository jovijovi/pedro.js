#!/usr/bin/env bash

set -e

MODE=$1

# Print the usage message
function printHelp() {
  echo "Usage: "
  echo "  dev.sh <mode>"
  echo "    <mode> - one of 'up', 'down'"
  echo "      - 'up' - start the dev env with docker-compose up"
  echo "      - 'down' - stop the dev env with docker-compose down"
  echo "  dev.sh -h (print this message)"
  echo
  echo "Example:"
  echo "    dev.sh up"
  echo "    dev.sh down"
}

if [[ "${MODE}" == "up" ]]; then
  echo "## Starting dev env..."
  docker-compose -f dev.yaml up -d
elif [[ "${MODE}" == "down" ]]; then
  echo "## Stopping dev env..."
  docker-compose -f dev.yaml down
else
  printHelp
  exit 1
fi

echo "## Done."

docker ps