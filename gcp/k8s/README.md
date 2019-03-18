# CSP City
#### Department of Istio

### Concept

Cloud Services Platform City is a metaphor encompassing CSP with Kubernetes and Istio into a physical city. Kubernetes is represented by the city’s boroughs with each borough representing a cluster (some on-premises and some in the cloud), which required standardization as it expands and adds new boroughs. Istio is represented by the travel system traversing all neighborhoods of the city.

This will be a tabletop display with four surrounding monitors. The physical display will consist of four “boroughs”, each represented by a different Kubernetes cluster. Two will be GKE On-Prem (potentially via GKE On-Prem Developer Edition) and two will be running in GKE.

Each borough will be accompanied by a monitor displaying real Kubernetes & Istio configuration. Two monitors will be focused on GKE & GKE On-Prem features, two monitors will be focused on Istio and CSM features.

### Prototype

**City Services:**
* Bank
* Warehouse

## Setup

### knative

Create `knative` cluster
```sh
export CLUSTER_NAME=knative
export CLUSTER_ZONE=us-west1-c
export PROJECT=<project>

gcloud container clusters create $CLUSTER_NAME \
  --zone=$CLUSTER_ZONE \
  --addons=Istio \
  --cluster-version=1.11.6-gke.6 \
  --machine-type=n1-standard-4 \
  --enable-autoscaling --min-nodes=1 --max-nodes=10 \
  --enable-autorepair \
  --scopes=service-control,service-management,compute-rw,storage-ro,cloud-platform,logging-write,monitoring-write,pubsub,datastore \
  --num-nodes=3
```

Set up cluster admin:
```sh
kubectl create clusterrolebinding cluster-admin-binding \
--clusterrole=cluster-admin \
--user=$(gcloud config get-value core/account)
```

Install Istio:
```sh
kubectl apply --filename https://github.com/knative/serving/releases/download/v0.3.0/istio-crds.yaml && \
kubectl apply --filename https://github.com/knative/serving/releases/download/v0.3.0/istio.yaml
```

Label cluster's namespace
```sh
kubectl label namespace default istio-injection=enabled
```

Install knative:
```sh
kubectl apply --filename https://github.com/knative/serving/releases/download/v0.3.0/serving.yaml \
--filename https://github.com/knative/build/releases/download/v0.3.0/release.yaml \
--filename https://github.com/knative/eventing/releases/download/v0.3.0/release.yaml \
--filename https://github.com/knative/eventing-sources/releases/download/v0.3.0/release.yaml \
--filename https://github.com/knative/serving/releases/download/v0.3.0/monitoring.yaml
```

Check pods
```sh
kubectl get pods --namespace knative-serving
kubectl get pods --namespace knative-build
kubectl get pods --namespace knative-eventing
kubectl get pods --namespace knative-sources
kubectl get pods --namespace knative-monitoring
```

```sh
curl -H "Host: ${HOST_URL}" http://${IP_ADDRESS} -v
```

Get image vulns:
```sh
curl -X GET -H "Content-Type: application/json" -H \
    "Authorization: Bearer $(gcloud auth print-access-token)" \
    https://containeranalysis.googleapis.com/v1beta1/projects/$PROJECT_ID/occurrences/
```

### knative minikube

https://github.com/knative/docs/blob/master/install/Knative-with-Minikube.md

Start Minikube:
```sh
minikube start --memory=8192 --cpus=4 \
  --kubernetes-version=v1.11.5 \
  --vm-driver=hyperkit \
  --disk-size=30g \
  --extra-config=apiserver.enable-admission-plugins="LimitRanger,NamespaceExists,NamespaceLifecycle,ResourceQuota,ServiceAccount,DefaultStorageClass,MutatingAdmissionWebhook"
```

Install Istio:
```sh
curl -L https://github.com/knative/serving/releases/download/v0.3.0/istio.yaml \
  | sed 's/LoadBalancer/NodePort/' \
  | kubectl apply --filename -

kubectl label namespace default istio-injection=enabled
```

Install `knative serving`:
```sh
curl -L https://github.com/knative/serving/releases/download/v0.3.0/serving.yaml \
  | sed 's/LoadBalancer/NodePort/' \
  | kubectl apply --filename -
```

Create a secret to interface with Google Container Registry
```sh
kubectl create secret docker-registry gcr-json-key \
--docker-server=gcr.io \
--docker-username=_json_key \
--docker-password="$(cat creds.json)" \
--docker-email=mguttenplan@wearesparks.com
```

Patch default service account with new secret:
```sh
$ kubectl patch serviceaccount default \
-p '{"imagePullSecrets": [{"name": "gcr-json-key"}]}'
```



