import React from 'react';
import ReactDOM from 'react-dom';
import ToguzBoard from './ToguzKorgool/ToguzKorgool';
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
