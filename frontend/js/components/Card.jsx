import React from 'react';

class Card extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
                <div className="card">
                    <div className="card-title">{this.props.title}</div>
                    <div className="card-subtitle" style={{background: this.props.color}}><span className="card-subtitle-text">{this.props.subtitle}</span></div>
                    <div className="card-id">{this.props.prefix+this.props.id}</div>
                </div>);
    }
}

export default Card;