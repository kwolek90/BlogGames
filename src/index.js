import React from 'react';
import ReactDOM from 'react-dom';
import ToguzBoard from './ToguzKorgool/ToguzKorgool.jsx';
import {AI,Toguz} from './ToguzKorgool/ToguzKorgool.js';
import Ur from './Ur/Ur';
import TamiAdventure from './TamiAdventure/TamiAdventure';
import './index.css';

class Game extends React.Component {
    state = {
        height: 8,
        width: 8,
        mines: 10,
        currentGame: null,
        availableGames: [
            {
                name:ToguzBoard,
                displayName:"Toguz Korgool"
            },
            {
                name:Ur,
                displayName:"Królewska gra z Ur"
            },
            {
                name:TamiAdventure,
                displayName:"Przygody Tamisia"
            }
        ]
    };
    renderChooseGame(){
        return this.state.availableGames.map((game) => {
                return <div onClick={() => this.setState({currentGame: game})}>{game.displayName}</div>
            }
        )
    }

    renderGame() {
        const TagName = this.state.currentGame.name;
        return (
            <div className="game">
                <TagName />
            </div>
        );
    }

    render(){
        if(this.state.currentGame == null){
            return this.renderChooseGame()
        }
        return this.renderGame()
    }
}

ReactDOM.render(<Game />, document.getElementById('root'));

for(let ai1 of [AI.random,AI.bestCapture,AI.keepMostBalls]){
    for(let ai2 of [AI.random,AI.bestCapture,AI.keepMostBalls]){

        let playerOneWins = 0;
        let playerTwoWins = 0;
//console.time('testPlay');

        for(let i=0;i<2000;i++){
            let toguzTest = new Toguz(ai1,ai2);
            let winner = toguzTest.testPlay();
            if(winner !== null){
                if(winner.id === 0){
                    playerOneWins += 1;
                }
                else{
                    playerTwoWins += 1;
                }
            }
        }
//console.timeEnd('testPlay');
        console.log(ai1.name, ai2.name ,playerOneWins,playerTwoWins);
    }

}
