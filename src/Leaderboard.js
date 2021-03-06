import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';

const socket = io();

export function Leaderboard(props) {

    const [showRanks, setShowRanks] = useState(false); //to show leaderboard or not
    const [usernames, setUsernames] = useState(props.players);
    const [ranks, setRanks] = useState(props.ranks);

    function showLeaderboard() { //display all players and their ranking
        console.log('showLeaderboard');
        setShowRanks(true);
        socket.emit('leaderboard', { users: usernames, rankings: ranks });
    }

    useEffect(() => {
        socket.on('leaderboard', (data) => {
            console.log(data);
            setUsernames(data.users);
            setRanks(data.rankings);
        });
    }, []);

    function hideLeaderboard() {
        console.log('hideLeaderboard');
        setShowRanks(false);
    }

    if (showRanks) { //show ranks of all players
        return (
            <div className="showRanks">
                <table className="leaderTable">
                    <colgroup  span="2"></colgroup>
                    <tr>
                        <th>Users</th>
                        <th>Ranking</th>
                    </tr>
                    <tr>
                        <tr>
                            {usernames.map(user => (
                                <td>{user}</td>
                            ))}
                        </tr>
                    </tr>
                    <tr>
                        <tr>
                            {ranks.map(rank => (
                                <td>{rank}</td>
                            ))}
                        </tr>
                    </tr>
                    
                </table>
                <button className="btnLeaderboard" onClick={() => hideLeaderboard()} type="button">Hide Leaderboard</button>
            </div>
        );
    }

    return (
        <button className="btnLeaderboard" onClick={() => showLeaderboard()} type="button">Show Leaderboard</button>
    );

}