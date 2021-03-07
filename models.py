from app import db
#database schema
class Player(db.Model):
    __tablename__ = 'player'
    username = db.Column(db.String(255), unique=True, nullable=False, primary_key=True)
    rank = db.Column(db.Integer, nullable=False)
    
    def _repr_(self):
        return '<Player %r>' %self.username