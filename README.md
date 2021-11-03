```
Install node v16 and MongoDB locally
```

# Marketplace

Use free hosted mongodb server https://www.mongodb.com/cloud/atlas/register

All config environment variables are defined at `Backend/.env` and `Frontend/.env`

### Run node server
```
cd Backend && MONGODB_CONNECTION=mongodb://localhost/marketplace npm start
```

### Run frontend server
```
cd Frontend && npm start
```

### Frontend build
```
cd Frontend && docker build -t glassdoor-frontend . && docker run -p 3000:80 glassdoor-frontend:latest
```

### Backend build
```
cd Backend && docker build -t glassdoor-backend . && docker run -p 5000:5000 -e MONGODB_CONNECTION=mongodb+srv://<atlas user>:<password>@<cluster>.mongodb.net/glassdoor glassdoor-backend:latest
```
### Kubernetes setup with minikube

Install kubernetes https://kubernetes.io/docs/tasks/tools/install-kubectl/

Install minikube https://minikube.sigs.k8s.io/docs/start/

```
minikube delete
minikube start --driver=virtualbox
minikube addons enable ingress
minikube dashboard
kubectl create namespace glassdoor
kubectl config set-context --current --namespace=glassdoor
```

### Kubernetes deply
```
kubectl delete all --all -n glassdoor && kubectl delete ingress glassdoor-ingress -n glassdoor && kubectl apply -f kube -n glassdoor && minikube service frontend-service -n glassdoor
```
