import React from 'react';
import testLevel from './testLevel.jpg';
import testDog from './dogTest.png';


export default class TamiAdventure extends React.Component {
    state={
        dogLeft: 0,
        isJumping: false,
        isFalling: false,
        groudLevel: 600,
        currentDogVerticalPosition: 0
    };

    dogStyle = {
        width: "100px",
        height: "70px",
        position: "absolute",
        top:0
    };

    stageStyle = {

    };




    componentDidMount(){
        window.addEventListener("keydown", (e) => {TamiAdventure.handleEvent(this,e)});
    }
    componentWillUnmount(){
        window.removeEventListener("keydown", (e) => {TamiAdventure.handleEvent(this,e)});
    }

    static handleEvent(game, e){
        switch (e.key) {
            case 'a':
                game.moveLeft();
                break;
            case 'd':
                game.moveRight();
                break;
            case 'w':
                if(!game.state.isJumping){
                    game.jump();
                }
                break;
            default:
                break;
        }

    }
    moveLeft(){
        this.setState({dogLeft: this.state.dogLeft - 5});
    }
    moveRight(){
        this.setState({dogLeft: this.state.dogLeft + 5});
    }

    update(game){
        let newState = {
            isFalling: game.state.isFalling,
            isJumping: game.state.isJumping,
            currentDogVerticalPosition: game.state.currentDogVerticalPosition
        };
        if(!newState.isJumping){
            return;
        }
        newState.currentDogVerticalPosition+=newState.isFalling?2:-2;
        if(newState.currentDogVerticalPosition === -300){
            newState.isFalling = true;
        }
        if(newState.isFalling && newState.currentDogVerticalPosition >= 0){
            newState.currentDogVerticalPosition = 0;
            newState.isJumping = false;
            newState.isFalling = false;
        }
        if(newState.isFalling || newState.isJumping){
            setTimeout(function(){game.update(game)},10);
        }
        game.setState(newState);
    }
    jump(){
        this.setState({isJumping: true});
        this.update(this);
    }

    render(){
        let currentDogStyle = {
            width: "100px",
            height: "70px",
            position: "absolute",
            top: (this.state.currentDogVerticalPosition + this.state.groudLevel)+"px",
            left: this.state.dogLeft
        };
        let currentStageStyle = {
            width: "800px",
            height: "600px",
            position: "absolute"
        };

        return (
            <div>
                <h2>Tami Adventure</h2>
                <div>
                    <img src={testLevel} style={currentStageStyle} alt={""}/>
                    <img src={testDog} style={currentDogStyle} alt={""}/>
                </div>
            </div>
        )
    }
}