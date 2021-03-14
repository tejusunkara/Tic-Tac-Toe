import React from "react";

export function Box(props) {    //for each cell
  return (
    <div
      class="box"
      onClick={() => {
        props.onClick();
      }}
    >
      {props.board}
    </div>
  );
}
