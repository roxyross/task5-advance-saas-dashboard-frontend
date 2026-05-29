from pydantic import BaseModel, EmailStr
from typing import Optional, List, Dict, Any
from datetime import datetime

class Token(BaseModel):
    access_token: str
    token_type: str

class TokenData(BaseModel):
    email: Optional[str] = None

class UserBase(BaseModel):
    email: Optional[EmailStr] = None
    full_name: Optional[str] = None
    role: Optional[str] = "user"

class UserCreate(UserBase):
    email: EmailStr
    password: str

class UserUpdate(UserBase):
    password: Optional[str] = None

class UserInDBBase(UserBase):
    id: Optional[int] = None
    created_at: Optional[datetime] = None

    class Config:
        from_attributes = True

class User(UserInDBBase):
    pass

class ActivityLogBase(BaseModel):
    action: str
    details: Optional[Dict[str, Any]] = None
    status: Optional[str] = None

class ActivityLogCreate(ActivityLogBase):
    user_id: int

class ActivityLog(ActivityLogBase):
    id: int
    user_id: int
    timestamp: datetime

    class Config:
        from_attributes = True

class AnalyticsData(BaseModel):
    label: str
    value: float
    timestamp: datetime

class DashboardMetrics(BaseModel):
    total_users: int
    active_sessions: int
    revenue: float
    growth_rate: float
    chart_data: List[AnalyticsData]
