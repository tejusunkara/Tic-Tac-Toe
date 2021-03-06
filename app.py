#server
import os
from flask import Flask, send_from_directory, json
from flask_socketio import SocketIO
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from dotenv import load_dotenv, find_dotenv

load_dotenv(find_dotenv()) # This is to load your env variables from .env

app = Flask(__name__, static_folder='./build/static')

# Point SQLAlchemy to your Heroku database
app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv('DATABASE_URL')
# Gets rid of a warning
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)

# IMPORTANT: This must be AFTER creating db variable to prevent
# circular import issues
import models 
db.create_all()

global users
users=[]
global ranks
rankings = []

cors = CORS(app, resources={r"/*": {"origins": "*"}})

socketio = SocketIO(
    app,
    cors_allowed_origins="*",
    json=json,
    manage_session=False
)

@app.route('/', defaults={"filename": "index.html"})
@app.route('/<path:filename>')
def index(filename):
    return send_from_directory('./build', filename)

# When a client connects from this Socket connection, this function is run
@socketio.on('connect')
def on_connect():
    print('User connected!')
    

# When a client disconnects from this Socket connection, this function is run
@socketio.on('disconnect')
def on_disconnect():
    print('User disconnected!')

def updateDB():
    all_players = models.Player.query.order_by(models.Player.rank.desc()) #table should be ordered from highest to lowest score
    for player in all_players:
        users.append(player.username)
        rankings.append(player.rank)
        
    

@socketio.on('login')
def on_login(data):
    print('logged in')
    print(data)
    
    player = models.Player.query.filter(models.Player.username==data['username']).first()
    if player == None:  #if there is no player with this username in the database
        new_player = models.Player(username=data['username'], rank=100)
        db.session.add(new_player)
        db.session.commit()
    
    all_players = models.Player.query.all()   #returns list of objects, each object is 1 player inside DB
    print(all_players)
    for player in all_players:
        users.append(player.username)
        rankings.append(player.rank)
    
    print(users)
    print(rankings)
    
    socketio.emit('login', { 'newUsers': data['newUsers'], 'username': data['username'], 'users': users, 'ranks': rankings }, broadcast=True, include_self=False)
    
# When a client emits the event 'onClickBoard' to the server, this function is run
# 'onClickBoard' is a custom event name that we just decided
@socketio.on('board')
def on_board(data): # data is whatever arg you pass in your emit call on client
    print(data)
    # This emits the 'onClickBoard' event from the server to all clients except for
    # the client that emmitted the event that triggered this function
    for user in users:
        if user in data['winnerMessage']:
            player = models.Player.query.filter(models.Player.username==user).first()
            player.rank = player.rank+1
    socketio.emit('board', data, broadcast=True, include_self=False)

@socketio.on('leaderboard')
def on_leaderboard(data): # updating leaderboard data
    print(data)
    
    updateDB()
    
    print(users)
    print(rankings)
    # This emits the 'onClickBoard' event from the server to all clients except for
    # the client that emmitted the event that triggered this function
    socketio.emit('leaderboard', {"users": users, "rankings": rankings}, broadcast=True, include_self=True)

@socketio.on('winner')
def on_winner(data):    # update the ranking for that username in the DB based on the event data
    print(data)
    
    player = models.Player.query.filter(models.Player.username==data['username']).first()
    if data['result'] == 'won':
        player.rank = player.rank+1
    elif data['result'] == 'lost':
        player.rank = player.rank-1
    
    updateDB()
    
    socketio.emit('leaderboard', {"users": users, "rankings": rankings}, broadcast=True, include_self=True)

@socketio.on('restart')
def on_restart(data):
    print('restart '+str(data))
    socketio.emit('restart', data, broadcast=True, include_self=False)

# Note we need to add this line so we can import app in the python shell
if __name__ == "__main__":
    socketio.run(
        app,
        host=os.getenv('IP', '0.0.0.0'),
        port=8081 if os.getenv('C9_PORT') else int(os.getenv('PORT', 8081)),
    )