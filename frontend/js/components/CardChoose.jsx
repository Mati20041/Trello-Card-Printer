import * as React from "react";
import {Button, Checkbox, Table} from "react-bootstrap";

class CardChoose extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            columns: props.columns,
            cards: props.cards,
            chosenCards: []
        };
    }

    render() {
        const columns = this.state.columns;
        const maxCardsLengthStream = [...Array(Math.max(...Object.values(columns).map((v)=> v.cards.length)))];
        return (
            <div className="container">
                <form onSubmit={this.submitCards}>
                        <Table bordered hover style={{width: '100%', columnCount: 2, overflow: 'auto'}}>
                            <tbody>
                                <tr>
                                    {Object.entries(columns).map(([key, val]) => {return <th key={key} onClick={(e) => this.setColumn(!this.areAllColumnCardsSet(key), key)}>{val.name}<Checkbox className="pull-right" checked={this.areAllColumnCardsSet(key)} onChange={(e) => this.setColumn(e.target.checked, key)}/></th>})}
                                </tr>
                                {maxCardsLengthStream.map((e, index) => {return <tr key={index}>{Object.values(columns).map((c) => {
                                    const cardId = index < c.cards.length ? c.cards[index].id : NaN;
                                    return index < c.cards.length ? <td onClick={(e) => this.setCard(!this.state.chosenCards[cardId], cardId)}>{c.cards[index].title}<Checkbox className="pull-right" checked={this.state.chosenCards[c.cards[index].id]} onChange={(e) => this.setCard(e.target.checked, c.cards[index].id)}/></td> : <td/>})}</tr>})
                                }
                            </tbody>
                        </Table>
                    <Button bsStyle="primary" bsSize="large" type="submit">Submit</Button>
                </form>
            </div>
        );
    }

    submitCards = (e) => {
        e.preventDefault();
        this.props.setChoosenCards(this.state.cards.filter((c) => this.state.chosenCards[c.id]));
    };

    setCard(val, id) {
        this.setState({...this.state, chosenCards: {...this.state.chosenCards, [id]: val}});
    }

    setColumn(val, id) {
        this.state.columns[id].cards.forEach((c) => {
            this.state.chosenCards[c.id] = val;
        });
        this.setState(this.state);
    }

    areAllColumnCardsSet = (key) => {
        if(this.state.columns[key].cards.length === 0) {
            return false;
        }
        for(let card of this.state.columns[key].cards) {
            if(!this.state.chosenCards[card.id]) {
                return false;
            }
        }
        return true;
    }
}

export default CardChoose;