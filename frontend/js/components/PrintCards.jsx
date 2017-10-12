import * as React from "react";
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

        return (
            <table style={{width: '100%'}} className="card-table">
                {cardsTuples.map((u) => {
                    return <tr>{u[0]}{u[1]}</tr>
                })}
            </table>
        );
    }
}

export default PrintCards;