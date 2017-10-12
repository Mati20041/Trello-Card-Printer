import React from 'react';
import 'css/main.scss';
import 'libs/bootstrap/css/bootstrap.min.css';
import {Button, ControlLabel, FormControl, FormGroup} from "react-bootstrap";
import InputTrello from "./InputTrello";
import CardChoose from "./CardChoose";
import PrintCards from "./PrintCards";
import Header from "./Header";

class Main extends React.Component {

    constructor(props) {
        super(props);
        this.state = {};
    }


    render() {
        if(this.state.printCards) {
            return (
                <PrintCards printCards={this.state.printCards}/>
            )
        } if(this.state.columns && this.state.columns) {
            return (
                <div>
                    <Header/>
                    <CardChoose cards={this.state.cards}  columns={this.state.columns} setChoosenCards={this.setChoosenCards}/>
                </div>
            )
        } else {
            return (
                <div>
                    <Header/>
                    <InputTrello prefix="ALCH-" setCardsAndColumns={this.setCardsAndColumns}/>
                </div>
            );
        }
    }

    setCardsAndColumns = (cards, columns) =>  {
        this.setState({...this.state, cards:cards, columns:columns})
    };

    setChoosenCards = (choosenCards) => {
        // this.setState({...this.state, printCards: });
        this.setState({...this.state, printCards: choosenCards});
    };
}

export default Main;