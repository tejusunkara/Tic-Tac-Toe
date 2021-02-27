#server
import os
from flask import Flask, send_from_directory, json, session
from flask_socketio import SocketIO
from flask_cors import CORS

app = Flask(__name__, static_folder='./build/static')

cors = CORS(app, resources={r"/*": {"origins": "*"}})

players = {'PlayerX':'', 'PlayerO':''}
spectators=[]

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

# When a client emits the event 'boars' to the server, this function is run
# 'board' is a custom event name that we just decided
@socketio.on('board')
def on_board(data): # data is whatever arg you pass in your emit call on client
    print(data)
    # This emits the 'chat' event from the server to all clients except for
    # the client that emmitted the event that triggered this function
    socketio.emit('board',  data, broadcast=True, include_self=False)

@socketio.on('login')
def on_login(data):
    if data['userCount'] == 0:
        players['PlayerX'] = data['user']
    elif data['userCount'] == 1:
        players['PlayerO'] = data['user']
    else:
        spectators.append(data['user'])
    
    data['PlayerX'] = players['PlayerX']
    data['PlayerO'] = players['PlayerO']
    data['spectators'] = spectators
    print('user: '+data['user'])
    print('user count: '+str(data['userCount']))
    print(spectators)
    print(players)
    print(data)
    #if a player is allowed to play, emit them
    socketio.emit('login',  data, broadcast=True, include_self=False)

@socketio.on('logout')
def on_logout(data):
    print('log out')
    socketio.emit('logout', data, broadcast=True, include_self=False)
# Note that we don't call app.run anymore. We call socketio.run with app arg
socketio.run(
    app,
    host=os.getenv('IP', '0.0.0.0'),
    port=8081 if os.getenv('C9_PORT') else int(os.getenv('PORT', 8081)),
)