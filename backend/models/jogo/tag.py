from main import db

class Tag(db.Model):
    __tablename__ = 'tag'

    id = db.Column(db.Integer, primary_key=True)
    nome = db.Column(db.String(100), nullable=False, unique=True)
