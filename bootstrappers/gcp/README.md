# Cloud Lab

Terraform bootstrapper for a GCP-based remote workspace (digital ocean maybe soon?)

Includes:
* Set of 1-3 VMs on Compute Engine w/ SSH keys
* VPC Networks
* DNS
* Storage Buckets
* Databases
* Firewall rules

### Usage

Requires `terraform`:
```
brew install terraform
```

Run `terraform`:
```
terraform init
terraform plan
terraform apply
```