<!-- Generate a secret to pull from Google Container Registry:
```sh
kubectl create secret generic minikube-knative --from-file=creds.json
```

Update project `yaml` config with secret:
```yaml
apiVersion: serving.knative.dev/v1alpha1 # Current version of Knative
kind: Service
metadata:
  name: node-server # The name of the app
  namespace: default # The namespace the app will use
spec:
  runLatest:
    configuration:
      revisionTemplate:
        spec:
          container:
            image: gcr.io/next19-life-of-code/simple-server
            volumeMounts:
              - name: minikube-knative
              mountPath: /secret
            env:
              - name: GOOGLE_APPLICATION_CREDENTIALS    # import secret as env var
                value: /secret/minikube-knative.json
              - name: MESSAGE # The environment variable printed out by the sample app
                value: "Node v1!"
            volumes:
              - name: minikube-knative
                secret:
                  secretName: minikube-knative

``` -->

Deploy app:

```sh
kubectl apply -f <file>
```

Check deployment:
```sh
kubectl get ksvc
```


Get IP:
```sh
if kubectl get configmap config-istio -n knative-serving &> /dev/null; then
    INGRESSGATEWAY=istio-ingressgateway
fi
IP_ADDRESS=$(minikube ip):$(kubectl get svc $INGRESSGATEWAY --namespace istio-system --output 'jsonpath={.spec.ports[?(@.port==80)].nodePort}')
echo $IP_ADDRESS

export HOST_URL=$(kubectl get ksvc node-server  --output jsonpath='{.status.domain}')
echo $HOST_URL
```

`curl` that shit:
```sh
curl -H "Host: ${HOST_URL}" http://${IP_ADDRESS} -v
```


Get logs:
```sh
kubectl logs node-server-00001-deployment-54b77fdc9f-b9w59 user-container
kubectl logs -l app=node-server -c user-container
```

### Running Locally

Install `minikube` to run in a VM locally

```
minikube start
```

```
kubectl create -f <yaml>
```

```
minikube service <name> --url
```




### Running on GCP

**Kubernetes**

`gcloud components install kubectl`

