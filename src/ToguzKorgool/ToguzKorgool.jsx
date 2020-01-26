import React from 'react';
import {Toguz} from "./ToguzKorgool";

export default class ToguzBoard extends React.Component {
    game = new Toguz();
    state = {
        gameFinished: false,
        currentPlayer: this.game.currentPlayer
    };

    holeStyleInactive = {
        minWidth: "50px",
        background: "white",
        display: "inline-block",
        textAlign: "center",
        border: "solid"
    };


    holeStyleActive = {
        minWidth: "50px",
        background: "gold",
        display: "inline-block",
        textAlign: "center",
        border: "solid"
    };

    // Handle User Events
    handleHoleClick(p,i) {

        let balls = this.state.currentPlayer.holes[i];
        if(p !== this.state.currentPlayer.id || balls === 0){
            return;
        }
        this.state.currentPlayer.moveBalls(i);

        this.unMarkAllCells();
        this.setState({currentPlayer:this.game.players[(p+1)%2]});
    }

    markCell(id){
        this.refs[id].style.borderColor = "red";
    }
    unMarkCell(id){
        this.refs[id].style.borderColor = "black";
    }
    unMarkAllCells(){
        for(var p in this.game.players){
            for(var nr in this.game.players[p].holes){
                this.unMarkCell(p + "_" + nr);
            }
        }
    }
    showCurrentPlayerMark(){
        this.refs[this.game.currentPlayer.id].style.display = "inline-block";
        this.refs[this.game.currentPlayer.opponent.id].style.display = "none";
    }

    renderHole(playerID, nr){
        return(
                <div key={playerID + "_" + nr}
                     ref={playerID + "_" + nr}
                     className="hole"
                     style={this.state.currentPlayer.id !== playerID || this.game.players[playerID].holes[nr].balls === 0 ? this.holeStyleInactive : this.holeStyleActive}
                     onClick={() => this.handleHoleClick(playerID,nr)}
                     onPointerOver={() => {
                         if(this.game.players[playerID].holes[nr].balls === 0){
                             return;
                         }
                         let nextHole = nr + this.game.players[playerID].holes[nr].balls-1;
                         if(this.game.players[playerID].holes[nr].balls === 1){
                             nextHole = nr + 1;
                         }
                         let nextPlayerID = (playerID + parseInt(nextHole/9))%2;
                         nextHole = nextHole%9;
                         this.markCell(nextPlayerID + "_" + nextHole);
                     }
                     }
                     onPointerLeave={() => {
                         if(this.game.players[playerID].holes[nr].balls === 0){
                             return;
                         }
                         let nextHole = nr + this.game.players[playerID].holes[nr].balls-1;
                         if(this.game.players[playerID].holes[nr].balls === 1){
                             nextHole = nr + 1;
                         }
                         let nextPlayerID = (playerID + parseInt(nextHole/9))%2;
                         nextHole = nextHole%9;
                         this.unMarkCell(nextPlayerID + "_" + nextHole);
                     }
                     }
                >{this.game.players[playerID].holes[nr].balls}</div>
            )
    }

    renderUpperLine() {
        return [0,1,2,3,4,5,6,7,8].map((nr) => {
            return (
                this.renderHole(0,8-nr)
            );
        });
    }
    renderBottomLine() {
        return [0,1,2,3,4,5,6,7,8].map((nr) => {
            return (
                this.renderHole(1,nr)
            );
        });
    }

    renderBoard() {
        return (
            <div>
                <div key={"upperLine"} ref={"upperLine"}>
                    <div key={"turn_"+0} ref={"turn_"+0}>\></div>
                    {
                        this.renderUpperLine()
                    }
                </div>
                <div key={"bottomLine"} ref={"bottomLine"}>
                    <div key={"turn_"+1} ref={"turn_"+1}>\></div>
                    {
                        this.renderBottomLine()
                    }
                </div>
            </div>
        )
    }

    render() {
        return (
            <div className="board">
                <div>Results {this.game.players[0].result} {this.game.players[1].result}</div>
                {
                    this.renderBoard()
                }
            </div>
        );
    }
}