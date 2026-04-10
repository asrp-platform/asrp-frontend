# README

## Getting Started

For local development NEXT_PUBLIC_API_URL must be provided.

## Development

All features, bugfix and release branches must be created from the develop branch. Develop is a target branch to
merge branches

### Naming

#### Branch naming

1. `feature/*`
2. `release/*`
3. `hotfix/*`
4. `bugfix/*`

#### Pull requests naming

1. `Feature: *`
2. `Release: *`
3. `Hotfix: *`
4. `Bugfix: *`

#### Commits naming

We use [conventional commits](https://www.conventionalcommits.org/en/v1.0.0/) to name our commits using the following special words:

- feat: (msg) - for new features
- fix: (msg) - for bug fixing
- docs: (msg) — for documentation changes
- refactor: (msg) — for code refactoring without changing behavior
- test: (msg) — for adding or updating tests
- chore: (msg) — for maintenance tasks

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
