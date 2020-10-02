import React from 'react';
import {Toguz,AI} from "./ToguzKorgool";

export default class ToguzBoard extends React.Component {
    game = new Toguz();
    state = {
        gameFinished: false,
        gameStarted: false,
        winningPlayer: null,
        currentPlayer: this.game.currentPlayer
    };

    holeStyleCommon = {
        minWidth: "50px",
        display: "inline-block",
        textAlign: "center",
        border: "solid"
    };

    holeStyleInactive = {
        background: "white"
    };


    holeStyleActive = {
        background: "gold"
    };

    // Handle User Events
    handleHoleClick(p,i) {

        let balls = this.state.currentPlayer.holes[i];
        if(p !== this.state.currentPlayer.id || balls === 0){
            return;
        }
        this.state.currentPlayer.moveBalls(i);

        this.unMarkAllCells();
        this.checkEndGameConditions();
        let nextPlayer = this.game.players[(p+1)%2];
        if(nextPlayer.assessMove === undefined ){
            this.setState({currentPlayer:nextPlayer});
        }
        else{
            nextPlayer.makeMove();
            this.setState({});
        }
    }

    markCell(id){
        this.refs[id].style.borderColor = "red";
    }
    unMarkCell(id){
        this.refs[id].style.borderColor = "black";
    }
    unMarkAllCells(){
        for(let player of this.game.players){
            for(let nr in player.holes){
                this.unMarkCell(player.id + "_" + nr);
            }
        }
    }

    checkEndGameConditions(){
        let gameFinished = false;
        for(let player of this.game.players){
            if(!player.holes.some(function (e) {
                return e !== 0;
            })){
                gameFinished = true;
            }
        }
        if(gameFinished){
            for(let player of this.game.players){
                for(let hole of player.holes){
                    player.result += hole.balls;
                }
            }
        }

        for(let player of this.game.players){
            if(player.result > 81){
                this.setState({
                    gameFinished: true,
                    winningPlayer: player
                });
                return;
            }
        }
    }

    renderHole(playerID, nr){
        return(
                <div key={playerID + "_" + nr}
                     ref={playerID + "_" + nr}
                     className="hole"
                     style={
                         Object.assign(
                             {},
                             this.holeStyleCommon,this.state.currentPlayer.id !== playerID || this.game.players[playerID].holes[nr].balls === 0 ? this.holeStyleInactive : this.holeStyleActive,
                             this.game.players[playerID].holes[nr].isHouse ? {background: "green"} : {}
                         )
                     }
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

    startPvP(){
        this.setState({gameStarted:true});
    }

    startPvC(){
        this.game.players[1].assessMove = AI.bestCapture;
        this.setState({gameStarted:true});
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
                    <div key={"turn_"+0} ref={"turn_"+0}>Gracz: 0</div>
                    {
                        this.renderUpperLine()
                    }
                </div>
                <div key={"bottomLine"} ref={"bottomLine"}>
                    <div key={"turn_"+1} ref={"turn_"+1}>Gracz: 1</div>
                    {
                        this.renderBottomLine()
                    }
                </div>
            </div>
        )
    }

    render() {
        if(this.state.gameFinished){
            return (
                <div> Wygrał gracz:
                    {
                        this.state.winningPlayer.id
                    }
                </div>
            )
        }
        if(this.state.gameStarted){
            return (
                <div className="board">
                    <div>Results {this.game.players[0].result} {this.game.players[1].result}</div>
                    {
                        this.renderBoard()
                    }
                </div>
            );
        }
        return (
            <div>
                <div className={"button"} onClick={() => this.startPvP()}>PvP</div>
                <div className={"button"} onClick={() => this.startPvC()}>PvC</div>
            </div>
        )
    }
}
