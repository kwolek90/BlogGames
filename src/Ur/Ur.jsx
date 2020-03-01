import React from 'react';
import {setCurrentPlayer,AnimationQueue} from './Common.js';
import {Pawn} from './Pawn.js';
import {BeginTile,EndTile,RouteTile,RollTile} from './Tiles.js';
import {ComputerPlayer,Player} from './Player.js';

export default class Ur extends React.Component {

    renderTile(l,nr){
        console.log(l,nr);
        return (
            <div style={{display:"inline"}}>
                {
                    l+''+nr
                }
            </div>
        );
    }

    renderLine(l){
        return ([0,1,2,3,4,5,6,7,8].map((nr) => {
            return (
                this.renderTile(l,nr)
            );
        }
        ));
    }

    renderBoard(){
        return ([0,1,2].map((l) => {
                this.renderLine(l);
            })
        )
    }

    render(){
        return (
            <div>Ur
                {
                    this.renderBoard()
                }
            </div>
        )
    }
}




//
// var tiles = [];
// var board = [];
// var tile_size = 65;
// var pawnNumber = 7;
// var finished = false;
// var currentPlayer;
// var players = [];
// var endTile = "end";
// var dicesTile;
//
// var bellRoutes = [[0, 1, 2, 3, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, endTile],[4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 18, 19, endTile]];
// var masterRoutes = [[0, 1, 2, 3, 8, 9, 10, 11, 12, 13, 14, 19, 18, 15, 16, 17, endTile],[4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 17, 16, 15, 18, 19,  endTile]];
// var rosettes = [3,7,11,17,19];
// var route = masterRoutes;
//
//
// function StartGame(){
//     AnimationQueue.next();
//     // $('#ChooseDiv').hide();
//     // $('#DebugDiv').show();
//     // $('#SettingsDiv').show();
//     // $('#RestartButton').show();
//
//     pawnNumber = 7 //$('#PawnsNumber').val();
//
//     route = masterRoutes;
//
// }
//
// function createRouteTile(boardSprite,board,i,x,y,tile_size){
//     board[i] = new RouteTile(boardSprite.position.x + x, boardSprite.position.y + y, tile_size, tile_size);
// }
//
// function setup() {
//
//     // let game = new Game();
//     // let board = new Board();
//
//     dicesTile = new RollTile(675, 150, 120, 50);
//     board = [];
//     tiles = [];
//     var boardSprite = undefined;
//
//
//     createRouteTile(boardSprite,board,0, 254, 5, tile_size);
//     createRouteTile(boardSprite,board,1, 180, 5, tile_size);
//     createRouteTile(boardSprite,board,2, 103, 5, tile_size);
//     createRouteTile(boardSprite,board,3, 23, 5, tile_size);
//     createRouteTile(boardSprite,board,4, 254, 159, tile_size);
//     createRouteTile(boardSprite,board,5, 180, 159, tile_size);
//     createRouteTile(boardSprite,board,6, 103, 159, tile_size);
//     createRouteTile(boardSprite,board,7, 23, 159, tile_size);
//     createRouteTile(boardSprite,board,8, 23, 83, tile_size);
//     createRouteTile(boardSprite,board,9, 103, 83, tile_size);
//     createRouteTile(boardSprite,board,10, 180, 83, tile_size);
//     createRouteTile(boardSprite,board,11, 254, 83, tile_size);
//     createRouteTile(boardSprite,board,12, 330, 83, tile_size);
//     createRouteTile(boardSprite,board,13, 405, 83, tile_size);
//     createRouteTile(boardSprite,board,14, 485, 83, tile_size);
//     createRouteTile(boardSprite,board,15, 560, 83, tile_size);
//     createRouteTile(boardSprite,board,16, 560, 5, tile_size);
//     createRouteTile(boardSprite,board,17, 485, 5, tile_size);
//     createRouteTile(boardSprite,board,18, 560, 159, tile_size);
//     createRouteTile(boardSprite,board,19, 485, 159, tile_size);
//
//     for(let i in rosettes){
//         board[rosettes[i]].isRosette = true;
//     }
//
//     for (let tile of board) {
//         tiles.push(tile);
//     }
//
//     var autoRollPlayer1Div = true; //$("#AutoRollPlayer1Div");
//     var autoRollPlayer2Div = true; //$("#AutoRollPlayer2Div");
//
//     var gameMode = "PvP";// $('input[name="gameMode"]:checked').val();
//     switch (gameMode) {
//         case "PvP":
//             players[0] = new Player(0, 'Biały');
//             autoRollPlayer1Div.show();
//             players[1] = new Player(1, 'Czarny');
//             autoRollPlayer2Div.show();
//             break;
//         case "PvC":
//             var playerColor = 'white'; //$('input[name="humanColor"]:checked').val();
//             if(playerColor==='white'){
//                 players[0] = new Player(0, 'Biały');
//                 autoRollPlayer1Div.show();
//                 players[1] = new ComputerPlayer(1, 'Czarny');
//             }
//             else{
//                 players[0] = new ComputerPlayer(0, 'Biały');
//                 players[1] = new Player(1, 'Czarny');
//                 autoRollPlayer2Div.show();
//             }
//             break;
//         case "CvC":
//             players[0] = new ComputerPlayer(0, 'Biały');
//             players[1] = new ComputerPlayer(1, 'Czarny');
//             break;
//
//     }
//
//     var sprite = undefined;
//     players[0].BeginTile = new BeginTile(100, 0, 200, boardSprite.position.y);
//     players[0].EndTile = new EndTile(500, 0, 200, boardSprite.position.y, players[0]);
//     players[0].Route = route[0];
//     tiles.push(players[0].BeginTile);
//     tiles.push(players[0].EndTile);
//     for (let i = 0; i < pawnNumber; i++) {
//         let pawn = new Pawn(players[0], sprite,board);
//         pawn.tile = players[0].BeginTile;
//         players[0].pawns.push(pawn);
//         players[0].BeginTile.pawns.push(pawn);
//         players[0].BeginTile.setPawnDestination(pawn);
//         pawn.sprite.x = pawn.destinationX;
//         pawn.sprite.y = pawn.destinationY;
//     }
//
//     players[1].BeginTile = new BeginTile(100, boardSprite.y + boardSprite.height, 200, boardSprite.y);
//     players[1].EndTile = new EndTile(500, boardSprite.y + boardSprite.height, 200, boardSprite.y, players[1]);
//     players[1].Route = route[1];
//     tiles.push(players[1].BeginTile);
//     tiles.push(players[1].EndTile);
//     for (let i = 0; i < pawnNumber; i++) {
//         let pawn = new Pawn(players[1], sprite,board);
//         pawn.tile = players[1].BeginTile;
//         players[1].pawns.push(pawn);
//         players[1].BeginTile.pawns.push(pawn);
//         players[1].BeginTile.setPawnDestination(pawn);
//         pawn.sprite.x = pawn.destinationX;
//         pawn.sprite.y = pawn.destinationY;
//     }
//     // for (let tile of tiles) {
//     //     tile.draw();
//     // }
//
//
//     setCurrentPlayer(0);
//
//     function onKeyDown(key) {
//         if(key.keyCode === 32){
//             dicesTile.onClick();
//         }
//     }
//
//     document.addEventListener('keydown', onKeyDown);
//
// }