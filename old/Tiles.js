

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
        let graphics = new PIXI.Graphics();
        graphics.beginFill(0xFFFF00);
        graphics.lineStyle(5, 0xFF0000);
        graphics.drawRect(this.x, this.y, this.width, this.height);
        app.stage.addChild(graphics);
        console.log(this.x,this.y,this.width,this.height);
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
    constructor(x, y, w, h) {
        super(x, y, w, h);
        this.pawn = null;
        this.isRosette = false;
    }
    draw() {
        super.draw();
    }

    getPawn() {
        let pawn = this.pawn;
        this.pawn = null;
        return pawn;
    }

    setPawn(pawn) {
        this.pawn = pawn;
    }

    setPawnDestination(pawn){
        pawn.destinationX = this.xc - pawn.sprite.width/2;
        pawn.destinationY = this.yc - pawn.sprite.height/2;
    }
}

class BeginTile extends RouteTile {
    constructor(x, y, w, h) {
        super(x, y, w, h);
        this.pawns = [];
    }

    getPawn() {
        return this.pawns.pop();
    }

    setPawn(pawn) {
        pawn.routeID = -1;
        this.pawns.push(pawn);

    }
    setPawnDestination(pawn){
        let xb = this.x+pawn.sprite.width/2;
        let xe = this.xe-pawn.sprite.width;
        let yb = this.y+pawn.sprite.height/2;
        let ye = this.ye-pawn.sprite.height;

        pawn.destinationX = getRandomInt(xb,xe);
        pawn.destinationY = getRandomInt(yb,ye);
    }

    getExit(){
        return [this.x+this.width-60,this.y+this.height-60]
    }
}


class EndTile extends RouteTile {
    constructor(x, y, w, h, player) {
        super(x, y, w, h);
        this.player = player;
        this.pawns = [];
    }

    setPawn(pawn) {
        this.pawns.push(pawn);
        if (this.pawns.length === this.player.pawns.length) {
            this.player.win();
        }
    }
    setPawnDestination(pawn){
        let xb = this.x+pawn.sprite.width/2;
        let xe = this.xe-pawn.sprite.width;
        let yb = this.y+pawn.sprite.height/2;
        let ye = this.ye-pawn.sprite.height;

        pawn.destinationX = getRandomInt(xb,xe);
        pawn.destinationY = getRandomInt(yb,ye);
    }
}

class RollTile extends Tile {
    constructor(x, y, w, h) {
        super(x, y, w, h);
        this.roll = [false, false, false, false];
        this.history = [];
    }
    onClick() {
        if (!currentPlayer.rolled && !AnimationQueue.isBusy) {
            let debugResult = $('input[name="diceResult"]:checked').val();
            if(debugResult === "Roll"){
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
            this.history.push({player: currentPlayer.Name, result: this.result});
            currentPlayer.rolled = true;
            if (this.result === 0) {
                nextPlayerTurn();
                this.draw();
                return false;
            }
            else {
                currentPlayer.roll();
            }
            this.draw();
            return true;
        }
    }
    draw() {
        let text = "";
        for(let i = Math.max(this.history.length - 5, 0); i < this.history.length; i++){
            text += "Player " + this.history[i].player + " rolled " + this.history[i].result + ".\n";
        }
        if(currentPlayer.rolled){
            text += "Move pawn by:" + this.result;
        }
        else{
            text += "Roll";
        }
        rollText.text = text;
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