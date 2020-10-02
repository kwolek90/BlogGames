//import {AnimationQueue,sign,noAnimations,nextPlayerTurn,currentPlayer,board,Move,endTile,dicesTile} from "./Common.js";
//import {AnimationQueue,sign,noAnimations} from "./Common.js";

export class Pawn {
    constructor(player,sprite,board) {
        this.player = player;
        this.tile = null;
        this.routeID = -1;
        this.sprite = sprite;
        this.sprite.interactive = true;
        this.sprite.owner = this;
        this.sprite.move = function() { this.owner.move(); };
        this.sprite.on('pointerdown',function() {this.move()});
        //this.highlight =  new PIXI.Graphics();
        //this.highlight.lineStyle(10, 0xFF0000);
        //this.highlight.drawCircle(0, 0, 20);
        this.board = board;
        //app.stage.addChild((this.highlight));
        this.hideHighlight();

        this.destinationX = sprite.x;
        this.destinationY = sprite.y;
    }


    //
    // draw(x, y) {
    //     this.sprite.x = x;
    //     this.sprite.y = y;
    // }
    //
    // drawHighlight() {
    //     this.highlight.x = this.sprite.x+20;
    //     this.highlight.y = this.sprite.y+20;
    //
    // }
    // hideHighlight() {
    //     this.highlight.x = -100;
    //     this.highlight.y = -100;
    //
    // }
    //
    // drawPawnMove(destinationTileID){
    //     let pawn = this;
    //     if(noAnimations){
    //         this.routeID = destinationTileID;
    //         let tileID = this.player.Route[this.routeID];
    //         let tile = this.board[tileID];
    //         if(tileID === endTile){
    //             tile = this.player.EndTile;
    //         }
    //         tile.setPawnDestination(this);
    //         pawn.draw(this.destinationX, this.destinationY);
    //     }
    //     else if(this.routeID !== destinationTileID){
    //         if( this.routeID === -1 ){
    //             let exitCords = this.player.BeginTile.getExit();
    //             if(pawn.sprite.x !== exitCords[0] || pawn.sprite.y !== exitCords[1]){
    //                 this.drawSimpleMove(exitCords[0],exitCords[1], function(){pawn.drawPawnMove(destinationTileID)});
    //                 return;
    //             }
    //         }
    //         this.routeID = this.routeID + 1;
    //         let tileID = this.player.Route[this.routeID];
    //         let tile = this.board[tileID];
    //         if(tileID === endTile){
    //             tile = this.player.EndTile;
    //         }
    //         tile.setPawnDestination(this);
    //         this.drawSimpleMove(this.destinationX,this.destinationY, function(){pawn.drawPawnMove(destinationTileID)});
    //     }
    // }
    //
    // drawSimpleMove(x, y, callback) {
    //     let pawn = this;
    //     if (x == null) { x = this.sprite.x; }
    //     if (y == null) { y = this.sprite.y; }
    //
    //     let tx = this.sprite.x;
    //     let ty = this.sprite.y;
    //
    //     let dx = sign(x-tx);
    //     let dy = sign(y-ty);
    //
    //     if(dx !== 0 || dy !== 0){
    //         pawn.draw(tx+dx, ty+dy);
    //         AnimationQueue.append(1,function(){ pawn.drawSimpleMove(x,y,callback);});
    //     }
    //     else{
    //         AnimationQueue.append(200,callback);
    //     }
    //
    // }
    //
    // get canMove(){
    //     var result = this.checkIfCanMove();
    //     if(result){
    //         this.drawHighlight();
    //     }
    //     else{
    //         this.hideHighlight();
    //     }
    //     return result;
    //
    // }
    //
    // checkIfCanMove() {
    //     if (currentPlayer === undefined) {
    //         return false;
    //     }
    //     if (this.player.ID !== currentPlayer.ID) {
    //         return false;
    //     }
    //     if (!currentPlayer.rolled || currentPlayer.made_move) {
    //         return false;
    //     }
    //     if (this.player.Route[this.routeID] === endTile) {
    //         return false;
    //     }
    //     if (this.routeID + dicesTile.result >= this.player.Route.length) {
    //         return false;
    //     }
    //     let nextTileID = this.player.Route[this.routeID + dicesTile.result];
    //     if (nextTileID === endTile) {
    //         return true;
    //     }
    //
    //     let newTile = board[nextTileID];
    //
    //     if (newTile === undefined) {
    //         return false;
    //     }
    //
    //     if (newTile.pawn != null) {
    //         if (newTile.pawn.player === this.player || newTile.isRosette) {
    //             return false;
    //         }
    //     }
    //     return true;
    // }
    //
    // getMove(){
    //     let nextTileID = this.player.Route[this.routeID + dicesTile.result];
    //     if (nextTileID === endTile) {
    //         return new Move(this, nextTileID, "finish");
    //     }
    //
    //     let newTile = board[nextTileID];
    //
    //     if (newTile.pawn != null) {
    //         if (newTile.pawn.player !== this.player && !newTile.isRosette) {
    //             return new Move(this, nextTileID, "capture");
    //         }
    //     }
    //     else if (newTile.isRosette) {
    //         return new Move(this, nextTileID, "nextMove");
    //     }
    //
    //     return new Move(this, nextTileID, "move");
    // }
    //
    // move() {
    //     if (this.player.ID !== currentPlayer.ID) {
    //         return false;
    //     }
    //     if (!currentPlayer.rolled || currentPlayer.made_move) {
    //         return false;
    //     }
    //     if (this.player.Route[this.routeID] === endTile) {
    //         return false;
    //     }
    //     let nextTileID = this.player.Route[this.routeID + dicesTile.result];
    //     let newTile;
    //     if (nextTileID === endTile) {
    //         newTile = this.player.EndTile;
    //     } else {
    //         newTile = board[nextTileID];
    //     }
    //     if (newTile === undefined) {
    //         return false;
    //     }
    //     if (newTile.pawn !== null) {
    //         if (newTile.pawn.player === this.player || newTile.isRosette) {
    //             return false;
    //         } else {
    //             newTile.pawn.getCaptured();
    //         }
    //     }
    //     this.tile.getPawn();
    //     this.tile = newTile;
    //     this.tile.setPawn(this);
    //
    //
    //     this.drawPawnMove(this.routeID + dicesTile.result);
    //
    //     for(let pawn of this.player.pawns){
    //         pawn.hideHighlight();
    //     }
    //     if (newTile.isRosette) {
    //         currentPlayer.startTurn();
    //     } else {
    //         nextPlayerTurn();
    //     }
    //
    //     //dicesTile.draw();
    //
    //     return true;
    // }
    // getCaptured() {
    //     this.tile = this.player.BeginTile;
    //     this.routeID = -1;
    //     this.tile.setPawn(this);
    //     this.tile.setPawnDestination(this);
    //     if(noAnimations){
    //         this.draw(this.destinationX,this.destinationY);
    //     }
    //     else{
    //         this.drawSimpleMove(this.destinationX,this.destinationY);
    //     }
    //
    // }
    //
    // toString() {
    //     return this.routeID;
    // }
}
