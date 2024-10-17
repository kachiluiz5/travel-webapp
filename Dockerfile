# Use the Nginx image to serve static files
FROM nginx:alpine

# Copy the static files to the Nginx web root directory
COPY . /usr/share/nginx/html

EXPOSE 8080

# Start Nginx when the container starts
CMD ["nginx", "-g", "daemon off;"]
