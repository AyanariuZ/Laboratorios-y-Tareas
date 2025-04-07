from fastapi import FastAPI, HTTPException, Depends, status
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Optional
import os

from sqlalchemy import create_engine, Column, Integer, String
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker, Session

DATABASE_URL = os.getenv("DATABASE_URL", "postgresql://postgres:0906alex@localhost/videogames")
engine = create_engine(DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()



class VideojuegoModel(Base):
    __tablename__ = "videojuegos"
    id = Column(Integer, primary_key=True, index=True)
    titulo = Column(String, nullable=False)
    aniolanzamiento = Column(Integer, nullable=False)
    desarrollador = Column(String, nullable=False)
    genero = Column(String, nullable=False)


class VideojuegoBase(BaseModel):
    titulo: str
    aniolanzamiento: int
    desarrollador: str
    genero: str

class Videojuego(VideojuegoBase):
    id: int

    class Config:
        orm_mode = True

class VideojuegoCreate(VideojuegoBase):
    pass

class VideojuegoUpdate(BaseModel):
    titulo: Optional[str] = None
    aniolanzamiento: Optional[int] = None
    desarrollador: Optional[str] = None
    genero: Optional[str] = None

app = FastAPI(title="API de Videojuegos")


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], 
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/videojuegos", response_model=List[Videojuego], status_code=200)
def get_videojuegos(db: Session = Depends(get_db)):
    """Obtener todos los videojuegos"""
    juegos = db.query(VideojuegoModel).all()
    return juegos

@app.get("/videojuegos/{videojuego_id}", response_model=Videojuego, status_code=200)
def get_videojuego(videojuego_id: int, db: Session = Depends(get_db)):
    """Obtener un videojuego por su ID"""
    juego = db.query(VideojuegoModel).filter(VideojuegoModel.id == videojuego_id).first()
    if not juego:
        raise HTTPException(status_code=404, detail="Videojuego no encontrado")
    return juego

@app.post("/videojuegos", response_model=Videojuego, status_code=status.HTTP_201_CREATED)
def create_videojuego(videojuego: VideojuegoCreate, db: Session = Depends(get_db)):
    """Crear un nuevo videojuego"""
    print(videojuego)
    nuevo_juego = VideojuegoModel(
        titulo=videojuego.titulo,
        aniolanzamiento=videojuego.aniolanzamiento,
        desarrollador=videojuego.desarrollador,
        genero=videojuego.genero
    )
    db.add(nuevo_juego)
    db.commit()
    db.refresh(nuevo_juego)
    return nuevo_juego

@app.put("/videojuegos/{videojuego_id}", response_model=Videojuego, status_code=200)
def update_videojuego(videojuego_id: int, videojuego: VideojuegoUpdate, db: Session = Depends(get_db)):
    """Actualizar un videojuego existente"""
    juego = db.query(VideojuegoModel).filter(VideojuegoModel.id == videojuego_id).first()
    if not juego:
        raise HTTPException(status_code=404, detail="Videojuego no encontrado")
    
    if videojuego.titulo is not None:
        juego.titulo = videojuego.titulo
    if videojuego.aniolanzamiento is not None:
        juego.aniolanzamiento = videojuego.aniolanzamiento
    if videojuego.desarrollador is not None:
        juego.desarrollador = videojuego.desarrollador
    if videojuego.genero is not None:
        juego.genero = videojuego.genero
    
    db.commit()
    db.refresh(juego)
    return juego

@app.delete("/videojuegos/{videojuego_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_videojuego(videojuego_id: int, db: Session = Depends(get_db)):
    """Eliminar un videojuego"""
    juego = db.query(VideojuegoModel).filter(VideojuegoModel.id == videojuego_id).first()
    if not juego:
        raise HTTPException(status_code=404, detail="Videojuego no encontrado")
    
    db.delete(juego)
    db.commit()
    return None