Enables kubernetes API [https://console.cloud.google.com/apis/api/container.googleapis.com/overview?project=next19-hybrid-cloud-csp]

```sh
gcloud beta container clusters create csp-city-test --project=$PROJECT_ID \
    --addons=Istio --istio-config=auth=MTLS_STRICT \
    --cluster-version=1.11.6-gke.6 \
    --machine-type=n1-standard-2 \
    --num-nodes=4 \
    --zone=us-west1-a
```

```sh
gcloud container clusters list
```

Generate creds
```sh
gcloud container clusters get-credentials csp-city-test --zone=us-west1-a --project=$PROJECT_ID
```

Check services, get external IP
```sh
kubectl get service -n istio-system
```

**Docker Compose to K8S**

```sh
gcloud auth configure-docker
gcloud components install docker-credential-gcr
docker-credential-gcr configure-docker
cat creds.json | docker login -u _json_key --password-stdin https://gcr.io
```

Set up Cloud Source Repo:
```sh
gcloud source repos create REPO_NAME
```
```sh
git push --all google
```

Build Image
```sh
docker tag <repo> gcr.io/next19-life-of-code/<repo>
```
```sh
gcloud builds submit "$(pwd)/nginx" --tag=gcr.io/next19-life-of-code/nginx
gcloud builds submit "$(pwd)/simple-server" --tag=gcr.io/next19-life-of-code/simple-server
```

```sh
kompose up
```

```sh
kubectl create -f <yaml>
```

```sh
kubectl create -f nginx-deployment.yaml
kubectl create -f nginx-service.yaml
kubectl create -f server-deployment.yaml
kubectl create -f server-service.yaml
```

```sh
kubectl get deployment,svc,pods,pvc
```

**Tear Down**
```sh
kubectl delete daemonsets,replicasets,services,deployments,pods,rc --all
```

Delete all services and deployments:
```sh
for ns in $(kubectl get ns --output=jsonpath={.items[*].metadata.name}); do kubectl delete ns/$ns; done;
kubectl delete deployments --all &&  kubectl delete services --all
```

Delete clusters:
```sh
gcloud container clusters delete csp-city-test --zone=us-west1-a
```

Delete images:
```sh
gcloud container images delete <image name>
```

<!-- ```sh
gcloud container images list-tags gcr.io/${PROJECT_ID/${IMAGE} --filter='-tags:*' --format='get(digest)' --limit=unlimited | awk '{print "gcr.io/${PROJECT_ID}/${IMAGE}@" $1}' | xargs gcloud container images delete --quiet
``` -->

### Multi-Cluster

[https://istio.io/docs/examples/multicluster/gke/]()

[https://docs.helm.sh/using_helm/#installing-helm]()
```
brew install helm
```

```sh
gcloud beta container clusters create borough-1 --project=$PROJECT_ID \
    --addons=Istio --istio-config=auth=MTLS_STRICT \
    --cluster-version=1.11.6-gke.6 \
    --machine-type=n1-standard-2 \
    --num-nodes=4 \
    --zone=us-west1-a \
    --enable-ip-alias
```

```sh
gcloud beta container clusters create borough-2 --project=$PROJECT_ID \
    --addons=Istio --istio-config=auth=MTLS_STRICT \
    --cluster-version=1.11.6-gke.6 \
    --machine-type=n1-standard-2 \
    --num-nodes=4 \
    --zone=us-west1-a \
    --enable-ip-alias
```

```sh
gcloud container clusters get-credentials borough-1
gcloud container clusters get-credentials borough-2
```

Setup admin user:
```sh
KUBE_USER="mguttenplan@wearesparks.com"
kubectl create clusterrolebinding gke-cluster-admin-binding \
  --clusterrole=cluster-admin \
  --user="${KUBE_USER}"
```

Setup firewall rule:
```sh
# Helper function to join cols
function join_by { local IFS="$1"; shift; echo "$*"; }
# Get all IP ranges
ALL_CLUSTER_CIDRS=$(gcloud container clusters list --format='value(clusterIpv4Cidr)' | sort | uniq)
ALL_CLUSTER_CIDRS=$(join_by , $(echo "${ALL_CLUSTER_CIDRS}"))
# Get all hostnames
ALL_CLUSTER_NETTAGS=$(gcloud compute instances list --format='value(tags.items.[0])' | sort | uniq)
ALL_CLUSTER_NETTAGS=$(join_by , $(echo "${ALL_CLUSTER_NETTAGS}"))
# Create rule for cross cluster communication
gcloud compute firewall-rules create istio-multicluster-test-pods \
  --allow=tcp,udp,icmp,esp,ah,sctp \
  --direction=INGRESS \
  --priority=900 \
  --source-ranges="${ALL_CLUSTER_CIDRS}" \
  --target-tags="${ALL_CLUSTER_NETTAGS}" --quiet
```

**Generate remote cluster manifest:**

Get Istio control plane pod IPs:
```sh
export PILOT_POD_IP=$(kubectl -n istio-system get pod -l istio=pilot -o jsonpath='{.items[0].status.podIP}')
export POLICY_POD_IP=$(kubectl -n istio-system get pod -l istio=mixer -o jsonpath='{.items[0].status.podIP}')
export STATSD_POD_IP=$(kubectl -n istio-system get pod -l istio=statsd-prom-bridge -o jsonpath='{.items[0].status.podIP}')      # error: error executing jsonpath "{.items[0].status.podIP}": array index out of bounds: index 0, length 0
export TELEMETRY_POD_IP=$(kubectl -n istio-system get pod -l istio-mixer-type=telemetry -o jsonpath='{.items[0].status.podIP}')
```

Generate the remote cluster manifest:
```sh
helm init --client-only
helm template ~/_istio/install/kubernetes/helm/istio-remote --namespace istio-system \
  --name istio-remote \
  --set global.remotePilotAddress=${PILOT_POD_IP} \
  --set global.remotePolicyAddress=${POLICY_POD_IP} \
  --set global.remoteTelemetryAddress=${TELEMETRY_POD_IP}  > istio-remote.yaml


# helm template install/kubernetes/helm/istio-remote --namespace istio-system \
#   --name istio-remote \
#   --set global.remotePilotAddress=${PILOT_POD_IP} \
#   --set global.remotePolicyAddress=${POLICY_POD_IP} \
#   --set global.remoteTelemetryAddress=${TELEMETRY_POD_IP} \
#   --set global.proxy.envoyStatsd.enabled=true \
#   --set global.proxy.envoyStatsd.host=${STATSD_POD_IP} > $HOME/istio-remote.yaml
```






```sh
kubectl config current-context
```

```sh
kubectl config use-context my-cluster-name
```

```sh
kubectl config get-contexts
```



**Istio**

Change Traffic (weight):

https://github.com/istio/istio/blob/master/samples/bookinfo/networking/virtual-service-reviews-50-v3.yaml

Monitoring:

Sidecar
https://github.com/istio/istio/blob/master/samples/bookinfo/policy/mixer-rule-additional-telemetry.yaml

Security:

https://github.com/istio/istio/blob/master/samples/bookinfo/policy/mixer-rule-ingress-denial.yaml

https://github.com/istio/istio/blob/master/samples/bookinfo/networking/virtual-service-reviews-jason-v2-v3.yaml
