

class Tile {
    constructor(x, y, w, h) {
        this.width = w;
        this.height = h;
        this.x = x;
        this.y = y;
        this.xe = x + w;
        this.ye = y + h;
        this.xc = x + w / 2;
        this.yc = y + h / 2;
        this.isTile = true;
        this.image = null;

    }
    containsPoint(x, y) {
        if (this.xe > x > this.x && this.ye > y > this.y)
            return true;
        else
            return false;
    }
    draw() {

    }
    onClick() {

    }
}

class NewGameTile extends Tile {
    constructor(x, y, w, h) {
        super(x, y, w, h);
    }
    draw() {

    }

    onClick() {
        prepare_board();
    }
}

class RouteTile extends Tile {
    constructor(i, x, y, w, h) {
        super(x, y, w, h);
        this.i = i;
        this.pawn = null;
        this.isRosette = false;
    }
    draw() {
        super.draw();
        if (this.pawn != null) {
            this.pawn.draw();
        }
    }

    getPawn() {
        var pawn = this.pawn;
        this.pawn = null;
        return pawn;
    }

    setPawn(pawn) {
        this.pawn = pawn;
    }
}

class BeginTile extends RouteTile {
    constructor(x, y, w, h) {
        super(-1, x, y, w, h);
        this.pawns = [];
    }

    draw() {
        for(let i in this.pawns){
            let pawn = this.pawns[i];
            pawn.draw(this.x+i*pawn.sprite.height,this.y+this.height /2);
        }
    }



    getPawn() {
        return this.pawns.pop();
    }

    setPawn(pawn) {
        pawn.i = -1;
        this.pawns.push(pawn);
    }
}


class EndTile extends RouteTile {
    constructor(x, y, w, h, player) {
        super(21, x, y, w, h);
        this.player = player;
        this.pawns = [];
    }
    setPawn(pawn) {
        this.pawns.push(pawn);
        if (this.pawns.length === pawnNumber) {
            this.player.win();
        }
    }
}

class RollTile extends Tile {
    constructor(x, y, w, h) {
        super(x, y, w, h);
        this.roll = [false, false, false, false];
    }
    onClick() {
        if (!currentPlayer.rolled) {
            for (var i in this.roll) {
                this.roll[i] = Math.random() < 0.5;
            }
            this.draw();
            currentPlayer.rolled = true;
            if (this.result === 0) {
                nextPlayerTurn();
            }
            else {
                currentPlayer.roll();
            }
        }
        console.log(rollText);
        console.log(this.result);
    }
    draw() {

    }
    get result() {
        var r = 0;
        for (var i of this.roll) {
            if (i) {
                r += 1;
            }
        }
        return r;
    }
}