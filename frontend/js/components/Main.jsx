import React from 'react';
import 'css/main.scss';
import 'libs/bootstrap/css/bootstrap.min.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import InputTrello from "./InputTrello";
import CardChoose from "./CardChoose";
import Header from "./Header";

class Main extends React.Component {

    constructor(props) {
        super(props);

    }


    render() {
        return (
            <div>
                <Header/>
                <div className="container">
                    <Router basename={BUILDARGS.BASENAME}>
                        <div className="routers">
                            <Route exact path="/" component={InputTrello}/>
                            <Route path="/selectCards" component={CardChoose}/>
                        </div>
                    </Router>
                    <p>This site uses cookies to store your prefix preference ;)</p>
                </div>
            </div>
        );
    }
}

export default Main;