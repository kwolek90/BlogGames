import React from 'react';

export default class Hole extends React.Component {
    state = {
        ballsNumber: 9,
        number: null,
        playerID: null
    };

    render(){
        return(
            <div key={this.state.playerID + "_" + nr} className="hole" style={this.state.currentPlayer !== this.state.playerID || this.state.holes[this.state.playerID][nr] === 0 ? this.holeStyleInactive : this.holeStyleActive} onClick={() => this.handleHoleClick(playerID,nr)}>{this.state.holes[this.state.playerID][nr]}</div>
        )
    };
}