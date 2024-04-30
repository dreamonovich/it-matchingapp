# it-matchingapp
demo: http://51.250.80.23:4000/register

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
