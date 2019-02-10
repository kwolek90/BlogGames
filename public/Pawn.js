


class Pawn {
    constructor(player,sprite,board) {
        this.player = player;
        this.tile = null;
        this.routeID = -1;
        this.sprite = sprite;
        this.sprite.interactive = true;
        this.sprite.owner = this;
        this.sprite.move = function() { this.owner.move(); };
        this.sprite.on('pointerdown',function() {this.move()});
        this.highlight =  new PIXI.Graphics();
        this.highlight.lineStyle(10, 0xFF0000);
        this.highlight.drawCircle(0, 0, 20);
        this.board = board;
        app.stage.addChild((this.highlight));
        this.hideHighlight();

        this.destinationX = sprite.x;
        this.destinationY = sprite.y;
    }
    


    draw(x, y) {
        this.sprite.x = x;
        this.sprite.y = y;
    }

    drawHighlight() {
        this.highlight.x = this.sprite.x+20;
        this.highlight.y = this.sprite.y+20;

    }
    hideHighlight() {
        this.highlight.x = -100;
        this.highlight.y = -100;

    }

    drawPawnMove(destinationTileID){
        let pawn = this;
        if(this.routeID !== destinationTileID){
            if( this.routeID === -1 ){
                let exitCoords = this.player.BeginTile.getExit();
                if(pawn.sprite.x !== exitCoords[0] || pawn.sprite.y !== exitCoords[1]){
                    this.drawSimpleMove(exitCoords[0],exitCoords[1], function(){pawn.drawPawnMove(destinationTileID)});
                    return;
                }
            }
            this.routeID = this.routeID + 1;
            let tileID = this.player.Route[this.routeID];
            let tile = this.board[tileID];
            if(tileID === endTile){
                tile = this.player.EndTile;
            }
            tile.setPawnDestination(this);
            this.drawSimpleMove(this.destinationX,this.destinationY, function(){pawn.drawPawnMove(destinationTileID)});
        }
    }

    drawSimpleMove(x, y, callback) {
        let pawn = this;
        if (x == null) { x = this.sprite.x; }
        if (y == null) { y = this.sprite.y; }

        let tx = this.sprite.x;
        let ty = this.sprite.y;

        let dx = sign(x-tx);
        let dy = sign(y-ty);

        if(dx !== 0 || dy !== 0){
            pawn.draw(tx+dx, ty+dy);
            AnimationQueue.append(1,function(){ pawn.drawSimpleMove(x,y,callback);});
        }
        else{
            AnimationQueue.append(200,callback);
        }

    }

    get canMove(){
        var result = this.checkIfCanMove();
        if(result){
            this.drawHighlight();
        }
        else{
            this.hideHighlight();
        }
        return result;

    }

    checkIfCanMove() {
        if (currentPlayer === undefined) {
            return false;
        }
        if (this.player.ID !== currentPlayer.ID) {
            return false;
        }
        if (!currentPlayer.rolled || currentPlayer.made_move) {
            return false;
        }
        if (this.player.Route[this.routeID] === endTile) {
            return false;
        }
        if (this.routeID + dicesTile.result >= this.player.Route.length) {
            return false;
        }
        let nextTileID = this.player.Route[this.routeID + dicesTile.result];
        if (nextTileID === endTile) {
            return true;
        } else {
            var newTile = board[nextTileID];
        }


        if (newTile === undefined) {
            return false;
        }

        if (newTile.pawn != null) {
            if (newTile.pawn.player === this.player || newTile.isRosette) {
                return false;
            }
        }
        return true;
    }

    move() {
        if (this.player.ID !== currentPlayer.ID) {
            return false;
        }
        if (!currentPlayer.rolled || currentPlayer.made_move) {
            return false;
        }
        if (this.player.Route[this.routeID] === endTile) {
            return false;
        }
        let nextTileID = this.player.Route[this.routeID + dicesTile.result];
        let newTile;
        if (nextTileID === endTile) {
            newTile = this.player.EndTile;
        } else {
            newTile = board[nextTileID];
        }
        if (newTile === undefined) {
            return false;
        }
        if (newTile.pawn !== null) {
            if (newTile.pawn.player === this.player || newTile.isRosette) {
                return false;
            } else {
                newTile.pawn.getCaptured();
            }
        }
        this.tile.getPawn();
        this.tile = newTile;
        this.tile.setPawn(this);


        this.drawPawnMove(this.routeID + dicesTile.result);

        for(let pawn of this.player.pawns){
            pawn.hideHighlight();
        }
        if (newTile.isRosette) {
            currentPlayer.startTurn();
        } else {
            nextPlayerTurn();
        }
        rollText.text = "Roll";
        return true;
    }
    getCaptured() {
        this.tile = this.player.BeginTile;
        this.routeID = -1;
        this.tile.setPawn(this);
        this.tile.setPawnDestination(this);
        this.drawSimpleMove(this.destinationX,this.destinationY);

    }

    toString() {
        return this.routeID;
    }
}