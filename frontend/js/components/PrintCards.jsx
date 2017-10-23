import * as React from "react";
import Popout from 'react-popout';
import Card from "./Card";

class PrintCards extends React.Component {

    render() {
        const cards = this.props.printCards.map((u, index) => {
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

        const css = window.location.origin + '/bundle.css';
        return (
            <Popout
                title='Trello Cards To Print'
                containerId="main"
                url="about:blank"
                onClosing={this.props.onClosing}
                options={{width:'1700px', height:'700px'}}>
                <div>
                    <link rel="stylesheet" href={css}/>
                    <table style={{width: '100%'}} className="card-table">
                        {cardsTuples.map((u) => {
                            return <tr>{u[0]}{u[1]}</tr>
                        })}
                    </table>
                </div>
            </Popout>
        );
    }
}

export default PrintCards;