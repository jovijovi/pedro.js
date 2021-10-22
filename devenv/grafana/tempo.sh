#!/usr/bin/env bash

set -e

MODE=$1

if [[ "${MODE}" == "up" ]]; then
  echo "## Starting tempo..."
  docker-compose -f tempo.yaml up -d
elif [[ "${MODE}" == "down" ]]; then
  echo "## Stopping tempo..."
  docker-compose -f tempo.yaml down -v
else
  exit 1
fi

echo "## Done."

docker ps|grep 'grafana_'
