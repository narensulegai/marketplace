from pydantic import BaseModel

# Defining the model input types
class Candidate(BaseModel):
    gender: int
    bsc: float
    workex: int
    etest_p: float
    msc: float

class CompanyID(BaseModel):
    id: str