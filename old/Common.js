
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

    // players[0].writePawnsPosition("Player1PawnsDiv");
    // players[1].writePawnsPosition("Player2PawnsDiv");
}

function setCurrentPlayer(playerID) {
    currentPlayer = players[playerID];
    currentPlayer.startTurn();
}