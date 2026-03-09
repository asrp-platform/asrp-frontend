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
docker run -d \
-p <port:port> \
--name <container_name> \
--network <network> \
max31ru12/asrp-prod-frontend:latest
```