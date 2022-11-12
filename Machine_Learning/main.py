# Importing necessary libraries

import uvicorn
from dotenv import dotenv_values
from pymongo import MongoClient
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routes.routes import router 

config = dotenv_values(".env")
# Initializing the fast API server
app = FastAPI()

origins = [
    "http://localhost.tiangolo.com",
    "https://localhost.tiangolo.com",
    "http://localhost",
    "http://localhost:8080",
    "http://localhost:3000",
    "http://localhost:5000",
    "http://localhost:5001",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.on_event("startup")
def startup_db_client():
    app.mongodb_client = MongoClient(config['MONGODB_CONNECTION'])
    app.database = app.mongodb_client[config['DB_NAME']]
    print("Connected to the MongoDB database!")

@app.on_event("shutdown")
def shutdown_db_client():
    app.mongodb_client.close()

app.include_router(router, prefix="/apiV1")

# Configuring the server host and port
if __name__ == '__main__':
    uvicorn.run(app, port=8000, host='0.0.0.0')