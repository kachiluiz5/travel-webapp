# Use the Nginx image to serve static files
FROM nginx:alpine

COPY . /usr/share/nginx/html

EXPOSE 80

# Start Nginx when the container starts
CMD ["nginx", "-g", "daemon off;"]
