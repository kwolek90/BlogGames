//import * as $ from 'jquery';


class Random{
    a=139429;
    b=144829;
    c=146099;
    constructor(seed){
        this.seed = seed;
    }

    getValue(){
        this.seed = (this.c*this.seed + this.b) % this.a;
        this.seed = Math.floor(Math.random()*16769023);
        return this.seed;
    }

    getRangedValue(valMin,valMax){
        let val = this.getValue();
        val = valMin + (val % (valMax - valMin));
        return val;
    }
}

var random = new Random(0);

class Hole{
    balls = 9;
    owner = null;
    isHouse = false;

    constructor(owner){
        this.owner = owner;
    }
}

function randomScore(move,holes, opponentHoles, result, opponentResult){
    return random.getValue();
}

function captureBallsScore(move,holes, opponentHoles, result, opponentResult){
    let balls = holes[move].balls;
    let newPosition = move + balls + (balls === 1 ? 0 : -1);
    let newHoleNumber = newPosition % 9;
    let newHolePlayer = Math.floor(newPosition/9);
    if((newHolePlayer % 2) === 1 && (opponentHoles[newHoleNumber].balls + (newHolePlayer + 1) / 2) % 2 === 0){
        return opponentHoles[newHoleNumber].balls + (newHolePlayer + 1) / 2;
    }
    return 0;
}


function possesedBallsScore(move,holes, opponentHoles, result, opponentResult){
    let balls = holes[move].balls;
    let newPosition = move + balls + (balls === 1 ? 0 : -1);
    let newHoleNumber = newPosition % 9;
    let newHolePlayer = Math.floor(newPosition/9);
    let currentBalls = holes.reduce((ps,h) => ps+h.balls,0);
    if(newHolePlayer === 0){
        return currentBalls;
    }
    if(newHolePlayer === 1){
        let newBalls = currentBalls - balls + (9 - move);
        if((newHolePlayer % 2) === 1 && (opponentHoles[newHoleNumber].balls + (newHolePlayer + 1) / 2) % 2 === 0) {
            newBalls += opponentHoles[newHoleNumber].balls + 1;
        }
        return newBalls;
    }
    return 0;
}

export var AI = {
    random: randomScore,
    bestCapture: captureBallsScore,
    keepMostBalls: possesedBallsScore
};

class Player{
    id = 0;
    result = 0;
    holes = [];
    hasHouse = false;
    housePosition = null;
    opponent = null;

    constructor(id, chooseMove){
        this.id = id;
        for(let i=0;i<9;i++){
            this.holes.push(new Hole(id));
        }
        let timeStamp = new Date().valueOf();
        this.seed = timeStamp;
        this.random = new Random(this.seed);
        this.assessMove = chooseMove;
    }

    getPossibleMoves(){
        let possibleMoves = [];
        for(let index in this.holes){
            if(this.holes[index].balls > 0){
                possibleMoves.push(index);
            }
        }
        return possibleMoves;
    }

    makeMove(){
        let possibleMoves = this.getPossibleMoves();
        if(possibleMoves.length > 0){
            let bestMove = possibleMoves[0];
            let bestScore = 0.0.MIN_VALUE;
            for(let i in possibleMoves){
                let move = possibleMoves[i];
                let score = this.assessMove(move,this.holes, this.opponent.holes, this.result, this.opponent.result);
                if(score > bestScore){
                    bestScore = score;
                    bestMove = move;
                }
            }
            this.moveBalls(bestMove);
        }
    }


    moveBalls(i) {
        i = parseInt(i);
        let balls = this.holes[i].balls;
        if ( balls === 0) {
            return;
        }
        this.holes[i].balls = 0;
        let k = i;
        let currentPlayer = this;
        for (let j = 0; j < balls; j++) {
            k = i + j;
            if (balls === 1) {
                k += 1;
            }
            if (k >= 9) {
                k -= 9;
                i -= 9;
                currentPlayer = this.opponent;
            }
            if(currentPlayer.holes[k] === undefined){
                console.log(currentPlayer,k,j,i);
            }
            if (currentPlayer.holes[k].isHouse) {
                currentPlayer.holes[k].owner.result += 1;
            }
            else {
                currentPlayer.holes[k].balls += 1;
            }
        }

        if (currentPlayer !== this) {
            if (currentPlayer.holes[k].balls % 2 === 0) {
                this.result += currentPlayer.holes[k].balls;
                currentPlayer.holes[k].balls = 0;
            }
            else if (k !== 9 && currentPlayer.holes[k].balls === 3 && !this.hasHouse && (this.opponent.housePosition === k)) {
                this.housePosition = k;
                this.opponent.holes[k].isHouse = true;
                this.opponent.holes[k].owner = this;
                this.result += 3;
                this.opponent.holes[k].balls = 0;
            }
        }
    }
}



export class Toguz {

    constructor(playerOneDecision,playerTwoDecision){
        this.players = [];
        this.players.push(new Player(0,playerOneDecision));
        this.players.push(new Player(1,playerTwoDecision));

        this.players[0].opponent = this.players[1];
        this.players[1].opponent = this.players[0];

        this.currentPlayer = this.players[0];
    }

    testPlay(){
        let finished = false;
        let turns = 0;
        let winner = null;
        while(!finished && turns < 10000){
            turns += 1;
            this.currentPlayer.makeMove();
            //console.log(turns,this.players[0].result, this.players[1].result);


            if(this.currentPlayer.result > 81){
                winner = this.currentPlayer;
                finished = true;
            }

            let possibleMoves = this.currentPlayer.getPossibleMoves();
            if(possibleMoves.length === 0){
                for(let hole of this.currentPlayer.opponent.holes){
                    this.currentPlayer.opponent.result += hole.balls;
                }
                finished = true;
                winner = this.currentPlayer.opponent;
            }

            this.currentPlayer = this.currentPlayer.opponent;

            if(this.currentPlayer.result > 81){
                winner = this.currentPlayer;
                finished = true;
            }

            if(this.currentPlayer.result === this.currentPlayer.opponent.result === 81){
                finished = true;
            }

        }
        return winner;
    }
}