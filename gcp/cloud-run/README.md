### Cloud Run

```
gcloud auth configure-docker
gcloud components install docker-credential-gcr
docker-credential-gcr configure-docker
cat creds.json | docker login -u _json_key --password-stdin https://gcr.io
```

```
gcloud source repos create <REPO>
git remote add google <REPO-URL>
git push --all google
```

```
docker tag container gcr.io/<project id>/<repo>
```

```
gcloud builds submit "$(pwd)/suggestions" --tag=gcr.io/anchordemo/cloud-run-python-server
gcloud container images list
```

```
gcloud beta run deploy crosstown-backend --image gcr.io/anchordemo/cloud-run-python-server --allow-unauthenticated
```

```
gcloud beta run services list
```

<!-- ```
http://localhost:8080/will_buy_banana?user=205336&zip=33196&time=night
https://suggestions-lorem-ku2gq2moxa-uc.a.run.app/will_buy_banana?user=205336&zip=33196&time=night
``` -->
