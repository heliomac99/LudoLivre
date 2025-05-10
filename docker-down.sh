#!/bin/bash
docker compose down -v
echo "Removendo pasta backend/arquivos..."
rm -rf ./backend/arquivos
