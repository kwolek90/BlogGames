import React from 'react';
import testLevel from './testLevel.jpg';
import testDog from './dogTest.png';


export default class TamiAdventure extends React.Component {
    state={
        dogLeft: 0,
        isJumping: false,
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
        }

    }
    moveLeft(){
        this.setState({dogLeft: this.state.dogLeft - 5});
    }
    moveRight(){
        this.setState({dogLeft: this.state.dogLeft + 5});
    }
    jump(){
        this.setState({isJumping: true});
        const sleep = (milliseconds) => {
            return new Promise(resolve => setTimeout(resolve, milliseconds))
        };

        var juh = 0;
        var isFalling = false;

        const ju = (game) => {
            juh+=isFalling?2:-2;
            if(juh === -60){
                isFalling = true
            }
            game.setState({currentDogVerticalPosition: juh });
            //console.log(Date.now(),juh);
            if(!isFalling || juh !== 0){
                sleep(10).then(() => ju(this));
            }
            else{
                game.setState({isJumping: false})
            }
        };

        ju(this);
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
                    <img src={testLevel} style={currentStageStyle}/>
                    <img src={testDog} style={currentDogStyle}/>
                </div>
            </div>
        )
    }
}