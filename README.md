# README

## Getting Started






## Deployment


### Build container

```bash
docker build -t max31ru12/asrp-prod-frontend:latest -f ./docker/Dockerfile .
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