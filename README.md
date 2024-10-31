
# Docker Setup for News Aggregator Application

Follow these steps to build and run the application in a Docker container.

### Step 1: Navigate to the Project Directory
Open your terminal and navigate to the project folder:
```bash
cd /path/to/news-aggregator
```

### Step 2: Build the Docker Image
Build the Docker image for the application:
```bash
docker build -t news-aggregator-app .
```

### Step 3: Run the Docker Container
Run the container, mapping port 3000 from your local machine to the Docker container:
```bash
docker run -p 3000:3000 news-aggregator-app
```

### Step 4: Verify the Application
Open your browser and navigate to `http://localhost:3000` to access the application.

---

This guide will help you quickly get the application up and running using Docker.
