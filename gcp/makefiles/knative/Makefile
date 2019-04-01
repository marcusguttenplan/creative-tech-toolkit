SHELL := /bin/bash
BASEDIR = $(shell pwd)
CLUSTER_NAME=knative-report-generator
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
	git remote add google $(shell gcloud source repos describe knative-report-generator --format="value(url)")


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
	gcloud container clusters create $(CLUSTER_NAME) \
	  --zone=$(CLUSTER_ZONE) \
	  --cluster-version=latest \
	  --machine-type=n1-standard-4 \
	  --enable-autoscaling --min-nodes=1 --max-nodes=10 \
	  --enable-autorepair \
	  --scopes=service-control,service-management,compute-rw,storage-ro,cloud-platform,logging-write,monitoring-write,pubsub,datastore \
	  --num-nodes=3

	  kubectl create clusterrolebinding cluster-admin-binding \
	  --clusterrole=cluster-admin \
	  --user=$(shell gcloud config get-value core/account)


install:
	kubectl apply --filename https://github.com/knative/serving/releases/download/v0.4.0/istio-crds.yaml && \
	kubectl apply --filename https://github.com/knative/serving/releases/download/v0.4.0/istio.yaml

	  # kubectl label namespace default istio-injection=enabled --overwrite=true

	  kubectl apply --filename https://github.com/knative/serving/releases/download/v0.4.0/serving.yaml \
		--filename https://github.com/knative/build/releases/download/v0.4.0/build.yaml \
		--filename https://github.com/knative/eventing/releases/download/v0.4.0/release.yaml \
		--filename https://github.com/knative/eventing-sources/releases/download/v0.4.0/release.yaml \
		--filename https://github.com/knative/serving/releases/download/v0.4.0/monitoring.yaml \
		--filename https://raw.githubusercontent.com/knative/serving/v0.4.0/third_party/config/build/clusterrole.yaml


deploy:
	kubectl apply -f k8s/

	INGRESSGATEWAY=istio-ingressgateway
	IP_ADDRESS=$$(kubectl get svc $(INGRESSGATEWAY) --namespace istio-system --output 'jsonpath={.status.loadBalancer.ingress[0].ip}')

	IP_ADDRESS=$$(kubectl get svc $(INGRESSGATEWAY) --namespace istio-system --output 'jsonpath={.spec.ports[?(@.port==80)].nodePort}')
	echo $(IP_ADDRESS)

	HOST_URL=$$(kubectl get ksvc api-node --output jsonpath='{.status.domain}')
	echo $(HOST_URL)

	curl -H "Host: ${HOST_URL}" http://${IP_ADDRESS} -v

destroy:
	kubectl delete daemonsets,replicasets,services,deployments,pods,rc --all

	for ns in $(kubectl get ns --output=jsonpath={.items[*].metadata.name}); do kubectl delete ns/$ns; done;
	kubectl delete deployments --all &&  kubectl delete services --all

	gcloud container clusters delete $(CLUSTER_NAME) --zone=$(CLUSTER_ZONE)

clean:
	kubectl delete daemonsets,replicasets,services,deployments,pods,rc --all

	for ns in $(kubectl get ns --output=jsonpath={.items[*].metadata.name}); do kubectl delete ns/$ns; done;
	kubectl delete deployments --all &&  kubectl delete services --all
