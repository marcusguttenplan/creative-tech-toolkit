SHELL := /bin/bash
BASEDIR = $(shell pwd)
CLUSTER_NAME=report-generator
CLUSTER_ZONE=us-west1-c
PROJECT=next19-metrics-prod-230200
DIRECTORIES = $(wildcard */)


serve:
	python -m SimpleHTTPServer 8082


init:
	gcloud config set project $(PROJECT)
	gcloud components install docker-credential-gcr
	docker-credential-gcr configure-docker
	cat sparks-creds.json | docker login -u _json_key --password-stdin https://gcr.io

	gcloud source repos create $(CLUSTER_NAME)
	git init
	git remote add google $(shell gcloud source repos describe $(CLUSTER_) --format="value(url)")


push:
	git add . && git commit -m "push from make"
	git push --all google

build:
	for directory in $(DIRECTORIES); do \
		eval "echo $$directory | sed 's:/*$$::'" ; \
		docker build $$directory -t $$(eval "echo $$directory | sed 's:/*$$::'") ; \
		docker tag $$(eval "echo $$directory | sed 's:/*$$::'") gcr.io/$(PROJECT)/$$(eval "echo $$directory | sed 's:/*$$::'") ; \
		gcloud builds submit "$(BASEDIR)/$$(eval "echo $$directory | sed 's:/*$$::'")" --tag=gcr.io/$(PROJECT)/$$(eval "echo $$directory | sed 's:/*$$::'") ; \
	done


cluster:
	gcloud beta container clusters create $(CLUSTER_NAME) --project=$(PROJECT) \
	    --addons=Istio --istio-config=auth=MTLS_STRICT \
	    --cluster-version=latest \
	    --machine-type=n1-standard-2 \
	    --num-nodes=4 \
	    --zone=$(CLUSTER_ZONE)

	gcloud container clusters get-credentials $(CLUSTER_NAME) --zone=$(CLUSTER_ZONE) --project=$(PROJECT)

deploy:
	kubectl apply -f k8s/

clean:
	kubectl delete daemonsets,replicasets,services,deployments,pods,rc --all
	for ns in $(kubectl get ns --output=jsonpath={.items[*].metadata.name}); do kubectl delete ns/$ns; done;
	kubectl delete deployments --all &&  kubectl delete services --all

destroy:
	kubectl delete daemonsets,replicasets,services,deployments,pods,rc --all
	for ns in $(kubectl get ns --output=jsonpath={.items[*].metadata.name}); do kubectl delete ns/$ns; done;
	kubectl delete deployments --all &&  kubectl delete services --all

	gcloud container clusters delete $(CLUSTER_NAME) --zone=$(CLUSTER_ZONE)
