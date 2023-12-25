# Micro-services Microwave

This project is a proof of concept of a microwave that can be controlled through a web interface. The microwave is composed of a set of micro-services which the frontend uses to determine the time required to heat the food.

The 4 micro-services are defined under the folder src/microservices. Each micro-service is a nodejs application that exposes an endpoint that returns the time required to heat the food given the function used (beverage, defrost, popcorn, potato) and the weight of the food.

All the application components are deployed on Kubernetes. The frontend is deployed as a Kubernetes service of type LoadBalancer and the micro-services are deployed as Kubernetes services of type ClusterIP. The frontend is also running a reverse proxy so the client browser can access the micro-services endpoints.

Google Datastore is used to log the interactions with the micro-services. The logs are stored in the datastore under the kind 'LogEntry'.

To deploy:

- Create a project on Google Cloud Platform.
- Enable the Kubernetes Engine API and the Datastore API.
- Generate a key for the Compute Engine default service account and save it under `src/k8scloud/credentials.json`.
- Add the role 'Kubernetes Engine Admin'to the Compute Engine default service account under IAM and Admin -> IAM.

Once that's done you can deploy the infrastructure and the application:

```bash
git clone git@gitlab.rnl.tecnico.ulisboa.pt:agisit/agisit23-g26.git
cd src/k8scloud
cp terraform.tfvars.example terraform.tfvars # and populate the file
terraform init
terraform apply
```

You can use the container defined in vagrant/Vagrantfile which has all the tools required to deploy the project.
