


class Pawn {
    constructor(player,sprite) {
        this.player = player;
        this.tile = null;
        this.routeID = -1;
        this.sprite = sprite;
    }
    


    draw(x, y) {
        this.sprite.x = x;
        this.sprite.y = y;
    }

    drawMove(x, y) {
        if (x == null) { x = this.sprite.x; }
        if (y == null) { y = this.sprite.y; }
        var tx = this.sprite.x;
        var ty = this.sprite.y;
        if (tx != x || ty != y) {
            this.draw(x, y);
        }
    }

    get canMove() {
        if (currentPlayer == undefined) {
            return false;
        }
        if (this.player.ID != currentPlayer.ID) {
            return false;
        }
        if (!currentPlayer.rolled || currentPlayer.made_move) {
            return false;
        }
        if (this.player.Route[this.routeID] == endTile) {
            return false;
        }
        if (this.routeID + dicesTile.result >= this.player.Route.length) {
            return false;
        }
        var nextTileID = this.player.Route[this.routeID + dicesTile.result];
        if (nextTileID == endTile) {
            return true;
        } else {
            var newTile = board[nextTileID];
        }

        if (newTile == undefined) {
            return false;
        }

        if (newTile.pawn != null) {
            if (newTile.pawn.player == this.player || newTile.isRosette) {
                return false;
            }
        }
        return true;
    }
    move() {
        console.log('test');
        if (this.player.ID != currentPlayer.ID) {
            return false;
        }
        if (!currentPlayer.rolled || currentPlayer.made_move) {
            return false;
        }
        if (this.player.Route[this.routeID] == endTile) {
            return false;
        }
        var nextTileID = this.player.Route[this.routeID + dicesTile.result];
        if (nextTileID == endTile) {
            var newTile = this.player.EndTile;
        } else {
            var newTile = board[nextTileID];
        }
        if (newTile == undefined) {
            return false;
        }
        if (newTile.pawn != null) {
            if (newTile.pawn.player == this.player || newTile.isRosette) {
                return false;
            } else {
                newTile.pawn.getCaptured();
            }
        }
        this.tile.getPawn();
        this.tile = newTile;
        this.tile.setPawn(this);
        this.routeID = this.routeID + dicesTile.result;
        console.log([this.sprite.x, this.sprite.y, this.tile.x, this.tile.y]);
        this.drawMove(this.tile.xc,this.tile.yc);
        if (newTile.isRosette) {
            currentPlayer.startTurn();
        } else {
            nextPlayerTurn();
        }
        return true;
    }
    getCaptured() {
        this.tile = this.player.BeginTile;
        this.routeID = -1;
        this.tile.setPawn(this);
        this.draw();
        this.tile.draw();
    }

    ToString() {
        return this.routeID;
    }
}