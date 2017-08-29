import React from 'react';
import Card from './Card'
import '../../css/main.scss';
import '../../libs/bootstrap/css/bootstrap.min.css';

class Main extends React.Component {

    constructor(props) {
        super(props);
        this.state = {};
    }


    render() {
        if(this.state.printCards) {
            return this.cardView();
        } if(this.state.columns) {
            return this.cardColumnsView();
        } else {
            return (
                <div>
                    <form name="trello-json" onSubmit={this.setTrelloColumns}>
                        <label>Trello Config</label>
                        <textarea id="trello-json" name="trelloJson" ref="trelloJson" placeholder="Input trello json here :)"/>
                        <button type="submit">Generate</button>
                    </form>
                </div>
            );
        }
    }

    setTrelloColumns = (e) =>  {
        e.preventDefault();
        const form = e.target;
        const parsedTrello = JSON.parse(form.elements['trelloJson'].value);
        const prefix = 'ALCH-';
        const columns = parsedTrello.lists.reduce((obj, l) => {obj[l.id] = {name: l.name, cards: []}; return obj;},{});
        const cards = parsedTrello.cards.filter(e => e.close !== 'false').map((e) => {
            return {
                id: e.idShort,
                listId: e.idList,
                title: e.name,
                subtitle: e.labels.length > 0 ? e.labels[0].name : 'No Label',
                color: e.labels.length > 0 ? e.labels[0].color : 'gray',
                prefix: prefix
            }
        });
        cards.forEach((c) =>{columns[c.listId].cards.push(c)});
        this.setState({...this.state, columns: columns, cards: cards, chosenCards:{}});
    };

    cardView() {
        const cards = this.state.printCards.map((u, index) => {
            return <td className="card-table-item"><Card key={`user-${index}`} {...u} /></td>;
        });

        const cardsTuples = [];
        cards.forEach((e, index) => {
            if(index % 2 === 0) {
                cardsTuples[Math.floor(index/2)] = [e, <td width='50%'/>];
            } else {
                cardsTuples[Math.floor(index/2)][1] = e;
            }
        });

        return (
            <table style={{width: '100%'}} className="card-table">
                {cardsTuples.map((u) => {
                    return <tr>{u[0]}{u[1]}</tr>
                })}
            </table>
        );

    }

    cardColumnsView() {
        const columns = this.state.columns;
        const maxCardsLengthStream = [...Array(Math.max(...Object.values(columns).map((v)=> v.cards.length)))];
        return (
            <form onSubmit={this.submitCards}>
                <div>
                    <table style={{width: '100%', columnCount: 2}}>
                        <tr>
                            {Object.entries(columns).map(([key, val]) => {return <th onClick={(e) => this.setColumn(!this.areAllColumnCardsSet(key), key)}>{val.name}<input type="checkbox" checked={this.areAllColumnCardsSet(key)} onChange={(e) => this.setColumn(e.target.checked, key)}/></th>})}
                        </tr>
                        {maxCardsLengthStream.map((e, index) => {return <tr>{Object.values(columns).map((c) => {
                            const cardId = index < c.cards.length ? c.cards[index].id : NaN;
                            return index < c.cards.length ? <td onClick={(e) => this.setCard(!this.state.chosenCards[cardId], cardId)}>{c.cards[index].title}<input type="checkbox" checked={this.state.chosenCards[c.cards[index].id]} onChange={(e) => this.setCard(e.target.checked, c.cards[index].id)}/></td> : <td/>})}</tr>})
                        }
                    </table>
                </div>
                <button type="submit">Submit</button>
            </form>
        );
    }

    setCard(val, id) {
        this.setState({...this.state, chosenCards: {...this.state.chosenCards, [id]: val}});
    }

    setColumn(val, id) {
        this.state.columns[id].cards.forEach((c) => {
           this.state.chosenCards[c.id] = val;
        });
        this.setState(this.state);
    }

    submitCards = () => {
        this.setState({...this.state, printCards: this.state.cards.filter((c) => this.state.chosenCards[c.id])});
    };

    areAllColumnCardsSet = (key) => {
        for(let card of this.state.columns[key].cards) {
            if(!this.state.chosenCards[card.id]) {
                return false;
            }
        }
        return true;
    }
}

export default Main;