
import * as React from "react";
import {Button, ControlLabel, FormControl, FormGroup} from "react-bootstrap";
import * as Cookies from 'js-cookie';

class InputTrello extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            prefix: Cookies.get('prefix') || ''
        }
    }

    render() {
        return (
            <div>
                <form name="trello-json" onSubmit={this.parseTrelloJson}>
                    <FormGroup>
                        <ControlLabel>Trello Config</ControlLabel>
                        <FormControl componentClass="textarea" id="trello-json" name="trelloJson" placeholder="Input trello json here :)"/>
                    </FormGroup>
                    <FormGroup>
                        <ControlLabel>Card Prefix</ControlLabel>
                        <FormControl type="text" id="prefixField" name="prefix" placeholder="PREFIX-" defaultValue={this.state.prefix}/>
                    </FormGroup>
                    <Button bsStyle="primary" bsSize="large" type="submit">Generate</Button>
                </form>
            </div>
        )
    }

    setCardsAndColumns = (cards, columns) => {
        this.props.history.push('/selectCards', {cards:cards, columns:columns});
    };

    parseTrelloJson = (e) =>  {
        e.preventDefault();
        const form = e.target;
        const prefix = form.elements['prefix'].value;
        const parsedTrello = JSON.parse(form.elements['trelloJson'].value);
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
        Cookies.set('prefix', prefix);
        cards.forEach((c) =>{columns[c.listId].cards.push(c)});
        this.setCardsAndColumns(cards, columns);
    };
}

export default InputTrello;