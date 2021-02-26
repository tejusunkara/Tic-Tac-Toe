import React from 'react';
import { Board } from './Board.js';

export function Box(props) {
    var i = parseInt(props.id);
    return ( 
        <div class="box" onClick={() => {
        props.onClick(i)
            }
        }>
        </div>
        );
}