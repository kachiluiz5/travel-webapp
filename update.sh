#!/bin/bash
git pull origin main  
docker build -t frontend:v1 .  
docker rm -f 216b3a3fae49  
docker run -d -p 80:8080 frontend:v1 
