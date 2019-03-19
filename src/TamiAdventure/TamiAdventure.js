import React from 'react';
import testLevel from './testLevel.jpg';
import testDog from './dogTest.png';
import keydown from 'react-keydown';

export default class TamiAdventure extends React.Component {
    state={
        dogLeft: 0
    };

    dogStyle = {
        width: "100px",
        height: "70px",
        position: "absolute",
        top:0
    };


    componentDidMount(){
        console.log('test');
        window.addEventListener("keydown", (e) => {this.handleEvent(this,e)});
    }
    componentWillUnmount(){
        window.removeEventListener("keydown", (e) => {this.handleEvent(this,e)});
    }

    static handleEvent(game, e){
        if(e.key === 'a'){
            game.moveLeft();
        }
        if(e.key === 'd'){
            game.moveRight();
        }
    }
    moveLeft(){
        this.setState({dogLeft: this.state.dogLeft - 5});
    }
    moveRight(){
        this.setState({dogLeft: this.state.dogLeft + 5});
    }

    render(){
        let currentDogStyle = {
            width: "100px",
            height: "70px",
            position: "absolute",
            top:0,
            left: this.state.dogLeft
        };
        return (
            <div>
                <h2>Tami Adventure</h2>
                <div>
                    <img src={testLevel}></img>
                    <img src={testDog} style={currentDogStyle}></img>
                </div>
            </div>
        )
    }
}