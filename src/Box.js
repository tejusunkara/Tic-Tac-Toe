import React from "react";

export function Box(props) {
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
