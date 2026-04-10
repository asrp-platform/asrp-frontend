# README

## Getting Started

For local development NEXT_PUBLIC_API_URL must be provided.

## Deployment

### Build container

```bash
docker build --build-arg NEXT_PUBLIC_API_URL=/api -t max31ru12/asrp-prod-frontend:latest -f ./docker/Dockerfile .
```

### Push image to DockerHub

```bash
docker push max31ru12/asrp-prod-frontend:latest
```

### Pull container

```bash
docker pull max31ru12/asrp-prod-frontend:latest
```

### Run container

```bash
docker run -d -p 3000:3000 --name asrp_frontend --network asrp-backend_default max31ru12/asrp-prod-frontend:latest
```
