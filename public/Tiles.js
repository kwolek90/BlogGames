

class Tile {
    constructor(x, y, w, h) {
        this.width = w;
        this.height = h;
        this.x = x;
        this.y = y;
        this.xe = x + w;
        this.ye = y + h;
        this.xc = x + parseInt(w / 2);
        this.yc = y + parseInt(h / 2);
        this.isTile = true;
        this.image = null;

    }
    containsPoint(x, y) {
        return this.xe > x > this.x && this.ye > y > this.y;
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

    }



    getPawn() {
        return this.pawns.pop();
    }

    setPawn(pawn) {
        pawn.routeID = -1;
        let i = this.pawns.length;
        pawn.sprite.x = this.x+i*pawn.sprite.height;
        pawn.sprite.y = this.y+this.height /2;
        this.pawns.push(pawn);

    }

    getExit(){
        return [this.x+this.width-60,this.y+this.height-60]
    }
}


class EndTile extends RouteTile {
    constructor(x, y, w, h, player) {
        super(21, x, y, w, h);
        this.player = player;
        this.pawns = [];
    }
    
    draw() {
        for(let i in this.pawns){
            let pawn = this.pawns[i];
            pawn.draw(this.x+i*pawn.sprite.height,this.y+this.height /2);
        }
    }

    setPawn(pawn) {
        this.pawns.push(pawn);
        if (this.pawns.length === this.player.pawns.length) {
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
        if (!currentPlayer.rolled && !AnimationQueue.isBusy) {
            let debugResult = $('input[name="diceResult"]:checked').val();
            if(debugResult == "Roll"){
                for (let i in this.roll) {
                    this.roll[i] = Math.random() < 0.5;
                }
            }
            else{
                for (let i in this.roll) {
                    this.roll[i] = false;
                }
                for (let i = 0; i < debugResult; i += 1) {
                    this.roll[i] = true;
                }
            }
            this.draw();
            currentPlayer.rolled = true;
            if (this.result === 0) {
                nextPlayerTurn();
            }
            else {
                currentPlayer.roll();
            }

            rollText.text = "Move pawn by:" + this.result;
        }
    }
    draw() {

    }
    get result() {
        let r = 0;
        for (let i of this.roll) {
            if (i) {
                r += 1;
            }
        }
        return r;
    }
}