import React from 'react';
import { PropTypes } from 'prop-types';

export function Box(props) { // for each cell
  const { board } = props;
  const { onClick } = props;
  return (
    <div
      className="box"
      onClick={() => {
        onClick();
      }}
      role="presentation"
    >
      {board}
    </div>
  );
}

Box.propTypes = {
  board: PropTypes.node.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default Box;
