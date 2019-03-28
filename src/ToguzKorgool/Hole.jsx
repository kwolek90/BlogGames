import React from 'react';
import {Hole} from './ToguzKorgool';

export default class Hole extends React.Component {
    hole = new Hole();
    state = {
        balls: 9,
        number: null,
        playerID: null,
        isActive: false
    };


    styleInactive = {
        minWidth: "50px",
        background: "white",
        display: "inline-block",
        textAlign: "center",
        border: "solid"
    };


    styleActive = {
        minWidth: "50px",
        background: "gold",
        display: "inline-block",
        textAlign: "center",
        border: "solid"
    };

    render(){
        return(
            <div key={this.state.playerID + "_" + nr}
                 className="hole"
                 style={this.state.isActive ? this.styleInactive : this.styleActive}
                 onClick={() => this.handleHoleClick(this.state.playerID,this.state.number)}

            >{this.state.holes[this.state.balls]}</div>
        )
    };
}