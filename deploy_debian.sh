#!/bin/bash

echo "=== Déploiement de 3 conteneurs Debian ==="

docker run -d --name debian1 debian sleep infinity
docker run -d --name debian2 debian sleep infinity
docker run -d --name debian3 debian sleep infinity

echo "=== Conteneurs lancés ==="
docker ps --filter "name=debian"

