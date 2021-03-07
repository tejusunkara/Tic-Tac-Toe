import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';

const socket = io();

export function Leaderboard(props) {

    const [showData, setShowData] = useState(false); //to show leaderboard or not
    const [usernames, setUsernames] = useState([]);
    const [ranks, setRanks] = useState([]);
    // const [currentUser, setCurrentUser] = useState([]);

    function showLeaderboard() { //display all players and their ranking
        console.log('showLeaderboard');
        setShowData(true);
        setUsernames(props.players);
        setRanks(props.ranks);
        // setCurrentUser(props.currUser);
        // console.log(currentUser);
        console.log(usernames);
        console.log(ranks);
        socket.emit('leaderboard', { users: usernames, rankings: ranks });
    }

    useEffect(() => {
        socket.on('leaderboard', (data) => {
            console.log(data);
            setUsernames(data.users);
            setRanks(data.ranks);
            console.log(data.users);
            console.log(data.ranks);
        });
    }, []);

    function hideLeaderboard() {
        console.log('hideLeaderboard');
        setShowData(false);
    }

    const renderTable = usernames.map((user, index) => {
        const score = ranks[index];
        if (user == props.currUser) {
            return (
                <tr>
                    <td><mark>{user}</mark></td>
                    <td><mark>{score}</mark></td>
                </tr>
            );
        }
        else {
            return (
                <tr>
                    <td>{user}</td>
                    <td>{score}</td>
                </tr>
            );
        }

    });

    if (showData) { //show ranks of all players
        return (
            <div className="showRanks">
                <table className="leaderTable">
                    <colgroup  span="2"></colgroup>
                    <tr>
                        <th> User </th>
                        <th> Rank </th>
                    </tr>
                    <tr>
                        <td>{renderTable}</td>
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