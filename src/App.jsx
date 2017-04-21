
import React, { Component } from 'react';
import d3 from 'd3';

import TextDisplay from './components/TextDisplay';

class App extends Component {
    state = {text: ''};

    changeText(event) {
        this.setState({text: event.target.value});
    }

    render() {

        return (
            <div className="container">
                <h2>Git moving</h2>
                <textarea rows="5" value={this.state.text}
                       onChange={::this.changeText} placeholder="Type here"
                       style={{padding: '.6em',
                               fontSize: '1.2em',
                               margin: '0px auto',
                               width: '80%'}} />
                <svg width="100%" height="800">
                    <TextDisplay x="32" y="32" text={this.state.text} />
                </svg>
            </div>
        );
    }
}

export default App;
