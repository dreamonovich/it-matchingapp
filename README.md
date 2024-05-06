# it-matchingapp

## demo: http://51.250.14.37:4000/register
check that you are using http instead of https

usage:
    
1. build images
```bash
docker build ./matchingapp --tag matchingapp-web
docker build ./frontend --tag matchingapp-frontend
```

2. run docker compose
```bash
docker compose up
```
frontend is starting at port 4000
