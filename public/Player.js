

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
            var cint = setInterval(function () {
                if(!AnimationQueue.isBusy){
                    clearInterval(cint);
                    dicesTile.onClick();
                }
            },50)
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