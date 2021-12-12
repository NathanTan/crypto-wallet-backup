# Crypto Wallet Backup Server

## This Project
This is a project for having an external server that you can send simple files to for backup.
In particular, this project was developed as a backup for crypto wallet backup files to be sent to a server that is not in your home but reachable through travel.

### Set Up
```
npm i
```

## Usage
### Running with Docker
```
npm run docker-build
docker images
docker run -p 4000:3000 {image}
```