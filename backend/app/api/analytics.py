from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from datetime import datetime, timedelta
import random
from app.db.session import get_db
from app.models.models import ActivityLog as LogModel, User as UserModel
from app.schemas.schemas import DashboardMetrics, AnalyticsData, ActivityLog, ActivityLogCreate
from app.api.auth import get_current_user

router = APIRouter()

@router.get("/dashboard", response_model=DashboardMetrics)
async def get_dashboard_data(current_user: UserModel = Depends(get_current_user)):
    # Generate mock analytics data
    chart_data = []
    now = datetime.utcnow()
    for i in range(7):
        date = now - timedelta(days=6-i)
        chart_data.append(AnalyticsData(
            label=date.strftime("%b %d"),
            value=random.uniform(1000, 5000),
            timestamp=date
        ))
    
    return DashboardMetrics(
        total_users=1250,
        active_sessions=45,
        revenue=124500.0,
        growth_rate=12.5,
        chart_data=chart_data
    )

@router.get("/logs", response_model=List[ActivityLog])
async def get_activity_logs(
    db: Session = Depends(get_db),
    current_user: UserModel = Depends(get_current_user),
    limit: int = 100
):
    logs = db.query(LogModel).order_by(LogModel.timestamp.desc()).limit(limit).all()
    return logs

@router.post("/logs", response_model=ActivityLog)
async def create_activity_log(
    log_in: ActivityLogCreate,
    db: Session = Depends(get_db),
    current_user: UserModel = Depends(get_current_user)
):
    db_log = LogModel(**log_in.dict())
    db.add(db_log)
    db.commit()
    db.refresh(db_log)
    return db_log
