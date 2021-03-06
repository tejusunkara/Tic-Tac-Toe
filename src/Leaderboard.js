import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';

const socket = io();

export function Leaderboard(props) {

    const [showRanks, setShowRanks] = useState(false); //to show leaderboard or not
    const [usernames, setUsernames] = useState([props.PlayerX, props.PlayerO, props.Spectators]);
    const [ranks, setRanks] = useState([]);

    function showLeaderboard() { //display all players and their ranking
        console.log('showLeaderboard');
        const newUsernames = [...usernames];
        setShowRanks(true);
        if(!newUsernames.includes(props.username)) {
            newUsernames = [...newUsernames, props.username];
        }
        setUsernames(newUsernames);
        setRanks(ranks);
        socket.emit('leaderboard', { users: usernames, rankings: ranks });
    }

    useEffect(() => {
        socket.on('leaderboard', (data) => {
            setUsernames(data.users);
            setRanks(data.ranks);
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
                        <th>{usernames.map(user => (
                            <td>{user}</td>
                        ))}</th>
                        
                        <th>{ranks.map(rank => (
                            <td>{rank}</td>
                        ))}</th>
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