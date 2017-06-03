
import d3 from 'd3';
import React, { Component } from 'react';
import TextDisplay from './components/TextDisplay';
import hist from '../async-tutorial.json';
// import hist from '../async-tutorial.json';

let i = 0;

class App extends Component {
    state = {
	text: '',
	loop: false
    };

    constructor() {
	super();
	this.interval = null;
    }

    componentWillUpdate(nextProps, nextState) {
	if (nextState.loop !== this.state.loop) {
	    if (nextState.loop == true) {
		this.startIterating();
	    } else if (nextState.loop == false) {
		this.stopIterating();
	    }
	}
    }

    changeText(event) {
	this.setState({text: event.target.value});
    }

    iterate() {
	this.setState(hist[i++]);
	if (i >= hist.length) {
	    i = 0;
	}
    }

    start() {
	this.setState({loop: true});
    }

    stop() {
	this.setState({loop: false})
    }

    startIterating() {
	this.iterate();
	this.interval = setInterval(this.iterate.bind(this), 2000);
    }

    stopIterating() {
	clearInterval(this.interval);
    }

    render() {
	return (
	    <div className="container">
		<h2>Git moving</h2>
		<button onClick={::this.start}>Start</button>
		<button onClick={::this.stop}>Stop</button>
		<p>{this.state.author}<br/>
		{this.state.date}<br/>
		{this.state.message}<br/>
		{this.state.commit}</p>
		<svg width="100%" height="800">
		    <TextDisplay x="32" y="32" text={this.state.text} />
		</svg>
	    </div>
	);
    }
}

export default App;
