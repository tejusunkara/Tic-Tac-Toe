import React, {useState} from 'react';

export function Leaderboard(props) {
    
    const [showRanks, setShowRanks] = useState(false);  //to show leaderboard or not
    const spectators = props.Spectators;
    
    function showLeaderboard() {
        console.log('showLeaderboard');
        setShowRanks(true);
    }
    
    function hideLeaderboard() {
        console.log('hideLeaderboard');
        setShowRanks(false);
    }
    
    if (showRanks) {    //show ranks
        return (
            <div className="showRanks">
                <table className="leaderTable">
                    <colgroup  span="2"></colgroup>
                    <tr>
                        <th>Users</th>
                        <th>Ranking</th>
                    </tr>
                    <tr>
                        <td>{props.PlayerX}</td>
                        <td>100</td>
                    </tr>
                    <tr>
                        <td>{props.PlayerO}</td>
                        <td>100</td>
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