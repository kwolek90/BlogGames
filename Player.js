

class Player {
    constructor(id, image) {
        this.ID = id;
        this.pawns = [];
        this.rolled = false;
        this.made_move = false;
        this.BeginTile;
        this.EndTile;
        this.Name = this.ID;
        this.Route = [];
        this.PawnImage = image;
    }

    startTurn() {
        this.rolled = false;
        this.made_move = false;
    }

    roll() {
        this.rolled = true;
        var noMoves = true;
        for (var pawn of this.pawns) {
            //pawn.draw(null, null);
            if (pawn.canMove) {
                noMoves = false;
            }
        }
        console.log(noMoves, this.haveMoves());

        if (noMoves) {
            nextPlayerTurn();
        }

    }

    haveMoves() {
        for (var pawn of this.pawns) {
            if (pawn.canMove) {
                return true;
            }
        }
        return false;
    }

    redrawPawns() {
        this.BeginTile.draw();
        this.EndTile.draw();
        for (var pawn of this.pawns) {
            if (pawn.routeID != -1 && pawn.routeID != endTile) {
                pawn.draw();
            }

        }
    }

    ToString() {
        var text = '';
        text += this.ID;
        for (var pawn of this.pawns) {
            text += pawn.ToString();
        }

        return text;
    }

    win() {
        //ctxBoard.fillRect(this.x, this.y, this.width, this.height);
        //ctxBoard.font = "20px";
        //ctxBoard.fillText("Gracz " + this.Name + " wygrał.", canvasBoard.width / 2, canvasBoard.height / 2);
        text1 = game.add.bitmapText(200, 100, 'desyrel', "Gracz " + this.Name + " wygrał.", 64);
        finished = true;
    }
}

class ComputerPlayer extends Player {
    constructor(id, image) {
        super(id, image);
    }

    startTurn() {
        Player.prototype.startTurn.call(this);
        dicesTile.onClick();
        if (currentPlayer == this)
            this.makeMove();
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