from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api import auth, analytics
from app.core.config import settings
from app.core.rate_limit import setup_rate_limiting
from app.middleware.timing import ProcessTimeMiddleware

app = FastAPI(
    title=settings.PROJECT_NAME,
    openapi_url=f"{settings.API_V1_STR}/openapi.json"
)

# Set up Timing Middleware
app.add_middleware(ProcessTimeMiddleware)

# Set up CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], # In production, replace with specific origins
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Set up rate limiting
setup_rate_limiting(app)

# Include routers
app.include_router(auth.router, prefix=f"{settings.API_V1_STR}/auth", tags=["Authentication"])
app.include_router(analytics.router, prefix=f"{settings.API_V1_STR}/analytics", tags=["Analytics"])

@app.get("/")
async def root():
    return {"message": "Welcome to Nebula Analytics API", "status": "online"}
