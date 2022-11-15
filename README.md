

# Marketplace

Use free hosted mongodb server https://www.mongodb.com/cloud/atlas/register

All config environment variables are defined at `Backend/.env` and `Frontend/.env`
Install node v16 and MongoDB locally

### Run node server
```
cd Backend && npm install && MONGODB_CONNECTION=mongodb://localhost/marketplace npm start
```

### Run frontend server
```
cd Frontend && npm install && npm start
```

### Run python backend server for ML
```
cd Machine_Learning && python main.py
```
