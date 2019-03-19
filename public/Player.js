

class Player {
    constructor(id, image) {
        this.ID = id;
        this.pawns = [];
        this.rolled = false;
        this.made_move = false;
        this.BeginTile = undefined;
        this.EndTile = undefined;
        this.Name = image;
        this.Route = [];
        this.autoroll = false;
    }

    startTurn() {
        this.rolled = false;
        this.made_move = false;
        if (this.autoroll){
            if(noAnimations){
                dicesTile.onClick();
            }
            else {
                var cint = setInterval(function () {
                    if(!AnimationQueue.isBusy){
                        clearInterval(cint);
                        dicesTile.onClick();
                    }
                },50)
            }
        }
    }

    roll() {
        this.rolled = true;
        var noMoves = true;
        for (var pawn of this.pawns) {
            if (pawn.canMove) {
                noMoves = false;
            }
        }

        if (noMoves) {
            nextPlayerTurn();
        }

    }


    win() {
        let style = {
            font : 'bold italic 36px Arial',
            fill : '#F7EDCA',
            stroke : '#4a1850',
            strokeThickness : 5,
            dropShadow : true,
            dropShadowColor : '#000000',
            dropShadowAngle : Math.PI / 6,
            dropShadowDistance : 6,
            wordWrap : true,
            wordWrapWidth : 440
        };
        var winText = new PIXI.Text("Gracz " + this.Name + " wygrał.",style);
        app.stage.addChild(winText);
        finished = true;
    }

    writePawnsPosition(id){
        let container = $("#"+id);
        container.empty();
        for(let i in this.pawns){
            container.append("<div>"+this.Name+" "+i+" "+this.pawns[i].routeID+"</div>");
        }
    }
}

class ComputerPlayer extends Player {
    constructor(id, image) {
        super(id, image);
        this.autoroll = true;
    }

    startTurn() {
        this.rolled = false;
        this.made_move = false;
        if (this.autoroll){
            if(noAnimations){
                if (dicesTile.onClick()) {
                    currentPlayer.makeMove();
                }
            }
            else {
                var cint = setInterval(function () {
                    if (!AnimationQueue.isBusy) {
                        clearInterval(cint);
                        if (dicesTile.onClick()) {
                            currentPlayer.makeMove();
                        }
                    }
                }, 50)
            }
        }

    }

    makeMove() {
        let possibleMoves = [];
        for (let pawn of this.pawns) {
            if (pawn.checkIfCanMove()) {
                possibleMoves.push(pawn.getMove());
            }
        }
        possibleMoves[0].pawn.move();
    }

    makeMoveAggressive(){
        let possibleMoves = [];

        let boardValues = [];
        for(let i = 0; board.length; i++){
            let value = 1;
            let pawn = board[i].pawn;
            if(pawn !== undefined){
                
            }
            boardValues.push(value);
        }

        for (let pawn of this.pawns) {
            if (pawn.checkIfCanMove()) {
                let pawnMove = pawn.getMove();
                switch(pawnMove.result){
                    case "capture":
                        pawnMove.value = 4;
                        break;
                    case "nextMove":
                        pawnMove.value = 3;
                        break;
                    case "finish":
                        pawnMove.value = 2;
                        break;
                    default:
                        pawnMove.value = boardValues[pawnMove.newPosition];
                        break;
                }
                possibleMoves.push(pawnMove);
            }
        }

        possibleMoves.sort(function(a,b){return a.value - b.value;});
        possibleMoves[0].pawn.move();

    }
}

class ComputerPlayerAggressive extends ComputerPlayer{
    makeMove(){
        this.makeMoveAggressive();
    }
}