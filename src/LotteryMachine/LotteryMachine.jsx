import React from 'react';


export default class LotteryMachine extends React.Component {
    constructor() {
        super();
        this.state = {result: ''};

    }
    handleClick = () => {
        var items = 'abcdefghijklmnoprstuwz';
        var item = items[Math.floor(Math.random()*items.length)];
        this.setState(() => ({
            result: item
        }));
    };

    render(){
        return (
            <div><h3>Maszyna losująca</h3>
            <div onClick={this.handleClick} className={"button"} >Losuj literę</div>
            <div>{this.state.result}</div>
            </div>
        )
    }
}

