import React from 'react';
import ReactDOM from 'react-dom';
import ToguzBoard from './ToguzKorgool/ToguzKorgool.jsx';
import Ur from './Ur/Ur';
import TamiAdventure from './TamiAdventure/TamiAdventure';
import './index.css';
import LotteryMachine from "./LotteryMachine/LotteryMachine";

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
            },
            {
                name:LotteryMachine,
                displayName:"Maszyna losująca"
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
                <div onClick={() => this.setState({currentGame: null})}>Powrót do początku</div>
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

