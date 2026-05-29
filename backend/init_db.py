from app.db.session import engine
from app.models.models import Base

print("Initializing database...")
Base.metadata.create_all(bind=engine)
print("Database initialized successfully.")
