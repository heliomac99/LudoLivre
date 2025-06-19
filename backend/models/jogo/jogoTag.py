from main import db

class JogoTag(db.Model):
    __tablename__ = 'jogoTag'

    jogoId = db.Column(db.Integer, db.ForeignKey('jogo.id', ondelete='CASCADE'), primary_key=True)
    tagId = db.Column(db.Integer, db.ForeignKey('tag.id', ondelete='CASCADE'), primary_key=True)
