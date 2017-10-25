import React from 'react';

class Card extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        const subtitleColor = this.props.color === 'black' ? 'white': 'black';
        return (
                <div className="card">
                    <div className="card-title">{this.props.title}</div>
                    <div className="card-subtitle" style={{background: this.props.color, color: subtitleColor}}>
                        <span className="card-subtitle-text">{this.props.subtitle}</span></div>
                    <div className="card-id">{this.props.prefix+this.props.id}</div>
                </div>);
    }
}

export default Card;