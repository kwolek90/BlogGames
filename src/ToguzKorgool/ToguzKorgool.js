import React from 'react';

export default class ToguzBoard extends React.Component {
    state = {
        gameFinished: false,
        holes: [[9,9,9,9,9,9,9,9,9], [9,9,9,9,9,9,9,9,9]],
        results: [0,0],
        currentPlayer: 0
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
        let balls = this.state.holes[p][i];
        if(p !== this.state.currentPlayer || balls === 0){
            return;
        }
        this.state.holes[p][i] = 0;
        let k = i;
        let p0 = p;
        for(let j = 0; j<balls; j++){
            k = i+j;
            if(balls === 1){
                k+=1;
            }
            if(k>=9){
                k-=9;
                i-=9;
                p=(p+1)%2;
            }
            this.state.holes[p][k] += 1;
        }

        if(p0 !== p && this.state.holes[p][k]%2 === 0){
            this.state.results[p0] += this.state.holes[p][k];
            this.state.holes[p][k] = 0;
        }

        this.setState({currentPlayer:(this.state.currentPlayer + 1)%2});

    }

    renderHole(playerID, nr){
        return(
                <div key={playerID + "_" + nr}
                     ref={playerID + "_" + nr}
                     className="hole"
                     style={this.state.currentPlayer !== playerID || this.state.holes[playerID][nr] === 0 ? this.holeStyleInactive : this.holeStyleActive}
                     onClick={() => this.handleHoleClick(playerID,nr)}
                     onPointerOver={() => {
                         var nextHole = nr + this.state.holes[playerID][nr];
                         var nextPlayerID = (playerID + parseInt(nextHole/9))%2;
                         nextHole = nextHole%9;
                         this.refs[nextPlayerID + "_" + nextHole].style.borderColor = "red";
                     }
                     }
                     onPointerLeave={() => {
                         var nextHole = nr + this.state.holes[playerID][nr];
                         var nextPlayerID = (playerID + parseInt(nextHole/9))%2;
                         nextHole = nextHole%9;
                         this.refs[nextPlayerID + "_" + nextHole].style.borderColor = "initial";
                     }
                     }
                >{this.state.holes[playerID][nr]}</div>
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
                <div>Results {this.state.results[0]} {this.state.results[1]}</div>
                {
                    this.renderBoard()

                }
            </div>
        );
    }
}