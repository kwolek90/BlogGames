


var noAnimations = false;

var finished = false;
var currentPlayer;
var players = [];


var tiles = [];
var board = [];
var tile_size = 65;
var pawnNumber = 7;
var endTile = "end";
var dicesTile;
//var rollText = new PIXI.Text('ROLL');


function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}


function sign(valueToGetSign) {
    return typeof valueToGetSign === 'number' ? valueToGetSign ? valueToGetSign < 0 ? -1 : 1 : valueToGetSign === valueToGetSign ? 0 : NaN : NaN;
}



function nextPlayerTurn() {
    if(finished === false){
        var ind = players.indexOf(currentPlayer);
        var nind = (ind + 1) % players.length;
        setCurrentPlayer(nind);
    }
}

function setCurrentPlayer(playerID) {
    currentPlayer = players[playerID];
    currentPlayer.startTurn();
}

function onNoAnimationChange(e){
    noAnimations = e.checked;
}


var AnimationQueue = {
    queue:[],
    isBusy: false,
    next:function(){
        let delay = 100;
        if(AnimationQueue.queue.length > 0){
            let operation_and_delay = AnimationQueue.queue.shift();
            let operation = operation_and_delay[0];
            delay = operation_and_delay[1];
            if(typeof operation === "function"){
                operation();
            }
        }
        else{
            AnimationQueue.isBusy = false;
        }
        setTimeout(AnimationQueue.next, delay);

    },
    append:function(ms,callback){
        AnimationQueue.isBusy = true;
        AnimationQueue.queue.push([callback,ms]);
    }
};



function rand(){
    var result = 0;
    for (let i = 0; i < 4; i++) {
        result += Math.random() < 0.5;
    }
    return result;
}


function onAutoRollChange(e,id){
    players[id].autoroll = e.checked;
}
