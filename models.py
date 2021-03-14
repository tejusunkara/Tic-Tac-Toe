'''defines tables as classes'''
from app import DB
# pylint: disable=no-member, too-few-public-methods

#database schema
class Player(DB.Model):
    '''Created initial table for player and specifies column names and attributes'''
    __tablename__ = 'player'
    username = DB.Column(DB.String(255),
                         unique=True,
                         nullable=False,
                         primary_key=True)
    rank = DB.Column(DB.Integer, nullable=False)

    def _repr_(self):
        return '<Player %r>' % self.username
