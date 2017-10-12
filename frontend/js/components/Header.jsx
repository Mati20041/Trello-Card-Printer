import React from 'react';
import {Navbar} from "react-bootstrap";

class Header extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <Navbar inverse fluid>
                    <Navbar.Header>
                        <Navbar.Brand>
                            <a href="#">Trello Card Printer</a>
                        </Navbar.Brand>
                    </Navbar.Header>
                </Navbar>
            </div>
        );
    }
}

export default Header;