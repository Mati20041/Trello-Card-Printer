
import * as React from "react";
import {Button, ControlLabel, FormControl, FormGroup} from "react-bootstrap";

class InputTrello extends React.Component {

    render() {
        return (
            <div className="container">
                <form name="trello-json" onSubmit={this.parseTrelloJson}>
                    <FormGroup>
                        <ControlLabel>Trello Config</ControlLabel>
                        <FormControl componentClass="textarea" id="trello-json" name="trelloJson" placeholder="Input trello json here :)"/>
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
        const prefix = 'ALCH-';
        const form = e.target;
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
        cards.forEach((c) =>{columns[c.listId].cards.push(c)});
        this.setCardsAndColumns(cards, columns);
    };
}

export default InputTrello;