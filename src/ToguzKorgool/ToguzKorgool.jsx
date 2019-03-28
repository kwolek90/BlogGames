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
        console.log(p,i);
        let balls = this.state.currentPlayer.holes[i];
        if(p !== this.state.currentPlayer.id || balls === 0){
            return;
        }
        this.state.currentPlayer.moveBalls(i);
        this.setState({currentPlayer:this.game.currentPlayer.opponent});
    }

    renderHole(playerID, nr){
        return(
                <div key={playerID + "_" + nr}
                     ref={playerID + "_" + nr}
                     className="hole"
                     style={this.state.currentPlayer.id !== playerID || this.game.players[playerID].holes[nr].balls === 0 ? this.holeStyleInactive : this.holeStyleActive}
                     onClick={() => this.handleHoleClick(playerID,nr)}
                     onPointerOver={() => {
                         let nextHole = nr + this.game.players[playerID].holes[nr].balls;
                         let nextPlayerID = (playerID + parseInt(nextHole/9))%2;
                         nextHole = nextHole%9;
                         this.refs[nextPlayerID + "_" + nextHole].style.borderColor = "red";
                     }
                     }
                     onPointerLeave={() => {
                         let nextHole = nr + this.game.players[playerID].holes[nr].balls;
                         let nextPlayerID = (playerID + parseInt(nextHole/9))%2;
                         nextHole = nextHole%9;
                         this.refs[nextPlayerID + "_" + nextHole].style.borderColor = "initial";
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
                <div>
                    {
                        this.renderUpperLine()
                    }
                </div>
                <div>
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