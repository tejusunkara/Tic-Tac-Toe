/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import { PropTypes } from 'prop-types';

const socket = io();

export function Leaderboard(props) {
  const [showData, setShowData] = useState(false); // to show leaderboard or not
  const [usernames, setUsernames] = useState([]);
  const [rank, setRank] = useState([]);
  const { players } = props;
  const { ranks } = props;
  const { currUser } = props;

  function showLeaderboard() {
    // display all players and their ranking
    setShowData(true);
    setUsernames(players);
    setRank(ranks);
    socket.emit('leaderboard', { users: usernames, rankings: ranks });
  }

  useEffect(() => {
    socket.on('leaderboard', (data) => {
      console.log(data);
      setUsernames(data.users);
      setRank(data.ranks);
    });
  }, []);

  function hideLeaderboard() {
    setShowData(false);
  }

  const renderTable = usernames.map((user, index) => {
    const score = rank[index];
    console.log(rank);
    if (user === currUser) {
      return (
        <tr>
          <td>
            <mark>{user}</mark>
          </td>
          <td>
            <mark>{score}</mark>
          </td>
        </tr>
      );
    }
    return (
      <tr>
        <td>{user}</td>
        <td>{score}</td>
      </tr>
    );
  });

  if (showData) {
    // show ranks of all players
    return (
      <div className="showRanks">
        <table className="leaderTable">
          <tr>
            <th> User </th>
            <th> Rank </th>
          </tr>
          <tr>
            <td>{renderTable}</td>
          </tr>
        </table>
        <button
          className="btnLeaderboard"
          onClick={() => hideLeaderboard()}
          type="button"
        >
          Hide Leaderboard
        </button>
      </div>
    );
  }

  return (
    <button
      className="btnLeaderboard"
      onClick={() => showLeaderboard()}
      type="button"
    >
      Show Leaderboard
    </button>
  );
}

Leaderboard.propTypes = {
  ranks: PropTypes.arrayOf(PropTypes.number).isRequired,
  players: PropTypes.arrayOf(PropTypes.string).isRequired,
  currUser: PropTypes.string.isRequired,
};

export default Leaderboard;
