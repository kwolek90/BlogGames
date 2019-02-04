

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
    }

    startTurn() {
        this.rolled = false;
        this.made_move = false;
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
        var style = {
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
}

class ComputerPlayer extends Player {
    constructor(id, image) {
        super(id, image);
    }

    startTurn() {
        Player.prototype.startTurn.call(this);
        if (currentPlayer === this){
            var cint = setInterval(function () {
                if(!AnimationQueue.isBusy){
                    clearInterval(cint);
                    dicesTile.onClick();
                    currentPlayer.makeMove();
                }
            },50)

        }
    }

    makeMove() {
        for (var pawn of this.pawns) {
            if (pawn.canMove) {
                pawn.move();
                return;
            }
        }
    }
}