import React from 'react';
import { Board } from './Board.js';

export function Box(props) {
    return ( 
        <div class="box" onClick={() => {props.onClick()}}>{ props.board }
        </div>
        );
}